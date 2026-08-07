"use client";

import styled from "styled-components";

export const CheckoutLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

export const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;
