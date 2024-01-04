import { Injectable } from '@nestjs/common';
import { ProductFactoryService } from './product-factory.service';
import { CreateProductDto } from '@core/dtos/product.dto';

import { Product } from '@core/entities/product.entity';
import { PrismaService } from '@prisma/prisma.service';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { PageMetaDto } from '@core/dtos/page-meta.dto';
import { PageDto } from '@core/dtos/page.dto';
import { genericError, notFoundError } from '@helpers/errors';

@Injectable()
export class ProductUseCases {
  constructor(
    private prismaService: PrismaService,
    private productFactoryService: ProductFactoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productFactoryService.create(createProductDto);

      const savedProduct = await this.prismaService.product.create({
        data: {
          name: newProduct.name,
          price: newProduct.price,
          discount: newProduct.discount,
          color: newProduct.color,
          size: newProduct.size,
          shortDescription: newProduct.shortDescription,
          description: newProduct.description,
          productCategoryId: newProduct.productCategoryId,
          imageUrl: newProduct.imageUrl,
          active: newProduct.active,
          launches: newProduct.launches,
          bestSeller: newProduct.bestSeller,
        },
      });

      const data = newProduct.subcategories.map((item) => {
        return {
          subCategoryId: item.id,
          productId: savedProduct.id,
        };
      });

      await this.prismaService.productSubcategory.createMany({
        data,
      });

      return savedProduct;
    } catch (error) {
      console.log('error', error);

      console.error('Error saving product to the database:', error);
      throw new Error('Failed to save product to the database');
    }
  }

  async pagination(paginationOptions: PaginationOptionsDto) {
    const itemCount = await this.prismaService.product.count({
      where: paginationOptions.where,
    });

    const entities = await this.prismaService.product.findMany({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      orderBy: {
        createdAt: paginationOptions.order,
      },
      where: paginationOptions.where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            subcategories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const showing = entities.length;

    const pageMetaDto = new PageMetaDto({
      showing,
      itemCount,
      paginationOptions,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async getById(id: string): Promise<Product> {
    const entity = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!entity) throw notFoundError;

    return entity;
  }

  async getProductLaunches() {
    const launches = await this.prismaService.product.findMany({
      where: {
        deletedAt: null,
        launches: true,
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return launches;
  }

  async getProductBestSeller() {
    const bestSeller = await this.prismaService.product.findMany({
      where: {
        deletedAt: null,
        bestSeller: true,
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return bestSeller;
  }

  async listAll() {
    const products = await this.prismaService.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
            subcategories: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return products;
  }

  async deleteWithTimestamp(id: string) {
    try {
      await this.getById(id);

      await this.prismaService.product.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw genericError;
    }
  }
}
