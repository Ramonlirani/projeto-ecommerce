import { SubCategory } from "./SubCategory";

export interface ProductCategory {
  id: string;
  name: string;

  subcategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
}
