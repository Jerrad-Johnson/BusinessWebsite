/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

//TODO Update DOMAIN before build
module.exports = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: false,
  },
  images: {
    domains: ['localhost', 'businessbackend.jerradjohnson.com'],
/*    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'businessbackend.jerradjohnson.com',
        port: '443',
        pathname: '/galleries/!**',
      },      {
        protocol: 'https',
        hostname: 'businessbackend.jerradjohnson.com',
        port: '80',
        pathname: '/galleries/!**',
      },      {
        protocol: 'https',
        hostname: 'businessbackend.jerradjohnson.com',
        port: '3002',
        pathname: '/galleries/!**',
      },      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '',
      },      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '**',
      },
    ],*/
  },
  env: {
    SERVERURL: process.env.SERVERURL,
  }
}