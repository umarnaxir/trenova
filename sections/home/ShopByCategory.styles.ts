"use client";

import styled from "styled-components";

export const ShopCategoryRoot = styled.section`
  padding-block: 3rem 2.5rem;
  background: #ffffff;
`;

export const SectionTitleWrap = styled.div`
  text-align: center;
  margin-bottom: 1.75rem;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0a0a0a;
  margin: 0;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(3, 1fr);
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
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  background: #0a0a0a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  ${({ theme }) => theme.mediaQueries.md} {
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
  padding: 1.15rem 0.75rem 1.35rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  text-align: center;
`;

export const CategoryIcon = styled.span`
  display: inline-flex;
  color: #c6a75e;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const CategoryName = styled.h3`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
`;
