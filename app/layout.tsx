import 'index.css';
import { Onest } from 'next/font/google';
import { ReactNode } from 'react';

const sans = Onest({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <html lang="en" className={`${sans.variable} font-sans text-white bg-black`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body className="bg-gradient-to-br from-slate-500/50 to-slate-700/50 text-sm relative">
        {children}
        <svg className="hidden">
          <title>Noise</title>
          <filter id="noise">
            <feTurbulence type="turbulence" baseFrequency={0.5} />
          </filter>
        </svg>
        <i style={{ filter: 'url(#noise)' }} className="absolute inset-0 w-full h-full mix-blend-multiply" />
      </body>
    </html>
  );
}
