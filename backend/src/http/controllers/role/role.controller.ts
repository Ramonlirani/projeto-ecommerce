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
import { CreateRoleDto, UpdateRoleDto } from '@core/dtos/role.dto';
import { RoleUseCases } from '@use-cases/role/role.use-case';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';

@Controller('roles')
export class RoleController {
  constructor(private roleUseCase: RoleUseCases) {}
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @Res() response: Response) {
    await this.roleUseCase.create(createRoleDto);
    return response.status(201).json({
      error: false,
    });
  }

  @Get('list')
  async list(@Res() response: Response) {
    const roles = await this.roleUseCase.list();

    return response.status(201).json({
      error: false,
      roles,
    });
  }

  @Post('pagination')
  async pagination(@Body() paginationOptions: PaginationOptionsDto) {
    return this.roleUseCase.pagination(paginationOptions);
  }

  @Get(':id')
  async getById(@Res() response: Response, @Param('id') id: string) {
    const role = await this.roleUseCase.getById(id);
    return response.status(200).json({
      error: false,
      role,
    });
  }

  @Put(':id')
  async update(
    @Body() updateRoleDto: UpdateRoleDto,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    await this.roleUseCase.update(id, updateRoleDto);
    return response.status(200).json({
      error: false,
    });
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.roleUseCase.delete(id);
    return response.status(200).json({
      error: false,
    });
  }
}
