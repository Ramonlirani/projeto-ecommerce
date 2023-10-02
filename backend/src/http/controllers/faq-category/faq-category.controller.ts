import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
} from '@core/dtos/faq-category.dto';
import { FaqCategoryUseCases } from '@use-cases/faq-category/faq-category.use-case';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { Public } from '@auth-decorators/public.decorator';

@Controller('faq-categories')
export class FaqCategoryController {
  constructor(private faqCategoryUseCase: FaqCategoryUseCases) {}
  @Post()
  async create(
    @Body() createFaqCategoryDto: CreateFaqCategoryDto,
    @Res() response: Response,
  ) {
    await this.faqCategoryUseCase.create(createFaqCategoryDto);
    return response.status(201).json({
      error: false,
    });
  }

  @Post('pagination')
  async pagination(@Body() paginationOptions: PaginationOptionsDto) {
    return this.faqCategoryUseCase.pagination(paginationOptions);
  }

  @Get('list')
  async list(@Res() response: Response) {
    const faqCategories = await this.faqCategoryUseCase.listAll();
    return response.status(200).json({
      error: false,
      faqCategories,
    });
  }

  @Public()
  @Get('/list-with-faq')
  async listAllWithFaq(@Res() response: Response) {
    const faqCategories = await this.faqCategoryUseCase.listAllWithFaq();
    return response.status(200).json({
      error: false,
      faqs: faqCategories,
    });
  }

  @Get(':id')
  async getById(@Res() response: Response, @Param('id') id: string) {
    const faqCategory = await this.faqCategoryUseCase.getById(id);
    return response.status(200).json({
      error: false,
      faqCategory,
    });
  }

  @Put(':id')
  async update(
    @Body() updateFaqCategoryDto: UpdateFaqCategoryDto,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    await this.faqCategoryUseCase.update(id, updateFaqCategoryDto);
    return response.status(200).json({
      error: false,
    });
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.faqCategoryUseCase.deleteWithTimestamp(id);
    return response.status(200).json({
      error: false,
    });
  }
}
