import { FeaturedCollections } from "@/sections/home/FeaturedCollections";
import { ShopByCategory } from "@/sections/home/ShopByCategory";
import { ProductRail } from "@/sections/home/ProductRail";
import { PromoBanner } from "@/sections/home/PromoBanner";
import { CustomerReviews } from "@/sections/home/CustomerReviews";
import { InstagramGallery } from "@/sections/home/InstagramGallery";
import { getPrimaryCategories } from "@/services/category.service";
import {
  getBestSellers,
  getFeaturedProducts,
  getNewArrivals,
  getTrendingProducts,
} from "@/services/product.service";
import { getHomeReviews } from "@/services/review.service";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata = buildMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const [
    categories,
    bestSellers,
    newArrivals,
    trending,
    featured,
    reviews,
  ] = await Promise.all([
    getPrimaryCategories(),
    getBestSellers(),
    getNewArrivals(),
    getTrendingProducts(),
    getFeaturedProducts(),
    getHomeReviews(),
  ]);

  return (
    <>
      <FeaturedCollections />
      <ProductRail
        eyebrow="Best Sellers"
        title="Shop bestsellers"
        description="Click any piece to view details, choose size, and buy."
        products={bestSellers}
        href="/categories/best-sellers"
      />
      <ShopByCategory categories={categories} />
      <ProductRail
        eyebrow="New Arrivals"
        title="Just dropped"
        description="Fresh clothing edits ready to wear."
        products={newArrivals}
        href="/categories/new-arrivals"
        tone="cream"
      />
      <PromoBanner />
      <ProductRail
        eyebrow="Trending"
        title="In demand now"
        products={trending}
        href="/shop"
      />
      <ProductRail
        eyebrow="Featured Collection"
        title="Complete the look"
        description="Curated clothing you can shop instantly."
        products={featured}
        tone="cream"
      />
      <CustomerReviews reviews={reviews} />
      <InstagramGallery />
    </>
  );
}
