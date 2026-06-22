"use client";

import { useState, useCallback } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import { AlignLeft, List } from "lucide-react";

// ─── Content ────────────────────────────────────────────────────

interface Experience {
  period: string;
  role: string;
  company: string;
  bullets: string[];
}

const EXPERIENCES: Experience[] = [
  {
    period:  "May 2025 – June 2025",
    role:    "Associate UX / Product Designer",
    company: "Dimension Leap",
    bullets: [
      "Led end-to-end UX design for an AI-powered film pre-production platform serving writers, directors, producers, and agencies.",
      "Designed workflows for 4+ user roles and created high-fidelity interfaces supporting complex film production processes.",
      "Architected 6+ AI-powered workflows including story generation, script editing, auto-fill systems, scheduling automation, and call sheet automation.",
      "Reduced manual effort for production teams by an estimated 35%.",
      "Designed a dual healthcare ecosystem: Patient mobile application & Doctor web platform.",
      "Conducted user research and usability testing across multiple product verticals.",
      "Built scalable design systems and Figma component libraries reducing engineering handoff time by 20%.",
      "Collaborated with Product Managers and Engineers across 5 product releases.",
    ],
  },
  {
    period:  "Feb 2024 – Feb 2025",
    role:    "UX Design Intern",
    company: "Banao Technologies",
    bullets: [
      "Executed 100+ UX audits across e-commerce platforms, EV rental platforms, and social media applications.",
      "Identified and resolved 350+ usability, accessibility, and functional issues.",
      "Improved Hobbiecue application usability and accessibility, increasing task success rates by 30% and accessibility compliance by 25%.",
      "Built a scalable design system reducing design inconsistencies by 40% and improving development handoff efficiency by 20%.",
    ],
  },
];

const SKILLS = [
  "UX Research",
  "Workflow Design",
  "Design Systems",
  "Usability Testing",
  "Interaction Design",
  "Product Strategy",
  "Information Architecture",
  "Accessibility Audits",
];

const TOOLS = [
  "Figma", "Miro", "Maze", "Hotjar",
  "FigJam", "Jitter", "Adobe After Effects", "Rive",
  "Google Forms", "GitHub",
];

const STATS = [
  { value: "1.3+", label: "Years Experience" },
  { value: "100+", label: "UX Audits Conducted" },
  { value: "350+", label: "Usability Issues Identified" },
  { value: "5+",   label: "Product Releases Shipped" },
];

const FADE_UP = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const PROFILE_IMAGES = [
  { url: "/Profile1.png", alt: "Ganesh Muniganti" },
  { url: "/Profile2.png", alt: "Ganesh Muniganti" },
  { url: "/Profile4.png", alt: "Ganesh Muniganti" },
];

// ─── Draggable Card ───────────────────────────────────────────────────
interface DraggableCardProps {
  img: { url: string; alt: string };
  stackIndex: number; // 0 = top, 1/2 = back
  total: number;
  onSendToBack: () => void;
}

function DraggableCard({ img, stackIndex, total, onSendToBack }: DraggableCardProps) {
  const isTop = stackIndex === 0;

  // Drag translation lives on separate MotionValues (never touches animate targets)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const [isDragging, setIsDragging]   = useState(false);
  const [isExiting,  setIsExiting]    = useState(false);

  // ── Stack slot values ───────────────────────────────────────────
  const scale   = 1 - stackIndex * 0.06;
  const yOffset = stackIndex * 18;
  const rotate  = stackIndex === 0 ? 0 : stackIndex % 2 === 0 ? -5 : 5;
  const zIndex  = total - stackIndex;

  // Where the top card will animate TO when sent to back
  const backScale  = 1 - (total - 1) * 0.06;
  const backY      = (total - 1) * 18;
  const backRotate = total % 2 === 0 ? -5 : 5;

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const dist = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);

      if (dist >= 50) {
        // 1. Freeze drag — spring inner card back to center
        animate(dragX, 0, { type: "spring", stiffness: 350, damping: 26 });
        animate(dragY, 0, { type: "spring", stiffness: 350, damping: 26 });
        // 2. Outer wrapper simultaneously springs to back-slot position
        setIsExiting(true);
        // 3. After animation settles → update real stack state
        setTimeout(() => {
          setIsExiting(false);
          dragX.set(0);
          dragY.set(0);
          onSendToBack();
        }, 420);
      } else {
        // Short drag → spring back to front resting position
        animate(dragX, 0, { type: "spring", stiffness: 450, damping: 32 });
        animate(dragY, 0, { type: "spring", stiffness: 450, damping: 32 });
      }
    },
    [dragX, dragY, onSendToBack]
  );

  return (
    <motion.div
      className="absolute inset-0 origin-bottom"
      animate={isExiting
        ? { scale: backScale, y: backY, rotate: backRotate }
        : { scale, y: yOffset, rotate }
      }
      style={{ zIndex: isExiting ? 0 : zIndex }}
      transition={{ type: "spring", stiffness: 290, damping: 28 }}
    >
      {/* INNER: handles drag translation — never conflicts with outer animate */}
      <motion.div
        className="absolute inset-0 rounded-[32px] overflow-hidden border border-[var(--border)] shadow-lg bg-[var(--bg-subtle)] will-change-transform"
        style={{
          x: isTop ? dragX : 0,
          y: isTop ? dragY : 0,
          cursor: isTop ? (isDragging ? "grabbing" : "grab") : "default",
        }}
        drag={isTop && !isExiting}
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileHover={isTop && !isDragging && !isExiting ? { scale: 1.025 } : {}}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url}
          alt={img.alt}
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
}


