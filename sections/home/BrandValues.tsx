"use client";

import { Crown, Shield, Tag } from "lucide-react";
import { Container } from "@/components/Container/Container";
import {
  CardCopy,
  CardHeader,
  CardTitle,
  ValueCard,
  ValuesGrid,
  ValuesRoot,
} from "@/sections/home/BrandValues.styles";

const values = [
  {
    icon: Crown,
    title: "PREMIUM QUALITY",
    copy: "Carefully selected materials for unmatched comfort.",
    highlight: false,
  },
  {
    icon: Shield,
    title: "TRUSTED BY YOU",
    copy: "Thousands of happy customers trust TRENOVA every day.",
    highlight: true,
  },
  {
    icon: Tag,
    title: "AFFORDABLE LUXURY",
    copy: "High quality. Fair prices. Style for everyone.",
    highlight: false,
  },
];

export function BrandValues() {
  return (
    <ValuesRoot aria-label="Brand promotional values">
      <Container>
        <ValuesGrid>
          {values.map(({ icon: Icon, title, copy, highlight }) => (
            <ValueCard key={title} $highlight={highlight}>
              <CardHeader>
                <Icon size={28} strokeWidth={1.5} />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardCopy>{copy}</CardCopy>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Container>
    </ValuesRoot>
  );
}
