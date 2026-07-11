/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
