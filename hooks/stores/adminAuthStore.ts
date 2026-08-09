"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ADMIN_SESSION_KEY,
  TEMP_ADMIN_CREDENTIALS,
} from "@/constants/adminAuth";
import type { AdminRole, AdminSession } from "@/types/admin";

type AdminAuthState = {
  admin: AdminSession | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  updateProfile: (payload: Partial<Pick<AdminSession, "name" | "email">>) => void;
};

const defaultSession = (email: string): AdminSession => ({
  id: "admin-session-1",
  name: "Umar Pathan",
  email,
  role: "Admin" satisfies AdminRole,
});

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: false,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      login: (email, password) => {
        const normalized = email.trim().toLowerCase();
        if (
          normalized !== TEMP_ADMIN_CREDENTIALS.email ||
          password !== TEMP_ADMIN_CREDENTIALS.password
        ) {
          return { ok: false, error: "Invalid email or password" };
        }
        set({
          admin: defaultSession(TEMP_ADMIN_CREDENTIALS.email),
          isAuthenticated: true,
        });
        return { ok: true };
      },
      logout: () => set({ admin: null, isAuthenticated: false }),
      updateProfile: (payload) => {
        const current = get().admin;
        if (!current) return;
        set({ admin: { ...current, ...payload } });
      },
    }),
    {
      name: ADMIN_SESSION_KEY,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
