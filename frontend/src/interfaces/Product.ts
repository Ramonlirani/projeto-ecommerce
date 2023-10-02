export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  active: boolean;
  productCategoryId: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
