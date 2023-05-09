/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: { brand: colors.sky, error: colors.red },
      boxShadow: {
        neon: '0 0 0 2px #fff, 0 0 0 2px var(--color), 0 0 24px var(--color), 0 0 12px var(--color), 0 0 36px var(--color)',
      },
      transitionDelay: { 0: '0ms' },
      transitionDuration: { 250: '250ms', 350: '350ms', 400: '400ms' },
    },
    fontFamily: {
      mono: ['var(--font-mono)', ...fontFamily.mono],
      sans: ['var(--font-sans)', ...fontFamily.sans],
      serif: ['var(--font-serif)', ...fontFamily.serif],
    },
  },
  content: [
    './app/**/*.{ts,tsx}',
    './icons/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './layouts/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  plugins: [
    require('tailwindcss-radix'),
    require('tailwindcss-animate'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-shine': {
          'text-shadow': '0 0 0.25rem rgb(255,255,255)',
        },
        '.text-shine-md': {
          'text-shadow': '0 0 0.5rem rgb(255,255,255), 0 0 1rem rgb(255,255,255)',
        },
        '.flex-center': {
          'align-items': 'center',
          'justify-content': 'center',
        },
      });
    }),
  ],
};
