import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { ShopCatalogBanner } from "@/features/shop/ShopCatalog";
import type { SubcategoryOption } from "@/features/shop/ShopFilters";
import { CATEGORY_IMAGES } from "@/constants/categoryImages";

const COPY: Record<
  string,
  { subtitle: string; banner: Omit<ShopCatalogBanner, "href"> }
> = {
  men: {
    subtitle: "Style wears confidence. Explore the latest trends for men.",
    banner: {
      image: CATEGORY_IMAGES.men,
      eyebrow: "Men's Fashion",
      headline: "Premium Style. Everyday.",
    },
  },
  women: {
    subtitle: "Elevated looks for every move. Discover women’s essentials.",
    banner: {
      image: CATEGORY_IMAGES.women,
      eyebrow: "Women's Fashion",
      headline: "Soft Power. Everyday.",
    },
  },
  kids: {
    subtitle: "Comfort-first styles made for growing explorers.",
    banner: {
      image: CATEGORY_IMAGES.kids,
      eyebrow: "Kids' Fashion",
      headline: "Play Ready. Everyday.",
    },
  },
  accessories: {
    subtitle: "Finishing pieces that complete every Trenova look.",
    banner: {
      image: CATEGORY_IMAGES.accessories,
      eyebrow: "Accessories",
      headline: "Details That Matter.",
    },
  },
  sale: {
    subtitle: "Selected pieces at exceptional value. Limited time offers.",
    banner: {
      image: CATEGORY_IMAGES.sale,
      eyebrow: "Sale",
      headline: "Better Prices. Same Quality.",
    },
  },
  "best-sellers": {
    subtitle: "Most loved by the Trenova community right now.",
    banner: {
      image: CATEGORY_IMAGES["best-sellers"],
      eyebrow: "Best Sellers",
      headline: "Crowd Favorites.",
    },
  },
  "new-arrivals": {
    subtitle: "Fresh drops, just in. Be first to wear what’s next.",
    banner: {
      image: CATEGORY_IMAGES["new-arrivals"],
      eyebrow: "New Arrivals",
      headline: "Just Dropped.",
    },
  },
};

export function getCategoryPageCopy(category: Category) {
  const preset = COPY[category.slug];
  return {
    subtitle:
      preset?.subtitle ??
      category.description ??
      `Explore ${category.name} from Trenova.`,
    banner: {
      image: preset?.banner.image ?? category.image,
      eyebrow: preset?.banner.eyebrow ?? `${category.name} Fashion`,
      headline: preset?.banner.headline ?? "Premium Style. Everyday.",
      href: `/categories/${category.slug}`,
    } satisfies ShopCatalogBanner,
  };
}

export function buildSubcategoryOptions(
  category: Category,
  products: Product[],
): SubcategoryOption[] {
  const children = category.children ?? [];
  if (!children.length) return [];

  return children.map((child) => ({
    slug: child.slug,
    name: child.name,
    count: products.filter(
      (item) =>
        item.categorySlug === child.slug ||
        item.categorySlug.startsWith(`${child.slug}-`),
    ).length,
  }));
}
