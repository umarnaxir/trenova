"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";
import { API_URL } from "@/lib/api";
import { upsertRegisteredUser } from "@/services/mock/usersStore";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string; devOtp?: string }>;
  verifyOtp: (phone: string, code: string) => Promise<{ success: boolean; message: string; otpToken?: string }>;
  sendForgotOtp: (phone: string) => Promise<{ success: boolean; message: string; devOtp?: string }>;
  verifyForgotOtp: (phone: string, code: string) => Promise<{ success: boolean; message: string; otpToken?: string }>;
  resetPasswordWithOtp: (phone: string, otpToken: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  register: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    otpToken: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (payload: Partial<User>) => Promise<void>;
  verifyPassword: (password: string) => boolean;
  changePassword: (
    currentPassword: string,
    nextPassword: string,
  ) => Promise<{ ok: boolean, error?: string }>;
  deactivateAccount: (
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  deleteAccount: (
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      sendOtp: async (phone: string) => {
        try {
          const res = await fetch(`${API_URL}/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone }),
          });
          const data = await res.json();
          return {
            success: Boolean(res.ok && data.success),
            message: data.message || 'Failed to send OTP',
            devOtp: data.devOtp,
          };
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to send OTP' };
        }
      },
      verifyOtp: async (phone: string, code: string) => {
        try {
          const res = await fetch(`${API_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, code }),
          });
          const data = await res.json();
          return {
            success: Boolean(res.ok && data.success),
            message: data.message || 'Failed to verify OTP',
            otpToken: data.data?.otpToken,
          };
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to verify OTP' };
        }
      },
      sendForgotOtp: async (phone: string) => {
        try {
          const res = await fetch(`${API_URL}/auth/forgot-password/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone }),
          });
          const data = await res.json();
          return {
            success: Boolean(res.ok && data.success),
            message: data.message || 'Failed to send OTP',
            devOtp: data.devOtp,
          };
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to send OTP' };
        }
      },
      verifyForgotOtp: async (phone: string, code: string) => {
        try {
          const res = await fetch(`${API_URL}/auth/forgot-password/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, code }),
          });
          const data = await res.json();
          return {
            success: Boolean(res.ok && data.success),
            message: data.message || 'Failed to verify OTP',
            otpToken: data.data?.otpToken,
          };
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to verify OTP' };
        }
      },
      resetPasswordWithOtp: async (phone: string, otpToken: string, newPassword: string) => {
        try {
          const res = await fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, otpToken, newPassword }),
          });
          const data = await res.json();
          return {
            success: Boolean(res.ok && data.success),
            message: data.message || (res.ok ? 'Password reset successfully' : 'Failed to reset password'),
          };
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to reset password' };
        }
      },
      login: async (email, password) => {
        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            const userWithAddresses = { ...data.data.user, addresses: data.data.user.addresses || [] };
            set({ user: userWithAddresses, token: data.data.token, isAuthenticated: true });
            upsertRegisteredUser(userWithAddresses);
            return true;
          }
          return false;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      register: async (payload) => {
        try {
          const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (res.ok && data.success) {
            const userWithAddresses = { ...data.data.user, addresses: data.data.user.addresses || [] };
            set({ user: userWithAddresses, token: data.data.token, isAuthenticated: true });
            upsertRegisteredUser({ ...userWithAddresses, password: payload.password });
            return { success: true, message: data.message || 'Account created successfully' };
          }
          return { success: false, message: data.message || 'Registration failed' };
        } catch (error: any) {
          return { success: false, message: error.message || 'Network error during registration' };
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      updateProfile: async (payload) => {
        const current = get().user;
        const token = get().token;
        if (!current) return;
        try {
          if (token) {
            const res = await fetch(`${API_URL}/user/profile`, {
              method: 'PUT',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(payload)
            });
            if (res.ok) {
              const data = await res.json();
              const updated = { ...current, ...data.data };
              set({ user: updated });
              upsertRegisteredUser(updated);
              return;
            }
          }
        } catch (error) {
          console.error(error);
        }
        const updated = { ...current, ...payload };
        set({ user: updated });
        upsertRegisteredUser(updated);
      },
      verifyPassword: (password) => { return false; },
      changePassword: async (currentPassword, nextPassword) => {
        try {
          const token = get().token;
          if (!token) return { ok: false, error: "Unauthorized" };
          
          const res = await fetch(`${API_URL}/user/password`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword, nextPassword })
          });
          const data = await res.json();
          return { ok: res.ok, error: data.message };
        } catch (error: any) {
          return { ok: false, error: error.message };
        }
      },
      deactivateAccount: async (password: string) => {
        try {
          const token = get().token;
          if (!token) return { ok: false, error: "Not logged in" };
          const res = await fetch(`${API_URL}/user/deactivate`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password })
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.success) {
            set({ user: null, token: null, isAuthenticated: false });
            return { ok: true };
          }
          return { ok: false, error: data.message || "Failed to deactivate account" };
        } catch (error: any) {
          return { ok: false, error: error.message || "Network error" };
        }
      },
      deleteAccount: async (password: string) => {
        try {
          const token = get().token;
          if (!token) return { ok: false, error: "Not logged in" };
          const res = await fetch(`${API_URL}/user/delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password })
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.success) {
            set({ user: null, token: null, isAuthenticated: false });
            return { ok: true };
          }
          return { ok: false, error: data.message || "Failed to delete account" };
        } catch (error: any) {
          return { ok: false, error: error.message || "Network error" };
        }
      },
    }),
    {
      name: "trenova-auth",
    }
  )
);
