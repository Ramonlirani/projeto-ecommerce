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

import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { SubCategoryUseCases } from '@use-cases/sub-category/subcategory.use-case';
import {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from '@core/dtos/subcategory.dto';

@Controller('subcategories')
export class SubCategoryController {
  constructor(private subCategoryUseCase: SubCategoryUseCases) {}
  @Post()
  async create(
    @Body() createSubCategoryDto: CreateSubcategoryDto,
    @Res() response: Response,
  ) {
    await this.subCategoryUseCase.create(createSubCategoryDto);

    return response.status(201).json({
      error: false,
    });
  }

  @Post('pagination')
  async pagination(@Body() paginationOptions: PaginationOptionsDto) {
    return this.subCategoryUseCase.pagination(paginationOptions);
  }

  @Get(':id')
  async getById(@Res() response: Response, @Param('id') id: string) {
    const subCategory = await this.subCategoryUseCase.getById(id);
    return response.status(200).json({
      error: false,
      subCategory,
    });
  }

  @Put(':id')
  async update(
    @Body() updateSubCategoryDto: UpdateSubcategoryDto,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    await this.subCategoryUseCase.update(id, updateSubCategoryDto);
    return response.status(200).json({
      error: false,
    });
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.subCategoryUseCase.delete(id);
    return response.status(200).json({
      error: false,
    });
  }
}
