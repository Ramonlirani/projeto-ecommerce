import { Injectable } from '@nestjs/common';
import { Ability } from '@casl/ability';
import { get } from 'lodash';

import { User } from '@core/entities/user.entity';
import { PermissionAction } from '@core/entities/permission.entity';
import { UserUseCases } from '@use-cases/user/user.use-case';

export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private userUseCase: UserUseCases) {}
  async createForUser(user: User) {
    const dbPermissions = await this.userUseCase.findAllPermissionsOfUser(user);

    const permissions = dbPermissions.map((p) => ({
      action: get(p, 'permission.action'),
      subject: get(p, 'permission.menuItem.modelName'),
    }));

    const caslPermissions = permissions.filter(
      (permission) => permission.subject,
    );

    return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
  }
}
