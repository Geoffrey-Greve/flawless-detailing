import type { Config } from "tailwindcss";

/**
 * Design tokens live here so the incoming design pass can restyle by editing
 * tokens. The current visual layer is the ported stylesheet in app/globals.css
 * (class names preserved); new sections can use Tailwind utilities beside it.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0b",
        surface: { DEFAULT: "#141416", 2: "#1c1c1f" },
        accent: { DEFAULT: "#ff6a13", glow: "rgba(255,106,19,0.35)" },
        muted: "#a1a1aa",
      },
      borderRadius: { btn: "16px", box: "24px" },
    },
  },
  plugins: [],
};

export default config;
