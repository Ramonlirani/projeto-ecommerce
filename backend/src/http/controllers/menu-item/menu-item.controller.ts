import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { MenuItemUseCases } from '@use-cases/menu-item/menu-item.use-case';
import { CurrentUser } from '@auth-decorators/current-user.decorator';
import { User } from '@core/entities/user.entity';

@Controller('menu-items')
export class MenuItemController {
  constructor(private menuItemUseCase: MenuItemUseCases) {}

  @Get('/check-permission/:webUrl/:action')
  async checkPermission(
    @CurrentUser() user: User,
    @Param('webUrl') webUrl: string,
    @Param('action') action: string,
    @Res() response: Response,
  ) {
    const hasPermission = await this.menuItemUseCase.checkPermission(
      user,
      webUrl,
      action,
    );

    return response.status(200).json({
      error: false,
      hasPermission,
    });
  }

  @Get('list')
  async list(@Res() response: Response) {
    const menuItems = await this.menuItemUseCase.list();

    return response.status(200).json({
      error: false,
      menuItems,
    });
  }
}
