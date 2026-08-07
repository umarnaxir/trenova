"use client";

import { Star } from "lucide-react";
import { RatingRoot, Stars } from "@/components/Rating/Rating.styles";
import { Text } from "@/components/Text/Text";

type RatingProps = {
  value: number;
  count?: number;
};

export function Rating({ value, count }: RatingProps) {
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
        {value.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </Text>
    </RatingRoot>
  );
}
