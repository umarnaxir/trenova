"use client";

if (typeof window !== "undefined" && typeof performance !== "undefined" && performance.measure) {
  const originalMeasure = performance.measure.bind(performance);
  performance.measure = (measureName: string, startOrMeasureOptions?: string | PerformanceMeasureOptions, endMark?: string) => {
    try {
      return originalMeasure(measureName, startOrMeasureOptions as any, endMark);
    } catch {
      return undefined as any;
    }
  };
}

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
