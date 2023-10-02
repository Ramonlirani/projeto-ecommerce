import { IsString, IsNotEmpty, IsArray, IsBoolean } from 'class-validator';

class PermissionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsBoolean()
  @IsNotEmpty()
  allowed: boolean;
}

class MenuItemsDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  permissions: PermissionDto[];
}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  menuItems: MenuItemsDto[];
}

export class UpdateRoleDto extends CreateRoleDto {}
