import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

export class UpdateProductCategoryDto extends CreateProductCategoryDto {}
