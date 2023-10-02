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
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from '@core/dtos/product-category.dto';
import { ProductCategoryUseCases } from '@use-cases/product-category/product-category.use-case';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { Public } from '@auth-decorators/public.decorator';

@Controller('product-categories')
export class ProductCategoryController {
  constructor(private productCategoryUseCase: ProductCategoryUseCases) {}
  @Post()
  async create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @Res() response: Response,
  ) {
    await this.productCategoryUseCase.create(createProductCategoryDto);
    return response.status(201).json({
      error: false,
    });
  }

  @Post('pagination')
  async pagination(@Body() paginationOptions: PaginationOptionsDto) {
    return this.productCategoryUseCase.pagination(paginationOptions);
  }

  @Get('list')
  async list(@Res() response: Response) {
    const productCategories = await this.productCategoryUseCase.listAll();
    return response.status(200).json({
      error: false,
      productCategories,
    });
  }

  @Get('list-subcategory/:productCategoryId')
  async getSubcategory(
    @Res() response: Response,
    @Param('productCategoryId') productCategoryId: string,
  ) {
    const subcategories =
      await this.productCategoryUseCase.getSubcategoriesByCategoryId(
        productCategoryId,
      );
    return response.status(200).json({
      error: false,
      subcategories,
    });
  }

  @Public()
  @Get('/list-with-product')
  async listAllWithProduct(@Res() response: Response) {
    const productCategories =
      await this.productCategoryUseCase.listAllWithProduct();
    return response.status(200).json({
      error: false,
      products: productCategories,
    });
  }

  @Get(':id')
  async getById(@Res() response: Response, @Param('id') id: string) {
    const productCategory = await this.productCategoryUseCase.getById(id);
    return response.status(200).json({
      error: false,
      productCategory,
    });
  }

  @Put(':id')
  async update(
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    await this.productCategoryUseCase.update(id, updateProductCategoryDto);
    return response.status(200).json({
      error: false,
    });
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.productCategoryUseCase.deleteWithTimestamp(id);
    return response.status(200).json({
      error: false,
    });
  }
}
