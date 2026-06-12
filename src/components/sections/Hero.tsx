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
  Sparkles,
  ChevronDown,
  Play,
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
  { label: "LinkedIn",  icon: Linkedin,     href: "https://linkedin.com",  tooltip: "Connect on LinkedIn" },
  { label: "Behance",   icon: ExternalLink, href: "https://behance.net",   tooltip: "View on Behance" },
  { label: "Dribbble",  icon: ExternalLink, href: "https://dribbble.com",  tooltip: "See shots on Dribbble" },
  { label: "GitHub",    icon: Github,       href: "https://github.com",    tooltip: "Code on GitHub" },
];

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  const [isPlaying,     setIsPlaying]     = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [emailCopied,   setEmailCopied]   = useState(false);

  const sectionRef    = useRef<HTMLElement>(null);
  const playCursorRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const gifVideoRef   = useRef<HTMLVideoElement>(null);
  const isPlayingRef  = useRef(false);

  // Sync ref with state & update cursor visibility
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (playCursorRef.current) {
      playCursorRef.current.style.opacity = isPlaying ? "0" : "";
    }
  }, [isPlaying]);

  // Play-cursor tracking — pure DOM, zero re-renders per frame
  useEffect(() => {
    const section = sectionRef.current;
    const cursor  = playCursorRef.current;
    if (!section || !cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX + 18}px`;
      cursor.style.top  = `${e.clientY - 14}px`;
      if (isPlayingRef.current) return;
      const interactive = (e.target as Element).closest("a, button, [role='button'], input");
      cursor.style.opacity = interactive ? "0" : "1";
    };

    const onLeave = () => { cursor.style.opacity = "0"; };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Click on hero background → play intro
  const handleSectionClick = (e: React.MouseEvent) => {
    if (isPlayingRef.current) return;
    if ((e.target as Element).closest("a, button, [role='button']")) return;

    const intro = introVideoRef.current;
    const gif   = gifVideoRef.current;
    if (!intro) return;

    // Pause gif, rewind & play intro with sound
    gif?.pause();
    intro.currentTime = 0;
    intro.muted = false;
    intro.play()
      .then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      })
      .catch((err) => {
        console.warn("Intro play failed:", err);
        gif?.play();
      });
  };

  // Intro ended → restore gif
  const handleIntroEnded = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    introVideoRef.current?.pause();
    gifVideoRef.current?.play().catch(console.error);
  };

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
      ref={sectionRef}
      id="home"
      onClick={handleSectionClick}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden select-none"
    >
      {/* ── GIF background — always in DOM, fades via opacity ── */}
      <video
        ref={gifVideoRef}
        src="/videos/gifVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          opacity: isPlaying ? 0 : 1,
          transition: "opacity 0.8s ease",
        }}
        aria-hidden="true"
      />

      {/* ── Intro video — always in DOM, fades in on play ── */}
      <video
        ref={introVideoRef}
        src="/videos/IntroVideo.mp4"
        playsInline
        preload="auto"
        onEnded={handleIntroEnded}
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        style={{
          opacity: isPlaying ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}
        aria-label="Intro video"
      />

      {/* ── Overlay — lighter when intro plays so video breathes ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "rgba(0,0,0,0.70)",
          opacity: isPlaying ? 0.14 : 1,
          transition: "opacity 0.8s ease",
        }}
        aria-hidden="true"
      />

      {/* ── Hero content — fades out while intro plays, back when done ── */}
      <div
        className="container-custom w-full relative z-10"
        style={{
          opacity: isPlaying ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: isPlaying ? "none" : "auto",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-2xl"
        >
          {/* 1 — Availability badge */}
          <motion.div variants={itemVariants} className="mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-sm">
              <div className="status-dot w-2 h-2 rounded-full bg-emerald-400 relative" />
              <span className="text-xs font-semibold tracking-wide text-emerald-300">
                Available for new projects
              </span>
              <Sparkles size={11} className="text-emerald-400" />
            </div>
          </motion.div>

          {/* 2 — Greeting */}
          <motion.div variants={itemVariants} className="mb-3">
            <p className="font-nunito text-sm sm:text-base md:text-lg font-semibold text-white/60 tracking-wide">
              Hello, I&apos;m&nbsp;
              <span className="text-white/90 font-bold">Ganesh Muniganti</span>
            </p>
          </motion.div>

          {/* 3 — Big title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1
              className="font-nunito font-black leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7vw, 4.2rem)" }}
            >
              <span className="text-white">UX /&nbsp;</span>
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)" }}
              >
                Product Designer
              </span>
            </h1>
          </motion.div>

          {/* 4 — Description */}
          <motion.p
            variants={itemVariants}
            className="font-inter text-sm sm:text-base text-white/55 leading-relaxed max-w-md mb-7"
          >
            Crafting intuitive, user-centred digital products across web&nbsp;&amp;&nbsp;mobile.
            I bridge research, systems thinking, and visual craft into seamless experiences.
          </motion.p>

          {/* 5 — Skill pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-nunito px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold
                           bg-white/12 border border-white/25 text-white/80
                           hover:bg-[var(--accent)]/30 hover:border-[var(--accent)]/60 hover:text-white
                           transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* 6 — CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-9">
            <MagneticButton>
              <button
                onClick={copyEmail}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full
                           bg-[var(--accent)] text-white text-sm font-semibold font-nunito
                           hover:bg-[var(--accent-dark)] transition-colors shadow-glow hover:shadow-glow-strong"
                aria-label="Copy email address"
              >
                <Mail size={14} />
                {emailCopied ? "Copied!" : "Email Me"}
              </button>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={scrollToWork}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full
                           border border-white/35 text-white text-sm font-semibold font-nunito
                           bg-white/10 hover:bg-white/18 hover:border-white/55 transition-all"
              >
                View Projects
                <ArrowRight size={14} />
              </button>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full
                           border border-white/25 text-white/70 text-sm font-semibold font-nunito
                           bg-white/8 hover:bg-white/15 hover:text-white hover:border-white/45 transition-all"
              >
                <Download size={14} />
                Resume
              </a>
            </MagneticButton>
          </motion.div>

          {/* 7 — Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="font-nunito text-[11px] text-white/40 mr-1 uppercase tracking-wider">
              Find me on
            </span>
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
                    className="w-8 h-8 flex items-center justify-center rounded-full
                               border border-white/20 text-white/50
                               hover:text-white hover:border-white/50 hover:bg-white/10 transition-all"
                    aria-label={link.label}
                  >
                    <Icon size={14} />
                  </a>
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1
                                rounded-md bg-white/90 text-black text-[10px] font-nunito font-semibold
                                whitespace-nowrap transition-all duration-150 pointer-events-none ${
                      hoveredSocial === link.label ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    {link.tooltip}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex justify-center mt-14 lg:mt-20"
        >
          <button
            onClick={scrollToWork}
            className="flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors group"
            aria-label="Scroll to work section"
          >
            <span className="font-nunito text-[10px] tracking-widest uppercase">Scroll to explore</span>
            <div className="scroll-indicator">
              <ChevronDown size={16} />
            </div>
          </button>
        </motion.div>
      </div>

      {/* ── "Click to play" subtle hint ── */}
      <div
        className="absolute bottom-8 right-8 z-10 flex items-center gap-1.5 pointer-events-none"
        style={{
          opacity: isPlaying ? 0 : 0.35,
          transition: "opacity 0.6s ease",
        }}
      >
        <Play size={10} fill="white" className="text-white" />
        <span className="font-nunito text-[10px] text-white tracking-widest uppercase">Click to play intro</span>
      </div>

      {/* ── Play cursor badge ── */}
      <div
        ref={playCursorRef}
        className="fixed z-[100000] pointer-events-none flex items-center gap-1.5
                   px-2.5 py-1.5 rounded-full
                   bg-white/20 border border-white/40 backdrop-blur-sm
                   text-white text-[10px] font-nunito font-bold tracking-widest uppercase"
        style={{ opacity: 0, left: 0, top: 0, transition: "opacity 0.15s ease" }}
        aria-hidden="true"
      >
        <Play size={9} fill="white" />
        Play
      </div>
    </section>
  );
}
