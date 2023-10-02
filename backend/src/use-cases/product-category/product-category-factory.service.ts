import { Injectable } from '@nestjs/common';
import { get, omit } from 'lodash';

import { ProductCategory } from '@core/entities/product-category.entity';
import { IBaseFactory } from '@core/entities/base-factory.entity';
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from '@core/dtos/product-category.dto';

@Injectable()
export class ProductCategoryFactoryService
  implements
    IBaseFactory<
      ProductCategory,
      CreateProductCategoryDto,
      UpdateProductCategoryDto
    >
{
  create(createProductCategoryDto: CreateProductCategoryDto) {
    const newProductCategory = new ProductCategory();
    newProductCategory.name = createProductCategoryDto.name;

    newProductCategory.active = get(createProductCategoryDto, 'active', true);

    return omit(newProductCategory, 'products');
  }

  update(updateProductCategoryDto: UpdateProductCategoryDto) {
    const newProductCategory = new ProductCategory();
    newProductCategory.name = updateProductCategoryDto.name;

    newProductCategory.active = get(updateProductCategoryDto, 'active', true);

    return omit(newProductCategory, 'products');
  }
}
