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
      backgroundImage: {
        'gradient-matcha': 'linear-gradient(-45deg, #E6EFE9, #A7C4A0)',
      },
      animation: {
        'gradient-move': 'gradientMove 4s ease infinite',
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
