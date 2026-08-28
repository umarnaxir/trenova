"use client";

import styled from "styled-components";

export const ToastViewport = styled.div`
  position: fixed;
  right: ${({ theme }) => theme.space[4]};
  bottom: ${({ theme }) => theme.space[4]};
  z-index: ${({ theme }) => theme.zIndices.toast};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  width: min(360px, calc(100vw - 2rem));
`;

export const ToastItem = styled.div<{ $tone: "success" | "error" | "info" }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border-left: 3px solid
    ${({ theme, $tone }) =>
      $tone === "error"
        ? theme.colors.error
        : $tone === "info"
          ? theme.colors.gray300
          : theme.colors.gold};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${({ theme }) => theme.animations.slideUp};
`;
