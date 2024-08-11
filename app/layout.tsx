import localFont from 'next/font/local';
import 'index.css';
import type { ReactNode } from 'react';

const sans = localFont({ src: './ClashGrotesk-Variable.woff2', variable: '--font-sans', display: 'swap' });

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <html lang="en" className={`${sans.variable} font-sans text-slate-200 bg-slate-950`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body className="text-sm max-w-2xl mx-auto px-5 py-10 lg:py-20 hover:[&_a]:underline animate-in duration-500 fade-in-5 slide-in-from-bottom-5">
        {children}
      </body>
    </html>
  );
}
