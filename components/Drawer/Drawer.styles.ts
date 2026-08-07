"use client";

import styled from "styled-components";

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndices.overlay};
  background: ${({ theme }) => theme.colors.overlay};
`;

export const DrawerPanel = styled.aside<{ $side: "left" | "right" }>`
  position: fixed;
  top: 0;
  bottom: 0;
  ${({ $side }) => ($side === "left" ? "left: 0;" : "right: 0;")}
  z-index: ${({ theme }) => theme.zIndices.modal};
  width: min(420px, 100%);
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  animation: ${({ theme }) => theme.animations.fadeIn};
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: ${({ theme }) => theme.space[4]};
`;
