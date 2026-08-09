"use client";

import styled from "styled-components";

export const PageRoot = styled.div`
  background: ${({ theme }) => theme.colors.offWhite};
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => `${theme.space[10]} 0 ${theme.space[9]}`};
  background:
    radial-gradient(
      ellipse at top right,
      rgba(198, 167, 94, 0.18),
      transparent 50%
    ),
    linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.black} 0%,
      ${({ theme }) => theme.colors.blackSoft} 55%,
      ${({ theme }) => theme.colors.blackMuted} 100%
    );
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => `${theme.space[13]} 0 ${theme.space[11]}`};
  }
`;

export const HeroInner = styled.div`
  width: 100%;
  max-width: none;
`;

export const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.widest};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

export const HeroTitle = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space[4]};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: ${({ theme }) => theme.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const HeroLead = styled.p`
  margin: 0;
  max-width: 64ch;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export const Body = styled.div`
  padding: ${({ theme }) => `${theme.space[8]} 0 ${theme.space[13]}`};
`;

export const Main = styled.div`
  width: 100%;
  min-width: 0;
  display: grid;
  gap: ${({ theme }) => theme.space[8]};
`;

export const Section = styled.section`
  scroll-margin-top: ${({ theme }) => theme.space[8]};
`;

export const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space[4]};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
`;

export const Prose = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.gray700};
  width: 100%;
  max-width: none;

  p,
  li {
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }

  ul,
  ol {
    display: grid;
    gap: ${({ theme }) => theme.space[2]};
    padding-left: ${({ theme }) => theme.space[5]};
  }

  strong {
    color: ${({ theme }) => theme.colors.black};
  }

  a {
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const InfoCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  transition: border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    transform: translateY(-2px);
  }
`;

export const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.gold};
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
`;

export const CardBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray600};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[7]};
  }
`;

export const AccordionItem = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};

  &[open] summary {
    color: ${({ theme }) => theme.colors.black};
  }

  summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space[4]};
    align-items: center;
    padding: ${({ theme }) => `${theme.space[4]} 0`};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.gray700};
    transition: color ${({ theme }) => theme.transitions.fast};

    &::-webkit-details-marker {
      display: none;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.goldDark};
    }
  }

  p {
    margin: 0 0 ${({ theme }) => theme.space[4]};
    color: ${({ theme }) => theme.colors.gray600};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    max-width: none;
  }
`;

export const MapFrame = styled.div`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.gray100};
  height: 200px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 240px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;

export const ContactSplit = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: 1fr;
  align-items: stretch;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
  }
`;

export const SplitPanel = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[7]};
  }
`;

export const VisitMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};
  flex: 1;
`;

export const VisitActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space[5]};
`;

export const VisitItem = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[1]};

  strong {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray500};
  }

  p,
  a {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray700};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const PolicyStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
`;

export const PolicyBlock = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => `${theme.space[6]} ${theme.space[7]}`};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }

  h3 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.black};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray600};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  a {
    color: ${({ theme }) => theme.colors.goldDark};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const SocialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
`;

export const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  text-decoration: none;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.gold};
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Chevron = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  color: ${({ theme }) => theme.colors.black};
  transition: transform ${({ theme }) => theme.transitions.base};

  ${AccordionItem}[open] & {
    transform: rotate(45deg);
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.gold};
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 560px;

  th,
  td {
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  th {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }

  tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover td {
    background: rgba(198, 167, 94, 0.08);
  }
`;

export const TabRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[5]};
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.black : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.gray700};
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.space[4]};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.black};
  }
`;

export const Steps = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: ${({ theme }) => theme.space[4]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Step = styled.li`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export const StepIndex = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.gold};
`;

export const CtaBand = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space[6]};
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
`;
