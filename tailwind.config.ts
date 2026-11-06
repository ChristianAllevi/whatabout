import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#214BFF",
          light: "#B4C2FF",
          dark: "#1D2855",
        },
        secondary: {
          light: "#5FF4D4",
          dark: "#063C3C",
        },
        accent: {
          DEFAULT: "#FF2EB3",
          light: "#FFCAEC",
        },
        bg: {
          light: "#FFF8E6",
          dark: "#242424",
          white: "#FFFFFF",
        },
        // Target colors
        amicizia: "#B4C2FF",
        famiglia: "#5FF4D4",
        amore: "#FFCAEC",
      },
      fontFamily: {
        display: ["DX Playhigh Expanded", "sans-serif"],
        body: ["Funnel Display", "sans-serif"],
      },
      fontSize: {
        "hero": ["80px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["60px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "card": ["40px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "nav": ["20px", { lineHeight: "1.2" }],
        "mini": ["14px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "banner": ["16px", { lineHeight: "1.3", letterSpacing: "0.06em" }],
        "body": ["16px", { lineHeight: "1.6" }],
        "btn": ["16px", { lineHeight: "1.2", letterSpacing: "0.06em" }],
        "detail": ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        "section": "8px",
        "card": "4px",
        "btn": "4px",
      },
      padding: {
        "section": "40px",
        "card": "20px",
        "btn-x": "24px",
        "btn-y": "12px",
      },
      spacing: {
        "section-margin": "20px",
      },
    },
  },
  plugins: [],
};

export default config;
