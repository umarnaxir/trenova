"use client";

import { Shell } from "@/components/layout/StorefrontShell/StorefrontShell.styles";

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