// ─── About Component ───────────────────────────────────────────────
export default function About() {
  const [viewMode, setViewMode] = useState<"story" | "tldr">("story");
  const [stack, setStack] = useState([0, 1, 2]);

  const sendToBack = useCallback(() => {
    setStack((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  const detailClass = `transition-all duration-500 ${
    viewMode === "tldr"
      ? "opacity-20 line-through decoration-[var(--text-tertiary)] select-none"
      : "opacity-100 no-underline"
  }`;

  const badgeClass = "font-bold text-[var(--text-primary)] transition-all duration-300";

  return (
    <section id="about" className="section">
      <div className="container">

        {/* ── Section Header ──────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 pb-6 border-b border-[var(--border)]">
          <div>
            <motion.p
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-4"
            >
              About
            </motion.p>
            <motion.h2
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
            >
              Where curiosity<br />meets creation.
            </motion.h2>
          </div>

          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="shrink-0"
          >
            <div className="inline-flex p-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-full text-xs font-medium">
              <button
                onClick={() => setViewMode("story")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 ${
                  viewMode === "story"
                    ? "bg-[var(--bg)] text-[var(--text-primary)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <AlignLeft size={14} />
                Story
              </button>
              <button
                onClick={() => setViewMode("tldr")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 ${
                  viewMode === "tldr"
                    ? "bg-[var(--bg)] text-[var(--text-primary)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <List size={14} />
                TL;DR
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Two Column: Text + Stats | Image Stack ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-20 items-start mb-20 pb-20 border-b border-[var(--border)]">

          {/* Left: Bio + Stats */}
          <div className="flex flex-col gap-12">
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-[52ch] text-[var(--text-secondary)] leading-[1.85] space-y-6 text-[1.0625rem]"
            >
              <p>
                <span className="font-semibold text-[var(--text-primary)] text-[1.125rem] leading-snug">
                  I&apos;ve always been fascinated by how things work—not just products, but the decisions behind them.
                </span>
              </p>

              <p>
                <span className="font-medium text-[var(--text-primary)]">
                  What began as a curiosity for technology evolved into a passion for <span className={badgeClass}>designing experiences</span>.
                </span>
                <span className={detailClass}>
                  {" "}From <span className={badgeClass}>sketching user flows</span> and <span className={badgeClass}>crafting prototypes</span> to building interfaces in <span className={badgeClass}>React</span>, I enjoy every step of transforming an idea into something real.
                </span>
              </p>

              <p>
                <span className="font-medium text-[var(--text-primary)]">
                  I see design as a bridge between people and technology.
                </span>
                <span className={detailClass}>
                  {" "}My work combines <span className={badgeClass}>user research</span>, <span className={badgeClass}>product thinking</span>, <span className={badgeClass}>frontend development</span>, and <span className={badgeClass}>AI-powered tools</span> to create experiences that are simple, thoughtful, and impactful.
                </span>
              </p>

              <p>
                <span className="font-medium text-[var(--text-primary)]">
                  At the end of the day, I&apos;m just someone who enjoys solving problems and building things that make life a little easier for the people using them.
                </span>
              </p>
            </motion.div>

            {/* Stats — intentional grid with stronger numbers */}
            <motion.div
              variants={FADE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 pt-6 border-t border-[var(--border)]"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <p className="font-display font-bold text-[var(--text-primary)] leading-none"
                     style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}>
                    {value}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] leading-snug tracking-wide">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Draggable image stack */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end w-full h-[380px] sm:h-[440px] lg:h-[480px] relative items-start pt-2 select-none"
          >
            <div
              className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px] h-[320px] sm:h-[380px] lg:h-[420px]"
              aria-label="Drag the top image to shuffle cards"
            >
              {stack.map((imgIndex, stackIndex) => (
                <DraggableCard
                  key={imgIndex}
                  img={PROFILE_IMAGES[imgIndex]}
                  stackIndex={stackIndex}
                  total={stack.length}
                  onSendToBack={sendToBack}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Experience + Skills ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-20">

          {/* Experience timeline */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-10">
              Experience
            </p>

            <div className="space-y-0">
              {EXPERIENCES.map((exp, i) => (
                <div key={exp.period} className="flex gap-6 group">
                  {/* Timeline */}
                  <div className="flex flex-col items-center pt-2 shrink-0">
                    <div className="w-2 h-2 rounded-full ring-2 ring-[var(--border)] bg-[var(--bg)] group-hover:bg-[var(--accent)] group-hover:ring-[var(--accent)] transition-all duration-300 shrink-0" />
                    {i < EXPERIENCES.length - 1 && (
                      <div className="w-px flex-1 bg-[var(--border)] mt-3 mb-0" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-12 flex-1 min-w-0">
                    {/* Role + Company row */}
                    <div className="mb-1.5">
                      <p className="text-base font-semibold text-[var(--text-primary)] leading-snug">
                        {exp.role}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        <span className="text-sm font-medium text-[var(--accent)]">{exp.company}</span>
                        <span className="text-xs text-[var(--text-tertiary)] font-mono tracking-wide">{exp.period}</span>
                      </div>
                    </div>

                    {/* Bullet achievements */}
                    <ul className="mt-5 space-y-3">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                          <span className="mt-[0.45em] w-1 h-1 rounded-full bg-[var(--border)] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills + Tools */}
          <motion.div
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-12 lg:pt-11"
          >
            {/* Skills */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-6">
                What I Do
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)]
                               text-sm font-medium text-[var(--text-primary)]
                               hover:border-[var(--accent)] hover:text-[var(--accent)]
                               transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-5">
                Toolbox
              </p>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)]
                               text-xs font-mono text-[var(--text-secondary)]
                               bg-[var(--bg-subtle)]
                               hover:text-[var(--text-primary)] transition-colors duration-200 cursor-default"
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
