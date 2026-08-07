import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Allow LAN access during local development (e.g. http://192.168.1.4:3000)
  allowedDevOrigins: ["192.168.1.4"],
};

export default nextConfig;
