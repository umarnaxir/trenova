"use client";

import { AdminShell } from "@/features/admin/AdminShell";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { useUiStore } from "@/hooks/stores/uiStore";

export default function AdminProfilePage() {
  const pushToast = useUiStore((state) => state.pushToast);

  return (
    <AdminShell title="Profile">
      <form
        style={{ maxWidth: 480 }}
        onSubmit={(event) => {
          event.preventDefault();
          pushToast("Admin profile updated");
        }}
      >
        <Stack gap={4}>
          <Input label="Name" defaultValue="TRENOvA Admin" name="name" />
          <Input
            label="Email"
            defaultValue="admin@trenova.in"
            name="email"
            type="email"
          />
          <Input label="Role" defaultValue="Super Admin" name="role" readOnly />
          <Button type="submit">Update profile</Button>
        </Stack>
      </form>
    </AdminShell>
  );
}
