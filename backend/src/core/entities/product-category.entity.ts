import { Subcategory } from './subcategory.entity';

export class ProductCategory {
  id: string;
  name: string;
  active: boolean;
  subcategories?: Subcategory[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
