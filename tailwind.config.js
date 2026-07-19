/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      tablet: "768px",
      md: "768px",
      laptop: "1024px",
      lg: "1024px",
      desktop: "1440px",
      xl: "1440px",
      wide: "1920px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        bg: "#0B0B0E",
        "bg-raised": "#131317",
        text: {
          primary: "#F2F1ED",
          secondary: "#9A9A9F",
          muted: "#86868C",
        },
        accent: {
          DEFAULT: "#2DD4BF",
          dim: "#1B7A70",
        },
        border: "#232327",
        error: "#F26B5E",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        content: "90rem",
      },
      transitionTimingFunction: {
        primary: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        reveal: "700ms",
        page: "500ms",
      },
    },
  },
  plugins: [],
};
