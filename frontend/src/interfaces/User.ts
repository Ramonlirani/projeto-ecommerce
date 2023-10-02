export interface User {
  id: string;
  perfilPhotoUrl?: string;
  name: string;
  username: string;
  email: string;
  document?: string;
  phoneNumber?: string;
  totalAlbumsAllowed?: number;
  codeToIndicate: string;
  codeIndicatedBy?: string;
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
