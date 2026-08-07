"use client";

import Image from "next/image";
import { LogoImageWrap, LogoLink } from "@/components/Logo/Logo.styles";
import { SITE } from "@/constants/site";

type LogoProps = {
  variant?: "full" | "nav";
  height?: number;
  href?: string;
};

export function Logo({
  variant = "nav",
  height = 40,
  href = "/",
}: LogoProps) {
  const src = variant === "full" ? "/logo/logo.png" : "/logo/navlogo.png";

  return (
    <LogoLink href={href} aria-label={`${SITE.name} home`}>
      <LogoImageWrap $height={height}>
        <Image
          src={src}
          alt={SITE.name}
          width={variant === "full" ? 180 : 140}
          height={height}
          priority
        />
      </LogoImageWrap>
    </LogoLink>
  );
}
