import Hero from "@/components/sections/Hero";
import HeroSticky from "@/components/sections/HeroSticky";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import ContactFooterBlock from "@/components/layout/ContactFooterBlock";

/**
 * SCROLL MECHANICS — mirrors HeroSticky exactly, but for the exit:
 *
 *  ┌──── HeroSticky (200vh) ──────────────────────────────────┐
 *  │  Hero  sticky top:0                    ← ENTRY pinned   │
 *  └──────────────────────────────────────────────────────────┘
 *  ┌──── Sliding layer  z-index:10  bg:var(--bg) ─────────────┐
 *  │  Work  (marginTop:-100vh slides over Hero)               │
 *  │  ──── divider ───────────────────────────────────────── │
 *  │  About                                                   │
 *  │                                  marginBottom: -100vh    │
 *  └──────────────── pulls ContactSticky 100vh up ───────────┘
 *  ┌──── ContactSticky (200vh)  z-index:0 ────────────────────┐
 *  │  ContactFooterBlock  sticky top:0      ← EXIT pinned    │
 *  │                                                          │
 *  │  The sliding layer's bottom 100vh overlaps this box.    │
 *  │  Sliding layer (z-index:10, solid bg) covers Contact.   │
 *  │  As you scroll DOWN, the sliding layer exits UPWARD —   │
 *  │  revealing ContactFooterBlock from top to bottom.       │
 *  └──────────────────────────────────────────────────────────┘
 *
 *  Scroll 0→100vh:   Work slides over Hero (entry)
 *  Scroll ~end-100vh→end:  About slides off Contact (exit reveal)
 */
export default function HomePage() {
  return (
    <>
      {/* ── Hero: pinned while Work slides over it (entry) ──── */}
      <HeroSticky>
        <Hero />
      </HeroSticky>

      {/* ── Sliding layer ─────────────────────────────────────
           • z-index:10 sits on top of everything
           • bg:var(--bg) visually covers whatever is behind
           • marginBottom:-100vh pulls ContactSticky 100vh up
             so this layer's bottom 100vh overlaps Contact,
             covering it. As this scrolls away, Contact reveals.
          ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "var(--bg)",
          marginBottom: "-100vh",
          // Shadow on top edge (for Work→Hero depth)
          // and implied on bottom edge as layer exits over Contact
          boxShadow: "0 -20px 80px rgba(0,0,0,0.10), 0 -1px 0 rgba(0,0,0,0.06)",
        }}
      >
        {/* Work slides over Hero */}
        <Work />

        {/* About layer — zIndex:30 > Work's zIndex:20.
            This ensures About's solid background paints ON TOP of
            Work's sticky cards as About scrolls over them.
            Without this, Work's stacking context (z-index:20) bleeds
            through the About section content. */}
        <div
          style={{
            position: "relative",
            zIndex: 30,
            background: "var(--bg)",
          }}
        >
          <div className="container">
            <div className="h-px bg-[var(--border)]" />
          </div>

          <About />
        </div>
      </div>

      {/* ── ContactSticky: mirrors HeroSticky for the exit ─────
           • 200vh container creates scroll budget
           • ContactFooterBlock is sticky top:0 inside it
           • Pulled 100vh upward by sliding layer's marginBottom:-100vh
           • The sticky element is behind (z-index:0) the sliding layer
           • Revealed as the sliding layer scrolls off the top
          ──────────────────────────────────────────────────── */}
      <div
        style={{
          height: "200vh",
          position: "relative",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <ContactFooterBlock />
        </div>
      </div>
    </>
  );
}
