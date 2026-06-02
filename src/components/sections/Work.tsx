"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(139,92,246,0.06), transparent 70%)`;
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
    if (borderRef.current) borderRef.current.style.opacity = "1";
    if (imageRef.current) imageRef.current.style.transform = "scale(1.05)";
    if (arrowRef.current) arrowRef.current.style.transform = "translateX(4px)";
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    if (borderRef.current) borderRef.current.style.opacity = "0";
    if (imageRef.current) imageRef.current.style.transform = "scale(1)";
    if (arrowRef.current) arrowRef.current.style.transform = "translateX(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
    >
      <Link href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <div
          className="project-card relative group rounded-[32px] border border-[var(--border)] bg-white dark:bg-[var(--dark-surface)] overflow-hidden cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none z-10"
            style={{ opacity: 0, transition: "opacity 0.3s" }}
          />

          {/* Gradient border on hover */}
          <div
            ref={borderRef}
            className="absolute inset-0 rounded-[32px] pointer-events-none z-20"
            style={{
              opacity: 0,
              background: `linear-gradient(135deg, ${project.color}22, transparent, ${project.color}11)`,
              padding: "1px",
              transition: "opacity 0.3s",
            }}
          />

          <div className="flex flex-col md:flex-row">
            {/* Image side */}
            <div className="md:w-2/5 relative overflow-hidden">
              <div
                ref={imageRef}
                className={`w-full h-56 md:h-full min-h-[240px] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                style={{ transition: "transform 0.5s ease", willChange: "transform" }}
              >
                {/* Project type icon / visual */}
                <div className="text-white/80 font-inter-tight font-black text-6xl md:text-8xl opacity-20 select-none">
                  {project.title.charAt(0)}
                </div>
                {/* Mockup placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 md:w-40 bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20">
                    <div className="space-y-2">
                      <div className="h-2 bg-white/40 rounded-full w-full" />
                      <div className="h-2 bg-white/30 rounded-full w-4/5" />
                      <div className="h-2 bg-white/20 rounded-full w-3/5" />
                      <div className="mt-3 h-12 bg-white/15 rounded-xl" />
                      <div className="h-2 bg-white/25 rounded-full w-full" />
                      <div className="h-2 bg-white/15 rounded-full w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="md:w-3/5 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: `${project.color}15`, color: project.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                  {project.type}
                </div>

                {/* Title */}
                <h3 className="font-inter-tight font-black text-2xl lg:text-3xl text-[var(--text-primary)] mb-3 leading-tight">
                  {project.title}
                </h3>

                {/* Problem statement */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-1.5">Problem</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-1.5">Solution</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.solution}</p>
                </div>

                {/* Impact metrics */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {project.impact.slice(0, 2).map((metric) => (
                    <div
                      key={metric}
                      className="px-3 py-2.5 rounded-xl text-xs font-medium border border-[var(--border)] text-[var(--text-primary)] bg-[var(--bg)]"
                    >
                      <span className="font-bold" style={{ color: project.color }}>✦</span> {metric}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--border)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div
                  ref={arrowRef}
                  className="flex items-center gap-1.5 text-sm font-semibold ml-4 whitespace-nowrap"
                  style={{ color: project.color, transition: "transform 0.2s ease" }}
                >
                  View Case Study
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


export default function Work() {
  return (
    <section id="work" className="section-py">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/8 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-semibold uppercase tracking-widest mb-4">
            <span>✦</span> Selected Work
          </span>
          <h2 className="font-inter-tight font-black text-section-mobile md:text-section-desktop text-[var(--text-primary)] leading-tight tracking-tight">
            My Work
          </h2>
          <p className="text-[var(--text-secondary)] text-body-mobile md:text-body-desktop max-w-xl mx-auto mt-4 leading-relaxed">
            A collection of case studies where I turned complex problems into elegant, user-centered solutions.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            View All Projects on Behance
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
