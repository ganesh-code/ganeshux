"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work",    href: "#work"    },
  { label: "About",  href: "#about"   },
  { label: "Contact",href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // True when we're NOT on the home page
  const isSubPage = pathname !== "/";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isSubPage) {
      // On case study pages, always use scrolled (solid) style — no white-on-white
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      // Switch navbar background when the Work section reaches the navbar top.
      const workEl = document.getElementById("work");
      if (workEl) {
        setScrolled(workEl.getBoundingClientRect().top <= 64);
      } else {
        setScrolled(window.scrollY > 80);
      }

      // Active-section tracking (bottom-up)
      const ids = ["contact", "about", "work"];
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { current = id; break; }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [isSubPage]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (isSubPage) {
      // Navigate back to home page with the anchor hash
      window.location.href = "/" + href;
    } else {
      document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ─── Two explicit colour modes ─── */
  // HERO mode  → transparent, white text (home page, not yet scrolled past hero)
  // SCROLL mode → frosted glass, dark text (always on sub-pages / after scrolling)
  const onHero = !scrolled && !menuOpen && !isSubPage;

  return (
    <>
      {/* ══════════════════════════ MAIN BAR ══════════════════════════ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-[padding] duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{ isolation: "isolate" }}
      >
        {/* ── Light-mode frosted background ─────────────────────────────── */}
        {scrolled && (
          <div
            aria-hidden="true"
            className="absolute inset-0 border-b border-black/[0.06] dark:border-white/[0.06]"
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backgroundColor: "rgba(255,255,255,0.88)",
            }}
          />
        )}
        {/* ── Dark-mode frosted background ──────────────────────────────── */}
        {scrolled && mounted && theme === "dark" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 border-b border-white/[0.07]"
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backgroundColor: "rgba(10,10,10,0.90)",
            }}
          />
        )}

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="container relative flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => {
              if (isSubPage) window.location.href = "/";
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group"
            aria-label="Back to home"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold font-display shrink-0">
              G
            </div>
            <span
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: onHero ? "#ffffff" : "var(--text-primary)" }}
            >
              Ganesh
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = !isSubPage && active === link.href.replace("#", "");
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  style={{
                    color: onHero
                      ? isActive ? "#ffffff" : "rgba(255,255,255,0.65)"
                      : isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        background: onHero ? "rgba(255,255,255,0.12)" : "var(--bg-subtle)",
                        border: onHero
                          ? "1px solid rgba(255,255,255,0.18)"
                          : "1px solid var(--border)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200"
                style={{
                  color: onHero ? "rgba(255,255,255,0.7)" : "var(--text-secondary)",
                }}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            {/* Resume CTA */}
            <a
              href="https://drive.google.com/file/d/1qN7eYP4iT87dGrI9E_vp_xKh6V7YB9dQ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                onHero
                  ? { background: "#ffffff", color: "#0A0A0A" }
                  : { background: "var(--text-primary)", color: "var(--bg)" }
              }
            >
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200"
              style={{
                color: onHero ? "rgba(255,255,255,0.80)" : "var(--text-secondary)",
              }}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════ MOBILE OVERLAY ═══════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-8 md:hidden"
            style={{
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
              backgroundColor:
                mounted && theme === "dark"
                  ? "rgba(10,10,10,0.97)"
                  : "rgba(255,255,255,0.97)",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.28 }}
                onClick={() => handleNavClick(link.href)}
                className="text-3xl font-display font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
              </motion.button>
            ))}

            <motion.a
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.28 }}
              href="https://drive.google.com/file/d/1qN7eYP4iT87dGrI9E_vp_xKh6V7YB9dQ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
