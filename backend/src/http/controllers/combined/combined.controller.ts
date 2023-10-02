import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';
import { Public } from '@auth-decorators/public.decorator';

import { FaqCategoryUseCases } from '@use-cases/faq-category/faq-category.use-case';

@Controller('combined')
export class CombinedController {
  constructor(private faqCategoryUseCase: FaqCategoryUseCases) {}

  @Public()
  @Get('/list-faqs')
  async getConfigurationsAndFaqs(@Res() response: Response) {
    const faqCategories = await this.faqCategoryUseCase.listAllWithFaq();
    return response.status(200).json({
      error: false,
      faqs: faqCategories,
    });
  }
}
