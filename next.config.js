/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/:tab(hongson|friends|font|plugins|contact)',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;

