import type { MDXComponents } from 'mdx/types';
// import React from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // h2: (props) => <h2 {...props} />,
    // h3: (props) => <h3 {...props} />,
  };
}
