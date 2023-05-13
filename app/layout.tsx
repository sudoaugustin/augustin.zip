import { Manrope } from 'next/font/google';
import { ReactNode } from 'react';
import 'tailwind.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <html lang="en" style={{ color: '#fff' }} className={`${sans.variable} font-sans`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
