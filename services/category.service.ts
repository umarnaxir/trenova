import type { Category } from "@/types/category";
import { categories } from "@/services/mock/categories";

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getPrimaryCategories(): Promise<Category[]> {
  return categories.filter((category) =>
    ["men", "women", "kids", "accessories"].includes(category.slug),
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  for (const category of categories) {
    if (category.slug === slug) return category;
    const child = category.children?.find((item) => item.slug === slug);
    if (child) return child;
  }
  return null;
}

export async function getMegaMenuCategories(): Promise<Category[]> {
  return categories.filter((category) => Boolean(category.children?.length));
}
