import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { RoleFactoryService } from './role-factory.service';
import { CreateRoleDto, UpdateRoleDto } from '@core/dtos/role.dto';
import { PaginationOptionsDto } from '@core/dtos/pagination-options.dto';
import { PageMetaDto } from '@core/dtos/page-meta.dto';
import { PageDto } from '@core/dtos/page.dto';
import { MenuItemUseCases } from '@use-cases/menu-item/menu-item.use-case';
import { genericError, notFoundError } from '@helpers/errors';

@Injectable()
export class RoleUseCases {
  constructor(
    private prismaService: PrismaService,
    private roleFactoryService: RoleFactoryService,
    private menuItemUseCase: MenuItemUseCases,
  ) {}

  async pagination(paginationOptions: PaginationOptionsDto) {
    const itemCount = await this.prismaService.role.count();

    const entities = await this.prismaService.role.findMany({
      skip: paginationOptions.skip,
      take: paginationOptions.take,
      orderBy: {
        code: 'asc',
      },
    });

    const showing = entities.length;

    const pageMetaDto = new PageMetaDto({
      showing,
      itemCount,
      paginationOptions,
    });

    return new PageDto(entities, pageMetaDto);
  }

  async list() {
    return this.prismaService.role.findMany();
  }

  async getById(id: string) {
    const role = await this.prismaService.role.findUnique({
      where: { id },
    });

    if (!role) throw notFoundError;

    const menuItems = await this.menuItemUseCase.getByRoleId(role.id);

    const roleFormatted = {
      ...role,
      menuItems,
    };

    return roleFormatted;
  }

  async create(createRoleDto: CreateRoleDto): Promise<void> {
    try {
      const role = this.roleFactoryService.createNewRole(createRoleDto);
      const newRole = await this.prismaService.role.create({ data: role });

      createRoleDto.menuItems.map((menuItem) => {
        menuItem.permissions.map(async (permission) => {
          await this.prismaService.permissionRole.create({
            data: {
              allowed: permission.allowed,
              permissionId: permission.id,
              roleId: newRole.id,
            },
          });
        });
      });
    } catch (error) {
      throw genericError;
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const role = this.roleFactoryService.updateRole(updateRoleDto);

      await this.prismaService.role.update({
        where: { id },
        data: role,
      });

      updateRoleDto.menuItems.map((menuItem) => {
        menuItem.permissions.map(async (permission) => {
          await this.prismaService.permissionRole.update({
            where: {
              permissionId_roleId: {
                roleId: id,
                permissionId: permission.id,
              },
            },
            data: {
              allowed: permission.allowed,
            },
          });
        });
      });
    } catch (error) {
      throw genericError;
    }
  }

  async delete(id: string) {
    await this.getById(id);

    try {
      return this.prismaService.role.delete({ where: { id } });
    } catch (error) {
      throw genericError;
    }
  }
}
