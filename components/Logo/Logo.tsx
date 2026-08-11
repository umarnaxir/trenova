"use client";

import Image from "next/image";
import { LogoImageWrap, LogoLink } from "@/components/Logo/Logo.styles";
import { SITE } from "@/constants/site";

/** Hard cap — logo must never render larger than this. */
const MAX_LOGO_HEIGHT = 72;
const DEFAULT_LOGO_HEIGHT = 52;

const LOGO_VARIANTS = {
  nav: {
    src: "/logo/nav-logo.png",
    aspect: 1600 / 832,
  },
  mark: {
    src: "/logo/logo.png",
    aspect: 1068 / 1040,
  },
} as const;

type LogoVariant = keyof typeof LOGO_VARIANTS;

type LogoProps = {
  height?: number;
  href?: string;
  variant?: LogoVariant;
};

export function Logo({
  height = DEFAULT_LOGO_HEIGHT,
  href = "/",
  variant = "nav",
}: LogoProps) {
  const { src, aspect } = LOGO_VARIANTS[variant];
  const resolvedHeight = Math.min(Math.max(height, 1), MAX_LOGO_HEIGHT);
  const width = Math.round(resolvedHeight * aspect);

  return (
    <LogoLink href={href} aria-label={`${SITE.name} home`}>
      <LogoImageWrap $height={resolvedHeight} $aspect={aspect}>
        <Image
          src={src}
          alt={SITE.name}
          width={width}
          height={resolvedHeight}
          priority
        />
      </LogoImageWrap>
    </LogoLink>
  );
}
