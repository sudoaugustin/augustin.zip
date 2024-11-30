import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import FloatingButton from './FloatingButton';
import './index.css';

const mono = localFont({ src: './DepartureMono-Regular.woff2', variable: '--font-mono', display: 'swap' });
const sans = localFont({ src: './CabinetGrotesk-Variable.woff2', variable: '--font-sans', display: 'swap' });

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} font-sans dark`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body className="w-full bg-zinc-50 text-black dark:bg-zinc-950 dark:text-white lg:text-lg duration-500">
        {children}
        <FloatingButton />
      </body>
    </html>
  );
}
