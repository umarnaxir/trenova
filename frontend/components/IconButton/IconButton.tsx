"use client";

import { IconButtonRoot } from "@/components/IconButton/IconButton.styles";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  tone?: "light" | "dark";
  /** No hover background — color only (e.g. password show/hide). */
  plain?: boolean;
};

export function IconButton({
  label,
  tone = "dark",
  plain = false,
  children,
  ...props
}: IconButtonProps) {
  return (
    <IconButtonRoot
      type="button"
      aria-label={label}
      $tone={tone}
      $plain={plain}
      {...props}
    >
      {children}
    </IconButtonRoot>
  );
}
