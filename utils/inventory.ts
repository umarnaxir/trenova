import type { Product, ProductSize, SizeStock } from "@/types/product";

export function sumSizeStock(sizeStock?: SizeStock | null): number {
  if (!sizeStock) return 0;
  return Object.values(sizeStock).reduce(
    (sum, qty) => sum + (typeof qty === "number" ? qty : 0),
    0,
  );
}

export function getSizeQty(
  product: Pick<Product, "sizeStock" | "stock" | "sizes">,
  size: ProductSize,
): number {
  if (product.sizeStock && size in product.sizeStock) {
    return Math.max(0, Number(product.sizeStock[size] ?? 0));
  }
  // Legacy fallback when sizeStock is missing
  if (!product.sizes.includes(size)) return 0;
  return Math.max(0, Number(product.stock ?? 0));
}

/** Split a total quantity across sizes as evenly as possible. */
export function distributeStock(
  sizes: ProductSize[],
  total: number,
): SizeStock {
  const unique = Array.from(new Set(sizes));
  if (!unique.length) return {};
  const safeTotal = Math.max(0, Math.floor(total));
  const base = Math.floor(safeTotal / unique.length);
  let remainder = safeTotal % unique.length;
  const sizeStock: SizeStock = {};
  for (const size of unique) {
    sizeStock[size] = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder -= 1;
  }
  return sizeStock;
}

export function buildSizeStock(
  sizes: ProductSize[],
  sizeStock?: SizeStock | null,
  fallbackTotal = 0,
): SizeStock {
  const unique = Array.from(new Set(sizes));
  if (!unique.length) return {};

  const hasValues =
    sizeStock &&
    unique.some((size) => typeof sizeStock[size] === "number");

  if (!hasValues) {
    return distributeStock(unique, fallbackTotal);
  }

  const next: SizeStock = {};
  for (const size of unique) {
    next[size] = Math.max(0, Math.floor(Number(sizeStock?.[size] ?? 0)));
  }
  return next;
}

export function normalizeProductInventory(product: Product): Product {
  const sizeStock = buildSizeStock(
    product.sizes,
    product.sizeStock,
    product.stock,
  );
  return {
    ...product,
    sizeStock,
    stock: sumSizeStock(sizeStock),
  };
}

export function stockStatusLabel(
  stock: number,
): "In Stock" | "Low" | "Out" {
  if (stock <= 0) return "Out";
  if (stock <= 20) return "Low";
  return "In Stock";
}
