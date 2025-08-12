// Example: Custom Font Configuration
// Copy this to app/fonts.ts to use different fonts

import { Inter, Roboto_Mono, Poppins } from "next/font/google";

// Example 1: Using Inter instead of Geist
export const interFont = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Example 2: Using Roboto Mono instead of Geist Mono
export const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Example 3: Using Poppins for a more modern look
export const poppinsFont = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Custom typography scale example
export const customTypography = {
  sizes: {
    xs: "0.6875rem", // 11px - More compact
    sm: "0.75rem", // 12px
    base: "0.875rem", // 14px - Smaller base
    lg: "1rem", // 16px
    xl: "1.125rem", // 18px
    "2xl": "1.375rem", // 22px
    "3xl": "1.75rem", // 28px
    "4xl": "2.125rem", // 34px
    "5xl": "2.75rem", // 44px
  },

  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // More relaxed line heights for better readability
  lineHeights: {
    tight: 1.3,
    normal: 1.6,
    relaxed: 1.75,
    loose: 2.1,
  },
};

// Usage example:
// 1. Replace the imports in app/fonts.ts
// 2. Update fontConfig to use your chosen fonts
// 3. Optionally update typography scale in app/theme.ts
