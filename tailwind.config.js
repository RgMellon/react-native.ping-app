/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "white-opacity": "rgba(255, 255, 255, 0.2)",
        "ping-yellow": "#f5d21f",
        "ping-gray": "#e4e4e4",
        "ping-black": "#2e2d2d",
      },
    },
  },
  plugins: [],
};
