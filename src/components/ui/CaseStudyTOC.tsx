"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TOCSection {
  id: string;
  label: string;
  number?: string;
}

interface CaseStudyTOCProps {
  sections: TOCSection[];
}

export default function CaseStudyTOC({ sections }: CaseStudyTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [hovered, setHovered] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-[10px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Page sections"
      role="navigation"
    >
      {sections.map(({ id, label, number }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex items-center gap-3 py-0.5 focus:outline-none group"
            aria-label={`Go to ${label}`}
          >
            {/* Label — slides in on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-1.5 text-right"
                >
                  {number && (
                    <span
                      className="text-[9px] font-mono font-bold tracking-widest"
                      style={{ color: isActive ? "var(--accent)" : "var(--text-tertiary)" }}
                    >
                      {number}
                    </span>
                  )}
                  <span
                    className="text-[11px] font-semibold leading-none whitespace-nowrap transition-colors duration-150"
                    style={{ color: isActive ? "var(--accent)" : "var(--text-secondary)" }}
                  >
                    {label}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dash indicator */}
            <div
              className="rounded-full transition-all duration-300 shrink-0"
              style={{
                width: isActive ? 28 : 12,
                height: 2,
                background: isActive ? "var(--accent)" : "var(--text-tertiary)",
                opacity: isActive ? 1 : 0.45,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
