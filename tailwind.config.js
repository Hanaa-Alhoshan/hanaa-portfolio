/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Inter", "Arial"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,.06), 0 0 30px rgba(45,212,191,.12)",
      },
    },
  },
  plugins: [],
};
