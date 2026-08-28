"use client";

import {
  Award,
  IndianRupee,
  Lock,
  RotateCcw,
  Truck,
} from "lucide-react";
import {
  Item,
  ItemCopy,
  ItemTitle,
  TrustBox,
  TrustRoot,
} from "@/sections/home/TrustBar.styles";

const items = [
  {
    icon: Award,
    title: "Premium Quality",
    copy: "Best Materials",
  },
  {
    icon: IndianRupee,
    title: "Affordable Prices",
    copy: "Value for Money",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    copy: "Across India",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    copy: "Hassle Free",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    copy: "100% Safe",
  },
] as const;

export function TrustBar() {
  return (
    <TrustRoot aria-label="Store benefits">
      <TrustBox>
        {items.map(({ icon: Icon, title, copy }) => (
          <Item key={title}>
            <Icon size={22} strokeWidth={1.5} />
            <div>
              <ItemTitle>{title}</ItemTitle>
              <ItemCopy>{copy}</ItemCopy>
            </div>
          </Item>
        ))}
      </TrustBox>
    </TrustRoot>
  );
}
