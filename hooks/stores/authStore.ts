"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";
import {
  getRegisteredUsers,
  upsertRegisteredUser,
} from "@/services/mock/usersStore";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, _password: string) => boolean;
  register: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => boolean;
  logout: () => void;
  updateProfile: (payload: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email) => {
        const normalized = email.trim().toLowerCase();
        const existing = getRegisteredUsers().find(
          (user) => user.email.trim().toLowerCase() === normalized,
        );
        const registered = existing
          ? upsertRegisteredUser({
              email: existing.email,
              firstName: existing.firstName,
              lastName: existing.lastName,
              phone: existing.phone,
              addresses: existing.addresses,
              id: existing.id,
              status: existing.status,
            })
          : upsertRegisteredUser({
              email: normalized,
              firstName: "Guest",
              lastName: "User",
              addresses: [],
              status: "active",
            });
        set({ user: registered, isAuthenticated: true });
        return true;
      },
      register: ({ firstName, lastName, email, phone }) => {
        const registered = upsertRegisteredUser({
          firstName,
          lastName,
          email,
          phone,
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
    }),
    { name: "trenova-auth" },
  ),
);
