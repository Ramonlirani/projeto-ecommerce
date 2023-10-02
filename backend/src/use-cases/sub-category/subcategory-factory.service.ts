import { Injectable } from '@nestjs/common';
import { Subcategory } from '@core/entities/subcategory.entity';

import { IBaseFactory } from '@core/entities/base-factory.entity';
import {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from '@core/dtos/subcategory.dto';
import { get } from 'lodash';

@Injectable()
export class SubCategoryFactoryService
  implements
    IBaseFactory<Subcategory, CreateSubcategoryDto, UpdateSubcategoryDto>
{
  create(createSubCategoryDto: CreateSubcategoryDto) {
    const newSubCategory = new Subcategory();
    newSubCategory.productCategoryId = createSubCategoryDto.productCategoryId;
    newSubCategory.name = createSubCategoryDto.name;

    newSubCategory.active = get(createSubCategoryDto, 'active', true);

    return newSubCategory;
  }

  update(updateSubCategoryDto: UpdateSubcategoryDto) {
    const newSubCategory = new Subcategory();
    newSubCategory.productCategoryId = updateSubCategoryDto.productCategoryId;
    newSubCategory.name = updateSubCategoryDto.name;

    newSubCategory.active = updateSubCategoryDto.active;

    return newSubCategory;
  }
}
