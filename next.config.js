/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  ...nextConfig,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        remotes: {
          profile: `profile@${process.env.PROFILE_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,

          teams: `teams@${process.env.TEAMS_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,

          poll: `poll@${process.env.POLL_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
      })
    );

    return config;
  },
};
