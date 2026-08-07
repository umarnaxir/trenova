"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastHost } from "@/components/Toast/Toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        {children}
        <ToastHost />
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
