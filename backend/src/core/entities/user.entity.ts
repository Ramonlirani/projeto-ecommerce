import { MenuItem } from './menu-item.entity';

export class User {
  id?: string;
  perfilPhotoUrl?: string;
  name: string;
  email: string;
  username: string;
  document?: string;
  phoneNumber?: string;
  password: string;
  active: boolean;
  roleCode: string;
  roleId: string;

  menuItems?: MenuItem[];

  verifiedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  lastLogin?: Date;
}
