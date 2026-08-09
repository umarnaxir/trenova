import type { PaginatedProducts, Product, ProductFilters } from "@/types/product";
import { products } from "@/services/mock/products";

function applyFilters(items: Product[], filters: ProductFilters = {}): Product[] {
  let result = [...items];

  if (filters.category) {
    const category = filters.category;
    if (category === "sale") {
      result = result.filter((item) => item.isOnSale);
    } else if (category === "best-sellers") {
      result = result.filter((item) => item.isBestSeller);
    } else if (category === "new-arrivals") {
      result = result.filter((item) => item.isNewArrival);
    } else {
      result = result.filter(
        (item) =>
          item.categorySlug === category ||
          item.categorySlug.startsWith(`${category}-`) ||
          item.tags.includes(category),
      );
    }
  }

  if (filters.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.includes(q)),
    );
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((item) => item.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((item) => item.price <= filters.maxPrice!);
  }

  if (filters.sizes?.length) {
    result = result.filter((item) =>
      filters.sizes!.some((size) => item.sizes.includes(size)),
    );
  }

  if (filters.colors?.length) {
    result = result.filter((item) =>
      item.colors.some((color) => filters.colors!.includes(color.name)),
    );
  }

  if (filters.tags?.length) {
    result = result.filter((item) =>
      filters.tags!.some((tag) => item.tags.includes(tag)),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      result.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
  }

  return result;
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<PaginatedProducts> {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 12;
  const filtered = applyFilters(products, filters);
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    items,
    total: filtered.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((item) => item.slug === slug) ?? null;
}

export async function getRelatedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  const current = products.find((item) => item.id === productId);
  if (!current) return products.slice(0, limit);
  return products
    .filter((item) => item.id !== productId)
    .filter(
      (item) =>
        item.categorySlug === current.categorySlug ||
        item.tags.some((tag) => current.tags.includes(tag)),
    )
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { items } = await getProducts({ q: query, pageSize: 24 });
  return items;
}

function takeProducts(
  predicate: (item: Product) => boolean,
  limit = 8,
): Product[] {
  const matched = products.filter(predicate);
  if (matched.length >= limit) return matched.slice(0, limit);

  const ids = new Set(matched.map((item) => item.id));
  const fillers = products.filter((item) => !ids.has(item.id));
  return [...matched, ...fillers].slice(0, limit);
}

export async function getBestSellers(limit = 6): Promise<Product[]> {
  return takeProducts((item) => Boolean(item.isBestSeller), limit);
}

export async function getNewArrivals(limit = 6): Promise<Product[]> {
  return takeProducts((item) => Boolean(item.isNewArrival), limit);
}

export async function getTrendingProducts(limit = 6): Promise<Product[]> {
  return takeProducts((item) => Boolean(item.isTrending), limit);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return takeProducts(
    (item) => Boolean(item.isTrending || item.isNewArrival || item.isBestSeller),
    limit,
  );
}
