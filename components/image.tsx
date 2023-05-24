'use client';
import { VariantProps, cva } from 'class-variance-authority';
import Img, { ImageProps } from 'next/image';
import { useState } from 'react';
import { screens } from 'utils/const';

type Props = Omit<ImageProps, 'alt' | 'sizes'> & {
  alt?: string;
  size?: number | [number, number];
  sizes?: { sm?: string; md?: string; lg?: string; xl?: string; '2xl'?: string };
};

const classes = cva('object-cover object-center ease-linear bg-white', {
  variants: {
    state: {
      error: 'cursor-not-allowed',
      loading: 'blur-md animate-pulse',
      success: 'blur-none duration-200',
    },
  },
});

export default function Image({ alt = ' ', size, sizes, className, ...rest }: Props) {
  const [state, setState] = useState<VariantProps<typeof classes>['state']>('loading');

  const $sizes = sizes
    ? Object.entries(sizes).reduce((str, [screen, width]) => {
        const $media = screens[screen as keyof typeof screens];
        return `(min-width: ${$media}px) ${width}, ${str}`;
      }, '100vw')
    : undefined;

  const [width, height] = Array.isArray(size) ? size : [size, size];

  return (
    <Img
      {...rest}
      alt={alt}
      sizes={$sizes}
      width={width}
      height={height}
      className={classes({ state, className })}
      onError={() => setState('error')}
      onLoadingComplete={() => setState('success')}
    />
  );
}

export type { Props as ImageProps };
