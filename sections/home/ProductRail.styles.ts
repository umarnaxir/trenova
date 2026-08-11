"use client";

import styled from "styled-components";

export const ProductRailRoot = styled.section<{ $tone?: string }>`
  padding-block: 3rem 2.5rem;
  background: ${({ $tone }) => ($tone === "cream" ? "#f7f5f2" : "#ffffff")};
`;

export const TitleWrap = styled.div`
  text-align: center;
  margin-bottom: 1.75rem;
`;

export const RailTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0a0a0a;
  margin: 0;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(6, 1fr);
    gap: 1.15rem;
  }
`;

export const ProductCardWrapper = styled.article`
  background: #ffffff;
  border: 1px solid rgba(10, 10, 10, 0.06);
  border-radius: 10px;
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  position: relative;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

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
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f3f5;

  img {
    object-fit: contain;
    mix-blend-mode: multiply;
    transition: transform 0.4s ease;
  }
`;

export const WishlistIconButton = styled.button`
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  z-index: 2;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #0a0a0a;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    color: #c6a75e;
    transform: scale(1.08);
  }
`;

export const ProductMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
`;

export const ProductCardTitle = styled.a`
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #0a0a0a;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.35;

  &:hover {
    color: #c6a75e;
  }
`;

export const CategoryLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  color: #7a7a7a;
`;

export const ProductCardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: auto;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding-right: 0.35rem;
  padding-bottom: 0.15rem;
`;

export const PriceText = styled.span`
  font-size: 0.9375rem;
  font-weight: 800;
  color: #0a0a0a;
  min-width: 0;
`;

export const NewBadge = styled.span`
  position: absolute;
  top: 0.55rem;
  left: 0.55rem;
  z-index: 2;
  background: #c6a75e;
  color: #0a0a0a;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.45rem;
  border-radius: 3px;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  margin-top: 0.15rem;
  border: 0;
  border-radius: 4px;
  background: #0a0a0a;
  color: #ffffff;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.7rem 0.5rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #c6a75e;
    color: #0a0a0a;
  }
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #c6a75e;

  span {
    margin-left: 0.25rem;
    font-size: 0.6875rem;
    font-weight: 600;
    color: #6b6b6b;
  }
`;
