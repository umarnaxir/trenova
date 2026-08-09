import { Hero } from "@/sections/home/Hero";
import { TrustBar } from "@/sections/home/TrustBar";
import { ShopByCategory } from "@/sections/home/ShopByCategory";
import { ProductRail } from "@/sections/home/ProductRail";
import { BrandValues } from "@/sections/home/BrandValues";
import { getPrimaryCategories } from "@/services/category.service";
import { getNewArrivals } from "@/services/product.service";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata = buildMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const [categories, newArrivals] = await Promise.all([
    getPrimaryCategories(),
    getNewArrivals(),
  ]);

  return (
    <>
      <Hero />
      <ShopByCategory categories={categories} />
      <TrustBar />
      <ProductRail title="New Arrivals" products={newArrivals} />
      <BrandValues />
    </>
  );
}


