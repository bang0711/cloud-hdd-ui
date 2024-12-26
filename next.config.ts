import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [{
      hostname: '**',
      pathname: '**',
      protocol: 'https',

    },{
      hostname: '**',
      pathname: '**',
      protocol: 'http',
      
    }]
  }
};

export default nextConfig;
