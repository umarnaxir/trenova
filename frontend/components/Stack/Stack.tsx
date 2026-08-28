"use client";

import { StackRoot } from "@/components/Stack/Stack.styles";
import type { BoxStyleProps } from "@/components/Box/Box.styles";

type StackProps = BoxStyleProps &
  React.HTMLAttributes<HTMLDivElement> & {
    as?: React.ElementType;
    gap?: string | number;
  };

export function Stack({ as = "div", gap, ...props }: StackProps) {
  return <StackRoot as={as} $gap={gap} {...props} />;
}
