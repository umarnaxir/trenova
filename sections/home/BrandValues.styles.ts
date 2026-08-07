"use client";

import styled from "styled-components";

export const ValuesRoot = styled.section`
  padding-block: 2.25rem 2rem;
  background: #FFFFFF;
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ValueCard = styled.div<{ $highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.75rem 2rem;
  border-radius: 8px;
  background: ${({ $highlight }) => ($highlight ? "#C6A75E" : "#0A0A0A")};
  color: ${({ $highlight }) => ($highlight ? "#0A0A0A" : "#FFFFFF")};
  border: 1px solid rgba(198, 167, 94, 0.35);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 0.5rem;

  svg {
    flex-shrink: 0;
    color: inherit;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const CardCopy = styled.p`
  font-size: 0.8125rem;
  opacity: 0.85;
  line-height: 1.4;
`;

