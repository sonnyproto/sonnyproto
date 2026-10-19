/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/video-blog/cats", destination: "/video-blog/catknight", permanent: true }
    ];
  }
};

export default nextConfig;
