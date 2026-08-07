"use client";

import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.black};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gold};
      border-color: ${({ theme }) => theme.colors.gold};
      color: ${({ theme }) => theme.colors.black};
    }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
    border-color: ${({ theme }) => theme.colors.black};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  gold: css`
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
    border-color: ${({ theme }) => theme.colors.gold};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.goldLight};
      border-color: ${({ theme }) => theme.colors.goldLight};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.black};
    border-color: transparent;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.goldDark};
    }
  `,
  light: css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    border-color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gold};
      border-color: ${({ theme }) => theme.colors.gold};
    }
  `,
};

const sizes = {
  sm: css`
    min-height: 36px;
    padding: 0 ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  `,
  md: css`
    min-height: 44px;
    padding: 0 ${({ theme }) => theme.space[6]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  lg: css`
    min-height: 52px;
    padding: 0 ${({ theme }) => theme.space[8]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export const ButtonRoot = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.none};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ $variant }) => variants[$variant]}
  ${({ $size }) => sizes[$size]}

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;
