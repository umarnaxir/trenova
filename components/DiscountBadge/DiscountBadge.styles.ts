"use client";

import styled from "styled-components";

export const DiscountCircle = styled.span`
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  margin-right: 0.2rem;
  margin-bottom: 0.15rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  pointer-events: none;
  line-height: 1.05;
  text-align: center;
  align-self: flex-start;

  strong {
    display: block;
    font-size: 0.6875rem;
    font-weight: 800;
    letter-spacing: 0.02em;
  }

  small {
    display: block;
    font-size: 0.5rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.95;
  }
`;
