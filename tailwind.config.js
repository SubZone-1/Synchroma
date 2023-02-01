/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{js}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      colors: {
        "themeOrange": "#f98f26",
      },
      width: {
        "400px": "400px",
      },
      spacing: {
        "35px": "35px",
        "400px": "400px",
      }
    },
  },
  plugins: [],
}
