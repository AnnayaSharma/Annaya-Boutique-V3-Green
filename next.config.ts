import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ananyashopping.site',
      },
      {
        protocol: 'https',
        hostname: 'ananyashopping.site',
      },
    ],
  },
};

export default nextConfig;
