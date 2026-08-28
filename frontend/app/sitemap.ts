import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getProducts } from "@/services/product.service";
import { getCategories } from "@/services/category.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ items: products }, categories] = await Promise.all([
    getProducts({ pageSize: 100 }),
    getCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "", changeFrequency: "daily", priority: 1 },
      { path: "/shop", changeFrequency: "daily", priority: 0.9 },
      { path: "/categories", changeFrequency: "weekly", priority: 0.8 },
      { path: "/about", changeFrequency: "monthly", priority: 0.7 },
      { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
      { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
      { path: "/size-guide", changeFrequency: "monthly", priority: 0.6 },
      { path: "/track-order", changeFrequency: "monthly", priority: 0.5 },
      { path: "/shipping-policy", changeFrequency: "yearly", priority: 0.4 },
      { path: "/returns-policy", changeFrequency: "yearly", priority: 0.4 },
      { path: "/payment-policy", changeFrequency: "yearly", priority: 0.4 },
      { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
      { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
      { path: "/coming-soon", changeFrequency: "weekly", priority: 0.4 },
    ] as const
  ).map(({ path, changeFrequency, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE.url}/product/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
    images: [`${SITE.url}${product.images.front}`],
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.flatMap(
    (category) => {
      const self: MetadataRoute.Sitemap[number] = {
        url: `${SITE.url}/categories/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      };
      const children =
        category.children?.map((child) => ({
          url: `${SITE.url}/categories/${child.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        })) ?? [];
      return [self, ...children];
    },
  );

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
