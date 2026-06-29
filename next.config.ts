import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
       {
        protocol: 'https',
        hostname: 'api.theveloura.ir',
        port: '8001',
        pathname: '/media/**',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
