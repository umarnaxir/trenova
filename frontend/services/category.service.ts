import type { Category } from "@/types/category";
import { API_URL } from "@/lib/api";

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/catalog/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_URL}/catalog/categories/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function getMegaMenuCategories(): Promise<Category[]> {
  const categories = await getCategories();
  return categories.filter((category) => Boolean(category.children?.length));
}
