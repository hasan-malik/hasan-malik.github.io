/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        apple: {
          dark: '#1D1D1F',
          gray: '#86868B',
          light: '#F5F5F7',
          blue: '#0071E3',
          border: '#D2D2D7',
        },
      },
    },
  },
  plugins: [],
}
