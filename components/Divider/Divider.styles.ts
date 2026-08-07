"use client";

import styled from "styled-components";

export const DividerRoot = styled.hr<{ $tone?: "light" | "gold" | "dark" }>`
  border: 0;
  height: 1px;
  width: 100%;
  background: ${({ theme, $tone }) =>
    $tone === "gold"
      ? theme.colors.gold
      : $tone === "dark"
        ? theme.colors.black
        : theme.colors.gray200};
`;
