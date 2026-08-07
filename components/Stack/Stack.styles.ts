"use client";

import styled from "styled-components";
import { FlexRoot } from "@/components/Flex/Flex.styles";

export const StackRoot = styled(FlexRoot)<{ $gap?: string | number }>`
  flex-direction: column;
  gap: ${({ $gap, theme }) =>
    typeof $gap === "number"
      ? theme.space[$gap as keyof typeof theme.space] ?? `${$gap}px`
      : $gap ?? theme.space[4]};
`;
