import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/chat",
        destination: "/api/index",
      },
      {
        source: "/api/history/:path*",
        destination: "/api/index",
      },
    ];
  },
};

export default nextConfig;
