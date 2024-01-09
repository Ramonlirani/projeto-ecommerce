export interface User {
  id: string;

  name: string;
  username: string;
  email: string;
  document?: string;
  phoneNumber?: string;
  active: boolean;
  roleCode: string;
  roleId: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;

  role: {
    code: string;
    name: string;
  };
}
