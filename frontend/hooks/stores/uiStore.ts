"use client";

import { create } from "zustand";

export type ToastTone = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  message: string;
  tone: ToastTone;
};

export type AuthModalView = "login" | "register";

type UiState = {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  loginDrawerOpen: boolean;
  authModalView: AuthModalView;
  toasts: ToastItem[];
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setLoginDrawerOpen: (open: boolean) => void;
  setAuthModalView: (view: AuthModalView) => void;
  openAuthModal: (view?: AuthModalView) => void;
  pushToast: (message: string, tone?: ToastTone) => void;
  dismissToast: (id: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  searchOpen: false,
  loginDrawerOpen: false,
  authModalView: "login",
  toasts: [],
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setLoginDrawerOpen: (open) =>
    set(
      open
        ? { loginDrawerOpen: true }
        : { loginDrawerOpen: false, authModalView: "login" },
    ),
  setAuthModalView: (view) => set({ authModalView: view }),
  openAuthModal: (view = "login") =>
    set({ loginDrawerOpen: true, authModalView: view }),
  pushToast: (message, tone = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    set((state) => ({
      toasts: [...state.toasts, { id, message, tone }],
    }));
    window.setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3200);
  },
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
