import { Hero } from "@/sections/home/Hero";
import { TrustBar } from "@/sections/home/TrustBar";
import { ShopByCategory } from "@/sections/home/ShopByCategory";
import { ProductRail } from "@/sections/home/ProductRail";
import { BrandValues } from "@/sections/home/BrandValues";
import { getPrimaryCategories } from "@/services/category.service";
import { getNewArrivals } from "@/services/product.service";
import {
  buildMetadata,
  storeJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata = buildMetadata({
  title: SITE.seoTitle,
  description: SITE.description,
  path: "/",
  image: SITE.ogImage,
  keywords: SITE.keywords,
  absoluteTitle: true,
});

export default async function HomePage() {
  const [categories, newArrivals] = await Promise.all([
    getPrimaryCategories(),
    getNewArrivals(),
  ]);

  const structuredData = [websiteJsonLd(), storeJsonLd()];

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <Hero />
      <ShopByCategory categories={categories} />
      <TrustBar />
      <ProductRail title="New Arrivals" products={newArrivals} />
      <BrandValues />
    </>
  );
}
