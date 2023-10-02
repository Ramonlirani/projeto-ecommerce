import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFaqCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateFaqCategoryDto extends CreateFaqCategoryDto {}
