import type { Product, ProductColor, ProductSize, SizeStock } from "@/types/product";
import type { AdminProductInput } from "@/services/admin.service";

const PRODUCT_SIZES: ProductSize[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "ONE SIZE",
  "FREE SIZE",
];

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function productToExportRecord(product: Product) {
  return {
    name: product.name,
    sku: product.sku,
    brand: product.brand,
    price: product.price,
    compareAtPrice: product.compareAtPrice ?? null,
    stock: product.stock,
    sizeStock: product.sizeStock ?? {},
    categorySlug: product.categorySlug,
    shortDescription: product.shortDescription,
    description: product.description,
    rating: product.rating,
    reviewCount: product.reviewCount,
    colors: product.colors,
    sizes: product.sizes,
    images: product.images,
    isFeatured: Boolean(product.isFeatured),
    isBestSeller: Boolean(product.isBestSeller),
    isNewArrival: Boolean(product.isNewArrival),
    isTrending: Boolean(product.isTrending),
    isOnSale: Boolean(product.isOnSale),
  };
}

export function exportProductsJson(products: Product[], filename?: string) {
  const payload = products.map(productToExportRecord);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  downloadBlob(
    filename ?? `trenova-products-${new Date().toISOString().slice(0, 10)}.json`,
    blob,
  );
}

function csvEscape(value: string | number | boolean | null | undefined) {
  const text = value == null ? "" : String(value);
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function exportProductsCsv(products: Product[], filename?: string) {
  const headers = [
    "name",
    "sku",
    "brand",
    "price",
    "compareAtPrice",
    "stock",
    "categorySlug",
    "shortDescription",
    "description",
    "sizes",
    "sizeStock",
    "colors",
    "imageFront",
    "imageLeft",
    "imageRight",
    "isFeatured",
    "isBestSeller",
    "isNewArrival",
    "isTrending",
    "isOnSale",
  ];

  const lines = [
    headers.join(","),
    ...products.map((product) =>
      [
        product.name,
        product.sku,
        product.brand,
        product.price,
        product.compareAtPrice ?? "",
        product.stock,
        product.categorySlug,
        product.shortDescription,
        product.description,
        product.sizes.join("|"),
        product.sizes
          .map((size) => `${size}:${product.sizeStock?.[size] ?? 0}`)
          .join("|"),
        product.colors.map((color) => `${color.name}:${color.hex}`).join("|"),
        product.images.front,
        product.images.left,
        product.images.right,
        product.isFeatured ? "true" : "false",
        product.isBestSeller ? "true" : "false",
        product.isNewArrival ? "true" : "false",
        product.isTrending ? "true" : "false",
        product.isOnSale ? "true" : "false",
      ]
        .map(csvEscape)
        .join(","),
    ),
  ];

  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  downloadBlob(
    filename ?? `trenova-products-${new Date().toISOString().slice(0, 10)}.csv`,
    blob,
  );
}

function parseBool(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  if (typeof value !== "string") return false;
  return ["1", "true", "yes", "y"].includes(value.trim().toLowerCase());
}

function parseSizes(value: unknown): ProductSize[] {
  if (Array.isArray(value)) {
    return value.filter((size): size is ProductSize =>
      PRODUCT_SIZES.includes(size as ProductSize),
    );
  }
  if (typeof value !== "string" || !value.trim()) {
    return ["S", "M", "L", "XL"];
  }
  return value
    .split(/[|,]/)
    .map((part) => part.trim().toUpperCase())
    .map((part) => (part === "ONE SIZE" || part === "ONESIZE" ? "ONE SIZE" : part))
    .map((part) =>
      part === "FREE SIZE" || part === "FREESIZE" ? "FREE SIZE" : part,
    )
    .filter((size): size is ProductSize =>
      PRODUCT_SIZES.includes(size as ProductSize),
    );
}

function parseSizeStock(value: unknown, sizes: ProductSize[]): SizeStock | undefined {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as SizeStock;
  }
  if (typeof value !== "string" || !value.trim()) return undefined;
  const next: SizeStock = {};
  value.split("|").forEach((part) => {
    const [rawSize, rawQty] = part.split(":");
    const size = rawSize?.trim() as ProductSize;
    if (!sizes.includes(size)) return;
    next[size] = Math.max(0, Number(rawQty) || 0);
  });
  return Object.keys(next).length ? next : undefined;
}

