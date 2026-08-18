/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#000",
        ink: "#f5f5f5",
        muted: "#666",
        accent: "#e10600",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Anton", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};