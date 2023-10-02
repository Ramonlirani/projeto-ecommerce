export interface Permission {
  id: string;
  action: string;
  menuItemId: string;
  roles: Role[];
}

export interface Role {
  id: string;
  name: string;
  code: string;

  menuItems?: {
    id: string;
    name: string;
    permissions: {
      action: string;
      id: string;
      menuItemId: string;

      roles: {
        allowed: boolean;
        permissionId: string;
        roleId: string;
      }[];
    }[];
  }[];
}
