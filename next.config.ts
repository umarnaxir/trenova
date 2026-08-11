import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Allow LAN access during local development (e.g. http://192.168.1.4:3000)
  allowedDevOrigins: ["192.168.1.11", "172.20.10.11"],
};

export default nextConfig;
