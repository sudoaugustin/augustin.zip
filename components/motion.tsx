'use client';
import { useInView } from 'framer-motion';
import { ReactHTML, createElement, useRef } from 'react';
import { cssvars } from 'utils';

type Props<T extends keyof ReactHTML> = {
  as?: T;
  delay?: number;
  options?: Parameters<typeof useInView>['1'];
} & (T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : unknown);

export default function Motion<T extends keyof ReactHTML = 'div'>({
  as,
  style,
  options,
  children,
  delay = 0,
  className,
  ...rest
}: Props<T>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, ...options });

  return createElement(
    as || 'div',
    {
      ref,
      style: { ...cssvars({ t: '0.5s', d: `${delay}s` }), ...style },
      className: `scale-0 ${isInView && 'animate-scale-in'} ${className}`,
      ...rest,
    },
    children,
  );
}

export type { Props as MotionProps };
