import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isBefore, subDays } from 'date-fns';
import { randomUUID } from 'crypto';
import { chain, get, omit } from 'lodash';

import { PrismaService } from '@prisma/prisma.service';
import { User } from '@core/entities/user.entity';
import { decryptPassword } from '@helpers/decryptPassword';
import { excludeFieldFromUser } from '@helpers/excludeFieldFromUser';
import { env } from '@env';
import { IMailService } from '@core/abstracts/mail-services.abstract';
import { getEmailTemplatePath } from '@helpers/getEmailTemplatePath';
import { encryptPassword } from '@helpers/encryptPassword';
import { genericError } from '@helpers/errors';

type UserWithoutPassword = Omit<User, 'password'>;

interface LoginProps {
  user: UserWithoutPassword;
  updateLastLogin?: boolean;
}

@Injectable()
export class AuthUseCases {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private mailService: IMailService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: login }, { username: login }],
        deletedAt: null,
        active: true,
      },
    });

    if (user && !user.verifiedAt) {
      throw new NotFoundException('Verifique seu e-mail para realizar o login.');
    }

    if (user && decryptPassword(user.password) === password) {
      return excludeFieldFromUser(user, 'password');
    }

    throw new NotFoundException('E-mail ou senha incorreto.');
  }

  async login({ user, updateLastLogin = true }: LoginProps) {
    const secret = env.PRIVATE_KEY;

    if (updateLastLogin) {
      await this.prismaService.user.update({
        where: {
          email: user.email,
        },
        data: {
          lastLogin: new Date(),
        },
      });
    }

    return this.jwtService.sign(user, {
      expiresIn: '8h',
      secret,
    });
  }

  async verifyCode(code: string) {
    try {
      const result = await this.prismaService.emailVerification.findUnique({
        where: { code },
      });

      if (!result) {
        return { error: true };
      }

      await this.prismaService.user.update({
        data: {
          verifiedAt: new Date(),
        },
        where: { email: result.email },
      });

      return { error: false };
    } catch (error) {
      throw genericError;
    }
  }

  async forgotPassword(email: string) {
    const hasOldSolicitation = await this.prismaService.resetPassword.findUnique({
      where: { email },
    });

    if (hasOldSolicitation) {
      await this.prismaService.resetPassword.delete({
        where: { email },
      });
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return { notFound: true };

    if (!user.verifiedAt) return { notVerifiedAt: true };

    const token = randomUUID();
    const expireIn = new Date();
    const linkVerification = `${process.env.FRONTEND_URL}/auth/recuperar-senha/${token}`;

    const subject = 'Recuperação de senha';
    expireIn.setDate(expireIn.getDate() + 1);

    const templatePath = getEmailTemplatePath('recover-password.hbs');

    const emailSent = await this.mailService.sendEmail({
      to: user.email,
      subject,
      variables: {
        name: user.name,
        email: user.email,
        linkVerification,
      },
      path: templatePath,
    });

    if (emailSent) {
      await this.prismaService.resetPassword.create({
        data: {
          email: user.email,
          token,
          expireIn,
        },
      });
    }

    return { success: true };
  }

  async recoverPassword(password: string, token: string) {
    const recoverPassword = await this.prismaService.resetPassword.findUnique({
      where: {
        token,
      },
    });

    const user = await this.prismaService.user.update({
      where: { email: recoverPassword.email },
      data: {
        password: encryptPassword(password),
      },
    });

    const subject = 'Senha alterada com sucesso.';

    const templatePath = getEmailTemplatePath('recover-password-success.hbs');

    await this.mailService.sendEmail({
      to: user.email,
      subject,
      variables: {
        name: user.name,
        linkToLoginPage: `${process.env.FRONTEND_URL}/auth/login`,
      },
      path: templatePath,
    });

    return true;
  }

  async verifyTokenRecoverPassword(token: string) {
    const twoDaysAgo = subDays(new Date(), 2);

    const recoverPassword = await this.prismaService.resetPassword.findUnique({
      where: {
        token,
      },
    });

    if (!recoverPassword) return false;

    const expiredIn = new Date(recoverPassword.expireIn);
    const isOlderThanTwoDays = isBefore(expiredIn, twoDaysAgo);

    if (isOlderThanTwoDays) return false;

    return true;
  }

  async getMenuItemsByRoleId(roleId: string) {
    const role = await this.prismaService.role.findUnique({
      where: { id: roleId },
      select: {
        permissions: {
          where: {
            permission: { action: 'MENU-ITEM', menuItem: { visible: true } },
            allowed: true,
          },
          orderBy: { permission: { menuItem: { order: 'asc' } } },
          select: {
            allowed: true,
            permission: {
              select: {
                action: true,
                menuItem: {
                  select: {
                    name: true,
                    icon: true,
                    target: true,
                    order: true,
                    webUrl: true,
                    webUrlBase: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const permissions = get(role, 'permissions');
    return permissions.map(({ permission }) => permission.menuItem);
  }

  async getPermissionOfUser(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        active: true,
        deletedAt: null,
      },
      select: {
        role: {
          select: {
            permissions: {
              where: { allowed: true },
              select: {
                permission: {
                  select: {
                    action: true,
                    menuItem: {
                      select: {
                        modelName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const permissions = get(user, 'role.permissions');
    const permissionsFormatted = chain(permissions)
      .map((permission) => ({
        modelName: permission.permission.menuItem.modelName,
        action: permission.permission.action,
      }))
      .groupBy('modelName');

    return permissionsFormatted;
  }
}
