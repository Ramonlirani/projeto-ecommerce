import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsNotEmpty()
  faqCategoryId: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

export class UpdateFaqDto extends CreateFaqDto {}
