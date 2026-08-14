import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { CategoryHeroBanner } from "@/features/shop/CategoryHero";
import type { SubcategoryOption } from "@/features/shop/ShopFilters";

const HERO_IMAGES = {
  men: "/images/hero/hero-01.png",
  women: "/images/hero/hero-02.png",
  kids: "/images/hero/hero-03.png",
} as const;

function heroImageForSlug(slug: string) {
  if (slug === "men" || slug.startsWith("men-")) return HERO_IMAGES.men;
  if (slug === "women" || slug.startsWith("women-")) return HERO_IMAGES.women;
  if (slug === "kids" || slug.startsWith("kids-")) return HERO_IMAGES.kids;
  if (slug === "new-arrivals" || slug === "accessories") return HERO_IMAGES.women;
  if (slug === "sale") return HERO_IMAGES.kids;
  return HERO_IMAGES.men;
}

const COPY: Record<
  string,
  { subtitle: string; banner: Omit<CategoryHeroBanner, "href" | "image"> }
> = {
  men: {
    subtitle: "Style wears confidence. Explore the latest trends for men.",
    banner: {
      eyebrow: "Men's Fashion",
      headline: "Premium Style. Everyday.",
    },
  },
  women: {
    subtitle: "Elevated looks for every move. Discover women’s essentials.",
    banner: {
      eyebrow: "Women's Fashion",
      headline: "Soft Power. Everyday.",
    },
  },
  kids: {
    subtitle: "Comfort-first styles made for growing explorers.",
    banner: {
      eyebrow: "Kids' Fashion",
      headline: "Play Ready. Everyday.",
    },
  },
  accessories: {
    subtitle: "Finishing pieces that complete every Trenova look.",
    banner: {
      eyebrow: "Accessories",
      headline: "Details That Matter.",
    },
  },
  sale: {
    subtitle: "Selected pieces at exceptional value. Limited time offers.",
    banner: {
      eyebrow: "Sale",
      headline: "Better Prices. Same Quality.",
    },
  },
  "best-sellers": {
    subtitle: "Most loved by the Trenova community right now.",
    banner: {
      eyebrow: "Best Sellers",
      headline: "Crowd Favorites.",
    },
  },
  "new-arrivals": {
    subtitle: "Fresh drops, just in. Be first to wear what’s next.",
    banner: {
      eyebrow: "New Arrivals",
      headline: "Just Dropped.",
    },
  },
};

export function getCategoryPageCopy(category: Category) {
  const preset = COPY[category.slug];
  const parentSlug = category.parentSlug ?? "";
  return {
    subtitle:
      preset?.subtitle ??
      category.description ??
      `Explore ${category.name} from Trenova.`,
    banner: {
      image: heroImageForSlug(category.slug || parentSlug),
      eyebrow: preset?.banner.eyebrow ?? `${category.name} Fashion`,
      headline: preset?.banner.headline ?? "Premium Style. Everyday.",
      href: `/categories/${category.slug}`,
    } satisfies CategoryHeroBanner,
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
