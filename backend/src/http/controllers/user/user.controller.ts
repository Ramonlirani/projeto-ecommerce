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
import { CreateUserDto, UpdateUserDto } from '@core/dtos/user.dto';
import { UserUseCases } from '@use-cases/user/user.use-case';
import { Response } from 'express';
import { Public } from '../../../frameworks/auth/decorators/public.decorator';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { CurrentUser } from '@auth-decorators/current-user.decorator';
import { User } from '@core/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private userUseCase: UserUseCases) {}
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    await this.userUseCase.create(createUserDto);
    return response.status(201).json({
      error: false,
    });
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const perfilPhotoUrl = await this.userUseCase.update(id, updateUserDto);
    return response.status(200).json({
      error: false,
      perfilPhotoUrl,
    });
  }

  @Post('pagination')
  async pagination(
    @CurrentUser() user: User,
    @Body() paginationOptions: PaginationOptionsDto,
  ) {
    return this.userUseCase.pagination(paginationOptions, user);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() response: Response) {
    const user = await this.userUseCase.getById(id);
    return response.status(200).json({
      error: false,
      user,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    await this.userUseCase.delete(id);
    return response.status(200).json({
      error: false,
    });
  }
}
