# Ganesh Muniganti Portfolio

Portfolio of **Ganesh Muniganti**, analyzed and captured using **REA (Reverse Engineer Anything)**.

---

## 🚀 Quick Start (Run Locally)

This clone includes a zero-dependency streaming server (`server.mjs`) that supports SPA client-side routing and HTTP Range requests for smooth video playback.

```bash
# Option 1: Start using the included zero-dependency server
npm start
# or: node server.mjs

# Option 2: Use npx serve
npx serve -l 3000 .
```

Open your browser to: **[http://localhost:3000](http://localhost:3000)**

---

## 🛠 Tech Stack & Architecture (Reverse-Engineered)

Through REA static inspection and runtime capture, the following stack was identified:

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | React + Vite | Single Page Application (SPA) with code-splitting chunks |
| **Styling** | Tailwind CSS v4 | Uses `@layer theme`, modern OKLCH color palettes, and CSS custom properties |
| **Smooth Scrolling** | Lenis (`@studio-freight/lenis`) | Inertial physics smooth scrolling across all case studies and landing pages |
| **Icons & Media** | SVG & Custom WebP/WebM/MP4 | Responsive picture elements and deferred background videos |
| **Card Handoff Animation** | Custom 2D Canvas + FLIP | Canvas snapshot (`getContext('2d', {alpha: false})`) captures the exact video frame on card click for seamless modal transition |
| **Routing** | React Router SPA | Dynamic route loading with `<Suspense>` fallbacks |

---

## 📄 Site Structure & Routes

All routes are fully functional in this clone:

| Route | Title | Description |
|---|---|---|
| `/` | **Home / Overview** | Hero, selected case studies, interactive project cards, awards, and work history |
| `/sentient` | **Sentient Case Study** | Multi-agent AI systems, reasoning citations, workspace graph, and token design |
| `/firedrops` | **Flipkart FireDrops** | Web3 brand loyalty, reward cohorts, engagement loops, and gamification |
| `/sentient-overview` | **Sentient Spaces** | Deep dive into autonomous agent collaboration interfaces |
| `/flipkart-work-summary` | **Flipkart Summary** | Work summary on e-commerce scale design |
| `/frontier-work-summary` | **Frontier Research** | AI research models, token reasoning, and frontier interfaces |
| `/paper` | **Research Paper** | Academic research publication on design systems |
| `/sarvam` | **Sarvam AI** | Indic voice AI, vernacular language interfaces, and prompt workflows |

---

## 🎨 Key Reverse-Engineered Interactivity & Design Patterns

1. **Seamless Video-to-Modal FLIP Transition**:
   - In `index--rniiPa8.js`, when an experience card is clicked, the app reads the bounding rect of the card media element.
   - It draws the current frame into an off-screen `<canvas>` (`getContext('2d', {alpha: false})`), preventing any blank flicker while the detailed case study loads.
   - It inverts the translation and scale (`C0(n, a, s)`) to animate the card expanding into full-screen.

2. **Responsive Multi-Resolution WebP Media**:
   - Every major product image uses responsive srcset tiers (`480w`, `960w`, `1440w`, `1920w`) to ensure crisp rendering on Retina displays with minimal bandwidth overhead.

3. **Optimized Video Loops**:
   - Cards use lightweight looping MP4/WebM videos (`Sentient-Port-card-Dc1LkK-0.mp4`, `FD-port-card-DI7kHLS7.mp4`) with dedicated mobile fallback videos (`-mobile-*.mp4`).

---

## 📂 Directory Layout

```
ganeshux/
├── index.html                   # Main entry point with preloads & metadata
├── server.mjs                   # Zero-dependency Node.js HTTP server (SPA + Video streaming)
├── _redirects                   # Netlify/Cloudflare SPA redirect rule (/* -> /index.html 200)
├── package.json                 # Project configuration & start scripts
├── README.md                    # Reverse engineering documentation
├── site.webmanifest             # PWA web manifest
├── favicon.ico / pngs           # App icons & favicons
├── og-image.png                 # OpenGraph social preview image (2400x1260)
└── assets/                      # Complete offline bundle (80+ files, 11MB)
    ├── index--rniiPa8.js        # Main React runtime bundle
    ├── DesktopExperience-*.js   # Desktop view interactive layout
    ├── Preloader-*.js           # Intro preloader animation component
    ├── lenis-DhhZJN_v.js        # Inertial smooth scroll runtime
    ├── index-CfyW3gEe.css       # Tailwind CSS v4 bundle
    ├── lenis-D2oTg1Kg.css       # Lenis smooth scroll styles
    ├── CaseStudyPage-*.js       # Lazy-loaded case study layout component
    ├── SentientOverview-*.js    # Sentient route chunk
    ├── FlipkartWorkSummary-*.js # Flipkart route chunk
    ├── FrontierWorkSummary-*.js # Frontier route chunk
    ├── PaperPage-*.js           # Paper route chunk
    ├── SarvamPage-*.js          # Sarvam route chunk
    ├── *.mp4 / *.webm           # All video demos & card previews
    └── *.webp / *.png / *.svg   # All responsive screenshots, awards & graphics
```

---

## 🔍 Verification

- **Total Assets**: 89 files
- **Total Bundle Size**: ~11 MB
- **Offline Capability**: 100% self-contained. All scripts, fonts, images, and video assets are hosted locally.
- **Analyzed with**: REA (Reverse Engineer Anything) v6.10.1
