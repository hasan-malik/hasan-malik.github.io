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
          dark:   '#f5f5f7',   // primary text (light on dark bg)
          gray:   '#8e8e93',   // secondary text
          light:  '#1c1c2e',   // card / section backgrounds
          blue:   '#2997ff',   // accent — Apple's dark-mode blue
          border: '#2c2c3e',   // borders
          bg:     '#09090f',   // page background
        },
      },
    },
  },
  plugins: [],
}
