"use client";

import type { Review } from "@/types/review";
import { ReviewRoot } from "@/components/ReviewCard/ReviewCard.styles";
import { Rating } from "@/components/Rating/Rating";
import { Text } from "@/components/Text/Text";
import { formatDate } from "@/utils/format";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <ReviewRoot>
      <Rating value={review.rating} />
      <Text as="h3" variant="h3">
        {review.title}
      </Text>
      <Text color="gray600">{review.body}</Text>
      <Text variant="small" color="gray500">
        {review.author}
        {review.verified ? " · Verified" : ""} · {formatDate(review.createdAt)}
      </Text>
    </ReviewRoot>
  );
}
