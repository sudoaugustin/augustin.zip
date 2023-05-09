import PopupCenter from 'layouts/popup-center';
import { Azeret_Mono, Josefin_Slab, Manrope } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import 'tailwind.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Azeret_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Josefin_Slab({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body>
        {children}
        <PopupCenter />
        <Toaster visibleToasts={5} />
      </body>
    </html>
  );
}
