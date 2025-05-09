/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#f8f5e6',
          dark: '#1a1814'
        },
        ink: {
          light: '#433422',
          dark: '#d4c8b8'
        },
        accent: {
          light: '#9c8b7a',
          dark: '#7a6c5d'
        }
      }
    },
  },
  plugins: [require("daisyui")],
};
