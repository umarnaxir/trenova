"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminUiState = {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  globalSearchQuery: string;
  toggleSidebarCollapsed: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setGlobalSearchQuery: (query: string) => void;
  clearGlobalSearch: () => void;
};

export const useAdminUiStore = create<AdminUiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      globalSearchQuery: "",
      toggleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      setGlobalSearchQuery: (query) => set({ globalSearchQuery: query }),
      clearGlobalSearch: () => set({ globalSearchQuery: "" }),
    }),
    {
      name: "trenova-admin-ui",
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    },
  ),
);
