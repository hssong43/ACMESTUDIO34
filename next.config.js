/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fix for StackBlitz filesystem errors
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
