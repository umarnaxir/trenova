"use client";

import { Truck, Award, RotateCcw, Lock } from "lucide-react";
import { Container } from "@/components/Container/Container";
import {
  Item,
  ItemCopy,
  ItemTitle,
  TrustBox,
  TrustRoot,
} from "@/sections/home/TrustBar.styles";

const items = [
  {
    icon: Truck,
    title: "FREE SHIPPING",
    copy: "On orders above ₹999",
  },
  {
    icon: Award,
    title: "PREMIUM QUALITY",
    copy: "Carefully crafted for you",
  },
  {
    icon: RotateCcw,
    title: "EASY RETURNS",
    copy: "7-Day return policy",
  },
  {
    icon: Lock,
    title: "SECURE PAYMENTS",
    copy: "100% safe & secure",
  },
] as const;

export function TrustBar() {
  return (
    <TrustRoot aria-label="Store benefits">
      <Container>
        <TrustBox>
          {items.map(({ icon: Icon, title, copy }) => (
            <Item key={title}>
              <Icon size={24} strokeWidth={1.5} />
              <div>
                <ItemTitle>{title}</ItemTitle>
                <ItemCopy>{copy}</ItemCopy>
              </div>
            </Item>
          ))}
        </TrustBox>
      </Container>
    </TrustRoot>
  );
}

