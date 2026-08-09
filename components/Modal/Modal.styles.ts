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
      if ($size === "xl") return "1100px";
      if ($size === "lg") return "860px";
      return "560px";
    }},
    100%
  );
  max-height: min(90vh, 900px);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[6]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${({ theme }) => theme.animations.scaleIn};
`;
