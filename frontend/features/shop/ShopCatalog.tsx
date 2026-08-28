"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product, ProductFilters } from "@/types/product";
import {
  ShopFilters,
  countActiveFilters,
  type SubcategoryOption,
} from "@/features/shop/ShopFilters";
import { CategoryHero, type CategoryHeroBanner } from "@/features/shop/CategoryHero";
import {
  ApplyFiltersButton,
  CatalogLayout,
  CatalogRoot,
  FilterBadge,
  IconButton,
  MainColumn,
  MobileFilterBody,
  MobileFilterHeader,
  MobileFilterSheet,
  ProductGrid,
  ResultCount,
  Sidebar,
  SortSelect,
  SortWrap,
  Toolbar,
  ToolbarButton,
  ToolbarRight,
} from "@/features/shop/ShopCatalog.styles";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Pagination } from "@/components/Pagination/Pagination";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Text } from "@/components/Text/Text";

type ShopCatalogProps = {
  products: Product[];
  title: string;
  subtitle: string;
  banner: CategoryHeroBanner;
  subcategories?: SubcategoryOption[];
  initialFilters?: ProductFilters;
};

function filterClient(
  products: Product[],
  filters: ProductFilters,
  selectedSubcategories: string[],
) {
  let result = [...products];

  if (selectedSubcategories.length) {
    result = result.filter((item) =>
      selectedSubcategories.some(
        (slug) =>
          item.categorySlug === slug ||
          item.categorySlug.startsWith(`${slug}-`),
      ),
    );
  }

  if (filters.sizes?.length) {
    result = result.filter((item) =>
      filters.sizes!.some((size) => item.sizes.includes(size)),
    );
  }

  if (filters.colors?.length) {
    result = result.filter((item) =>
      item.colors.some((color) => filters.colors!.includes(color.name)),
    );
  }

  if (filters.minPrice != null) {
    result = result.filter((item) => item.price >= filters.minPrice!);
  }

  if (filters.maxPrice != null) {
    result = result.filter((item) => item.price <= filters.maxPrice!);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}

export function ShopCatalog({
  products,
  title,
  subtitle,
  banner,
  subcategories = [],
  initialFilters = {},
}: ShopCatalogProps) {
  const priceBounds = useMemo(() => {
    if (!products.length) return { min: 0, max: 5000 };
    const prices = products.map((item) => item.price);
    return {
      min: Math.floor(Math.min(...prices) / 50) * 50,
      max: Math.ceil(Math.max(...prices) / 50) * 50,
    };
  }, [products]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    [],
  );
  const [filters, setFilters] = useState<ProductFilters>({
    sort: "featured",
    page: 1,
    pageSize: 12,
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    ...initialFilters,
  });

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const filtered = useMemo(
    () => filterClient(products, filters, selectedSubcategories),
    [products, filters, selectedSubcategories],
  );

  const pageSize = filters.pageSize ?? 12;
  const page = filters.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const activeFilterCount = countActiveFilters(
    filters,
    selectedSubcategories,
    priceBounds,
  );

  const clearFilters = () => {
    setSelectedSubcategories([]);
    setFilters((current) => ({
      category: current.category,
      sort: "featured",
      page: 1,
      pageSize: current.pageSize ?? 12,
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
    }));
  };

  const filterPanel = (
    <ShopFilters
      products={products}
      subcategories={subcategories}
      value={filters}
      selectedSubcategories={selectedSubcategories}
      priceBounds={priceBounds}
      onChange={setFilters}
      onSubcategoriesChange={(slugs) => {
        setSelectedSubcategories(slugs);
        setFilters((current) => ({ ...current, page: 1 }));
      }}
      onClear={clearFilters}
    />
  );

  return (
    <CatalogRoot>
      <CategoryHero title={title} subtitle={subtitle} banner={banner} />

      <CatalogLayout>
        <Sidebar>{filterPanel}</Sidebar>

        <MainColumn>
          <Toolbar>
            <ResultCount>
              Showing {pageItems.length} of {filtered.length} products
            </ResultCount>
            <ToolbarRight>
              <SortWrap>
                Sort by:
                <SortSelect
                  aria-label="Sort products"
                  value={filters.sort ?? "featured"}
                  onChange={(event) =>
                    setFilters((current) => ({
                      ...current,
                      sort: event.target.value as ProductFilters["sort"],
                      page: 1,
                    }))
                  }
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </SortSelect>
              </SortWrap>
              <ToolbarButton
                type="button"
                $active={mobileOpen || activeFilterCount > 0}
                onClick={() => setMobileOpen(true)}
              >
                <SlidersHorizontal size={14} aria-hidden />
                Filter
                {activeFilterCount > 0 ? (
                  <FilterBadge>{activeFilterCount}</FilterBadge>
                ) : null}
              </ToolbarButton>
            </ToolbarRight>
          </Toolbar>

          {pageItems.length ? (
            <>
              <ProductGrid>
                {pageItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={(next) =>
                  setFilters((current) => ({ ...current, page: next }))
                }
              />
            </>
          ) : (
            <EmptyState
              title="No products found"
              description="Try adjusting filters or browse another collection."
              actionLabel="Reset filters"
              onAction={clearFilters}
            />
          )}
        </MainColumn>
      </CatalogLayout>

      <MobileFilterSheet $open={mobileOpen} aria-hidden={!mobileOpen}>
        <MobileFilterHeader>
          <Text as="h2" variant="h3" mb={0}>
            Filters
          </Text>
          <IconButton type="button" onClick={() => setMobileOpen(false)}>
            <X size={16} aria-hidden />
            Close
          </IconButton>
        </MobileFilterHeader>
        <MobileFilterBody>
          {filterPanel}
          <ApplyFiltersButton
            type="button"
            onClick={() => setMobileOpen(false)}
          >
            Show {filtered.length} products
          </ApplyFiltersButton>
        </MobileFilterBody>
      </MobileFilterSheet>
    </CatalogRoot>
  );
}
