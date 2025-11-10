/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070510",
        surface: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",
        glow: "#5CE1E6",
        violet: "#A855F7",
        text: {
          DEFAULT: "#E2E6F0",
          muted: "#9BA2B0",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(92,225,230,0.25)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
