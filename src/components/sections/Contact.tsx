"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MapPin, Linkedin, Github } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const EMAIL        = "ganeshmuniganti27@gmail.com";
const PHONE        = "+91 8185012138";
const LOCATION     = "Hyderabad, India";
const AVAILABILITY = "Open to Product Design and UX Opportunities";

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ganesh-muniganti-4454b0267/" },
  { label: "GitHub",   icon: Github,   href: "https://github.com/ganesh-code/" },
];

const FADE_UP = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.loop  = true;
    vid.playsInline = true;
    vid.play().catch(() => {/* autoplay blocked — video stays hidden */});
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section relative overflow-hidden">

      {/* ── BG Video ─────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/FooterVide.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay — dark enough to read, light enough to see video ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.52) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="container relative" style={{ zIndex: 2 }}>
        <div className="max-w-[580px]">

          <motion.p
            variants={FADE_UP} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={0}
            className="text-xs font-semibold uppercase tracking-[0.12em] mb-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Contact
          </motion.p>

          <motion.h2
            variants={FADE_UP} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={1}
            className="font-display font-bold leading-tight tracking-tight mb-4 text-white"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
          >
            Let&apos;s work<br />together.
          </motion.h2>

          <motion.p
            variants={FADE_UP} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={2}
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.68)" }}
          >
            Have a project in mind? I&apos;m currently available for freelance
            engagements. Let&apos;s talk.
          </motion.p>

          <motion.div
            variants={FADE_UP} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={3}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <MagneticButton>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2
                           px-5 py-3 rounded-full w-full sm:w-auto
                           bg-white text-black text-sm font-semibold truncate
                           hover:opacity-85 transition-opacity duration-200"
              >
                <span className="sm:hidden">Send Email</span>
                <span className="hidden sm:inline">{EMAIL}</span>
              </a>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2
                           px-5 py-3 rounded-full border border-white/30
                           text-sm font-medium text-white/75
                           hover:text-white hover:border-white/60
                           backdrop-blur-sm transition-all duration-200"
                aria-label="Copy email address"
              >
                {copied ? (
                  <><Check size={14} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></>
                ) : (
                  <><Copy size={14} />Copy</>
                )}
              </button>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={FADE_UP} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={4}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-sm"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
              {LOCATION}
            </span>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.2)" }} aria-hidden="true">·</span>
            <span>{PHONE}</span>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.2)" }} aria-hidden="true">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              {AVAILABILITY}
            </span>
          </motion.div>

          <motion.div
            variants={FADE_UP} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={5}
            className="flex items-center gap-4"
          >
            {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-all duration-200 hover:scale-110"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                <Icon size={18} strokeWidth={1.6} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
