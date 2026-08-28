import type { PaginatedProducts, Product, ProductFilters } from "@/types/product";
import { API_URL } from "@/lib/api";
import { getCatalogProducts } from "@/services/mock/catalogStore";

export async function getProducts(
  filters: ProductFilters = {},
): Promise<PaginatedProducts> {
  const query = new URLSearchParams();
  
  if (filters.page) query.append('page', filters.page.toString());
  if (filters.pageSize) query.append('pageSize', filters.pageSize.toString());
  if (filters.category) query.append('category', filters.category);
  if (filters.q) query.append('q', filters.q);
  if (filters.minPrice !== undefined) query.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice !== undefined) query.append('maxPrice', filters.maxPrice.toString());
  if (filters.sizes?.length) query.append('sizes', filters.sizes.join(','));
  if (filters.colors?.length) query.append('colors', filters.colors.join(','));
  if (filters.tags?.length) query.append('tags', filters.tags.join(','));
  if (filters.sort) query.append('sort', filters.sort);

  try {
    const res = await fetch(`${API_URL}/catalog/products?${query.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) return { items: [], total: 0, page: 1, pageSize: 12, totalPages: 1 };
    const json = await res.json();
    return json.data || { items: [], total: 0, page: 1, pageSize: 12, totalPages: 1 };
  } catch {
    return { items: [], total: 0, page: 1, pageSize: 12, totalPages: 1 };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/catalog/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function getRelatedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/catalog/products?sort=featured&pageSize=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.items || [];
  } catch {
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const res = await fetch(
      `${API_URL}/catalog/products?q=${encodeURIComponent(trimmed)}&pageSize=24`,
    );
    if (!res.ok) throw new Error("API request failed");
    const json = await res.json();
    if (json.success && Array.isArray(json.data?.items)) {
      return json.data.items;
    }
    throw new Error("Invalid payload format");
  } catch {
    const products = getCatalogProducts();
    const q = trimmed.toLowerCase();

    const isBestSellerQuery = /\b(best[\s-]*sellers?|bestsellers?)\b/i.test(q);
    const isFeaturedQuery = /\b(featured(\s*products?)?)\b/i.test(q);
    const isNewArrivalQuery = /\b(new[\s-]*arrivals?)\b/i.test(q);
    const isTrendingQuery = /\b(trending)\b/i.test(q);
    const isOnSaleQuery = /\b(sale|on[\s-]*sale)\b/i.test(q);

    return products
      .filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(q);
        const brandMatch = product.brand.toLowerCase().includes(q);
        const descMatch = product.description.toLowerCase().includes(q);
        const catMatch = product.categorySlug.toLowerCase().includes(q);
        const tagMatch = product.tags?.some((t) => t.toLowerCase().includes(q));

        const bestSellerMatch =
          isBestSellerQuery &&
          (product.isBestSeller || product.tags?.includes("best-seller"));
        const featuredMatch =
          isFeaturedQuery &&
          (product.isFeatured || product.tags?.includes("featured"));
        const newArrivalMatch =
          isNewArrivalQuery &&
          (product.isNewArrival || product.tags?.includes("new-arrival"));
        const trendingMatch =
          isTrendingQuery &&
          (product.isTrending || product.tags?.includes("trending"));
        const saleMatch =
          isOnSaleQuery &&
          (product.isOnSale || product.tags?.includes("sale"));

        return (
          nameMatch ||
          brandMatch ||
          descMatch ||
          catMatch ||
          tagMatch ||
          bestSellerMatch ||
          featuredMatch ||
          newArrivalMatch ||
          trendingMatch ||
          saleMatch
        );
      })
      .slice(0, 24);
  }
}

export async function getBestSellers(limit = 6): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/catalog/products?category=best-sellers&pageSize=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.items || [];
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/catalog/products?category=featured&pageSize=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.items || [];
  } catch {
    return [];
  }
}

export async function getCartSuggestions(limit = 8): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/catalog/products?category=best-sellers&pageSize=${limit}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.items || [];
  } catch {
    return [];
  }
}