function parseColors(value: unknown): ProductColor[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const color = item as { name?: string; hex?: string };
        if (!color.name || !color.hex) return null;
        return { name: color.name, hex: color.hex };
      })
      .filter((item): item is ProductColor => Boolean(item));
  }
  if (typeof value !== "string" || !value.trim()) {
    return [{ name: "Black", hex: "#0A0A0A" }];
  }
  const colors = value
    .split("|")
    .map((part) => {
      const [name, hex] = part.split(":");
      if (!name?.trim()) return null;
      return {
        name: name.trim(),
        hex: (hex?.trim() || "#0A0A0A").startsWith("#")
          ? hex.trim()
          : `#${hex.trim()}`,
      };
    })
    .filter((item): item is ProductColor => Boolean(item));
  return colors.length ? colors : [{ name: "Black", hex: "#0A0A0A" }];
}

function toAdminInput(raw: Record<string, unknown>): AdminProductInput | null {
  const name = String(raw.name ?? "").trim();
  if (!name) return null;

  const sizes = parseSizes(raw.sizes);
  const images =
    raw.images && typeof raw.images === "object"
      ? (raw.images as Product["images"])
      : {
          front: String(raw.imageFront ?? raw.front ?? "/products/tee-front.jpg"),
          left: String(raw.imageLeft ?? raw.left ?? "/products/tee-left.jpg"),
          right: String(raw.imageRight ?? raw.right ?? "/products/tee-right.jpg"),
        };

  return {
    name,
    sku: String(raw.sku ?? "").trim() || `TRN-IMP-${Date.now()}`,
    brand: String(raw.brand ?? "Trenova"),
    price: Number(raw.price) || 0,
    compareAtPrice: raw.compareAtPrice
      ? Number(raw.compareAtPrice) || undefined
      : undefined,
    stock: Number(raw.stock ?? 0) || 0,
    sizeStock: parseSizeStock(raw.sizeStock, sizes),
    categorySlug: String(raw.categorySlug ?? "men").trim() || "men",
    shortDescription: String(
      raw.shortDescription ?? raw.description ?? name,
    ).trim(),
    description: String(raw.description ?? raw.shortDescription ?? name).trim(),
    rating: Number(raw.rating ?? 0) || 0,
    reviewCount: Number(raw.reviewCount ?? 0) || 0,
    colors: parseColors(raw.colors),
    sizes,
    images: {
      front: images.front || "/products/tee-front.jpg",
      left: images.left || "/products/tee-left.jpg",
      right: images.right || "/products/tee-right.jpg",
    },
    isFeatured: parseBool(raw.isFeatured),
    isBestSeller: parseBool(raw.isBestSeller),
    isNewArrival: parseBool(raw.isNewArrival),
    isTrending: parseBool(raw.isTrending),
    isOnSale: parseBool(raw.isOnSale),
  };
}

function parseCsv(text: string): Record<string, unknown>[] {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      current = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      continue;
    }
    current += char;
  }
  row.push(current);
  if (row.some((cell) => cell.trim())) rows.push(row);

  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((cells) => {
    const record: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      record[header] = cells[index] ?? "";
    });
    return record;
  });
}

export function parseProductImportFile(
  text: string,
  filename: string,
): AdminProductInput[] {
  const lower = filename.toLowerCase();
  let records: Record<string, unknown>[] = [];

  if (lower.endsWith(".json")) {
    const parsed = JSON.parse(text) as unknown;
    if (Array.isArray(parsed)) {
      records = parsed as Record<string, unknown>[];
    } else if (parsed && typeof parsed === "object" && Array.isArray((parsed as { products?: unknown }).products)) {
      records = (parsed as { products: Record<string, unknown>[] }).products;
    } else {
      throw new Error("JSON must be an array of products");
    }
  } else if (lower.endsWith(".csv")) {
    records = parseCsv(text);
  } else {
    throw new Error("Supported formats: .json or .csv");
  }

  const inputs = records
    .map((record) => toAdminInput(record))
    .filter((item): item is AdminProductInput => Boolean(item));

  if (!inputs.length) {
    throw new Error("No valid products found in the file");
  }

  return inputs;
}
