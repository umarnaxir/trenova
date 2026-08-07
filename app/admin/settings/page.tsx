"use client";

import { AdminShell } from "@/features/admin/AdminShell";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { Text } from "@/components/Text/Text";
import { SITE } from "@/constants/site";
import { useUiStore } from "@/hooks/stores/uiStore";

export default function AdminSettingsPage() {
  const pushToast = useUiStore((state) => state.pushToast);

  return (
    <AdminShell title="Settings">
      <Text color="gray600" mb={5}>
        Storefront configuration (frontend mock).
      </Text>
      <form
        style={{ maxWidth: 520 }}
        onSubmit={(event) => {
          event.preventDefault();
          pushToast("Settings saved");
        }}
      >
        <Stack gap={4}>
          <Input label="Store name" defaultValue={SITE.name} name="name" />
          <Input label="Support email" defaultValue={SITE.email} name="email" />
          <Input label="Support phone" defaultValue={SITE.phone} name="phone" />
          <Input
            label="Currency"
            defaultValue={SITE.currency}
            name="currency"
          />
          <Button type="submit">Save settings</Button>
        </Stack>
      </form>
    </AdminShell>
  );
}
