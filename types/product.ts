export type ProductImageSet = {
  front: string;
  left: string;
  right: string;
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImageSet;
  categoryId: string;
  categorySlug: string;
  tags: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isOnSale?: boolean;
  stock: number;
  sku: string;
  specifications: Record<string, string>;
  createdAt: string;
};

export type ProductFilters = {
  category?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: ProductSize[];
  colors?: string[];
  tags?: string[];
  sort?: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  page?: number;
  pageSize?: number;
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
