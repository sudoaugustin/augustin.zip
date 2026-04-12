import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: [], remotePatterns: [{ protocol: 'https', hostname: 'image.api.playstation.com' }] },
};

export default withMDX(nextConfig);
