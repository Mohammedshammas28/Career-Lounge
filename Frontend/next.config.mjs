/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: '/control-panel/:path*',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/control-panel',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
