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
  },
  env: {
    SERVERURL: process.env.SERVERURL,
  }
}