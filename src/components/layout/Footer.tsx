"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg)] overflow-hidden">
      <div className="container-custom py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[#EC4899] flex items-center justify-center text-white text-[10px] font-bold">
                G
              </div>
              <span className="font-semibold text-sm text-[var(--text-primary)]">Ganesh</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">UX/UI Designer</p>
          </div>

          {/* Center */}
          <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
            © {year} Ganesh. Built with{" "}
            <Heart size={10} className="text-rose-500 fill-rose-500" />
          </p>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={13} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={13} />
            </a>
            <a
              href="mailto:ganesh@designer.com"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              aria-label="Email"
            >
              <Mail size={13} />
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--text-primary)] text-[var(--bg)] hover:bg-[var(--accent)] transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
      {/* Grain */}
      <div className="grain" aria-hidden="true" />
    </footer>
  );
}
