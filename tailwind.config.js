/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{js}",
    "./index.html",
  ],
  theme: {
    extend: {
      width: {
        "400px": "400px",
      },
      spacing: {
        "400px": "400px",
      }
    },
  },
  plugins: [],
}
