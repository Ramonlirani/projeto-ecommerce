import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import {
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
} from '@core/dtos/faq-category.dto';
import { FaqCategory } from '@core/entities/faq-category.entity';
import { IBaseFactory } from '@core/entities/base-factory.entity';

@Injectable()
export class FaqCategoryFactoryService
  implements
    IBaseFactory<FaqCategory, CreateFaqCategoryDto, UpdateFaqCategoryDto>
{
  create(createFaqCategoryDto: CreateFaqCategoryDto) {
    const newFaqCategory = new FaqCategory();
    newFaqCategory.name = createFaqCategoryDto.name;

    return omit(newFaqCategory, 'faqs');
  }

  update(updateFaqCategoryDto: UpdateFaqCategoryDto) {
    const newFaqCategory = new FaqCategory();
    newFaqCategory.name = updateFaqCategoryDto.name;

    return omit(newFaqCategory, 'faqs');
  }
}
