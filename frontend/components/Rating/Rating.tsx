"use client";

import { Star } from "lucide-react";
import { RatingRoot, Stars } from "@/components/Rating/Rating.styles";
import { Text } from "@/components/Text/Text";

type RatingProps = {
  value: number;
  count?: number;
};

export function Rating({ value, count }: RatingProps) {
  if (!count || count <= 0 || value <= 0) {
    return (
      <RatingRoot aria-label="No reviews yet">
        <Text as="span" variant="small" color="gray500">
          No reviews yet
        </Text>
      </RatingRoot>
    );
  }

  const filled = Math.round(value);

  return (
    <RatingRoot aria-label={`Rated ${value} out of 5`}>
      <Stars>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < filled ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ))}
      </Stars>
      <Text as="span" variant="small" color="gray600">
        {value.toFixed(1)} ({count})
      </Text>
    </RatingRoot>
  );
}
