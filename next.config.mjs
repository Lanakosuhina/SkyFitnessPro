/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/course',
        destination: '/',
        permanent: true,
      },
      {
        source: '/workout',
        destination: '/',
        permanent: true,
      },
      {
        source: '/selection',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
