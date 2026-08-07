"use client";

import { BoxRoot, type BoxStyleProps } from "@/components/Box/Box.styles";

type BoxProps = BoxStyleProps &
  React.HTMLAttributes<HTMLDivElement> & {
    as?: React.ElementType;
  };

export function Box({ as = "div", ...props }: BoxProps) {
  return <BoxRoot as={as} {...props} />;
}
