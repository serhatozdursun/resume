// next.config.js
module.exports = {
    experimental: {
        forceSwcTransforms: true,
    },
    images: {
        domains: ['serhatozdursun.com'],
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
