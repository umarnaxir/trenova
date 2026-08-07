"use client";

import { SkeletonRoot } from "@/components/Skeleton/Skeleton.styles";

type SkeletonProps = {
  width?: string;
  height?: string;
  radius?: string;
};

export function Skeleton({ width, height, radius }: SkeletonProps) {
  return <SkeletonRoot $width={width} $height={height} $radius={radius} />;
}
