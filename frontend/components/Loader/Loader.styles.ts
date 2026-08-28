"use client";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoaderRoot = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid ${({ theme }) => theme.colors.gray300};
  border-top-color: ${({ theme }) => theme.colors.gold};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoaderWrap = styled.div`
  display: grid;
  place-items: center;
  min-height: 180px;
  width: 100%;
`;
