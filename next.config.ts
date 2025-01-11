import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "**",
        pathname: "**",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
