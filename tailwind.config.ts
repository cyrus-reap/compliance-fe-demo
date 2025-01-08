import type { Config } from "tailwindcss";
import { token } from "./app/theme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: token.color,
    },
  },
  plugins: [],
} satisfies Config;
