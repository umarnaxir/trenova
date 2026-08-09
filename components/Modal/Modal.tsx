"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, Overlay } from "@/components/Modal/Modal.styles";
import { Flex } from "@/components/Flex/Flex";
import { Text } from "@/components/Text/Text";
import { IconButton } from "@/components/IconButton/IconButton";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  /** @deprecated use size="lg" */
  wide?: boolean;
  size?: "md" | "lg" | "xl";
};

export function Modal({
  open,
  title,
  onClose,
  children,
  wide,
  size,
}: ModalProps) {
  const resolvedSize = size ?? (wide ? "lg" : "md");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay onClick={onClose} role="presentation">
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label={title}
        $size={resolvedSize}
        onClick={(event) => event.stopPropagation()}
      >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text as="h2" variant="h3">
            {title}
          </Text>
          <IconButton label="Close dialog" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </Flex>
        {children}
      </Dialog>
    </Overlay>
  );
}
