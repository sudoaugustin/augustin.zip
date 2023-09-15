import { Manrope } from 'next/font/google';
import { ReactNode } from 'react';
import 'tailwind.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <html
      lang='en'
      className={`${sans.variable} font-sans text-violet-50 bg-black after:fixed after:bg-gradient-to-br after:from-violet-950/50 after:to-blue-950/50 after:inset-0`}
    >
      <head>
        <link rel='icon' type='image/x-icon' href='/favicon.png' />
      </head>
      <body>{children}</body>
    </html>
  );
}
