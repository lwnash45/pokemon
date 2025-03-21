/** @type {import('next').NextConfig} */
const nextConfig = {
  // This allows all routes to be handled by the same page component
  // So React Router can take over
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};

module.exports = nextConfig;
