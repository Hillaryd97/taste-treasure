/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#010104",
        background: "#ffffff",
        primary: "#181977",
        secondary: "#b9b9ef",
        accent: "#2426b6",
      },
      fontFamily: {
        "playfair-display": ["Playfair Display", 'serif'],
        roboto: ["Roboto", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
