/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    {
      pattern: /py-\b([1-9]|[12][0-9]|20)\b/gi,
    },
    {
      pattern: /columns-\b([1-9]|10)\b/gi,
    },
    {
      pattern: /ws-.*/gi,
    },
  ],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        headings: ['Bitter', ...defaultTheme.fontFamily.serif],
        bitter: ['Bitter', ...defaultTheme.fontFamily.serif],
        base: [...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '5.5xl': '67rem',
        '8xl': '90rem',
        '9xl': '100rem',
      },
      fontSize: {
        '4.25xl': '2.5rem',
        '5.25xl': '3.25rem',
        '5.5xl': '3.5rem',
      },
      lineHeight: {
        11: '3rem',
        12: '3.5rem',
        13: '4rem',
        14: '4.5rem',
        15: '5rem',
      },
      colors: {
        brand: {
          black: {
            900: '#333',
            800: '#2d2d2d',
            700: '#0e1828',
          },
          primary: {
            900: '#329999',
            500: '#63adad',
            300: '#57b6b6',
          },
          secondary: {
            900: '#294f82',
            700: '#1d3e8b',
            100: '#3fa0d71f',
          },
          third: {
            900: '#93528e',
          },
          dark: {
            900: '#0e314c',
            500: '#777a7b',
            200: '#e2e7e8',
            100: '#ababab',
          },
          gray: {
            900: '#393939',
            800: '#6F6D6F',
            700: '#818081',
            600: '#939293',
            500: '#A5A4A5',
            400: '#B7B6B7',
            300: '#C9C8C9',
            200: '#DBDBDB',
            100: '#EDEDED',
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.brand.black.700'),
            fontWeight: '400',
            a: {
              color: theme('colors.brand.dark.900'),
              '&:hover': {
                color: theme('colors.brand.primary.900'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
