import { createPreset } from 'fumadocs-ui/tailwind-plugin';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  theme: {
    colors: {
      theme: {
        0: 'oklch(var(--color-theme-0) / <alpha-value>)',
        50: 'oklch(var(--color-theme-50) / <alpha-value>)',
        100: 'oklch(var(--color-theme-100) / <alpha-value>)',
        200: 'oklch(var(--color-theme-200) / <alpha-value>)',
        300: 'oklch(var(--color-theme-300) / <alpha-value>)',
        400: 'oklch(var(--color-theme-400) / <alpha-value>)',
        500: 'oklch(var(--color-theme-500) / <alpha-value>)',
        600: 'oklch(var(--color-theme-600) / <alpha-value>)',
        700: 'oklch(var(--color-theme-700) / <alpha-value>)',
        800: 'oklch(var(--color-theme-800) / <alpha-value>)',
        900: 'oklch(var(--color-theme-900) / <alpha-value>)',
        950: 'oklch(var(--color-theme-950) / <alpha-value>)',
        1000: 'oklch(var(--color-theme-1000) / <alpha-value>)',
      },
      brand: colors.rose,
    },
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
