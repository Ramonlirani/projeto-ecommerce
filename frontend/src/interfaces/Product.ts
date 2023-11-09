import { ProductCategory } from "./ProductCategory";
import { SubCategory } from "./SubCategory";

export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  size: string;
  color: string;
  shortDescription: string;
  description: string;
  active: boolean;
  productCategoryId: string;
  imageUrl: string;

  category?: ProductCategory;
  subcategories?: SubCategory[];

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
