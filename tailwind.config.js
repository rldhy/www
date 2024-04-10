// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#FFFBF7',
          100: '#FFE7D0',
          200: '#FFD4A9',
          300: '#FFC081',
          400: '#FFAD5A',
          500: '#FF9933',
          600: '#E47200',
          700: '#BC5E00',
          800: '#954B00',
          900: '#6E3700',
          950: '#472300',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '600',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h2: {
              fontWeight: '500',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '400',
            },
            code: {
              color: theme('colors.indigo.700'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.indigo.500') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
