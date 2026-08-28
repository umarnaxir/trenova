"use client";

import { BadgeRoot, type BadgeTone } from "@/components/Badge/Badge.styles";

type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};

export function Badge({ children, tone = "gold" }: BadgeProps) {
  return <BadgeRoot $tone={tone}>{children}</BadgeRoot>;
}
