import { Injectable } from '@nestjs/common';
import { ProductCategoryFactoryService } from './product-category-factory.service';
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from '@core/dtos/product-category.dto';

import { ProductCategory } from '@core/entities/product-category.entity';
import { BaseUseCases } from '@use-cases/base/base.use-case';

@Injectable()
export class ProductCategoryUseCases extends BaseUseCases<
  ProductCategory,
  CreateProductCategoryDto,
  UpdateProductCategoryDto
> {
  constructor(instanceFactory: ProductCategoryFactoryService) {
    super(instanceFactory, 'productCategory');
  }

  async listAllWithProduct() {
    const productCategories = await this.prismaService.productCategory.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        name: true,
        id: true,
        subcategories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return productCategories.filter((category) => category.subcategories.length);
  }

  async getSubcategoriesByCategoryId(productCategoryId: string) {
    const subcategories = await this.prismaService.subcategory.findMany({
      where: {
        productCategoryId,
      },
    });

    return subcategories;
  }
}
