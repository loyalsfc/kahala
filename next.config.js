/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = {
  nextConfig,
  images: {
    domains: ['api.lorem.space', 
    'firebasestorage.googleapis.com', 
    'placeimg.com', 
    'picsum.photos', 
    "t1.gstatic.com", 
    "imgflip.com", 
    'static.wikia.nocookie.net', 
    't4.ftcdn.net', 
    "cdn.pixabay.com",
    "platzi.com",
    "wikiwikiexample.pythonanywhere.com",
    "imgs.search.brave.com",
  ],
  },
}
