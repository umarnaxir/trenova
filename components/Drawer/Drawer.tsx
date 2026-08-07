"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerPanel,
} from "@/components/Drawer/Drawer.styles";
import { Text } from "@/components/Text/Text";
import { IconButton } from "@/components/IconButton/IconButton";

type DrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
};

export function Drawer({
  open,
  title,
  onClose,
  children,
  side = "right",
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <DrawerOverlay onClick={onClose} />
      <DrawerPanel $side={side} aria-label={title}>
        <DrawerHeader>
          <Text as="h2" variant="h3">
            {title}
          </Text>
          <IconButton label="Close drawer" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerPanel>
    </>
  );
}
