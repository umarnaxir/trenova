"use client";

import styled, { css } from "styled-components";
import {
  color,
  space,
  typography,
  compose,
  type ColorProps,
  type SpaceProps,
  type TypographyProps,
} from "styled-system";

export type TextStyleProps = ColorProps & SpaceProps & TypographyProps;

const variantStyles = {
  display: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes["4xl"]};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    text-transform: uppercase;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: ${({ theme }) => theme.fontSizes["5xl"]};
    }
  `,
  h1: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    text-transform: uppercase;

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: ${({ theme }) => theme.fontSizes["4xl"]};
    }
  `,
  h2: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    text-transform: uppercase;
  `,
  h3: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    text-transform: uppercase;
  `,
  body: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  small: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  eyebrow: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    letter-spacing: ${({ theme }) => theme.letterSpacings.widest};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gold};
  `,
};

export type TextVariant = keyof typeof variantStyles;

export const TextRoot = styled.p<{ $variant: TextVariant } & TextStyleProps>`
  ${({ $variant }) => variantStyles[$variant]}
  ${compose(color, space, typography)}
`;
