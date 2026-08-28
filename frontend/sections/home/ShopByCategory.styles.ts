"use client";

import styled from "styled-components";

export const ShopCategoryRoot = styled.section`
  padding-block: 2rem 1.75rem;
  background: #ffffff;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-block: 3rem 2.5rem;
  }
`;

export const SectionTitleWrap = styled.div`
  text-align: center;
  margin-bottom: 1.15rem;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 1.75rem;
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0a0a0a;
  margin: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    gap: 0.75rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 1rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(6, 1fr);
    gap: 1.15rem;
  }
`;

export const CategoryCardItem = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  background: #0a0a0a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 180px;
    border-radius: 10px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    height: 240px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);

    img {
      transform: scale(1.06);
    }
  }

  img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

export const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.05) 35%,
    rgba(0, 0, 0, 0.78) 100%
  );
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0.55rem 0.35rem 0.7rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 1.15rem 0.75rem 1.35rem;
    gap: 0.45rem;
  }
`;

export const CategoryIcon = styled.span`
  display: inline-flex;
  color: #c6a75e;

  svg {
    width: 14px;
    height: 14px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const CategoryName = styled.h3`
  margin: 0;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1.2;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.9375rem;
    letter-spacing: 0.1em;
  }
`;
