/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  images: {
    domains: ["tailwindui.com", "images.unsplash.com", "api.pagar.me"],
  },
};

module.exports = nextConfig;
