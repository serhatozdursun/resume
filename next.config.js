// next.config.js
module.exports = {
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
