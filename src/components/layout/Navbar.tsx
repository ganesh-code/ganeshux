"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Command, Download } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = ["home", "about", "work", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="fixed top-4 left-0 right-0 z-[9990] flex justify-center px-4"
      >
        <motion.div
          animate={{
            paddingTop: scrolled ? "10px" : "14px",
            paddingBottom: scrolled ? "10px" : "14px",
          }}
          transition={{ duration: 0.3 }}
          className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-6 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-white/96 dark:bg-[#111]/96 border border-[var(--border)] shadow-soft"
              : "bg-white/80 dark:bg-[#111]/80 border border-white/20 dark:border-white/10"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="mr-2 sm:mr-4 flex items-center gap-2 group"
            aria-label="Go to top"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[#EC4899] flex items-center justify-center text-white text-xs font-bold shadow-glow">
              G
            </div>
            <span className="hidden sm:block text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              Ganesh
            </span>
          </button>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`nav-link px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[var(--accent)] bg-[var(--accent)]/8"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-2 sm:ml-4">
            {/* ⌘K hint */}
            <button
              onClick={() => {
                const e = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                document.dispatchEvent(e);
              }}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
              aria-label="Open command menu"
            >
              <Command size={12} />
              <span className="font-mono">K</span>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            {/* Resume CTA */}
            <MagneticButton>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg)] text-sm font-medium hover:bg-[var(--accent)] transition-colors"
                aria-label="Download resume"
              >
                <Download size={13} />
                Resume
              </a>
            </MagneticButton>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-[9989] bg-white/98 dark:bg-[#111]/98 rounded-2xl border border-[var(--border)] shadow-card p-4"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[var(--accent)] bg-[var(--accent)]/8"
                      : "text-[var(--text-primary)] hover:bg-[var(--border)]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-[var(--border)] my-2" />
              <a
                href="/resume.pdf"
                target="_blank"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)]/8 transition-colors"
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
