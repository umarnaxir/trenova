"use client";

import styled from "styled-components";

export const LoginShell = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space[5]};
  background:
    radial-gradient(
      ellipse at top left,
      rgba(198, 167, 94, 0.18),
      transparent 55%
    ),
    linear-gradient(
      160deg,
      ${({ theme }) => theme.colors.black} 0%,
      ${({ theme }) => theme.colors.blackSoft} 45%,
      ${({ theme }) => theme.colors.blackMuted} 100%
    );
`;

export const LoginCard = styled.form`
  position: relative;
  width: min(420px, 100%);
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[8]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const CloseWrap = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space[4]};
  right: ${({ theme }) => theme.space[4]};
`;

export const BrandRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  padding-right: ${({ theme }) => theme.space[8]};
`;

export const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
