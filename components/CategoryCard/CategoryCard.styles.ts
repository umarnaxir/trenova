"use client";

import styled from "styled-components";

export const CategoryLink = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};

  img {
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
    opacity: 0.85;
  }

  &:hover img {
    transform: scale(1.05);
    opacity: 1;
  }
`;

export const CategoryLabel = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: ${({ theme }) => theme.space[5]};
  background: linear-gradient(transparent, rgba(10, 10, 10, 0.78));
  color: ${({ theme }) => theme.colors.white};
`;
