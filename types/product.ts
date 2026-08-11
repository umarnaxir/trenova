export type ProductImageSet = {
  front: string;
  left: string;
  right: string;
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "ONE SIZE" | "FREE SIZE";

/** Per-size available quantity. Keys are only sizes offered on the product. */
export type SizeStock = Partial<Record<ProductSize, number>>;

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
  /** Quantity available for each size (source of truth for inventory). */
  sizeStock?: SizeStock;
  images: ProductImageSet;
  categoryId: string;
  categorySlug: string;
  tags: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isOnSale?: boolean;
  /** Total units across all sizes (derived from sizeStock). */
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
