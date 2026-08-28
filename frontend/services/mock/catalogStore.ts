import type { Product } from "@/types/product";
import { products as seedProducts } from "@/services/mock/products";
import { normalizeProductInventory } from "@/utils/inventory";

export type InstagramShot = {
  id: string;
  src: string;
  alt: string;
};

const seedInstagram: InstagramShot[] = [
  { id: "ig-1", src: "/products/instagram-1.jpg", alt: "Trenova look 1" },
  { id: "ig-2", src: "/products/instagram-2.jpg", alt: "Trenova look 2" },
  { id: "ig-3", src: "/products/instagram-3.jpg", alt: "Trenova look 3" },
  { id: "ig-4", src: "/products/instagram-4.jpg", alt: "Trenova look 4" },
  { id: "ig-5", src: "/products/instagram-5.jpg", alt: "Trenova look 5" },
  { id: "ig-6", src: "/products/instagram-6.jpg", alt: "Trenova look 6" },
  { id: "ig-7", src: "/products/collection-layers.jpg", alt: "Trenova look 7" },
  { id: "ig-8", src: "/products/collection-women.jpg", alt: "Trenova look 8" },
  { id: "ig-9", src: "/products/collection-essentials.jpg", alt: "Trenova look 9" },
];

function clone<T>(value: T): T {
  return structuredClone(value);
}

/** Shared mutable catalog — admin + storefront read/write the same data. */
let catalog: Product[] = clone(seedProducts).map((product, index) =>
  normalizeProductInventory({
    ...product,
    sizeStock: product.sizeStock ?? {},
    isFeatured: index < 6,
    isOnSale: Boolean(
      product.compareAtPrice && product.compareAtPrice > product.price,
    ),
  }),
);

let instagramShots: InstagramShot[] = clone(seedInstagram);

export function getCatalogProducts(): Product[] {
  return catalog;
}

export function setCatalogProducts(next: Product[]) {
  catalog = next.map((product) => normalizeProductInventory(product));
}

export function getInstagramShots(): InstagramShot[] {
  return instagramShots;
}

export function setInstagramShots(next: InstagramShot[]) {
  instagramShots = next;
}
