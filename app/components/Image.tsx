'use client';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';

export default function Image({ className, ...rest }: NextImageProps) {
  return (
    <NextImage
      {...rest}
      className={`opacity-0 state-loaded:opacity-100 duration-500 ${className}`}
      onLoad={(e) => {
        (e.target as HTMLImageElement).dataset.state = 'loaded';
      }}
    />
  );
}
