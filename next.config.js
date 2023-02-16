/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "images.unsplash.com",
      "www.willow-car-sales.co.uk",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],

    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com",
      // },
    ],
  },
};

module.exports = nextConfig;
