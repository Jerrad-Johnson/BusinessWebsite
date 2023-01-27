/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

//TODO Update DOMAIN before build
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'https://businessbackend.jerradjohnson.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'businessbackend.jerradjohnson.com',
        port: '443',
        pathname: '/galleries/**',
      },      {
        protocol: 'https',
        hostname: 'businessbackend.jerradjohnson.com',
        port: '80',
        pathname: '/galleries/**',
      },      {
        protocol: 'https',
        hostname: 'businessbackend.jerradjohnson.com',
        port: '3002',
        pathname: '/galleries/**',
      },
    ],
  },
  env: {
    SERVERURL: process.env.SERVERURL,
  }
}