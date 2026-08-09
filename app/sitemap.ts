import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getProducts } from "@/services/product.service";
import { getCategories } from "@/services/category.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ items: products }, categories] = await Promise.all([
    getProducts({ pageSize: 100 }),
    getCategories(),
  ]);

  const staticRoutes = [
    "",
    "/shop",
    "/categories",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/shipping-policy",
    "/returns-policy",
    "/payment-policy",
    "/size-guide",
    "/track-order",
    "/terms",
    "/coming-soon",
  ].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE.url}/product/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.flatMap((category) => {
    const self = {
      url: `${SITE.url}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
    const children =
      category.children?.map((child) => ({
        url: `${SITE.url}/categories/${child.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })) ?? [];
    return [self, ...children];
  });

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
