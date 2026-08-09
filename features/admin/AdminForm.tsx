"use client";

import { FormActions } from "@/features/admin/AdminShared.styles";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";

type AdminFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
  submitLabel?: string;
  children: React.ReactNode;
};

export function AdminForm({
  onSubmit,
  onCancel,
  submitting,
  submitLabel = "Save",
  children,
}: AdminFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit(event);
      }}
    >
      <Stack gap={4}>
        {children}
        <FormActions>
          <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : submitLabel}
          </Button>
        </FormActions>
      </Stack>
    </form>
  );
}
