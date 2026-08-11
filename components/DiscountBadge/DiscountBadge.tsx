"use client";

import { DiscountCircle } from "@/components/DiscountBadge/DiscountBadge.styles";

type DiscountBadgeProps = {
  percent: number;
};

export function DiscountBadge({ percent }: DiscountBadgeProps) {
  if (percent <= 0) return null;

  return (
    <DiscountCircle aria-label={`${percent}% off`}>
      <span>
        <strong>{percent}%</strong>
        <small>Off</small>
      </span>
    </DiscountCircle>
  );
}
