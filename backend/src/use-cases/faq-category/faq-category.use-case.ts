import { Injectable } from '@nestjs/common';
import { FaqCategoryFactoryService } from './faq-category-factory.service';
import {
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
} from '@core/dtos/faq-category.dto';

import { FaqCategory } from '@core/entities/faq-category.entity';
import { BaseUseCases } from '@use-cases/base/base.use-case';

@Injectable()
export class FaqCategoryUseCases extends BaseUseCases<
  FaqCategory,
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto
> {
  constructor(instanceFactory: FaqCategoryFactoryService) {
    super(instanceFactory, 'faqCategory');
  }

  async listAllWithFaq() {
    const faqCategories = await this.prismaService.faqCategory.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        name: true,
        id: true,
        faqs: {
          select: {
            id: true,
            question: true,
            answer: true,
          },
          where: {
            active: true,
          },
        },
      },
    });

    return faqCategories.filter((category) => category.faqs.length);
  }
}
