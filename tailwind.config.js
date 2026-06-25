/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#111111",
        gold: "#C6A972",
        soft: "#F7F7F7",
        muted: "#6B7280",
        border: "#E5E7EB",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },

      maxWidth: {
        container: "1280px",
      },

      boxShadow: {
        product: "0 10px 25px rgba(0,0,0,0.08)",
        card: "0 4px 15px rgba(0,0,0,0.06)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      letterSpacing: {
        brand: "0.15em",
      },
    },
  },

  plugins: [],
};
