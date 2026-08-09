"use client";

import styled from "styled-components";

export const TrustRoot = styled.section`
  position: relative;
  padding-block: 0 2rem;
  background: transparent;
`;

export const TrustBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  background: #0a0a0a;
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(198, 167, 94, 0.35);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    padding: 1.25rem 2rem;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.gold};
  padding: 0.75rem 1rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: rgba(198, 167, 94, 0.25);
    }
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
  }
`;

export const ItemTitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
`;

export const ItemCopy = styled.p`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 0.75rem;
`;
