import { Response } from 'express';
import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from '@core/dtos/login.dto';
import { AuthUseCases } from '@use-cases/auth/auth.use-case';
import { User } from '@core/entities/user.entity';
import { Public } from '@auth-decorators/public.decorator';
import { CurrentUser } from '@auth-decorators/current-user.decorator';
import { ForgotPasswordDto } from '@core/dtos/forgot-password.dto';
import { RecoverPasswordDto } from '@core/dtos/recover-password.dto';
import { SentryInterceptor } from '../../../interceptors/sentry.interceptor';
@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authUseCase: AuthUseCases) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const { login, password } = loginDto;

    const user = await this.authUseCase.validateUser(login, password);

    const token = await this.authUseCase.login({ user });

    return response.status(200).json({
      error: false,
      token,
    });
  }

  @Public()
  @Get('/verify-code/:code')
  async verifyCode(@Param('code') code: string, @Res() response: Response) {
    const { error } = await this.authUseCase.verifyCode(code);

    return response.status(200).json({
      error,
    });
  }

  @Public()
  @Get('/verify-token-recovery-password/:token')
  async verifyTokenRecoverPassword(
    @Param('token') token: string,
    @Res() response: Response,
  ) {
    const tokenIsValid = await this.authUseCase.verifyTokenRecoverPassword(token);

    return response.status(200).json({
      error: false,
      tokenIsValid: tokenIsValid,
    });
  }

  @Public()
  @Post('/forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() response: Response,
  ) {
    const { email } = forgotPasswordDto;

    const type = await this.authUseCase.forgotPassword(email);

    return response.status(200).json({
      error: false,
      type,
    });
  }

  @Public()
  @Post('/recover-password')
  async recoverPassword(
    @Body() recoverPasswordDto: RecoverPasswordDto,
    @Res() response: Response,
  ) {
    const { password, token } = recoverPasswordDto;

    const success = await this.authUseCase.recoverPassword(password, token);

    return response.status(200).json({
      error: false,
      success,
    });
  }

  @Get('me')
  async me(@CurrentUser() user: User, @Res() response: Response) {
    if (!user) {
      return response.status(401).json({
        error: true,
        message: 'Token inválido',
      });
    }

    const menuItems = await this.authUseCase.getMenuItemsByRoleId(user.roleId);
    const permissions = await this.authUseCase.getPermissionOfUser(user.id);

    return response.status(200).json({
      error: false,
      user,
      menuItems,
      permissions,
    });
  }
}
