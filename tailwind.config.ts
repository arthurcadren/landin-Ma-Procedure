// ============================================================
// FICHIER: tailwind.config.ts
// Design tokens repris exactement de ma_proc_dure.md
// ============================================================

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f5fbf5",
        "surface-dim": "#d5dcd6",
        "surface-bright": "#f5fbf5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff5ef",
        "surface-container": "#e9efe9",
        "surface-container-high": "#e4eae4",
        "surface-container-highest": "#dee4de",
        "on-surface": "#171d19",
        "on-surface-variant": "#3d4a42",
        "inverse-surface": "#2c322e",
        "inverse-on-surface": "#ecf2ec",
        outline: "#6d7a72",
        "outline-variant": "#bccac0",
        primary: "#006948",
        "on-primary": "#ffffff",
        "primary-container": "#00855d",
        "on-primary-container": "#f5fff7",
        "inverse-primary": "#68dba9",
        secondary: "#006c49",
        "on-secondary": "#ffffff",
        "secondary-container": "#6cf8bb",
        "on-secondary-container": "#00714d",
        tertiary: "#9b3e3b",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#ba5551",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        background: "#f5fbf5",
        "on-background": "#171d19",
        "surface-variant": "#dee4de",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;