'use client';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { AudioProvider } from './contexts/Audio';
import { SettingsProvider } from './contexts/Settings';
import { Tooltip } from 'radix-ui';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <Tooltip.Provider>
        <ThemeProvider attribute="class" themes={['light', 'dark', 'custom']} defaultTheme="dark">
          <AudioProvider>{children}</AudioProvider>
        </ThemeProvider>
      </Tooltip.Provider>
    </SettingsProvider>
  );
}
