"use client";

import styled, { css } from "styled-components";

export const IconButtonRoot = styled.button<{
  $tone?: "light" | "dark";
  $plain?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $plain }) => ($plain ? "28px" : "40px")};
  height: ${({ $plain }) => ($plain ? "28px" : "40px")};
  border: 0;
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.none};
  background: transparent;
  color: ${({ theme, $tone }) =>
    $tone === "light" ? theme.colors.white : theme.colors.black};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.gold};
    background: transparent;
    outline: none;
  }

  ${({ $plain, $tone, theme }) =>
    !$plain &&
    css`
      transition:
        color ${theme.transitions.fast},
        background ${theme.transitions.fast};

      &:hover {
        background: ${$tone === "light"
          ? "rgba(198, 167, 94, 0.12)"
          : theme.colors.gray100};
      }
    `}
`;
