const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  experimental: {
    forceSwcTransforms: true,
  },
  // Removed images.domains config as only local images are used
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
});

module.exports = nextConfig;
