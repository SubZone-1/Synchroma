/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/assets/**/*.js",
    "src/template.html",
    "node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      colors: {
        "themeOrange": "#f98f26",
        "themeBlack": "#1f2937",
      },
      width: {
        "400px": "400px",
      },
      spacing: {
        "35px": "35px",
        "400px": "400px",
      },
      scale: {
        "1125": "1.125",
        "1050": "1.050",
      },
      transitionProperty: {
        "width": "width",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ]
}
