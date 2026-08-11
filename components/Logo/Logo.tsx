"use client";

import Image from "next/image";
import { LogoImageWrap, LogoLink } from "@/components/Logo/Logo.styles";
import { SITE } from "@/constants/site";

/** Hard cap — logo must never render larger than this. */
const MAX_LOGO_HEIGHT = 40;
const DEFAULT_LOGO_HEIGHT = 36;

type LogoProps = {
  height?: number;
  href?: string;
};

export function Logo({ height = DEFAULT_LOGO_HEIGHT, href = "/" }: LogoProps) {
  const resolvedHeight = Math.min(Math.max(height, 1), MAX_LOGO_HEIGHT);
  const width = Math.round(resolvedHeight * 1.03);

  return (
    <LogoLink href={href} aria-label={`${SITE.name} home`}>
      <LogoImageWrap $height={resolvedHeight}>
        <Image
          src="/logo/logo.png"
          alt={SITE.name}
          width={width}
          height={resolvedHeight}
          priority
        />
      </LogoImageWrap>
    </LogoLink>
  );
}
