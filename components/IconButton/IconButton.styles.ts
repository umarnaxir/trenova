"use client";

import styled from "styled-components";

export const IconButtonRoot = styled.button<{ $tone?: "light" | "dark" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.none};
  color: ${({ theme, $tone }) =>
    $tone === "light" ? theme.colors.white : theme.colors.black};
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme, $tone }) =>
      $tone === "light" ? "rgba(198, 167, 94, 0.12)" : theme.colors.gray100};
  }
`;
