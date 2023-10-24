import { Injectable } from '@nestjs/common';
import { ProductFactoryService } from './product-factory.service';
import { CreateProductDto } from '@core/dtos/product.dto';

import { Product } from '@core/entities/product.entity';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ProductUseCases {
  constructor(
    private prismaService: PrismaService,
    private productFactoryService: ProductFactoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct: Product = await this.productFactoryService.create(
        createProductDto,
      );

      const savedProduct = await this.prismaService.product.create({
        data: {
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description,
          shortDescription: newProduct.shortDescription,
          active: newProduct.active,
          productCategoryId: newProduct.productCategoryId,
          subcategories: {
            create: newProduct.subcategories.map((subcategory) => ({
              SubCategory: {
                connect: { id: subcategory.id },
              },
            })),
          },
        },
        include: {
          subcategories: true,
        },
      });

      const subcategories =
        savedProduct.subcategories?.map((item: any) => item.SubCategory) || [];

      return {
        ...savedProduct,
        subcategories,
      };
    } catch (error) {
      console.log('error', error);

      console.error('Error saving product to the database:', error);
      throw new Error('Failed to save product to the database');
    }
  }
}
