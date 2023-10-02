import { IsString, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
