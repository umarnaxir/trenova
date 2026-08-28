"use client";

import styled from "styled-components";
import { BoxRoot } from "@/components/Box/Box.styles";

export const FlexRoot = styled(BoxRoot)<{ $gap?: string | number }>`
  display: flex;
  gap: ${({ $gap, theme }) => {
    if ($gap === undefined) return undefined;
    if (typeof $gap === "number") {
      return theme.space[$gap as keyof typeof theme.space] ?? `${$gap}px`;
    }
    return $gap;
  }};
`;
