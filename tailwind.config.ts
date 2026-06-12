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
      colors: {
        background: "#FAFAFA",
        "text-primary": "#111111",
        "text-secondary": "#666666",
        border: "#EAEAEA",
        accent: "#8B5CF6",
        "accent-light": "#A78BFA",
        "accent-dark": "#7C3AED",
        "dark-bg": "#0A0A0A",
        "dark-surface": "#111111",
        "dark-border": "#1F1F1F",
        "dark-text": "#FAFAFA",
        "dark-text-secondary": "#888888",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        "inter-tight": ["var(--font-inter-tight)", "Inter Tight", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        nunito: ["var(--font-nunito)", "Nunito", "sans-serif"],
      },
      fontSize: {
        "hero-desktop": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "hero-tablet": ["40px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "hero-mobile": ["28px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "section-desktop": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "section-mobile": ["32px", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "body-desktop": ["18px", { lineHeight: "1.6" }],
        "body-mobile": ["16px", { lineHeight: "1.6" }],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      boxShadow: {
        soft: "0 2px 40px rgba(0,0,0,0.06)",
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.12)",
        glow: "0 0 40px rgba(139,92,246,0.15)",
        "glow-strong": "0 0 60px rgba(139,92,246,0.25)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -2%)" },
          "20%": { transform: "translate(2%, 2%)" },
          "30%": { transform: "translate(-1%, 1%)" },
          "40%": { transform: "translate(1%, -1%)" },
          "50%": { transform: "translate(-2%, 1%)" },
          "60%": { transform: "translate(2%, -2%)" },
          "70%": { transform: "translate(-1%, -1%)" },
          "80%": { transform: "translate(1%, 2%)" },
          "90%": { transform: "translate(-2%, -1%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};
