"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

// ─── Constants ────────────────────────────────────────────────────────────────
const CARD_BASE_TOP = 120;
const VH_PER_CARD   = 55;

// ─── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  isMobile,
}: {
  project: (typeof projects)[0];
  index: number;
  isMobile: boolean;
}) {
  const motionRef = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const shimRef   = useRef<HTMLDivElement>(null);

  const isInView = useInView(motionRef, { once: true, amount: 0.12 });

  // ── 3D Tilt via spring MotionValues ─────────────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawS = useMotionValue(1);
  const rotX  = useSpring(rawX, { stiffness: 300, damping: 36, mass: 0.6 });
  const rotY  = useSpring(rawY, { stiffness: 300, damping: 36, mass: 0.6 });
  const sc    = useSpring(rawS, { stiffness: 300, damping: 36, mass: 0.6 });

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
  const enable3D = !isMobile && !prefersReduced;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const sh = shimRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const nx = (e.clientX - left) / width;
    const ny = (e.clientY - top)  / height;
    // Shimmer position
    if (sh) {
      sh.style.setProperty("--mx", `${nx * 100}%`);
      sh.style.setProperty("--my", `${ny * 100}%`);
    }
    // 3D tilt
    if (enable3D) {
      rawX.set((ny - 0.5) * -8);
      rawY.set((nx - 0.5) *  8);
    }
  };

  const onMouseEnter = () => { if (enable3D) rawS.set(1.02); };
  const onMouseLeave = () => {
    if (enable3D) { rawX.set(0); rawY.set(0); rawS.set(1); }
  };

  return (
    <motion.div
      ref={motionRef}
      className="container"
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pb-8 md:pb-12">
        <Link
          href={`/work/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="block group"
        >
          {/* ── CARD SHELL — solid bg, 3D tilt ────────────────────── */}
          <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
              rotateX: enable3D ? rotX : 0,
              rotateY: enable3D ? rotY : 0,
              scale:   enable3D ? sc   : 1,
              // IMPORTANT: solid base colour — shimmer lives in a child layer
              backgroundColor: "var(--bg)",
              boxShadow: `
                0 ${(index + 1) * 6}px ${(index + 1) * 28}px rgba(0,0,0,${0.06 + index * 0.025}),
                0 1px 3px rgba(0,0,0,0.05)
              `,
            }}
            className="relative rounded-2xl md:rounded-[28px] border border-[var(--border)] overflow-hidden cursor-pointer will-change-transform"
          >
            {/* Shimmer radial — separate child, never overrides solid bg */}
            <div
              ref={shimRef}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${project.color}0C 0%, transparent 65%)`,
              }}
            />

            {/* ── Content wrapper — above shimmer ─────────────────── */}
            <div className="relative z-[1] flex flex-col md:flex-row min-h-[260px]">

              {/* LEFT: Thumbnail (40%) ──────────────────────────────── */}
              <div
                className="w-full md:w-[40%] lg:w-[38%] shrink-0 relative overflow-hidden"
                style={{ minHeight: isMobile ? "200px" : undefined }}
              >
                {/* Gradient fill */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(140deg, ${project.color}28 0%, ${project.color}0E 60%, ${project.color}04 100%)`,
                  }}
                />

                {/* Dot-grid texture */}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: 0.06,
                    backgroundImage: `radial-gradient(circle, ${project.color} 1px, transparent 1px)`,
                    backgroundSize: "22px 22px",
                  }}
                />

                {/* Watermark initial */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
                  <span
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(90px, 14vw, 160px)",
                      color: project.color,
                      opacity: 0.08,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {project.title.charAt(0)}
                  </span>
                </div>

                {/* Real hero image — hidden via onError if absent */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  draggable={false}
                />

                {/* Type badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm"
                    style={{
                      background: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: project.color }} />
                    {project.type}
                  </span>
                </div>

                {/* Right fade into card body */}
                <div
                  className="absolute inset-y-0 right-0 w-12 hidden md:block pointer-events-none"
                  style={{ background: `linear-gradient(to right, transparent, var(--bg))` }}
                />
              </div>

              {/* RIGHT: Content (60%) ──────────────────────────────── */}
              <div className="flex-1 px-6 py-7 sm:px-8 md:px-9 lg:px-10 md:py-9 lg:py-10 flex flex-col gap-5 justify-between min-w-0">

                {/* 1+2+3: Title → Role·Duration → Tagline */}
                <div className="flex flex-col gap-2.5">
                  <h3
                    className="font-display font-bold text-[var(--text-primary)] leading-tight tracking-tight"
                    style={{ fontSize: "clamp(20px, 2.6vw, 30px)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm leading-none flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold" style={{ color: project.color }}>
                      {project.role}
                    </span>
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <span className="text-[var(--text-secondary)] font-mono text-xs tracking-wide">
                      {project.duration}
                    </span>
                  </p>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* 4: Impact metrics — most prominent after title */}
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                    Impact
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.impact.slice(0, 3).map((metric) => {
                      const m = metric.match(/^([\d.]+[+%★×x]?)\s+(.+)$/);
                      return (
                        <div
                          key={metric}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
                          style={{
                            backgroundColor: `${project.color}0C`,
                            borderColor: `${project.color}28`,
                          }}
                        >
                          <span
                            className="text-sm font-bold leading-none tabular-nums"
                            style={{ color: project.color }}
                          >
                            ↑ {m ? m[1] : ""}
                          </span>
                          <span className="text-xs font-medium text-[var(--text-secondary)]">
                            {m ? m[2] : metric}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5+6: Description + Tools + CTA */}
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {project.problem}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border)]">
                    {/* Tools — subtle, de-emphasised */}
                    <div className="flex flex-wrap gap-1.5 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                      {project.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--bg-subtle)] border border-[var(--border)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <span
                      className="flex items-center gap-1.5 text-sm font-semibold shrink-0 transition-all duration-200"
                      style={{ color: project.color }}
                    >
                      View Case Study
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── StackCard — sticky or plain wrapper ──────────────────────────────────────
function StackCard({
  project,
  index,
  isSticky,
  isMobile,
}: {
  project: (typeof projects)[0];
  index: number;
  isSticky: boolean;
  isMobile: boolean;
}) {
  const card = <ProjectCard project={project} index={index} isMobile={isMobile} />;

  if (!isSticky) {
    return <div className="mb-6">{card}</div>;
  }

  return (
    <div
      style={{
        position: "sticky",
        top: `${CARD_BASE_TOP + index * 16}px`,
        zIndex: index + 1,
        willChange: "transform",
      }}
    >
      {card}
    </div>
  );
}

// ─── Work Section ─────────────────────────────────────────────────────────────
export default function Work() {
  const headerRef      = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.4 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    /**
     * WORK PANEL — slides over the pinned Hero (desktop only)
     */
    <section
      id="work"
      style={{
        position: "relative",
        zIndex: 20,
        marginTop: isMobile ? "0" : "-100vh",
        backgroundColor: "var(--bg)",
        borderRadius: "0",
        boxShadow: isMobile ? "none" : "var(--shadow-lift)",
        paddingTop: isMobile ? "64px" : "80px",
      }}
    >
      {/* ── Section header ─────────────────────────────────────── */}
      <div className="container pb-10 md:pb-16" ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)] mb-4 md:mb-6">
            Selected Work
          </p>
          <h2
            className="font-display font-bold text-[var(--text-primary)] leading-tight tracking-tight"
            style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
          >
            Projects that moved
            <br className="hidden sm:block" /> the needle.
          </h2>
        </motion.div>
      </div>

      {/* ── Card stack ─────────────────────────────────────────── */}
      {isMobile ? (
        <div className="pb-8">
          {projects.map((project, i) => (
            <StackCard key={project.slug} project={project} index={i} isSticky={false} isMobile={true} />
          ))}
        </div>
      ) : (
        <div style={{ position: "relative", height: `${projects.length * VH_PER_CARD}vh` }}>
          {projects.map((project, i) => (
            <StackCard key={project.slug} project={project} index={i} isSticky={true} isMobile={false} />
          ))}
        </div>
      )}
    </section>
  );
}
