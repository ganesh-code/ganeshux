"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Users, Lightbulb, BarChart3, Smartphone } from "lucide-react";

const skills = [
  { icon: Users, label: "UX Research", desc: "User interviews, surveys, usability testing" },
  { icon: Layers, label: "Design Systems", desc: "Scalable component libraries and tokens" },
  { icon: Code2, label: "Prototyping", desc: "High-fidelity interactive prototypes" },
  { icon: Lightbulb, label: "Wireframing", desc: "Low-fidelity to high-fidelity iterations" },
  { icon: BarChart3, label: "Analytics", desc: "Data-driven design decisions" },
  { icon: Smartphone, label: "Mobile Design", desc: "iOS & Android platform guidelines" },
];

const experiences = [
  { year: "2024–Now", role: "Senior UX Designer", company: "Freelance", desc: "High-impact projects for startups and enterprises." },
  { year: "2022–2024", role: "Product Designer", company: "Creatiwise", desc: "Led redesigns increasing conversions by 42%." },
  { year: "2020–2022", role: "UI/UX Designer", company: "TechStartup", desc: "Designed mobile apps for 100K+ users." },
];

export default function About() {
  return (
    <section id="about" className="section-py">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/8 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-semibold uppercase tracking-widest mb-6">
              <span>✦</span> About Me
            </span>
            <h2 className="font-inter-tight font-black text-section-mobile md:text-4xl text-[var(--text-primary)] leading-tight tracking-tight mb-6">
              Designing for humans,
              <br />
              <span className="gradient-text">not screens</span>
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)] text-body-mobile leading-relaxed">
              <p>
                I&apos;m Ganesh, a UX/UI Designer passionate about creating digital experiences that feel effortless and intuitive. With 5+ years of experience, I bridge the gap between business goals and user needs.
              </p>
              <p>
                My approach combines rigorous research, systems thinking, and a meticulous eye for detail. I believe great design is invisible — users shouldn&apos;t notice the interface, only the outcome.
              </p>
              <p>
                When I&apos;m not designing, I&apos;m exploring design systems, contributing to open-source projects, or sketching concepts in my notebook.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[var(--border)]">
              {[
                { value: "5+", label: "Years" },
                { value: "20+", label: "Projects" },
                { value: "100%", label: "Satisfaction" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-inter-tight font-black text-3xl text-[var(--text-primary)]">{value}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Experience timeline */}
            <div className="mt-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Experience</p>
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-4 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] mt-1.5 group-hover:bg-[var(--accent)] transition-colors" />
                    {i < experiences.length - 1 && (
                      <div className="w-px flex-1 bg-[var(--border)] mt-1" />
                    )}
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{exp.role}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--border)] text-[var(--text-secondary)]">{exp.company}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-mono mb-1">{exp.year}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{exp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Skills grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-6">Core Skills</p>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="p-5 rounded-2xl border border-[var(--border)] bg-white dark:bg-[var(--dark-surface)] hover:border-[var(--accent)]/40 hover:shadow-soft transition-all group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--accent)]/20 transition-colors">
                      <Icon size={18} className="text-[var(--accent)]" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{skill.label}</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{skill.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Tools */}
            <div className="mt-6 p-5 rounded-2xl border border-[var(--border)] bg-white dark:bg-[var(--dark-surface)]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-3">Toolbox</p>
              <div className="flex flex-wrap gap-2">
                {["Figma", "FigJam", "Maze", "Hotjar", "Framer", "Webflow", "Notion", "Miro", "Principle", "ProtoPie"].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg)] border border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent)]/50 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
