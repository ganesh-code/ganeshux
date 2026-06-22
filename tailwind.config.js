/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary system
        display: ["var(--font-display)", "Bricolage Grotesque", "sans-serif"],
        sans:    ["var(--font-sans)",    "Plus Jakarta Sans",   "sans-serif"],
        mono:    ["var(--font-mono)",    "ui-monospace",        "monospace"],

        // Legacy aliases — keep so existing case study pages don't break
        bricolage:     ["var(--font-display)", "sans-serif"],
        jakarta:       ["var(--font-sans)",    "sans-serif"],
        inter:         ["var(--font-sans)",    "sans-serif"],
        nunito:        ["var(--font-display)", "sans-serif"],
        "inter-tight": ["var(--font-display)", "sans-serif"],
      },

      colors: {
        // Map to CSS vars for Tailwind intellisense
        background:          "#FAFAFA",
        "text-primary":      "#0A0A0A",
        "text-secondary":    "#6B6B6B",
        border:              "#E5E5E5",
        accent:              "#7C3AED",
        "accent-light":      "#A78BFA",
        "accent-dark":       "#6D28D9",
        // Dark mode values (used when dark class active)
        "dark-bg":           "#0A0A0A",
        "dark-surface":      "#141414",
        "dark-border":       "#252525",
        "dark-text":         "#F5F5F5",
        "dark-text-secondary": "#A3A3A3",
      },

      boxShadow: {
        xs:          "0 1px 2px rgba(0,0,0,0.04)",
        soft:        "0 2px 8px rgba(0,0,0,0.06)",
        card:        "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover":"0 12px 48px rgba(0,0,0,0.10)",
        glow:        "0 0 32px rgba(124,58,237,0.12)",
        "glow-strong":"0 0 48px rgba(124,58,237,0.20)",
      },

      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },

      screens: {
        xs: "375px",
      },

      maxWidth: {
        "content": "1100px",
        "prose-xl": "650px",
      },

      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },

      fontSize: {
        // Legacy aliases — keep for case study pages
        "hero-desktop":    ["72px", { lineHeight: "1.0",  letterSpacing: "-0.03em" }],
        "hero-tablet":     ["48px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-mobile":     ["36px", { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "section-desktop": ["56px", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "section-mobile":  ["36px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "body-desktop":    ["18px", { lineHeight: "1.7" }],
        "body-mobile":     ["16px", { lineHeight: "1.65" }],
      },
    },
  },
  plugins: [],
};
