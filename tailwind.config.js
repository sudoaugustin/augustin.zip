/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: { brand: colors.sky, error: colors.red },
      boxShadow: { shine: '0 0 2rem #6d28d9, 0 0 0.8rem #6d28d9, 0 0 2.8rem #6d28d9, inset 0 0 1.3rem #6d28d9' },
      animation: { 'hue-rotate': 'hue-rotate 10s linear infinite' },
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
    require('@tailwindcss/typography'),
    plugin(function ({ theme, addUtilities }) {
      addUtilities({
        '.box-shine': {
          'box-shadow': `0 0 4px #fff, 0 0 4px #fff, 0 0 16px ${theme('colors.violet.700')}, 0 0 12px ${theme(
            'colors.violet.700',
          )}, inset 0 0 20px ${theme('colors.violet.700')}`,
        },
        '.text-shine': {
          'text-shadow': `0 0 4px ${theme('colors.violet.50')}, 0 0 16px ${theme('colors.violet.600')}, 0 0 32px ${theme(
            'colors.violet.600',
          )}`,
        },
        '.text-shine-none': {
          'text-shadow': 'none',
        },
        '.flex-center': {
          'align-items': 'center',
          'justify-content': 'center',
        },
      });
    }),
  ],
};
