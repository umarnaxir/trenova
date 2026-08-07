"use client";

import Image from "next/image";
import { LogoImageWrap, LogoLink } from "@/components/Logo/Logo.styles";
import { SITE } from "@/constants/site";

type LogoProps = {
  height?: number;
  href?: string;
};

export function Logo({ height = 40, href = "/" }: LogoProps) {
  const width = Math.round(height * 1.03);

  return (
    <LogoLink href={href} aria-label={`${SITE.name} home`}>
      <LogoImageWrap $height={height}>
        <Image
          src="/logo/logo.png"
          alt={SITE.name}
          width={width}
          height={height}
          priority
        />
      </LogoImageWrap>
    </LogoLink>
  );
}
