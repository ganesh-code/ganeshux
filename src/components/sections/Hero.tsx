"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Play } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// ─── Verified Contact ────────────────────────────────────────────
const EMAIL = "ganeshmuniganti27@gmail.com";

// ─── Animation Variants ─────────────────────────────────────────
const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const sectionRef    = useRef<HTMLElement>(null);
  const playCursorRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const gifVideoRef   = useRef<HTMLVideoElement>(null);
  const isPlayingRef  = useRef(false);

  // ── Keep ref in sync with state & hide cursor badge when playing ──
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (playCursorRef.current) {
      playCursorRef.current.style.opacity = isPlaying ? "0" : "";
    }
  }, [isPlaying]);

  // ── Custom play-cursor tracking — pure DOM, zero re-renders ──────
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

  // ── Click anywhere on hero background → play intro video ─────────
  const handleSectionClick = (e: React.MouseEvent) => {
    if (isPlayingRef.current) return;
    if ((e.target as Element).closest("a, button, [role='button']")) return;

    const intro = introVideoRef.current;
    const gif   = gifVideoRef.current;
    if (!intro) return;

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

  // ── Intro ended → restore gif loop ────────────────────────────────
  const handleIntroEnded = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    introVideoRef.current?.pause();
    gifVideoRef.current?.play().catch(console.error);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
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
      className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden select-none"
    >
      {/* ── GIF/ambient video — always in DOM, fades when intro plays ── */}
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

      {/* ── Intro video — fades in on click ──────────────────────── */}
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

      {/* ── Dark overlay — lifts when intro plays so video breathes ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.8) 35%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0) 100%)",
          opacity: isPlaying ? 0.12 : 1,
          transition: "opacity 0.8s ease",
        }}
        aria-hidden="true"
      />

      {/* ── Hero content — fades out while intro plays ──────────── */}
      <div
        className="container relative z-10"
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
          className="flex flex-col items-start max-w-[680px] w-full"
        >
          {/* ── Availability & Experience badge ──────────────────── */}
          <motion.div variants={itemVariants} className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-sm">
              <span className="status-dot w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wide text-emerald-300">
                Open to Opportunities
              </span>
            </div>
            <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-sm font-semibold text-[var(--accent-light)]">
              1.3+ Years Experience
            </span>
          </motion.div>

          {/* ── Name ─────────────────────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-medium text-white/70 mb-4"
          >
            Ganesh Muniganti
          </motion.p>

          {/* ── Role ─────────────────────────────────────────────── */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold text-white leading-[1.0] tracking-tight mb-6"
            style={{ fontSize: "clamp(36px, 7.5vw, 88px)" }}
          >
            UX / AI
            <br />
            Product Designer.
          </motion.h1>

          {/* ── Description ──────────────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-white/55 leading-relaxed max-w-[520px] mb-8 md:mb-10"
          >
            Building AI-powered SaaS products, healthcare applications, and
            digital experiences through research, systems thinking, and
            user-centered design.
          </motion.p>

          {/* ── CTAs ─────────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5">
            <MagneticButton>
              <button
                onClick={scrollToWork}
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full
                           bg-white text-black text-sm font-semibold
                           hover:bg-white/85 transition-all duration-200"
              >
                View My Work
                <ArrowRight size={15} />
              </button>
            </MagneticButton>

            <MagneticButton>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full
                           border border-white/30 text-white text-sm font-semibold
                           bg-white/10 hover:bg-white/18 hover:border-white/55
                           backdrop-blur-sm transition-all duration-200"
              >
                <Mail size={15} />
                Get In Touch
              </a>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={copyEmail}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full
                           border border-white/20 text-white/60 text-sm font-semibold
                           bg-white/6 hover:bg-white/12 hover:text-white hover:border-white/40
                           backdrop-blur-sm transition-all duration-200"
              >
                {emailCopied ? "Copied!" : "Copy Email"}
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* ── "Click to play" hint — bottom-right corner ───────────── */}
      <div
        className="absolute bottom-8 right-8 z-10 flex items-center gap-1.5 pointer-events-none"
        style={{
          opacity: isPlaying ? 0 : 0.4,
          transition: "opacity 0.6s ease",
        }}
        aria-hidden="true"
      >
        <Play size={10} fill="white" className="text-white" />
        <span className="text-[10px] text-white tracking-widest uppercase font-semibold">
          Click to play intro
        </span>
      </div>

      {/* ── Custom play cursor badge ────────────────────────────── */}
      <div
        ref={playCursorRef}
        className="fixed z-[100000] pointer-events-none flex items-center gap-1.5
                   px-2.5 py-1.5 rounded-full
                   bg-white/20 border border-white/40 backdrop-blur-sm
                   text-white text-[10px] font-bold tracking-widest uppercase"
        style={{ opacity: 0, left: 0, top: 0, transition: "opacity 0.15s ease" }}
        aria-hidden="true"
      >
        <Play size={9} fill="white" />
        Play
      </div>
    </section>
  );
}
