import { Injectable } from '@nestjs/common';
import { ProductFactoryService } from './product-factory.service';
import { CreateProductDto, UpdateProductDto } from '@core/dtos/product.dto';

import { Product } from '@core/entities/product.entity';
import { BaseUseCases } from '@use-cases/base/base.use-case';

@Injectable()
export class ProductUseCases extends BaseUseCases<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(instanceFactory: ProductFactoryService) {
    super(instanceFactory, 'product');
  }
}
