import { IsString, IsNotEmpty } from 'class-validator';

export class RecoverPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
