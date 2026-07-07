/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(103,65,237,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(103,65,237,0.6)" },
        },
      },
      animation: {
        glow: "glow 5s ease-in-out infinite",
      },
    },
    screens: {
      xs: "320px", // small phones
      sm: "640px",
      md: { min: "768px", max: "1024px" }, // md now stops at 1023px
      lg: "1025px", // lg starts exactly at 1025px
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
