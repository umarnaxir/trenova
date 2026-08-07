"use client";

import { Container } from "@/components/Container/Container";
import { PageShellRoot } from "@/components/PageShell/PageShell.styles";

type PageShellProps = {
  children: React.ReactNode;
  narrow?: boolean;
};

export function PageShell({ children, narrow }: PageShellProps) {
  return (
    <PageShellRoot>
      <Container narrow={narrow}>{children}</Container>
    </PageShellRoot>
  );
}
