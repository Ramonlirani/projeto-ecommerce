import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  productCategoryId: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

export class UpdateSubcategoryDto extends CreateSubcategoryDto {}
