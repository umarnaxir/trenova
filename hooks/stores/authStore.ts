"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";
import { mockUser } from "@/services/mock/user";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, _password: string) => boolean;
  register: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
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
        const user = { ...mockUser, email };
        set({ user, isAuthenticated: true });
        return true;
      },
      register: ({ firstName, lastName, email }) => {
        set({
          user: {
            ...mockUser,
            firstName,
            lastName,
            email,
          },
          isAuthenticated: true,
        });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (payload) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...payload } });
      },
    }),
    { name: "trenova-auth" },
  ),
);
