'use client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function FloatingButton() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem('isDark');
    isDark && setIsDark(JSON.parse(isDark) as boolean);
  }, []);

  useEffect(() => {
    localStorage.setItem('isDark', `${isDark}`);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [isDark]);

  return (
    <button
      type="button"
      className="flex flex-center fixed bottom-5 right-5 lg:bottom-10 lg:right-10 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 a-10 rounded-full motion-preset-slide-up motion-delay-500"
      onClick={() => setIsDark((isDark) => !isDark)}
    >
      {isDark ? <SunIcon className="w-5" /> : <MoonIcon className="w-5" />}
    </button>
  );
}
