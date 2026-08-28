"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ADMIN_SESSION_KEY } from "@/constants/adminAuth";
import type { AdminRole, AdminSession } from "@/types/admin";
import { API_URL } from "@/lib/api";

type AdminAuthState = {
  admin: AdminSession | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  needsSetup: boolean;
  setHydrated: (value: boolean) => void;
  checkSetupStatus: () => Promise<void>;
  setupAdmin: (name: string, email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
  updateProfile: (payload: Partial<Pick<AdminSession, "name" | "email">>) => void;
  changePassword: (
    currentPassword: string,
    nextPassword: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  resetPassword: (
    nextPassword: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
};

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      hydrated: false,
      needsSetup: false,
      setHydrated: (value) => set({ hydrated: value }),
      
      checkSetupStatus: async () => {
        try {
          const res = await fetch(`${API_URL}/admin/auth/status`);
          const data = await res.json();
          if (res.ok && data.success) {
            set({ needsSetup: data.data.needsSetup });
          }
        } catch (error) {
          console.error("Failed to check setup status", error);
        }
      },
      
      setupAdmin: async (name, email, password) => {
        try {
          const res = await fetch(`${API_URL}/admin/auth/setup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
          });
          const data = await res.json();
          
          if (res.ok && data.success) {
            set({
              admin: {
                id: data.data.admin.id,
                name: data.data.admin.name,
                email: data.data.admin.email,
                role: data.data.admin.role,
              },
              token: data.data.token,
              isAuthenticated: true,
              needsSetup: false,
            });
            return { ok: true };
          }
          return { ok: false, error: data.message || "Failed to setup admin" };
        } catch (error) {
          return { ok: false, error: 'Network error' };
        }
      },

      login: async (email, password) => {
        try {
          const res = await fetch(`${API_URL}/admin/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json();
          
          if (res.ok && data.success) {
            set({
              admin: {
                id: data.data.admin.id,
                name: data.data.admin.name,
                email: data.data.admin.email,
                role: data.data.admin.role,
              },
              token: data.data.token,
              isAuthenticated: true,
            });
            return { ok: true };
          }
        } catch {
          // Network failure, check local repository fallback
        }

        const { authenticateTeamMember } = await import("@/services/mock/adminRepository");
        const fallbackMember = authenticateTeamMember(email, password);
        if (fallbackMember) {
          set({
            admin: {
              id: fallbackMember.id,
              name: fallbackMember.name,
              email: fallbackMember.email,
              role: fallbackMember.role,
            },
            token: "mock-token-admin",
            isAuthenticated: true,
          });
          return { ok: true };
        }

        return { ok: false, error: "Invalid email or password" };
      },
      logout: () => set({ admin: null, token: null, isAuthenticated: false }),
      updateProfile: (payload) => {
        const current = get().admin;
        if (!current) return;
        set({
          admin: {
            ...current,
            name: payload.name ?? current.name,
            email: payload.email ?? current.email,
          },
        });
      },
      changePassword: async (currentPassword, nextPassword) => {
        try {
          const token = get().token;
          if (!token) return { ok: false, error: 'Not authenticated' };
          
          const res = await fetch(`${API_URL}/admin/auth/change-password`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, newPassword: nextPassword })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            return { ok: true };
          }
          return { ok: false, error: data.message || 'Failed to change password' };
        } catch (error) {
          return { ok: false, error: 'Network error' };
        }
      },
      resetPassword: async (nextPassword) => {
        try {
          const token = get().token;
          if (!token) return { ok: false, error: 'Not authenticated' };
          
          const res = await fetch(`${API_URL}/admin/auth/change-password`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newPassword: nextPassword })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            return { ok: true };
          }
          return { ok: false, error: data.message || 'Failed to change password' };
        } catch (error) {
          return { ok: false, error: 'Network error' };
        }
      },
    }),
    {
      name: ADMIN_SESSION_KEY,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({
        admin: state.admin,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
