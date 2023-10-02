import { MenuItem } from './menu-item.entity';

export enum PermissionAction {
  CREATE = 'CREATE',
  'MENU-ITEM' = 'MENU-ITEM',
  VIEW = 'VIEW',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export class Permission {
  id?: string;
  action: PermissionAction;

  menuItemId: string;

  menuItem: MenuItem;
}
