export class File {
  id?: string;
  name: string;
  path: string;
  size: number;
  extension: string;
  fileableType: string;
  fileableId: string;
  active: boolean;
  createdAt?: Date;
}
