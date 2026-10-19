/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/video-blog/cats", destination: "/video-blog/knight", permanent: true },
      { source: "/video-blog/catknight", destination: "/video-blog/knight", permanent: true }
    ];
  }
};

export default nextConfig;
