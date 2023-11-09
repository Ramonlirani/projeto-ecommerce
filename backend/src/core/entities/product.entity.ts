import { Subcategory } from './subcategory.entity';

export class Product {
  id: string;
  name: string;
  price: number;
  discount?: number;
  size: string;
  color: string;
  shortDescription: string;
  description: string;
  active: boolean;
  productCategoryId: string;
  imageUrl: string;
  subcategories?: Subcategory[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
