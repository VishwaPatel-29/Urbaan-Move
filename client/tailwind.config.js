/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          DEFAULT: '#000000',
        },
        secondary: {
          teal: '#008080',
          lightTeal: '#00B4B4',
          DEFAULT: '#008080',
        },
        accent: {
          lightPink: '#FFB6C1',
          darkPink: '#C2185B',
          DEFAULT: '#FFB6C1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}