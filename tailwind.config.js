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
        "themeOrangeGradient": "linear-gradient(0deg, rgba(172,99,26,1) 0%, rgba(249,143,38,0.7961309523809523) 1%, rgba(255,255,255,1) 100%",
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
        "1100": "1.100",
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
