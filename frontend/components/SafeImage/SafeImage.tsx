"use client";

import Image from "next/image";

type SafeImageProps = {
  src: string;
  alt: string;
  title?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

function isRemoteOrData(src: string) {
  return (
    src.startsWith("data:") ||
    src.startsWith("blob:") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  );
}

export function SafeImage({
  src,
  alt,
  title,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  style,
}: SafeImageProps) {
  if (isRemoteOrData(src)) {
    return (
      // Uploaded/admin preview images (data URLs) can't use next/image optimizer.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        title={title}
        className={className}
        style={{
          ...style,
          ...(fill
            ? {
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }
            : undefined),
        }}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
    />
  );
}
