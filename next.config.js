await import("./src/env.js");

/** @type {import("next").NextConfig} */

const nextConfig = {
    images: {
        domains: ["picsum.photos"],
      },
};

module.exports = nextConfig
