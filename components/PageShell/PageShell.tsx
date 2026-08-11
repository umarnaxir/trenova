"use client";

import { Container } from "@/components/Container/Container";
import { PageShellRoot } from "@/components/PageShell/PageShell.styles";

type PageShellProps = {
  children: React.ReactNode;
  narrow?: boolean;
  compact?: boolean;
};

export function PageShell({ children, narrow, compact }: PageShellProps) {
  return (
    <PageShellRoot $compact={compact}>
      <Container narrow={narrow}>{children}</Container>
    </PageShellRoot>
  );
}
