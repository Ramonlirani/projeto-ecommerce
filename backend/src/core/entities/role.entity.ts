import { Permission } from './permission.entity';

export class Role {
  id?: string;
  name: string;
  code: string;

  permissions: Permission[];
}
