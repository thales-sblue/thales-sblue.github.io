/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#000000",
        "surface-elevated": "#1d1d1f",
        "surface-muted": "#2d2d2f",
        muted: "#86868b",
        accent: "#0071E3",
        "accent-hover": "#0077ED",
        // Legacy aliases for gradual migration
        primary: "#000000",
        "dark-gray": "#1d1d1f",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        heading: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-lg": [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
      },
      spacing: {
        section: "7.5rem",
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};
