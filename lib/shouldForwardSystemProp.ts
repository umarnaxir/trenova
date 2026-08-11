"use client";

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
} from "styled-system";

const systemPropNames = new Set(
  [
    space,
    color,
    layout,
    flexbox,
    grid,
    border,
    position,
    typography,
    shadow,
  ].flatMap((fn) => fn.propNames ?? []),
);

/** Prevent styled-system style props from leaking onto DOM nodes. */
export function shouldForwardSystemProp(prop: string) {
  if (prop.startsWith("$")) return false;
  return !systemPropNames.has(prop);
}
