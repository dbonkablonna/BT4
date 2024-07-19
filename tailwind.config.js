/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Các file JavaScript và TypeScript
    "./src/**/*.{scss,sass}", // Các file SCSS
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#6e6b6b",
        "color-div: ": "#6e6b6b",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
