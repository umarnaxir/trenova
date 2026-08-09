"use client";

import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { Flex } from "@/components/Flex/Flex";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <Text color="gray600" mb={5}>
        {message}
      </Text>
      <Flex justifyContent="flex-end" style={{ gap: "0.75rem" }}>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={tone === "danger" ? "primary" : "gold"}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Working..." : confirmLabel}
        </Button>
      </Flex>
    </Modal>
  );
}
