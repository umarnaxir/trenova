"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ADMIN_SESSION_KEY } from "@/constants/adminAuth";
import type { AdminRole, AdminSession } from "@/types/admin";
import {
  authenticateTeamMember,
  changeTeamPasswordByEmail,
  resetTeamPasswordByEmail,
  updateTeamProfileByEmail,
} from "@/services/mock/adminRepository";

type AdminAuthState = {
  admin: AdminSession | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  updateProfile: (payload: Partial<Pick<AdminSession, "name" | "email">>) => void;
  changePassword: (
    currentPassword: string,
    nextPassword: string,
  ) => { ok: true } | { ok: false; error: string };
  resetPassword: (
    nextPassword: string,
  ) => { ok: true } | { ok: false; error: string };
};

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: false,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      login: (email, password) => {
        const member = authenticateTeamMember(email, password);
        if (!member) {
          return { ok: false, error: "Invalid email or password" };
        }
        if (member.status === "disabled") {
          return { ok: false, error: "This account is disabled" };
        }
        set({
          admin: {
            id: member.id,
            name: member.name,
            email: member.email,
            role: member.role satisfies AdminRole,
          },
          isAuthenticated: true,
        });
        return { ok: true };
      },
      logout: () => set({ admin: null, isAuthenticated: false }),
      updateProfile: (payload) => {
        const current = get().admin;
        if (!current) return;
        const updated = updateTeamProfileByEmail(current.email, payload);
        set({
          admin: {
            ...current,
            name: updated?.name ?? payload.name ?? current.name,
            email: updated?.email ?? payload.email ?? current.email,
          },
        });
      },
      changePassword: (currentPassword, nextPassword) => {
        const current = get().admin;
        if (!current) return { ok: false, error: "Not signed in" };
        return changeTeamPasswordByEmail(
          current.email,
          currentPassword,
          nextPassword,
        );
      },
      resetPassword: (nextPassword) => {
        const current = get().admin;
        if (!current) return { ok: false, error: "Not signed in" };
        return resetTeamPasswordByEmail(current.email, nextPassword);
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
