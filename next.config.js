/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io',"cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
