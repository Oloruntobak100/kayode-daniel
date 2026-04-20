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
        background: "#FAFAF8",
        foreground: "#0A0A0A",
        accent: "#4F6EF7",
        muted: "#888888",
      },
      fontFamily: {
        hero: ["var(--font-hero)", "var(--font-display)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 23, 42, 0.08)",
        soft: "0 4px 24px rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        pill: "9999px",
      },
      maxWidth: {
        content: "720px",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left 42s linear infinite",
        "marquee-right": "marquee-right 42s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
