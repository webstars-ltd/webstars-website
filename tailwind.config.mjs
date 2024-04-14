/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontSize: {
      ...defaultTheme.fontSize,
    },
		extend: {
		  fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
        headings: ['Bitter', ...defaultTheme.fontFamily.serif],
        bitter: ['Bitter', ...defaultTheme.fontFamily.serif],
        base: [...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      colors: {
        brand: {
          primary: {
            900: '#329999',
          },
          secondary: {
            900: '#294f82',
          },
          dark: {
            900: '#0e314c',
            500: '#777a7b',
            100: '#ababab',
          },
          gray: {
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
            color: theme('colors.brand.dark.500'),
            a: {
              color: theme('colors.brand.dark.900'),
              '&:hover': {
                color: theme('colors.brand.primary.900'),
              },
            },
          },
        },
      }
    ),
	},
	plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
