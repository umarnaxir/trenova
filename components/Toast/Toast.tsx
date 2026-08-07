"use client";

import { X } from "lucide-react";
import { useUiStore } from "@/hooks/stores/uiStore";
import { ToastItem, ToastViewport } from "@/components/Toast/Toast.styles";
import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";

export function ToastHost() {
  const toasts = useUiStore((state) => state.toasts);
  const dismissToast = useUiStore((state) => state.dismissToast);

  if (!toasts.length) return null;

  return (
    <ToastViewport aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} $tone={toast.tone}>
          <Text color="white" fontSize="sm">
            {toast.message}
          </Text>
          <IconButton
            label="Dismiss notification"
            tone="light"
            onClick={() => dismissToast(toast.id)}
          >
            <X size={16} />
          </IconButton>
        </ToastItem>
      ))}
    </ToastViewport>
  );
}
