"use client";

import {
  Chip,
  ChipRow,
  FilterGroup,
  FiltersRoot,
} from "@/features/shop/ShopFilters.styles";
import { Text } from "@/components/Text/Text";
import { Select } from "@/components/Select/Select";
import type { ProductFilters, ProductSize } from "@/types/product";

const sizes: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

type ShopFiltersProps = {
  value: ProductFilters;
  onChange: (next: ProductFilters) => void;
};

export function ShopFilters({ value, onChange }: ShopFiltersProps) {
  const selectedSizes = value.sizes ?? [];

  return (
    <FiltersRoot>
      <Text as="h2" variant="h3">
        Filters
      </Text>

      <FilterGroup>
        <Text as="h3" variant="eyebrow">
          Sort
        </Text>
        <Select
          name="sort"
          value={value.sort ?? "featured"}
          onChange={(event) =>
            onChange({
              ...value,
              sort: event.target.value as ProductFilters["sort"],
              page: 1,
            })
          }
          options={[
            { label: "Featured", value: "featured" },
            { label: "Newest", value: "newest" },
            { label: "Price: Low to High", value: "price-asc" },
            { label: "Price: High to Low", value: "price-desc" },
            { label: "Top Rated", value: "rating" },
          ]}
        />
      </FilterGroup>

      <FilterGroup>
        <Text as="h3" variant="eyebrow">
          Size
        </Text>
        <ChipRow>
          {sizes.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <Chip
                key={size}
                type="button"
                $active={active}
                onClick={() => {
                  const nextSizes = active
                    ? selectedSizes.filter((item) => item !== size)
                    : [...selectedSizes, size];
                  onChange({ ...value, sizes: nextSizes, page: 1 });
                }}
              >
                {size}
              </Chip>
            );
          })}
        </ChipRow>
      </FilterGroup>
    </FiltersRoot>
  );
}
