"use client";

import styled from "styled-components";

export const Prose = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  max-width: 760px;
  color: ${({ theme }) => theme.colors.gray700};

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.black};
    margin-top: ${({ theme }) => theme.space[4]};
  }

  p,
  li {
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }

  ul {
    display: grid;
    gap: ${({ theme }) => theme.space[2]};
    padding-left: ${({ theme }) => theme.space[4]};
    list-style: disc;
  }
`;
