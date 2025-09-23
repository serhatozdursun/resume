const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  experimental: {
    forceSwcTransforms: true,
  },
  allowedDevOrigins: ['192.168.0.197', 'localhost', '127.0.0.1'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
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
