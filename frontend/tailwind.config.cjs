/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D569E", //It case-sensitive default != DEFAULT
          50: "#F6F9FF",
          100: "#BFD8FF",
        },
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
