import { SubCategory } from "./SubCategory";

export interface ProductCategory {
  id: string;
  name: string;

  subCategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
}
