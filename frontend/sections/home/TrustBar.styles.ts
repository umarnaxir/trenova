"use client";

import styled from "styled-components";

export const TrustRoot = styled.section`
  background: #0a0a0a;
  color: ${({ theme }) => theme.colors.white};
`;

export const TrustBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: ${({ theme }) => theme.containers.xxl};
  margin-inline: auto;
  padding: 1.5rem 1.25rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1.75rem 1.5rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    padding: 1.85rem 2rem;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: ${({ theme }) => theme.colors.gold};
  padding: 0.75rem 0.85rem;
  position: relative;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: center;
    padding: 0.5rem 1rem;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 18%;
      height: 64%;
      width: 1px;
      background: rgba(198, 167, 94, 0.28);
    }
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gold};
  }
`;

export const ItemTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
`;

export const ItemCopy = styled.p`
  margin: 0.15rem 0 0;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 0.75rem;
`;
