"use client";

import styled from "styled-components";

export const HeroRoot = styled.section`
  position: relative;
  min-height: 500px;
  height: auto;
  padding-top: 4.5rem;
  padding-bottom: 3.5rem;
  display: flex;
  align-items: center;
  overflow: visible;
  background: #000000;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    height: 72vh;
    min-height: 580px;
    max-height: 820px;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 78% 45%, rgba(198, 167, 94, 0.3) 0%, rgba(198, 167, 94, 0.06) 55%, transparent 80%),
    radial-gradient(circle at 15% 85%, rgba(198, 167, 94, 0.12) 0%, transparent 55%);
`;

export const TopRight3DGraphic = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 280px;
  pointer-events: none;
  z-index: 0;
  display: none;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    top: 0;
    right: 0;
    width: min(45vw, 480px);
    height: min(45vw, 480px);
  }
`;

export const GlowingOrb = styled.div`
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(198, 167, 94, 0.4) 0%, rgba(198, 167, 94, 0.1) 50%, transparent 75%);
  filter: blur(30px);
  animation: orbPulse 8s ease-in-out infinite alternate;

  @keyframes orbPulse {
    0% {
      transform: scale(0.85);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.15);
      opacity: 0.95;
    }
  }
`;

export const Ring3D = styled.div`
  position: absolute;
  width: 78%;
  height: 78%;
  border-radius: 50%;
  border: 2px solid rgba(198, 167, 94, 0.5);
  border-top-color: #C6A75E;
  border-bottom-color: #D4AF37;
  box-shadow: 0 0 40px rgba(198, 167, 94, 0.35), inset 0 0 25px rgba(198, 167, 94, 0.2);
  transform-style: preserve-3d;
  animation: rotate3d 24s ease-in-out infinite alternate;

  @keyframes rotate3d {
    0% {
      transform: rotateX(65deg) rotateY(25deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(65deg) rotateY(25deg) rotateZ(360deg);
    }
  }
`;

export const InnerRing3D = styled.div`
  position: absolute;
  width: 54%;
  height: 54%;
  border-radius: 50%;
  border: 1px dashed rgba(224, 201, 136, 0.7);
  border-right-color: #C6A75E;
  transform-style: preserve-3d;
  animation: rotate3dReverse 20s ease-in-out infinite alternate;

  @keyframes rotate3dReverse {
    0% {
      transform: rotateX(35deg) rotateY(70deg) rotateZ(360deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(70deg) rotateZ(0deg);
    }
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  gap: 1.5rem;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.25rem;
  width: 100%;
  max-width: 620px;
  padding-bottom: 2rem;

  ${({ theme }) => theme.mediaQueries.md} {
    gap: 1.5rem;
    padding-bottom: 5.5rem;
  }
`;

export const Headline = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2.25rem, 7.5vw, 3.85rem);
  line-height: 1.28;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #FFFFFF;
  font-weight: 800;

  span {
    padding-bottom: 0.2rem;
  }
`;

export const Subcopy = styled.p`
  color: #D0D0D0;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 1.0625rem;
    white-space: nowrap;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.75rem;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
    gap: 1rem;
    width: auto;
  }
`;

export const MobileLinkLeft = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #C6A75E;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 2px solid #C6A75E;
  background: transparent;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

export const MobileLinkRight = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #C6A75E;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 2px solid #C6A75E;
  background: transparent;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

export const DesktopButtons = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const HeroMedia = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  display: none;
  align-items: flex-end;
  justify-content: center;
  z-index: 1;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    height: 100%;
    max-height: 720px;
    justify-content: flex-end;
  }

  img {
    object-fit: contain;
    object-position: bottom right;
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: 132%;
    max-height: 700px;
    filter: drop-shadow(0 -12px 45px rgba(198, 167, 94, 0.25)) drop-shadow(0 15px 35px rgba(0, 0, 0, 0.85));
  }
`;





