import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@core/entities/user.entity';
import { PrismaService } from '@prisma/prisma.service';
import { allowedUrls } from '@helpers/allowedUrls';

@Injectable()
export class MenuItemUseCases {
  constructor(private prismaService: PrismaService) {}

  async checkPermission(user: User, webUrl: string, action: string) {
    try {
      const webUrlFormatted = webUrl.replace(/yyyy/g, '/');
      const fullWebUrl = webUrlFormatted.split('/');
      let webUrlBase = webUrlFormatted;
      if (fullWebUrl && fullWebUrl.length > 2) {
        webUrlBase = `/${fullWebUrl[1]}/${fullWebUrl[2]}`;
      }

      if (allowedUrls.includes(webUrlBase)) return true;

      const hasPermission = await this.prismaService.menuItem.findFirst({
        where: {
          webUrl: { contains: webUrlBase },
          permissions: {
            some: {
              action,
              roles: {
                some: {
                  allowed: true,
                  role: { users: { some: { id: user.id } } },
                },
              },
            },
          },
        },
      });

      return !!hasPermission;
    } catch (error) {
      throw new BadRequestException('Tivemos um erro ao fazer a verificação');
    }
  }

  async list() {
    return this.prismaService.menuItem.findMany({
      where: {
        active: true,
        webUrl: { notIn: allowedUrls },
      },
      select: {
        id: true,
        name: true,
        permissions: {
          orderBy: { action: 'asc' },
        },
      },
    });
  }

  async getByRoleId(roleId: string) {
    return this.prismaService.menuItem.findMany({
      where: {
        active: true,
        webUrl: { notIn: allowedUrls },
      },
      select: {
        id: true,
        name: true,
        target: true,
        permissions: {
          orderBy: { action: 'asc' },
          include: {
            roles: {
              where: { roleId: roleId },
              include: { permission: true },
            },
          },
        },
      },
    });
  }
}
