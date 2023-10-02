import { Injectable } from '@nestjs/common';
import { SubCategoryFactoryService } from './subcategory-factory.service';
import { BaseUseCases } from '@use-cases/base/base.use-case';
import { Subcategory } from '@core/entities/subcategory.entity';
import {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from '@core/dtos/subcategory.dto';

@Injectable()
export class SubCategoryUseCases extends BaseUseCases<
  Subcategory,
  CreateSubcategoryDto,
  UpdateSubcategoryDto
> {
  constructor(instanceFactory: SubCategoryFactoryService) {
    super(instanceFactory, 'subcategory');
  }
}
