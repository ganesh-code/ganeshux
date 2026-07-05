"use client";

import { motion } from "framer-motion";
import { FlaskConical, Code2, Layers, Zap } from "lucide-react";

const FADE_UP = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const VALUE_PROPS = [
  {
    icon: FlaskConical,
    title: "Research-Driven",
    description:
      "Every design decision starts with evidence — user interviews, usability tests, and data. I don't guess; I validate.",
  },
  {
    icon: Code2,
    title: "Code-Literate",
    description:
      "I build in React and understand engineering constraints firsthand, which means designs that are always feasible and handoffs that are friction-free.",
  },
  {
    icon: Layers,
    title: "Systems Thinker",
    description:
      "I design scalable design systems and component libraries — not one-off screens. Consistent, maintainable, and built to grow.",
  },
  {
    icon: Zap,
    title: "Fast & Thorough",
    description:
      "From 0→1 in weeks, not months. I move quickly without cutting corners — because speed and quality aren't opposites when you have a clear process.",
  },
];

export default function WhyMe() {
  return (
    <section id="why-me" className="section">
      <div className="container">

        {/* ── Section Header ──────────────────────────────────── */}
        <div className="mb-14 pb-6 border-b border-[var(--border)]">
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-4"
          >
            Why Me
          </motion.p>
          <motion.h2
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            What I bring<br />to the table.
          </motion.h2>
        </div>

        {/* ── Value Prop Grid ──────────────────────────────────── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={FADE_UP}
              className="group flex flex-col gap-4 p-7 rounded-2xl border border-[var(--border)]
                         bg-[var(--bg-subtle)] hover:border-[var(--accent)]/40
                         hover:bg-[var(--accent)]/[0.03] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                            bg-[var(--accent)]/10 group-hover:bg-[var(--accent)]/18
                            transition-colors duration-300"
              >
                <Icon size={18} className="text-[var(--accent)]" />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-display font-bold text-[var(--text-primary)] text-lg leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
