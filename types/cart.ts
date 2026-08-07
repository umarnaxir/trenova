import type { ProductSize } from "@/types/product";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  color: string;
  size: ProductSize;
  quantity: number;
  maxStock: number;
};

export type Coupon = {
  code: string;
  description: string;
  type: "percent" | "fixed";
  value: number;
  minOrder?: number;
};
