/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "matcha-offwhite": "#E6EFE9",
        "matcha-light": "#C2EABA",
        "matcha-med": "#A7C4A0",
        "matcha-taupe": "#8F8389",
      },
    },
  },
  plugins: [],
};
