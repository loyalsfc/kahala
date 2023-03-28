/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = {
  nextConfig,
  images: {
    domains: ['api.lorem.space', 'firebasestorage.googleapis.com', 'placeimg.com', 'picsum.photos', "t1.gstatic.com"],
  },
}
