"use client";

import { useEffect, useState } from "react";
import type { AdminSettings } from "@/types/admin";
import { AdminShell } from "@/features/admin/AdminShell";
import {
  FormSection,
  FormSectionTitle,
} from "@/features/admin/AdminShared.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { Text } from "@/components/Text/Text";
import { Loader } from "@/components/Loader/Loader";
import { updateAdminSettings } from "@/services/admin.service";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useSiteSettingsStore } from "@/hooks/stores/siteSettingsStore";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export default function AdminSettingsPage() {
  const pushToast = useUiStore((state) => state.pushToast);
  const setSiteSettings = useSiteSettingsStore((state) => state.setSettings);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const apply = () => {
      setSettings(useSiteSettingsStore.getState().settings);
    };

    if (useSiteSettingsStore.persist.hasHydrated()) {
      apply();
    }

    return useSiteSettingsStore.persist.onFinishHydration(apply);
  }, []);

  if (!settings) {
    return (
      <AdminShell title="Settings">
        <Loader />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Settings">
      <Text color="gray600" mb={5}>
        Contact, address, and social links used across the storefront footer,
        homepage, contact page, and WhatsApp button.
      </Text>
      <form
        style={{ maxWidth: 720 }}
        onSubmit={async (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const next: AdminSettings = {
            storeName: String(data.get("storeName") ?? ""),
            legalName: String(data.get("legalName") ?? ""),
            cin: String(data.get("cin") ?? ""),
            supportEmail: String(data.get("supportEmail") ?? ""),
            supportPhone: String(data.get("supportPhone") ?? ""),
            phoneSecondary: String(data.get("phoneSecondary") ?? ""),
            whatsapp: digitsOnly(String(data.get("whatsapp") ?? "")),
            currency: String(data.get("currency") ?? ""),
            instagramHandle: String(data.get("instagramHandle") ?? ""),
            address: {
              line1: String(data.get("addressLine1") ?? ""),
              line2: String(data.get("addressLine2") ?? ""),
              city: String(data.get("city") ?? ""),
              state: String(data.get("state") ?? ""),
              postalCode: String(data.get("postalCode") ?? ""),
              country: String(data.get("country") ?? ""),
            },
            social: {
              instagram: String(data.get("socialInstagram") ?? ""),
              facebook: String(data.get("socialFacebook") ?? ""),
              twitter: String(data.get("socialTwitter") ?? ""),
              youtube: String(data.get("socialYoutube") ?? ""),
            },
          };
          setSaving(true);
          try {
            const saved = await updateAdminSettings(next);
            setSettings(saved);
            setSiteSettings(saved);
            pushToast("Settings saved — storefront links updated");
          } catch (err) {
            pushToast(
              err instanceof Error ? err.message : "Save failed",
              "error",
            );
          } finally {
            setSaving(false);
          }
        }}
      >
        <Stack gap={5}>
          <FormSection>
            <FormSectionTitle>Store</FormSectionTitle>
            <Input
              label="Store name"
              name="storeName"
              defaultValue={settings.storeName}
              required
            />
            <Input
              label="Legal name"
              name="legalName"
              defaultValue={settings.legalName}
              required
            />
            <Input label="CIN" name="cin" defaultValue={settings.cin} required />
            <Input
              label="Currency"
              name="currency"
              defaultValue={settings.currency}
              required
            />
          </FormSection>

          <FormSection>
            <FormSectionTitle>Contact</FormSectionTitle>
            <Input
              label="Support email"
              name="supportEmail"
              type="email"
              defaultValue={settings.supportEmail}
              required
            />
            <Input
              label="Primary phone"
              name="supportPhone"
              defaultValue={settings.supportPhone}
              required
            />
            <Input
              label="Secondary phone"
              name="phoneSecondary"
              defaultValue={settings.phoneSecondary}
            />
            <Input
              label="WhatsApp number (digits for wa.me)"
              name="whatsapp"
              defaultValue={settings.whatsapp}
              placeholder="916006216695"
              required
            />
          </FormSection>

          <FormSection>
            <FormSectionTitle>Address / location</FormSectionTitle>
            <Input
              label="Address line 1"
              name="addressLine1"
              defaultValue={settings.address.line1}
              required
            />
            <Input
              label="Address line 2"
              name="addressLine2"
              defaultValue={settings.address.line2}
            />
            <Input
              label="City"
              name="city"
              defaultValue={settings.address.city}
              required
            />
            <Input
              label="State"
              name="state"
              defaultValue={settings.address.state}
              required
            />
            <Input
              label="Postal code"
              name="postalCode"
              defaultValue={settings.address.postalCode}
              required
            />
            <Input
              label="Country"
              name="country"
              defaultValue={settings.address.country}
              required
            />
          </FormSection>

          <FormSection>
            <FormSectionTitle>Social media</FormSectionTitle>
            <Input
              label="Instagram handle"
              name="instagramHandle"
              defaultValue={settings.instagramHandle}
              placeholder="@shoptrenova"
            />
            <Input
              label="Instagram URL"
              name="socialInstagram"
              type="url"
              defaultValue={settings.social.instagram}
              required
            />
            <Input
              label="Facebook URL"
              name="socialFacebook"
              type="url"
              defaultValue={settings.social.facebook}
              required
            />
            <Input
              label="YouTube URL"
              name="socialYoutube"
              type="url"
              defaultValue={settings.social.youtube}
              required
            />
            <Input
              label="X / Twitter URL"
              name="socialTwitter"
              type="url"
              defaultValue={settings.social.twitter}
              required
            />
          </FormSection>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save settings"}
          </Button>
        </Stack>
      </form>
    </AdminShell>
  );
}
