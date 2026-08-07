"use client";

import { FlexRoot } from "@/components/Flex/Flex.styles";
import type { BoxStyleProps } from "@/components/Box/Box.styles";

type FlexProps = BoxStyleProps &
  React.HTMLAttributes<HTMLDivElement> & {
    as?: React.ElementType;
    gap?: string | number;
  };

export function Flex({ as = "div", gap, ...props }: FlexProps) {
  return <FlexRoot as={as} $gap={gap} {...props} />;
}
