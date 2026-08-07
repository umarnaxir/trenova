"use client";

import { useMemo, useState } from "react";
import type { Product, ProductFilters } from "@/types/product";
import { ShopFilters } from "@/features/shop/ShopFilters";
import { Grid } from "@/components/Grid/Grid";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Pagination } from "@/components/Pagination/Pagination";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Text } from "@/components/Text/Text";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 260px 1fr;
  }
`;

type ShopCatalogProps = {
  products: Product[];
  initialFilters?: ProductFilters;
};

function filterClient(products: Product[], filters: ProductFilters) {
  let result = [...products];

  if (filters.sizes?.length) {
    result = result.filter((item) =>
      filters.sizes!.some((size) => item.sizes.includes(size)),
    );
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
  initialFilters = {},
}: ShopCatalogProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    sort: "featured",
    page: 1,
    pageSize: 8,
    ...initialFilters,
  });

  const filtered = useMemo(
    () => filterClient(products, filters),
    [products, filters],
  );

  const pageSize = filters.pageSize ?? 8;
  const page = filters.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Layout>
      <ShopFilters value={filters} onChange={setFilters} />
      <div>
        <Text color="gray600" mb={4}>
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </Text>
        {pageItems.length ? (
          <>
            <Grid
              gridTemplateColumns={["1fr 1fr", null, "repeat(3, 1fr)"]}
              style={{ gap: "1.25rem" }}
            >
              {pageItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(next) => setFilters((current) => ({ ...current, page: next }))}
            />
          </>
        ) : (
          <EmptyState
            title="No products found"
            description="Try adjusting filters or browse the full shop."
            actionLabel="Reset filters"
            onAction={() =>
              setFilters({ sort: "featured", page: 1, pageSize: 8 })
            }
          />
        )}
      </div>
    </Layout>
  );
}
