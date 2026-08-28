import type { AdminSettings } from "@/types/admin";
import { SITE } from "@/constants/site";

function clone<T>(value: T): T {
  return structuredClone(value);
}

export function createDefaultSiteSettings(): AdminSettings {
  return {
    storeName: SITE.name,
    legalName: SITE.legalName,
    cin: SITE.cin,
    supportEmail: SITE.email,
    supportPhone: SITE.phone,
    phoneSecondary: SITE.phoneSecondary,
    whatsapp: SITE.whatsapp,
    currency: SITE.currency,
    instagramHandle: SITE.instagramHandle,
    address: {
      line1: SITE.address.line1,
      line2: SITE.address.line2 ?? "",
      city: SITE.address.city,
      state: SITE.address.state,
      postalCode: SITE.address.postalCode,
      country: SITE.address.country,
    },
    social: {
      instagram: SITE.social.instagram,
      facebook: SITE.social.facebook,
      twitter: SITE.social.twitter,
      youtube: SITE.social.youtube,
    },
  };
}

/** Shared mutable site settings — admin + storefront read/write the same data. */
let settings: AdminSettings = createDefaultSiteSettings();

export function getSiteSettingsState(): AdminSettings {
  return clone(settings);
}

export function setSiteSettingsState(next: AdminSettings) {
  settings = clone(next);
}
