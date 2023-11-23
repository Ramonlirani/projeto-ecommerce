import { SubCategoryUseCases } from './../../../use-cases/sub-category/subcategory.use-case';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CreateProductDto } from '@core/dtos/product.dto';
import { ProductUseCases } from '@use-cases/product/product.use-case';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { Public } from '@auth-decorators/public.decorator';
import { ProductCategoryUseCases } from '@use-cases/product-category/product-category.use-case';

@Controller('products')
export class ProductController {
  constructor(
    private productUseCase: ProductUseCases,
    private subCategoryUseCases: SubCategoryUseCases,
    private productCategoryUseCase: ProductCategoryUseCases,
  ) {}
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

  @Public()
  @Get('/launches')
  async launches(@Res() response: Response) {
    try {
      const productLaunches = await this.productUseCase.getProductLaunches();

      return response.status(200).json({
        error: false,
        productLaunches,
      });
    } catch (error) {
      console.error('Error fetching product launches:', error);
      return response.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }
  }

  // @Get('listAll')
  // async list(@Res() response: Response) {
  //   const productCategories = await this.productUseCase.listAll();
  //   return response.status(200).json({
  //     error: false,
  //     productCategories,
  //   });
  // }

  @Public()
  @Get(':id')
  async getById(@Res() response: Response, @Param('id') id: string) {
    const Product = await this.productUseCase.getById(id);

    const Category = await this.productCategoryUseCase.getById(
      Product.productCategoryId,
    );
    const Subcategories =
      await this.productCategoryUseCase.getSubcategoriesByCategoryId(
        Product.productCategoryId,
      );

    return response.status(200).json({
      error: false,
      Product,
      ProductCategory: Category,
      Subcategories: Subcategories,
    });
  }

  // @Put(':id')
  // async update(
  //   @Body() updateProductDto: UpdateProductDto,
  //   @Res() response: Response,
  //   @Param('id') id: string,
  // ) {
  //   await this.productUseCase.update(id, updateProductDto);
  //   return response.status(200).json({
  //     error: false,
  //   });
  // }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.productUseCase.deleteWithTimestamp(id);
    return response.status(200).json({
      error: false,
    });
  }
}
