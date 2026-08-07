"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Coupon } from "@/types/cart";
import type { Product, ProductSize } from "@/types/product";

type AddPayload = {
  product: Product;
  size: ProductSize;
  color: string;
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  coupon: Coupon | null;
  addItem: (payload: AddPayload) => void;
  removeItem: (productId: string, size: ProductSize, color: string) => void;
  updateQuantity: (
    productId: string,
    size: ProductSize,
    color: string,
    quantity: number,
  ) => void;
  setCoupon: (coupon: Coupon | null) => void;
  clearCart: () => void;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
  itemCount: () => number;
};

function sameLine(a: CartItem, productId: string, size: ProductSize, color: string) {
  return a.productId === productId && a.size === size && a.color === color;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      addItem: ({ product, size, color, quantity = 1 }) => {
        set((state) => {
          const existing = state.items.find((item) =>
            sameLine(item, product.id, size, color),
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                sameLine(item, product.id, size, color)
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.maxStock,
                        item.quantity + quantity,
                      ),
                    }
                  : item,
              ),
            };
          }

          const next: CartItem = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            brand: product.brand,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            image: product.images.front,
            color,
            size,
            quantity,
            maxStock: product.stock,
          };

          return { items: [...state.items, next] };
        });
      },
      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !sameLine(item, productId, size, color),
          ),
        }));
      },
      updateQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              sameLine(item, productId, size, color)
                ? {
                    ...item,
                    quantity: Math.min(item.maxStock, Math.max(1, quantity)),
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },
      setCoupon: (coupon) => set({ coupon }),
      clearCart: () => set({ items: [], coupon: null }),
      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      discount: () => {
        const { coupon } = get();
        const subtotal = get().subtotal();
        if (!coupon) return 0;
        if (coupon.type === "percent") {
          return Math.round((subtotal * coupon.value) / 100);
        }
        return Math.min(subtotal, coupon.value);
      },
      total: () => Math.max(0, get().subtotal() - get().discount()),
      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "trenova-cart" },
  ),
);
