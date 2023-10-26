import { ProductCategory } from "./ProductCategory";
import { SubCategory } from "./SubCategory";

export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  active: boolean;
  productCategoryId: string;

  category?: ProductCategory;
  subcategories?: SubCategory[];

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
