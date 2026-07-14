/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./assets/js/*.js", "!./node_modules/**"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0c0b",
        surface: "#171b15",
        "brand-green": {
          DEFAULT: "#1b4729",
          light: "#28613a",
          dark: "#0f2e19",
        },
        "brand-gold": {
          DEFAULT: "#f0b429",
          light: "#f8cc5c",
          dark: "#c98f12",
        },
        cream: "#fcf9fa",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
}
