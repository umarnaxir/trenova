"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminSettings } from "@/types/admin";
import { createDefaultSiteSettings } from "@/services/mock/siteSettingsStore";

type SiteSettingsState = {
  settings: AdminSettings;
  setSettings: (settings: AdminSettings) => void;
};

export const useSiteSettingsStore = create<SiteSettingsState>()(
  persist(
    (set) => ({
      settings: createDefaultSiteSettings(),
      setSettings: (settings) => set({ settings }),
    }),
    { name: "trenova-site-settings" },
  ),
);

export function useSiteSettings() {
  return useSiteSettingsStore((state) => state.settings);
}
