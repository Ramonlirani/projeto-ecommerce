export class Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  active: boolean;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
