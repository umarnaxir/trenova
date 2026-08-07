"use client";

import styled from "styled-components";

export const ProductRailRoot = styled.section<{ $tone?: string }>`
  padding-block: 2.25rem 1.5rem;
  background: ${({ $tone }) => ($tone === "cream" ? "#F9F8F6" : "#FFFFFF")};
`;

export const TitleWrap = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const RailTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0A0A0A;
  display: inline-block;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #C6A75E;
  }
`;

export const RailGridWrap = styled.div`
  position: relative;
`;

export const ScrollContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(100% - 2rem);
  gap: 1.25rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 1rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-auto-columns: calc(50% - 0.75rem);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-auto-columns: calc(33.333% - 0.85rem);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-auto-columns: calc(16.666% - 1.05rem);
  }
`;



export const ProductCardWrapper = styled.div`
  background: #F5F5F7;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);

    img {
      transform: scale(1.06);
    }
  }
`;

export const ProductImageWrap = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 220px;
  margin-bottom: 1rem;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 240px;
  }

  img {
    object-fit: contain;
    mix-blend-mode: multiply;
    transition: transform 0.4s ease;
  }
`;

export const WishlistIconButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  background: rgba(255, 255, 255, 0.85);
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #0A0A0A;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    color: #C6A75E;
    transform: scale(1.1);
  }
`;

export const ProductCardTitle = styled.a`
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #0A0A0A;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.35;

  &:hover {
    color: #C6A75E;
  }
`;

export const ProductCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const PriceText = styled.span`
  font-size: 0.9375rem;
  font-weight: 800;
  color: #0A0A0A;
`;

export const NewBadge = styled.span`
  background: #C6A75E;
  color: #0A0A0A;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
`;

export const ScrollControlsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1.5rem;
`;

export const ScrollNavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #0A0A0A;
  color: #FFFFFF;
  border: 1px solid #C6A75E;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #C6A75E;
    color: #0A0A0A;
    transform: scale(1.08);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

export const DotDashBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DotDashItem = styled.button<{ $active?: boolean }>`
  height: 6px;
  width: ${({ $active }) => ($active ? "24px" : "8px")};
  border-radius: 3px;
  background: ${({ $active }) => ($active ? "#C6A75E" : "rgba(10, 10, 10, 0.2)")};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    background: #C6A75E;
  }
`;
