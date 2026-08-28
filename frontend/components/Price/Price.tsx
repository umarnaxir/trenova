"use client";

import { Compare, Current, PriceRoot } from "@/components/Price/Price.styles";
import { formatCurrency } from "@/utils/format";

type PriceProps = {
  price: number;
  compareAtPrice?: number;
};

export function Price({ price, compareAtPrice }: PriceProps) {
  return (
    <PriceRoot>
      <Current>{formatCurrency(price)}</Current>
      {compareAtPrice && compareAtPrice > price ? (
        <Compare>{formatCurrency(compareAtPrice)}</Compare>
      ) : null}
    </PriceRoot>
  );
}
