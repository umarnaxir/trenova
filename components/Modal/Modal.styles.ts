"use client";

import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.modal};
  background: ${({ theme }) => theme.colors.overlay};
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space[4]};
`;

export const Dialog = styled.div<{ $size?: "md" | "lg" | "xl" }>`
  width: min(
    ${({ $size = "md" }) => {
      if ($size === "xl") return "1040px";
      if ($size === "lg") return "820px";
      return "560px";
    }},
    100%
  );
  max-height: min(92vh, 900px);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.space[5]} ${theme.space[5]}`};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${({ theme }) => theme.animations.scaleIn};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => `${theme.space[6]} ${theme.space[6]}`};
  }
`;