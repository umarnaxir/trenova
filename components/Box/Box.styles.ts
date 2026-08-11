"use client";

import styled from "styled-components";
import {
  space,
  color,
  layout,
  flexbox,
  grid,
  border,
  position,
  typography,
  shadow,
  compose,
  type SpaceProps,
  type ColorProps,
  type LayoutProps,
  type FlexboxProps,
  type GridProps,
  type BorderProps,
  type PositionProps,
  type TypographyProps,
  type ShadowProps,
} from "styled-system";
import { shouldForwardSystemProp } from "@/lib/shouldForwardSystemProp";

export type BoxStyleProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  GridProps &
  BorderProps &
  PositionProps &
  TypographyProps &
  ShadowProps;

export const BoxRoot = styled.div.withConfig({
  shouldForwardProp: shouldForwardSystemProp,
})<BoxStyleProps>`
  ${compose(
    space,
    color,
    layout,
    flexbox,
    grid,
    border,
    position,
    typography,
    shadow,
  )}
`;
