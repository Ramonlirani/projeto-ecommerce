import { Subcategory } from '@core/entities/subcategory.entity';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  productCategoryId: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsArray()
  @IsOptional()
  subcategories?: Subcategory[];
}

export class UpdateProductDto extends CreateProductDto {}
