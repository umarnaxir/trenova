"use client";

import { useEffect, useState } from "react";
import type { AdminSettings } from "@/types/admin";
import { AdminShell } from "@/features/admin/AdminShell";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { Text } from "@/components/Text/Text";
import { Loader } from "@/components/Loader/Loader";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { getAdminSettings, updateAdminSettings } from "@/services/admin.service";
import { useUiStore } from "@/hooks/stores/uiStore";

export default function AdminSettingsPage() {
  const pushToast = useUiStore((state) => state.pushToast);
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAdminSettings()
      .then(setSettings)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load settings");
      });
  }, []);

  if (error) {
    return (
      <AdminShell title="Settings">
        <EmptyState title="Unable to load settings" description={error} />
      </AdminShell>
    );
  }

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
        Storefront configuration. Persisted in this browser session mock until a
        backend is connected.
      </Text>
      <form
        style={{ maxWidth: 520 }}
        onSubmit={async (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const next: AdminSettings = {
            storeName: String(data.get("storeName") ?? ""),
            supportEmail: String(data.get("supportEmail") ?? ""),
            supportPhone: String(data.get("supportPhone") ?? ""),
            currency: String(data.get("currency") ?? ""),
          };
          setSaving(true);
          try {
            const saved = await updateAdminSettings(next);
            setSettings(saved);
            pushToast("Settings saved");
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
        <Stack gap={4}>
          <Input
            label="Store name"
            name="storeName"
            defaultValue={settings.storeName}
            required
          />
          <Input
            label="Support email"
            name="supportEmail"
            type="email"
            defaultValue={settings.supportEmail}
            required
          />
          <Input
            label="Support phone"
            name="supportPhone"
            defaultValue={settings.supportPhone}
            required
          />
          <Input
            label="Currency"
            name="currency"
            defaultValue={settings.currency}
            required
          />
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save settings"}
          </Button>
        </Stack>
      </form>
    </AdminShell>
  );
}
