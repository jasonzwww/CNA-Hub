
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'i.pravatar.cc', 'www.car-logos.org', 'ir-racing.s3.amazonaws.com'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
