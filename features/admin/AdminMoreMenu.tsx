"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { IconButton } from "@/components/IconButton/IconButton";
import {
  MoreMenuItem,
  MoreMenuList,
  MoreMenuWrap,
} from "@/features/admin/AdminMoreMenu.styles";

export type AdminMoreMenuItem = {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  dividerBefore?: boolean;
};

type AdminMoreMenuProps = {
  label?: string;
  items: AdminMoreMenuItem[];
  align?: "left" | "right";
  tone?: "light" | "dark";
};

export function AdminMoreMenu({
  label = "More actions",
  items,
  align = "right",
  tone = "dark",
}: AdminMoreMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const visibleItems = items.filter(Boolean);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!visibleItems.length) return null;

  return (
    <MoreMenuWrap ref={wrapRef}>
      <IconButton
        label={label}
        tone={tone}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <MoreVertical size={16} />
      </IconButton>
      <MoreMenuList id={menuId} role="menu" $open={open} $align={align}>
        {visibleItems.map((item) => (
          <MoreMenuItem
            key={item.id}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            data-danger={item.danger ? "true" : undefined}
            data-divider={item.dividerBefore ? "true" : undefined}
            onClick={() => {
              if (item.disabled) return;
              setOpen(false);
              item.onClick();
            }}
          >
            {item.label}
          </MoreMenuItem>
        ))}
      </MoreMenuList>
    </MoreMenuWrap>
  );
}
