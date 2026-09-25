// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tomato: {
          DEFAULT: "#D94F3D",
          dark: "#B93E2E",
          light: "#E8735F",
        },
        cream: "#FFF8EE",
        gold: "#F4B942",
        charcoal: "#1F1F1F",
        leaf: "#5E8C61",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(31,31,31,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;