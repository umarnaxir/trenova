"use client";

import { DividerRoot } from "@/components/Divider/Divider.styles";

export function Divider({ tone = "light" }: { tone?: "light" | "gold" | "dark" }) {
  return <DividerRoot $tone={tone} />;
}
