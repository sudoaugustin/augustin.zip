/** @type {import('next').NextConfig} */
const createMDX = require('@next/mdx');

const nextConfig = {
  images: { domains: [] },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
