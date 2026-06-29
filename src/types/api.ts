// file: types/api.ts

export interface Color {
  id: number;
  name: string;
  color_code: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface ProductVariant {
  id: number;
  color: Color;
  size: Size;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  category: Category;
  name: string;
  slug: string;
  description: string;
  price: string; // DRF DecimalField is a string by default
  image: string; // This will be a URL
  created_at: string; // ISO date string
  variants: ProductVariant[];
}
