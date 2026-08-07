"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

type RecentlyViewedState = {
  items: Product[];
  add: (product: Product) => void;
  clear: () => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      add: (product) => {
        set((state) => {
          const filtered = state.items.filter((item) => item.id !== product.id);
          return { items: [product, ...filtered].slice(0, 8) };
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "trenova-recently-viewed" },
  ),
);
