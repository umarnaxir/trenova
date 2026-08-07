"use client";

import { GridRoot } from "@/components/Grid/Grid.styles";
import type { BoxStyleProps } from "@/components/Box/Box.styles";

type GridProps = BoxStyleProps &
  React.HTMLAttributes<HTMLDivElement> & {
    as?: React.ElementType;
  };

export function Grid({ as = "div", ...props }: GridProps) {
  return <GridRoot as={as} {...props} />;
}
