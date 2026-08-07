"use client";

import styled from "styled-components";

export const CartLayout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1.4fr 0.8fr;
  }
`;

export const Line = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: ${({ theme }) => theme.space[3]};
  padding-block: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 96px 1fr auto;
    gap: ${({ theme }) => theme.space[4]};
  }
`;

export const Thumb = styled.div`
  position: relative;
  width: 72px;
  aspect-ratio: 4 / 5;
  background: ${({ theme }) => theme.colors.gray100};

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 96px;
  }
`;

export const LineActions = styled.div`
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[2]};

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-column: auto;
    margin-top: 0;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const Summary = styled.aside`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  height: fit-content;
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
`;
