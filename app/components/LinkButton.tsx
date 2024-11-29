import Link, { type LinkProps } from 'next/link';
import type { HTMLAttributes } from 'react';

export default function LinkButton({ className, ...rest }: LinkProps & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      {...rest}
      className={`bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 duration-500 text-sm/none lg:text-base/none px-3 py-1 rounded-full font-medium ${className}`}
    />
  );
}
