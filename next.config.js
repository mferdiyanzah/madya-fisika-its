/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
  secret: 'MADYA123456678'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  },
  experimental: {
    images: {
      unoptimized: true
    }
  },
  images: {
    domains: ['ik.imagekit.io']
  }
}

module.exports = nextConfig
