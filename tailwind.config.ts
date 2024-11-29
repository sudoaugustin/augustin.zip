import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
    },
  },
  presets: [createPreset({})],
  content: [
    './app/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,md,mdx}',
    './mdx-components.{ts,tsx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
  plugins: [require('tailwindcss-motion'), require('tailwindcss-shorthand')()],
  darkMode: 'class',
} satisfies Config;
