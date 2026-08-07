"use client";

import { Container } from "@/components/Container/Container";
import {
  SectionHeader,
  SectionRoot,
} from "@/components/Section/Section.styles";
import { Text } from "@/components/Text/Text";

type SectionProps = {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "light" | "dark" | "cream";
  id?: string;
  action?: React.ReactNode;
};

export function Section({
  children,
  eyebrow,
  title,
  description,
  tone = "light",
  id,
  action,
}: SectionProps) {
  return (
    <SectionRoot id={id} $tone={tone}>
      <Container>
        {(eyebrow || title || description || action) && (
          <SectionHeader>
            {eyebrow ? (
              <Text as="span" variant="eyebrow">
                {eyebrow}
              </Text>
            ) : null}
            {title ? (
              <Text
                as="h2"
                variant="h2"
                color={tone === "dark" ? "white" : "black"}
              >
                {title}
              </Text>
            ) : null}
            {description ? (
              <Text
                color={tone === "dark" ? "gray300" : "gray600"}
                style={{ maxWidth: 540 }}
              >
                {description}
              </Text>
            ) : null}
            {action}
          </SectionHeader>
        )}
        {children}
      </Container>
    </SectionRoot>
  );
}
