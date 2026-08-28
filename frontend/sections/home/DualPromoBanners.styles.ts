"use client";

import styled from "styled-components";

export const DualPromoRoot = styled.section`
  padding-block: 0.5rem 2.75rem;
  background: #ffffff;
`;

export const BannerGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(86%, 1fr);
  gap: 0.85rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${({ theme }) => theme.space[4]};
  padding-bottom: 0.35rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-auto-columns: minmax(48%, 1fr);
    gap: 1.15rem;
    scroll-padding-inline: ${({ theme }) => theme.space[6]};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-auto-columns: minmax(46%, 1fr);
    gap: 1.25rem;
    scroll-padding-inline: ${({ theme }) => theme.space[8]};
  }
`;

export const BannerCard = styled.a`
  position: relative;
  min-height: 260px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1.35rem 1.15rem 1.5rem;
  color: #ffffff;
  text-decoration: none;
  text-align: left;
  scroll-snap-align: start;
  isolation: isolate;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 340px;
    padding: 1.75rem 2rem 2rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);

    img {
      transform: scale(1.06);
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const BannerMedia = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    object-fit: cover;
    object-position: right center;
    transition: transform 0.6s ease;
  }
`;

export const BannerLink = styled.span`
  position: absolute;
  top: 1rem;
  left: 1.15rem;
  z-index: 2;
  display: inline-block;
  padding-bottom: 0.25rem;
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #c6a75e;
  }

  ${BannerCard}:hover & {
    color: #c6a75e;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    top: 1.35rem;
    left: 2rem;
    font-size: 0.875rem;
  }
`;

export const BannerText = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 22rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  text-align: left;
`;

export const BannerTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.15rem, 2.8vw, 1.65rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: none;
  line-height: 1.2;
  color: #ffffff;
  white-space: nowrap;
`;

export const BannerCopy = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 0.9375rem;
  }
`;
