"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const FADE_UP = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const DEGREES = [
  {
    degree: "MCA (Master in Computer Application)",
    institution: "Osmania University",
    period: "June 2023 – Sept 2025",
    location: "Hyderabad, India",
    highlights: [
      "Advanced research and practice in interactive systems and user behavior models.",
      "Specialization in information design, cognitive science, and human-computer interactions.",
    ],
  },
  {
    degree: "Bachelor of Science",
    institution: "Osmania University",
    period: "May 2019 – Sept 2022",
    location: "Hyderabad, India",
    highlights: [
      "Core studies in logic, analysis, and computer systems.",
      "Participated in academic projects focused on digital interfaces and user flows.",
    ],
  },
];

const CERTIFICATIONS = [
  { name: "UX Kickstarter Workshop", issuer: "GrowthSchool", year: "2023" },
  { name: "UI/UX Design Certification", issuer: "Internshala",  year: "2022" },
];

export default function Education() {
  return (
    <section id="education" className="section">
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
            Education
          </motion.p>
          <motion.h2
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            Where I learned<br />to think differently.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-20">

          {/* ── Degree(s) ───────────────────────────────────────── */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-8">
              Degrees
            </p>

            <div className="space-y-0">
              {DEGREES.map((edu, i) => (
                <div key={edu.degree} className="flex gap-6 group">
                  {/* Timeline dot & line */}
                  <div className="flex flex-col items-center pt-2 shrink-0">
                    <div className="w-2 h-2 rounded-full ring-2 ring-[var(--border)] bg-[var(--bg)] group-hover:bg-[var(--accent)] group-hover:ring-[var(--accent)] transition-all duration-300 shrink-0" />
                    {i < DEGREES.length - 1 && (
                      <div className="w-px flex-1 bg-[var(--border)] mt-3 mb-0" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10 flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap size={15} className="text-[var(--accent)]" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-[var(--text-primary)] leading-snug">
                          {edu.degree}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          <span className="text-sm font-medium text-[var(--accent)]">{edu.institution}</span>
                          <span className="text-xs text-[var(--text-tertiary)] font-mono tracking-wide">{edu.period}</span>
                          <span className="text-xs text-[var(--text-tertiary)]">{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-3 pl-11">
                      {edu.highlights.map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                          <span className="mt-[0.45em] w-1 h-1 rounded-full bg-[var(--border)] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Certifications ──────────────────────────────────── */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:pt-11"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-6">
              Certifications
            </p>

            <div className="flex flex-col gap-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border)]
                             bg-[var(--bg-subtle)] hover:border-[var(--accent)]/40
                             transition-colors duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={13} className="text-[var(--accent)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{cert.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[var(--text-secondary)]">{cert.issuer}</span>
                      <span className="text-[10px] text-[var(--text-tertiary)] font-mono">{cert.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
