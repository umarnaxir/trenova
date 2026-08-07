"use client";

import styled from "styled-components";

export const PriceRoot = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Current = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Compare = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
  text-decoration: line-through;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
