"use client";

import {
  CategoryCheck,
  CategoryItem,
  CategoryList,
  Checkbox,
  CheckLeft,
  Chip,
  ChipRow,
  ClearButton,
  ColorSwatch,
  Count,
  FilterGroup,
  FilterLabel,
  PriceMeta,
  RangeInput,
  RangeTrack,
} from "@/features/shop/ShopCatalog.styles";
import type { Product, ProductFilters, ProductSize } from "@/types/product";
import { formatCurrency } from "@/utils/format";

const sizes: ProductSize[] = ["S", "M", "L", "XL", "XXL"];

export type SubcategoryOption = {
  slug: string;
  name: string;
  count: number;
};

type ShopFiltersProps = {
  products: Product[];
  subcategories?: SubcategoryOption[];
  value: ProductFilters;
  selectedSubcategories: string[];
  priceBounds: { min: number; max: number };
  onChange: (next: ProductFilters) => void;
  onSubcategoriesChange: (slugs: string[]) => void;
  onClear: () => void;
};

function uniqueColors(products: Product[]) {
  const map = new Map<string, string>();
  for (const product of products) {
    for (const color of product.colors) {
      if (!map.has(color.name)) map.set(color.name, color.hex);
    }
  }
  return [...map.entries()].map(([name, hex]) => ({ name, hex }));
}

export function countActiveFilters(
  value: ProductFilters,
  selectedSubcategories: string[],
  priceBounds: { min: number; max: number },
) {
  let count = 0;
  count += selectedSubcategories.length;
  if (value.sizes?.length) count += value.sizes.length;
  if (value.colors?.length) count += value.colors.length;
  if (
    (value.minPrice != null && value.minPrice > priceBounds.min) ||
    (value.maxPrice != null && value.maxPrice < priceBounds.max)
  ) {
    count += 1;
  }
  return count;
}

export function ShopFilters({
  products,
  subcategories = [],
  value,
  selectedSubcategories,
  priceBounds,
  onChange,
  onSubcategoriesChange,
  onClear,
}: ShopFiltersProps) {
  const selectedSizes = value.sizes ?? [];
  const selectedColors = value.colors ?? [];
  const colors = uniqueColors(products);
  const minPrice = value.minPrice ?? priceBounds.min;
  const maxPrice = value.maxPrice ?? priceBounds.max;

  return (
    <>
      {subcategories.length ? (
        <FilterGroup>
          <FilterLabel>Categories</FilterLabel>
          <CategoryList>
            {subcategories.map((item) => {
              const checked = selectedSubcategories.includes(item.slug);
              return (
                <CategoryItem key={item.slug}>
                  <CategoryCheck>
                    <CheckLeft>
                      <Checkbox
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const next = checked
                            ? selectedSubcategories.filter(
                                (slug) => slug !== item.slug,
                              )
                            : [...selectedSubcategories, item.slug];
                          onSubcategoriesChange(next);
                        }}
                      />
                      {item.name}
                    </CheckLeft>
                    <Count>{item.count}</Count>
                  </CategoryCheck>
                </CategoryItem>
              );
            })}
          </CategoryList>
        </FilterGroup>
      ) : null}

      <FilterGroup>
        <FilterLabel>Price Range</FilterLabel>
        <PriceMeta>
          <span>{formatCurrency(minPrice)}</span>
          <span>{formatCurrency(maxPrice)}</span>
        </PriceMeta>
        <RangeTrack>
          <RangeInput
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={50}
            value={minPrice}
            aria-label="Minimum price"
            onChange={(event) => {
              const next = Math.min(Number(event.target.value), maxPrice - 50);
              onChange({ ...value, minPrice: next, page: 1 });
            }}
          />
          <RangeInput
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={50}
            value={maxPrice}
            aria-label="Maximum price"
            onChange={(event) => {
              const next = Math.max(Number(event.target.value), minPrice + 50);
              onChange({ ...value, maxPrice: next, page: 1 });
            }}
          />
        </RangeTrack>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Size</FilterLabel>
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

      <FilterGroup>
        <FilterLabel>Color</FilterLabel>
        <ChipRow>
          {colors.map((color) => {
            const active = selectedColors.includes(color.name);
            return (
              <ColorSwatch
                key={color.name}
                type="button"
                $hex={color.hex}
                $active={active}
                title={color.name}
                aria-label={color.name}
                aria-pressed={active}
                onClick={() => {
                  const nextColors = active
                    ? selectedColors.filter((item) => item !== color.name)
                    : [...selectedColors, color.name];
                  onChange({ ...value, colors: nextColors, page: 1 });
                }}
              />
            );
          })}
        </ChipRow>
      </FilterGroup>

      <ClearButton type="button" onClick={onClear}>
        Clear filters
      </ClearButton>
    </>
  );
}
