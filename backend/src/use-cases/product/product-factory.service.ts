import { Injectable } from '@nestjs/common';
import { get, omit } from 'lodash';

import { Product } from '@core/entities/product.entity';
import { IBaseFactory } from '@core/entities/base-factory.entity';
import { CreateProductDto, UpdateProductDto } from '@core/dtos/product.dto';

@Injectable()
export class ProductFactoryService
  implements IBaseFactory<Product, CreateProductDto, UpdateProductDto>
{
  create(createProductDto: CreateProductDto) {
    const newProduct = new Product();
    newProduct.name = createProductDto.name;
    newProduct.price = createProductDto.price;
    newProduct.shortDescription = createProductDto.shortDescription;
    newProduct.description = createProductDto.description;
    newProduct.productCategoryId = createProductDto.productCategoryId;

    newProduct.active = get(createProductDto, 'active', true);

    return newProduct;
  }

  update(updateProductDto: UpdateProductDto) {
    const newProduct = new Product();
    newProduct.name = updateProductDto.name;
    newProduct.price = updateProductDto.price;
    newProduct.shortDescription = updateProductDto.shortDescription;
    newProduct.description = updateProductDto.description;
    newProduct.productCategoryId = updateProductDto.productCategoryId;

    newProduct.active = updateProductDto.active;

    return newProduct;
  }
}
