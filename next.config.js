/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['serhatozdursun.com'],
  },
  compiler: {
    // Enable styled-components support
    styledComponents: true,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // for webpack 5
        module: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
