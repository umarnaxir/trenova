"use client";

import {
  ButtonRoot,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/Button/Button.styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  as?: React.ElementType;
  href?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  as,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonRoot
      as={as}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </ButtonRoot>
  );
}
