export interface ProductMeta {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  meta: ProductMeta;
}
