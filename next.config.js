/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig, {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digimon-api.com',
        port: '',
        pathname: '/images/digimon/',
      },
    ],
  },
}
