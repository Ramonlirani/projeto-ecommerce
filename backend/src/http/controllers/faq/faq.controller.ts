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
import { CreateFaqDto, UpdateFaqDto } from '@core/dtos/faq.dto';
import { FaqUseCases } from '@use-cases/faq/faq.use-case';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';

@Controller('faqs')
export class FaqController {
  constructor(private faqUseCase: FaqUseCases) {}
  @Post()
  async create(@Body() createFaqDto: CreateFaqDto, @Res() response: Response) {
    await this.faqUseCase.create(createFaqDto);
    return response.status(201).json({
      error: false,
    });
  }

  @Post('pagination')
  async pagination(@Body() paginationOptions: PaginationOptionsDto) {
    return this.faqUseCase.pagination(paginationOptions);
  }

  @Get(':id')
  async getById(@Res() response: Response, @Param('id') id: string) {
    const faq = await this.faqUseCase.getById(id);
    return response.status(200).json({
      error: false,
      faq,
    });
  }

  @Put(':id')
  async update(
    @Body() updateFaqDto: UpdateFaqDto,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    await this.faqUseCase.update(id, updateFaqDto);
    return response.status(200).json({
      error: false,
    });
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.faqUseCase.delete(id);
    return response.status(200).json({
      error: false,
    });
  }
}
