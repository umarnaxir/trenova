"use client";

import styled from "styled-components";

export const Item = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-block: ${({ theme }) => theme.space[4]};

  summary {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.heading};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    text-transform: uppercase;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  p {
    margin-top: ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.gray600};
  }
`;
