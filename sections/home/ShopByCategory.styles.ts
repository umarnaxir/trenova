"use client";

import styled from "styled-components";

export const ShopCategoryRoot = styled.section`
  padding-block: 2.25rem 1.5rem;
  background: #FFFFFF;
`;

export const SectionTitleWrap = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
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

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  ${({ theme }) => theme.mediaQueries.sm} {
    gap: 1.25rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const CategoryCardItem = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  background: #0A0A0A;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 280px;
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
  background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%);
`;

export const CardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 1.25rem;
  color: #FFFFFF;
`;

export const CategoryName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom: 0.25rem;
`;

export const ShopNowLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #C6A75E;

  svg {
    transition: transform 0.2s ease;
  }

  ${CategoryCardItem}:hover & svg {
    transform: translateX(4px);
  }
`;

export const SaleCardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 180px;
  grid-column: 1 / -1;
  border-radius: 8px;
  padding: 1rem;
  background: radial-gradient(circle at center, #1A1A1A 0%, #050505 100%);
  border: 1px solid rgba(198, 167, 94, 0.35);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 280px;
    padding: 1.5rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-column: auto;
  }
`;

export const SaleTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.25rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #C6A75E;
  margin-bottom: 0.25rem;
`;

export const SaleSubtitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom: 1.25rem;
`;

export const SaleButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #C6A75E;
  color: #0A0A0A;
  padding: 0.625rem 1.25rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #D4AF37;
    transform: translateY(-2px);
  }
`;
