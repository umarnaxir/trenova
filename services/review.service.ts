import type { Review } from "@/types/review";
import { reviews } from "@/services/mock/reviews";

export async function getProductReviews(productId: string): Promise<Review[]> {
  return reviews.filter((review) => review.productId === productId);
}
