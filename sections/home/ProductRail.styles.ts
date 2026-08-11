"use client";

import styled from "styled-components";

export const ProductRailRoot = styled.section<{ $tone?: string }>`
  padding-block: 1.75rem 1.5rem;
  background: ${({ $tone }) => ($tone === "cream" ? "#f7f5f2" : "#ffffff")};

  ${({ theme }) => theme.mediaQueries.md} {
    padding-block: 2.25rem 2rem;
  }
`;

export const TitleWrap = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 1.25rem;
  }
`;

export const RailTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.2rem, 2.5vw, 1.65rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0a0a0a;
  margin: 0;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.75rem;
  }
`;

export const ProductCardWrapper = styled.article`
  background: #ffffff;
  border: 1px solid rgba(10, 10, 10, 0.06);
  border-radius: 8px;
  padding: 0.35rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  position: relative;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 10px;
    padding: 0.4rem;
    gap: 0.2rem;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);

    img {
      transform: scale(1.05);
    }
  }
`;

export const ProductImageWrap = styled.a`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  background: #f3f3f5;

  ${({ theme }) => theme.mediaQueries.md} {
    aspect-ratio: 5 / 6;
    border-radius: 8px;
  }

  img {
    object-fit: contain;
    mix-blend-mode: multiply;
    transition: transform 0.4s ease;
  }
`;

export const WishlistIconButton = styled.button`
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  z-index: 2;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #0a0a0a;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  ${({ theme }) => theme.mediaQueries.md} {
    top: 0.55rem;
    right: 0.55rem;
    width: 32px;
    height: 32px;
  }

  &:hover {
    color: #c6a75e;
    transform: scale(1.08);
  }
`;

export const ProductMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
`;

export const ProductCardTitle = styled.a`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #0a0a0a;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.7rem;
  }

  &:hover {
    color: #c6a75e;
  }
`;

export const CategoryLabel = styled.span`
  font-size: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  color: #7a7a7a;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.575rem;
  }
`;

export const ProductCardFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.15rem;
  margin-top: auto;
  padding-top: 0.15rem;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  min-height: 0;
  padding: 0;
`;

export const PriceText = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  color: #0a0a0a;
  min-width: 0;
  line-height: 1.2;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.75rem;
  }
`;

export const OffBadge = styled.span`
  flex-shrink: 0;
  color: #b42318;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.55rem;
  }
`;

export const NewBadge = styled.span`
  position: absolute;
  top: 0.35rem;
  left: 0.35rem;
  z-index: 2;
  background: #c6a75e;
  color: #0a0a0a;
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.15rem 0.3rem;
  border-radius: 3px;

  ${({ theme }) => theme.mediaQueries.md} {
    top: 0.45rem;
    left: 0.45rem;
    font-size: 0.575rem;
    padding: 0.2rem 0.35rem;
  }
`;

export const AddToCartButton = styled.button`
  width: 100%;
  margin-top: 0;
  border: 0;
  border-radius: 4px;
  background: #0a0a0a;
  color: #ffffff;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.4rem 0.3rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.6rem;
    letter-spacing: 0.07em;
    padding: 0.45rem 0.35rem;
  }

  &:hover {
    background: #c6a75e;
    color: #0a0a0a;
  }
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.12rem;
  color: #c6a75e;

  svg {
    width: 10px;
    height: 10px;
  }

  span {
    margin-left: 0.15rem;
    font-size: 0.55rem;
    font-weight: 600;
    color: #6b6b6b;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 0.15rem;

    svg {
      width: 12px;
      height: 12px;
    }

    span {
      margin-left: 0.2rem;
      font-size: 0.625rem;
    }
  }
`;
