import { Hero } from "@/sections/home/Hero";
import { TrustBar } from "@/sections/home/TrustBar";
import { ShopByCategory } from "@/sections/home/ShopByCategory";
import { ProductRail } from "@/sections/home/ProductRail";
import { DualPromoBanners } from "@/sections/home/DualPromoBanners";
import { InstagramGallery } from "@/sections/home/InstagramGallery";
import {
  getBestSellers,
  getFeaturedProducts,
} from "@/services/product.service";
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
  const [featured, bestSellers] = await Promise.all([
    getFeaturedProducts(6),
    getBestSellers(6),
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
      <ShopByCategory />
      <TrustBar />
      <ProductRail title="Featured Collection" products={featured} />
      <DualPromoBanners />
      <ProductRail
        title="Best Sellers"
        products={bestSellers}
        showRating
        tone="cream"
      />
      <InstagramGallery />
    </>
  );
}
