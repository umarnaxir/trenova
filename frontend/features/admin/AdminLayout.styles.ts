"use client";

import styled from "styled-components";

/** Cards and surfaces — clean white on white admin pages. */
export const ADMIN_CARD_BG = "#FFFFFF";
export const ADMIN_CARD_BORDER = "rgba(198, 167, 94, 0.35)";

export const PageIntro = styled.p`
  margin: 0 0 ${({ theme }) => theme.space[5]};
  max-width: 52rem;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

export const PageGrid = styled.div<{ $cols?: 2 | 3 }>`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: 1fr;
  align-items: stretch;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(${({ $cols = 2 }) => $cols}, minmax(0, 1fr));
  }
`;

/** Light-gold accent titles on white cards — black + gold content. */
export const SmartCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  min-width: 0;
  height: 100%;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[4]}`};
  background: ${ADMIN_CARD_BG};
  border: 1px solid ${ADMIN_CARD_BORDER};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.04);

  ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.space[5]};
  }
`;

export const SmartCardDark = styled(SmartCard)`
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.black} 0%,
    #171717 100%
  );
  border-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 12px 32px rgba(10, 10, 10, 0.18);

  label span {
    color: ${({ theme }) => theme.colors.white} !important;
  }

  input,
  select,
  textarea {
    background: #111111 !important;
    color: ${({ theme }) => theme.colors.white} !important;
    border-color: rgba(255, 255, 255, 0.55) !important;
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.gray500} !important;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.white} !important;
    outline: none;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25);
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
`;

export const CardTitleOnDark = styled(CardTitle)`
  color: ${({ theme }) => theme.colors.gold};
`;

export const CardHint = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.gray600};
`;

export const CardHintOnDark = styled(CardHint)`
  color: ${({ theme }) => theme.colors.gray400};
`;

export const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
  margin-top: 0.35rem;
`;

export const AlignEnd = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const FieldGrid = styled.div<{ $cols?: 1 | 2 }>`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(${({ $cols = 2 }) => $cols}, minmax(0, 1fr));
  }

  input,
  select,
  textarea {
    min-height: 40px !important;
    font-size: 0.875rem !important;
  }

  label {
    gap: 0.3rem;
  }

  label span {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const FullSpan = styled.div`
  grid-column: 1 / -1;
`;

export const SmartCardWide = styled(SmartCard)`
  ${({ theme }) => theme.mediaQueries.md} {
    grid-column: 1 / -1;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[2]};
  padding-top: ${({ theme }) => theme.space[4]};
  border-top: 1px solid ${ADMIN_CARD_BORDER};
`;

export const CompactModalForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};

  input,
  select,
  textarea {
    min-height: 40px !important;
    font-size: 0.875rem !important;
  }

  label {
    gap: 0.3rem;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const MetaLabel = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 700;
`;

export const MetaValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.black};
  word-break: break-word;

  ${SmartCardDark} & {
    color: ${({ theme }) => theme.colors.white};
  }
`;
