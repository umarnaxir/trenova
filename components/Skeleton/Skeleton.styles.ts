"use client";

import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
`;

export const SkeletonRoot = styled.div<{
  $width?: string;
  $height?: string;
  $radius?: string;
}>`
  width: ${({ $width }) => $width ?? "100%"};
  height: ${({ $height }) => $height ?? "16px"};
  border-radius: ${({ theme, $radius }) => $radius ?? theme.radii.none};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gray200} 0%,
    ${({ theme }) => theme.colors.gray100} 50%,
    ${({ theme }) => theme.colors.gray200} 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;
