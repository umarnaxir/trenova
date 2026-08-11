"use client";

import styled from "styled-components";

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

export const Media = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gray100};

  img {
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

export const BadgeRow = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  left: ${({ theme }) => theme.space[3]};
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  z-index: 1;
`;

export const WishButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space[3]};
  right: ${({ theme }) => theme.space[3]};
  z-index: 1;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover,
  &[data-active="true"] {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 2.75rem;
  padding-right: 0.35rem;
  padding-bottom: 0.15rem;
`;

export const TitleLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;

export const ShopLink = styled.a`
  margin-top: ${({ theme }) => theme.space[2]};
  display: inline-flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gold};
  width: fit-content;
  padding-bottom: 2px;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.goldDark};
  }
`;
