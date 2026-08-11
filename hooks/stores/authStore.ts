"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";
import {
  deactivateRegisteredUser,
  getRegisteredUsers,
  reactivateRegisteredUser,
  scheduleAccountDeletion,
  upsertRegisteredUser,
  verifyUserPassword,
} from "@/services/mock/usersStore";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => boolean;
  logout: () => void;
  updateProfile: (payload: Partial<User>) => void;
  verifyPassword: (password: string) => boolean;
  changePassword: (currentPassword: string, nextPassword: string) => boolean;
  deactivateAccount: (password: string) => boolean;
  deleteAccount: (password: string) => boolean;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        const normalized = email.trim().toLowerCase();
        const existing = getRegisteredUsers().find(
          (user) => user.email.trim().toLowerCase() === normalized,
        );

        if (existing?.pendingDeletionAt) {
          return false;
        }

        if (existing?.status === "inactive") {
          if (!verifyUserPassword(existing.id, password)) return false;
          try {
            const reactivated = reactivateRegisteredUser(existing.id);
            set({ user: reactivated, isAuthenticated: true });
            return true;
          } catch {
            return false;
          }
        }

        if (existing) {
          if (existing.password && existing.password !== password) {
            return false;
          }
          const registered = upsertRegisteredUser({
            email: existing.email,
            firstName: existing.firstName,
            lastName: existing.lastName,
            phone: existing.phone,
            addresses: existing.addresses,
            id: existing.id,
            status: existing.status,
            password: existing.password ?? password,
          });
          set({ user: registered, isAuthenticated: true });
          return true;
        }

        const registered = upsertRegisteredUser({
          email: normalized,
          firstName: "Guest",
          lastName: "User",
          addresses: [],
          status: "active",
          password,
        });
        set({ user: registered, isAuthenticated: true });
        return true;
      },
      register: ({ firstName, lastName, email, phone, password }) => {
        const registered = upsertRegisteredUser({
          firstName,
          lastName,
          email,
          phone,
          password,
          addresses: [],
          status: "active",
        });
        set({ user: registered, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (payload) => {
        const current = get().user;
        if (!current) return;
        const registered = upsertRegisteredUser({ ...current, ...payload });
        set({ user: registered });
      },
      verifyPassword: (password) => {
        const current = get().user;
        if (!current) return false;
        return verifyUserPassword(current.id, password);
      },
      changePassword: (currentPassword, nextPassword) => {
        const current = get().user;
        if (!current) return false;
        if (!verifyUserPassword(current.id, currentPassword)) return false;
        if (nextPassword.trim().length < 6) return false;
        const registered = upsertRegisteredUser({
          ...current,
          password: nextPassword,
        });
        set({ user: registered });
        return true;
      },
      deactivateAccount: (password) => {
        const current = get().user;
        if (!current) return false;
        if (!verifyUserPassword(current.id, password)) return false;
        deactivateRegisteredUser(current.id);
        set({ user: null, isAuthenticated: false });
        return true;
      },
      deleteAccount: (password) => {
        const current = get().user;
        if (!current) return false;
        if (!verifyUserPassword(current.id, password)) return false;
        scheduleAccountDeletion(current.id);
        set({ user: null, isAuthenticated: false });
        return true;
      },
    }),
    {
      name: "trenova-auth",
      onRehydrateStorage: () => (state) => {
        if (!state?.user?.email) return;
        if (state.user.status === "inactive") {
          state.user = null;
          state.isAuthenticated = false;
          return;
        }
        const synced = upsertRegisteredUser({
          id: state.user.id,
          email: state.user.email,
          firstName: state.user.firstName,
          lastName: state.user.lastName,
          phone: state.user.phone,
          addresses: state.user.addresses,
          avatar: state.user.avatar,
          status: state.user.status ?? "active",
          createdAt: state.user.createdAt,
        });
        state.user = synced;
        state.isAuthenticated = true;
      },
    },
  ),
);
