import type { Review } from "@/types/review";
import { homeReviews, reviews } from "@/services/mock/reviews";

export async function getProductReviews(productId: string): Promise<Review[]> {
  return reviews.filter((review) => review.productId === productId);
}

export async function getHomeReviews(): Promise<Review[]> {
  return homeReviews;
}
