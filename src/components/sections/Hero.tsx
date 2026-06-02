"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Download,
  Linkedin,
  Github,
  ExternalLink,
  MousePointer2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const skills = [
  "UX Research",
  "Wireframing",
  "Prototyping",
  "Design Systems",
  "Usability Testing",
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", tooltip: "Connect on LinkedIn" },
  { label: "Behance", icon: ExternalLink, href: "https://behance.net", tooltip: "View on Behance" },
  { label: "Dribbble", icon: ExternalLink, href: "https://dribbble.com", tooltip: "See shots on Dribbble" },
  { label: "GitHub", icon: Github, href: "https://github.com", tooltip: "Code on GitHub" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

// Separate card component so parallax doesn't re-render the whole Hero
function ProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number;
    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetRX = ((e.clientY / innerHeight) - 0.5) * -8;
      targetRY = ((e.clientX / innerWidth) - 0.5) * 8;
    };

    const animate = () => {
      currentRX += (targetRX - currentRX) * 0.08;
      currentRY += (targetRY - currentRY) * 0.08;
      card.style.transform = `perspective(1000px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={cardRef} className="relative will-change-transform" style={{ transformStyle: "preserve-3d" }}>
      {/* Spinning gradient ring — no blur, GPU-only via will-change */}
      <div className="absolute inset-0 -m-1 rounded-[36px] overflow-hidden">
        <div className="profile-ring absolute inset-0 rounded-[36px] opacity-20" />
      </div>

      {/* Main card — CSS float animation (compositor thread, zero JS) */}
      <div
        className="float-card relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[440px] rounded-[32px] overflow-hidden border border-[var(--border)] shadow-card-hover"
      >
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 dark:from-violet-900/30 dark:via-purple-900/20 dark:to-pink-900/30" />

        {/* Profile placeholder — gradient avatar */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[var(--accent)] via-purple-400 to-pink-400 flex items-center justify-center text-white text-6xl font-black shadow-glow-strong">
            G
          </div>
          <div className="mt-6 text-center px-4">
            <p className="font-inter-tight font-bold text-xl text-[var(--text-primary)]">Ganesh</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">UX/UI Designer</p>
          </div>
        </div>

        {/* Glass overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="glass rounded-2xl p-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">Open to work</p>
              <p className="text-[10px] text-[var(--text-secondary)]">Full-time &amp; Freelance</p>
            </div>
            <MousePointer2 size={14} className="ml-auto text-[var(--accent)]" />
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -left-12 top-1/4 glass rounded-2xl p-3 shadow-card"
      >
        <p className="text-xs font-bold text-[var(--text-primary)]">5+ Years</p>
        <p className="text-[10px] text-[var(--text-secondary)]">Experience</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -right-10 top-1/3 glass rounded-2xl p-3 shadow-card"
      >
        <p className="text-xs font-bold text-[var(--text-primary)]">20+</p>
        <p className="text-[10px] text-[var(--text-secondary)]">Projects</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-2xl px-4 py-2 shadow-card whitespace-nowrap"
      >
        <p className="text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5">
          <span className="text-yellow-500">★</span> 4.9 / 5.0 Client Rating
        </p>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("ganesh@designer.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(139,92,246,0.05) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(236,72,153,0.04) 0%, transparent 70%)"
      }}
    >

      <div className="container-custom w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start order-2 lg:order-1"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="status-dot w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Available for new projects
                </span>
                <Sparkles size={12} className="text-emerald-500" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="font-inter-tight font-black text-hero-mobile md:text-hero-tablet lg:text-hero-desktop text-[var(--text-primary)] leading-none tracking-tight">
                Hello, I&apos;m{" "}
                <span className="gradient-text">Ganesh</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-body-mobile md:text-body-desktop text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8"
            >
              UX/UI Designer with experience creating intuitive, user-centered
              digital products across web and mobile platforms.
            </motion.p>

            {/* Skills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--border)] text-[var(--text-secondary)] bg-white dark:bg-[var(--dark-surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <MagneticButton>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-dark)] transition-colors shadow-glow hover:shadow-glow-strong"
                  aria-label="Copy email address"
                >
                  <Mail size={15} />
                  {emailCopied ? "Email Copied!" : "Email Me"}
                </button>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={scrollToWork}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--text-primary)] text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-white dark:bg-transparent"
                >
                  View Projects
                  <ArrowRight size={15} />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] text-[var(--text-primary)] text-sm font-semibold hover:border-[var(--border)] transition-colors bg-white dark:bg-transparent"
                >
                  <Download size={15} />
                  Resume
                </a>
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-secondary)] mr-1">Find me on</span>
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <div key={link.label} className="relative group">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredSocial(link.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors"
                      aria-label={link.label}
                    >
                      <Icon size={15} />
                    </a>
                    {/* Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg)] text-xs whitespace-nowrap transition-all duration-200 pointer-events-none ${
                        hoveredSocial === link.label
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1"
                      }`}
                    >
                      {link.tooltip}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile Image Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <ProfileCard />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center mt-16 lg:mt-24"
        >
          <button
            onClick={scrollToWork}
            className="flex flex-col items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
            aria-label="Scroll to work section"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <div className="scroll-indicator">
              <ChevronDown size={18} className="group-hover:text-[var(--accent)]" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
