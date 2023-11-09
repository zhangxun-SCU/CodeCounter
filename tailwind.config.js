/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        '1/2': '50vh'
      }
    },
  },
  plugins: [],
}

