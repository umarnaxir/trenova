"use client";

import { LoaderRoot, LoaderWrap } from "@/components/Loader/Loader.styles";

export function Loader({ centered = true }: { centered?: boolean }) {
  if (!centered) return <LoaderRoot aria-label="Loading" role="status" />;
  return (
    <LoaderWrap>
      <LoaderRoot aria-label="Loading" role="status" />
    </LoaderWrap>
  );
}
