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
import { CreateProductDto, UpdateProductDto } from '@core/dtos/product.dto';
import { ProductUseCases } from '@use-cases/product/product.use-case';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { Public } from '@auth-decorators/public.decorator';

@Controller('products')
export class ProductController {
  constructor(private productUseCase: ProductUseCases) {}
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() response: Response,
  ) {
    await this.productUseCase.create(createProductDto);
    return response.status(201).json({
      error: false,
    });
  }

  @Public()
  @Post('pagination')
  async pagination(@Body() paginationOptions: PaginationOptionsDto) {
    return this.productUseCase.pagination(paginationOptions);
  }

  @Get('list')
  async list(@Res() response: Response) {
    const productCategories = await this.productUseCase.listAll({
      props: { where: { deletedAt: null } },
    });
    return response.status(200).json({
      error: false,
      productCategories,
    });
  }

  @Get(':id')
  async getById(@Res() response: Response, @Param('id') id: string) {
    const Product = await this.productUseCase.getById(id);
    return response.status(200).json({
      error: false,
      Product,
    });
  }

  @Put(':id')
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    await this.productUseCase.update(id, updateProductDto);
    return response.status(200).json({
      error: false,
    });
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.productUseCase.deleteWithTimestamp(id);
    return response.status(200).json({
      error: false,
    });
  }
}
