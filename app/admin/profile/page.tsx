"use client";

import { AdminShell } from "@/features/admin/AdminShell";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { Text } from "@/components/Text/Text";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { useUiStore } from "@/hooks/stores/uiStore";

export default function AdminProfilePage() {
  const admin = useAdminAuthStore((state) => state.admin);
  const updateProfile = useAdminAuthStore((state) => state.updateProfile);
  const pushToast = useUiStore((state) => state.pushToast);

  if (!admin) return null;

  return (
    <AdminShell title="Profile">
      <Text color="gray600" mb={5}>
        Your admin session profile.
      </Text>
      <form
        style={{ maxWidth: 480 }}
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          updateProfile({
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
          });
          pushToast("Admin profile updated");
        }}
      >
        <Stack gap={4}>
          <Input label="Name" name="name" defaultValue={admin.name} required />
          <Input
            label="Email"
            name="email"
            type="email"
            defaultValue={admin.email}
            required
          />
          <Input label="Role" name="role" defaultValue={admin.role} readOnly />
          <Button type="submit">Update profile</Button>
        </Stack>
      </form>
    </AdminShell>
  );
}
