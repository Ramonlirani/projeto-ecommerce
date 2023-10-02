import { Injectable } from '@nestjs/common';
import { Role } from '@core/entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '@core/dtos/role.dto';
import slugify from 'slugify';

@Injectable()
export class RoleFactoryService {
  createNewRole(createRoleDto: CreateRoleDto) {
    const newRole = new Role();
    newRole.name = createRoleDto.name;
    newRole.code = slugify(createRoleDto.name);

    return { ...newRole, permissions: { create: [] } };
  }

  updateRole(updateRoleDto: UpdateRoleDto) {
    const newRole = new Role();
    newRole.name = updateRoleDto.name;

    return { ...newRole, permissions: { create: [], update: [] } };
  }
}
