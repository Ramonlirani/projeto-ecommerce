import { Injectable } from '@nestjs/common';
import { FaqFactoryService } from './faq-factory.service';
import { BaseUseCases } from '@use-cases/base/base.use-case';
import { Faq } from '@core/entities/faq.entity';
import { CreateFaqDto, UpdateFaqDto } from '@core/dtos/faq.dto';

@Injectable()
export class FaqUseCases extends BaseUseCases<Faq, CreateFaqDto, UpdateFaqDto> {
  constructor(instanceFactory: FaqFactoryService) {
    super(instanceFactory, 'faq');
  }
}
