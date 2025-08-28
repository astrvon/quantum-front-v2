const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  turbopack: {
    resolveAlias: {
      underscore: "lodash",
      mocha: { browser: "mocha/browser-entry.js" },
    },
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
    // moduleIdStrategy is no longer supported here, remove it
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
