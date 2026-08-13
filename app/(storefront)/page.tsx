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
import { getHomeInstagramShots } from "@/services/instagram.service";
import {
  pageMetadata,
  pageGraph,
  storeJsonLd,
  websiteJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { VisuallyHidden } from "@/components/VisuallyHidden/VisuallyHidden";
import { SEO_PAGES } from "@/constants/seoPages";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata("home");

export default async function HomePage() {
  const [featured, bestSellers, instagramShots] = await Promise.all([
    getFeaturedProducts(6),
    getBestSellers(6),
    getHomeInstagramShots(),
  ]);

  return (
    <>
      <JsonLd
        data={pageGraph("home", [
          websiteJsonLd(),
          storeJsonLd(),
          serviceJsonLd(),
        ])}
      />
      <VisuallyHidden as="h1">{SEO_PAGES.home.h1}</VisuallyHidden>
      <Hero />
      <ShopByCategory />
      <TrustBar />
      {featured.length ? (
        <ProductRail title="Featured Collection" products={featured} showRating />
      ) : null}
      <DualPromoBanners />
      {bestSellers.length ? (
        <ProductRail
          title="Best Sellers"
          products={bestSellers}
          showRating
          tone="cream"
        />
      ) : null}
      <InstagramGallery shots={instagramShots} />
    </>
  );
}
