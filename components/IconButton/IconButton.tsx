"use client";

import { IconButtonRoot } from "@/components/IconButton/IconButton.styles";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  tone?: "light" | "dark";
};

export function IconButton({
  label,
  tone = "dark",
  children,
  ...props
}: IconButtonProps) {
  return (
    <IconButtonRoot type="button" aria-label={label} $tone={tone} {...props}>
      {children}
    </IconButtonRoot>
  );
}
