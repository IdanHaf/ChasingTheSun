/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'cerise-red': {
          '50': '#fef2f4',
          '100': '#fde6e9',
          '200': '#fbd0d9',
          '300': '#f7aab9',
          '400': '#f27a93',
          '500': '#e63f66',
          '600': '#d42a5b',
          '700': '#b21e4b',
          '800': '#951c45',
          '900': '#801b40',
          '950': '#470a1f',
        },
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
      keyframes: {
        fadeIn: {
          "0%": {
             opacity: 0,
          },
          "100%": { opacity: 1, }
        },
        fadeOut: {
          "0%": { opacity: 1,},
          "100%": { opacity: 0, }
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out', // Adjust the duration as needed
        'fade-out': 'fadeOut 1s ease-in-out' // Adjust the duration as needed
      },
      
    },
  },
  plugins: [
      require("tailwindcss-animate"),
      require('tailwind-scrollbar'),
  ],
}

