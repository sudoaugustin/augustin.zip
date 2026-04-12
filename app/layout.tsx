import { GeistMono } from 'geist/font/mono';
import { GeistPixelGrid } from 'geist/font/pixel';
import type { ReactNode } from 'react';
import BGSound from './BGSound';
import { SETTINGS_STORAGE_KEY } from './consts';
import './index.css';
import PaperTexture from './PaperTexture';
import Providers from './Providers';
import SettingsPopup from './SettingsPopup';

type Props = {
  children: ReactNode;
};

const preloadScript = `
  (function() {
    try {
      const settings = localStorage.getItem('${SETTINGS_STORAGE_KEY}');
      if(settings){
        const parsedSettings = JSON.parse(settings);
        if(parsedSettings.fontSize){
          document.documentElement.style.setProperty('--font-size', \`\${parsedSettings.fontSize}px\`);
        }
        if(parsedSettings.grayscale){
          document.documentElement.classList.add('grayscale');
        }
      }
    } catch (_) {}
  })();
`;

export default function AppLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={`${GeistPixelGrid.variable} ${GeistMono.variable} bg-theme-50 font-sans text-sm duration-500 lg:text-[length:--font-size]`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
      </head>

      <body className="relative w-full bg-theme-50 text-theme-950 antialiased duration-500 selection:bg-theme-200/75">
        <Providers>
          <div className="motion-preset-blur-up motion-duration-500 lg:motion-duration-1000 mx-auto w-screen max-w-3xl px-5 py-10 lg:py-20">
            {children}
          </div>
          <PaperTexture />
          <SettingsPopup />
          <BGSound />
        </Providers>
      </body>
    </html>
  );
}
