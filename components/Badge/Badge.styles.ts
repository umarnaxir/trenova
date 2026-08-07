"use client";

import styled, { css } from "styled-components";

const tones = {
  gold: css`
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.black};
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  `,
  light: css`
    background: ${({ theme }) => theme.colors.offWhite};
    color: ${({ theme }) => theme.colors.black};
  `,
  sale: css`
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
  `,
};

export type BadgeTone = keyof typeof tones;

export const BadgeRoot = styled.span<{ $tone: BadgeTone }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 22px;
  padding: 0 ${({ theme }) => theme.space[2]};
  font-size: 10px;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  ${({ $tone }) => tones[$tone]}
`;
