/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'poke-red': '#DF2028',
        'poke-blue': '#2D4488',
        'poke-yellow': '#FFCC00',
        'poke-gray': '#E0E0E0',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
};