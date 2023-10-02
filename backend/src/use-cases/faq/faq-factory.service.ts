import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import { Faq } from '@core/entities/faq.entity';
import { CreateFaqDto, UpdateFaqDto } from '@core/dtos/faq.dto';
import { IBaseFactory } from '@core/entities/base-factory.entity';

@Injectable()
export class FaqFactoryService
  implements IBaseFactory<Faq, CreateFaqDto, UpdateFaqDto>
{
  create(createFaqDto: CreateFaqDto) {
    const newFaq = new Faq();
    newFaq.question = createFaqDto.question;
    newFaq.faqCategoryId = createFaqDto.faqCategoryId;
    newFaq.answer = createFaqDto.answer;
    newFaq.active = get(createFaqDto, 'active', true);

    return newFaq;
  }

  update(updateFaqDto: UpdateFaqDto) {
    const newFaq = new Faq();
    newFaq.question = updateFaqDto.question;
    newFaq.faqCategoryId = updateFaqDto.faqCategoryId;
    newFaq.answer = updateFaqDto.answer;
    newFaq.active = updateFaqDto.active;

    return newFaq;
  }
}
