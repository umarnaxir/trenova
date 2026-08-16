"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminSettings } from "@/types/admin";
import { SITE } from "@/constants/site";
import { createDefaultSiteSettings } from "@/services/mock/siteSettingsStore";

type SiteSettingsState = {
  settings: AdminSettings;
  setSettings: (settings: AdminSettings) => void;
};

const LEGACY_SUPPORT_EMAILS = new Set([
  "novabrands.2026@gmail.com",
  "hello@trenova.in",
]);

function normalizeSupportEmail(settings: AdminSettings): AdminSettings {
  const email = settings.supportEmail?.trim().toLowerCase() ?? "";
  if (!email || LEGACY_SUPPORT_EMAILS.has(email)) {
    return { ...settings, supportEmail: SITE.email };
  }
  return settings;
}

export const useSiteSettingsStore = create<SiteSettingsState>()(
  persist(
    (set) => ({
      settings: createDefaultSiteSettings(),
      setSettings: (settings) =>
        set({ settings: normalizeSupportEmail(settings) }),
    }),
    {
      name: "trenova-site-settings",
      version: 2,
      partialize: (state) => ({ settings: state.settings }),
      migrate: (persisted) => {
        const state = (persisted ?? {}) as { settings?: AdminSettings };
        return {
          settings: normalizeSupportEmail(
            state.settings ?? createDefaultSiteSettings(),
          ),
        };
      },
      merge: (persisted, current) => {
        const incoming = (persisted ?? {}) as Partial<SiteSettingsState>;
        return {
          ...current,
          settings: normalizeSupportEmail(
            incoming.settings ?? current.settings,
          ),
        };
      },
    },
  ),
);

export function useSiteSettings() {
  return useSiteSettingsStore((state) => state.settings);
}
