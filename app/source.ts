import { docs, meta } from '.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

export const source = loader({
  baseUrl: '/writings',
  source: createMDXSource(docs, meta),
});
