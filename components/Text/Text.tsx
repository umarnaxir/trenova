"use client";

import {
  TextRoot,
  type TextStyleProps,
  type TextVariant,
} from "@/components/Text/Text.styles";

type TextProps = TextStyleProps &
  React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
    variant?: TextVariant;
  };

export function Text({
  as = "p",
  variant = "body",
  ...props
}: TextProps) {
  return <TextRoot as={as} $variant={variant} {...props} />;
}
