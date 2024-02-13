/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    fontFamily: {
      mono: ['var(--font-mono)', ...fontFamily.mono],
      sans: ['var(--font-sans)', ...fontFamily.sans],
      serif: ['var(--font-serif)', ...fontFamily.serif],
    },
  },
  content: ['./app/**/*.{ts,tsx}'],
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': {
          'align-items': 'center',
          'justify-content': 'center',
        },
      });
    }),
  ],
};
