"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Wrench,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

interface Props {
  project: Project;
}

export default function CaseStudyClient({ project }: Props) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Estimate reading time
  const totalText = project.sections.map((s) => s.content).join(" ");
  const words = totalText.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <>
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/#work"
          className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-soft"
          aria-label="Back to projects"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
      </motion.div>

      {/* Hero */}
      <section
        className={`relative min-h-[60vh] flex items-end pb-16 pt-32 overflow-hidden`}
        style={{ background: `linear-gradient(135deg, ${project.color}18, transparent 60%)` }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(ellipse at top left, ${project.color}40, transparent 70%)`,
          }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: `${project.color}20`, color: project.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
              {project.type}
            </div>

            <h1 className="font-inter-tight font-black text-4xl md:text-6xl lg:text-7xl text-[var(--text-primary)] leading-none tracking-tight mb-4 max-w-4xl">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed">
              {project.tagline}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <User size={14} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-primary)]">{project.role}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Clock size={14} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-primary)]">{project.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Wrench size={14} className="text-[var(--accent)]" />
                <span className="font-medium text-[var(--text-primary)]">{project.tools.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-[var(--border)]">
                <Clock size={12} className="text-[var(--text-secondary)]" />
                <span className="text-[var(--text-secondary)]">{readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact metrics bar */}
      <section className="border-y border-[var(--border)] bg-white dark:bg-[var(--dark-surface)]">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.impact.map((metric, i) => (
              <motion.div
                key={metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div
                  className="text-2xl md:text-3xl font-inter-tight font-black mb-1"
                  style={{ color: project.color }}
                >
                  <TrendingUp size={20} className="inline mr-1 mb-1" />
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{metric}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study content */}
      <article className="container-custom py-20 max-w-3xl mx-auto">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-3xl border border-[var(--border)] bg-white dark:bg-[var(--dark-surface)]"
        >
          <h2 className="font-inter-tight font-bold text-xl text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
              style={{ background: project.color }}
            >
              01
            </span>
            Problem Statement
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
        </motion.div>

        {/* Sections */}
        {project.sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-12"
          >
            <h2 className="font-inter-tight font-bold text-2xl text-[var(--text-primary)] mb-4 flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-mono shrink-0"
                style={{ background: project.color }}
              >
                {String(i + 2).padStart(2, "0")}
              </span>
              {section.title}
            </h2>
            <div className="pl-11">
              <p className="text-[var(--text-secondary)] leading-relaxed text-body-mobile md:text-body-desktop">
                {section.content}
              </p>

              {/* Placeholder visual */}
              <div
                className="mt-6 rounded-2xl h-48 flex items-center justify-center border border-[var(--border)]"
                style={{
                  background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)`,
                }}
              >
                <p className="text-sm text-[var(--text-secondary)] font-mono">
                  [{section.title} visual]
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Key learnings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl border border-[var(--border)] bg-white dark:bg-[var(--dark-surface)]"
        >
          <h2 className="font-inter-tight font-bold text-xl text-[var(--text-primary)] mb-6">
            Key Learnings
          </h2>
          <div className="space-y-3">
            {[
              "Early user research reduces costly late-stage pivots",
              "Accessibility improvements benefit all users, not just those with disabilities",
              "Data without context is just numbers — always triangulate with qualitative feedback",
              "Shipping iteratively builds more trust than waiting for perfection",
            ].map((learning) => (
              <div key={learning} className="flex items-start gap-3">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: project.color }}
                />
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{learning}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </article>

      {/* Next project */}
      <section className="border-t border-[var(--border)] bg-white dark:bg-[var(--dark-surface)]">
        <div className="container-custom py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-4 text-center">
            Next Project
          </p>
          <Link href={`/work/${nextProject.slug}`} className="block group max-w-lg mx-auto">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/40 hover:shadow-card transition-all bg-[var(--bg)]">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">{nextProject.type}</p>
                <p className="font-inter-tight font-bold text-xl text-[var(--text-primary)]">
                  {nextProject.title}
                </p>
              </div>
              <motion.div
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] transition-colors"
              >
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
