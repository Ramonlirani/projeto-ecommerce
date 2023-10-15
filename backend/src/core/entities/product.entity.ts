import { Subcategory } from './subcategory.entity';

export class Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  active: boolean;
  productCategoryId: string;
  subcategories: Subcategory[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
