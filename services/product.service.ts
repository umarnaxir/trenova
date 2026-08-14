import type { PaginatedProducts, Product, ProductFilters } from "@/types/product";
import { getCatalogProducts } from "@/services/mock/catalogStore";

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
    } else if (category === "featured") {
      result = result.filter((item) => item.isFeatured);
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
      result.sort(
        (a, b) =>
          Number(b.isFeatured) - Number(a.isFeatured) ||
          Number(b.isBestSeller) - Number(a.isBestSeller),
      );
  }

  return result;
}

export async function getProducts(
  filters: ProductFilters = {},
): Promise<PaginatedProducts> {
  const products = getCatalogProducts();
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
  return getCatalogProducts().find((item) => item.slug === slug) ?? null;
}

export async function getRelatedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  const products = getCatalogProducts();
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

export async function getBestSellers(limit = 6): Promise<Product[]> {
  return getCatalogProducts()
    .filter((item) => Boolean(item.isBestSeller))
    .slice(0, limit);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return getCatalogProducts()
    .filter((item) => Boolean(item.isFeatured))
    .slice(0, limit);
}

const ACCESSORY_SLUGS = new Set([
  "accessories",
  "caps",
  "bags",
  "backpacks",
  "sunglasses",
  "water-bottles",
  "socks",
  "wallets",
  "belts",
]);

function isAccessoryProduct(product: Product) {
  return (
    ACCESSORY_SLUGS.has(product.categorySlug) ||
    product.categorySlug.startsWith("accessories")
  );
}

/** Last-stop cart add-ons: accessories first, then trending and bestsellers. */
export async function getCartSuggestions(limit = 8): Promise<Product[]> {
  const products = getCatalogProducts().filter((item) => item.stock > 0);
  const accessories = products.filter(isAccessoryProduct);
  const trending = products.filter(
    (item) =>
      !isAccessoryProduct(item) &&
      (item.isTrending || item.tags.includes("trending")),
  );
  const bestSellers = products.filter(
    (item) =>
      !isAccessoryProduct(item) &&
      item.isBestSeller &&
      !item.isTrending &&
      !item.tags.includes("trending"),
  );

  const mixed: Product[] = [];
  const seen = new Set<string>();
  const push = (item?: Product) => {
    if (!item || seen.has(item.id)) return;
    seen.add(item.id);
    mixed.push(item);
  };

  const rounds = Math.max(
    accessories.length,
    trending.length,
    bestSellers.length,
  );
  for (let i = 0; i < rounds && mixed.length < limit; i += 1) {
    push(accessories[i]);
    if (mixed.length >= limit) break;
    push(trending[i]);
    if (mixed.length >= limit) break;
    push(bestSellers[i]);
  }

  if (mixed.length < limit) {
    for (const item of products) {
      if (mixed.length >= limit) break;
      push(item);
    }
  }

  return mixed.slice(0, limit);
}

