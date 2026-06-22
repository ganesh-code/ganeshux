"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Copy, Check, MapPin,
  Linkedin, Github,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

// ─── Constants ────────────────────────────────────────────────────
const EMAIL        = "ganeshmuniganti27@gmail.com";
const PHONE        = "+91 8185012138";
const LOCATION     = "Hyderabad, India";
const AVAILABILITY = "Open to Product Design and UX Opportunities";

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: Linkedin,     href: "https://www.linkedin.com/in/ganesh-muniganti-4454b0267/" },
  { label: "GitHub",   icon: Github,       href: "https://github.com/ganesh-code/" },
];

const NAV_LINKS = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
  { label: "Resume",  href: "https://drive.google.com/file/d/1qN7eYP4iT87dGrI9E_vp_xKh6V7YB9dQ/view?usp=sharing", external: true },
];

const FADE_UP = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

// ─── Combined Contact + Footer block ─────────────────────────────
// Always dark — like the Hero section.
// Mounted sticky-top:0 so the page content above scrolls OVER it,
// revealing it like a curtain being lifted.
export default function ContactFooterBlock() {
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const year = new Date().getFullYear();

  // Force autoplay
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted      = true;
    vid.loop       = true;
    vid.playsInline = true;
    vid.play().catch(() => {});
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollTo = (href: string) => {
    if (href.startsWith("/")) return;
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Always-dark palette (matching Hero) ─────────────────────
  const headlineColor = "#FFFFFF";
  const labelColor    = "rgba(255,255,255,0.45)";
  const bodyColor     = "rgba(255,255,255,0.65)";
  const metaColor     = "rgba(255,255,255,0.50)";
  const iconBase      = "rgba(255,255,255,0.38)";
  const iconHover     = "#FFFFFF";
  const dotColor      = "rgba(255,255,255,0.15)";

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: "100vh",
        boxShadow: "0 -20px 80px rgba(0,0,0,0.30), 0 -1px 0 rgba(255,255,255,0.06)",
      }}
    >

      {/* ── Background video ──────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/gifVideo.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay — same left→right as Hero ────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.80) 35%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0) 100%)",
          zIndex: 1,
        }}
      />

      {/* ════════ CONTACT SECTION ════════════════════════════ */}
      <section id="contact" className="section relative" style={{ zIndex: 2 }}>
        <div className="container">
          <div className="max-w-[580px]">

            <motion.p
              variants={FADE_UP} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={0}
              className="text-xs font-semibold uppercase tracking-[0.12em] mb-4"
              style={{ color: "var(--accent)" }}
            >
              Contact
            </motion.p>

            <motion.h2
              variants={FADE_UP} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={1}
              className="font-display font-bold leading-tight tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)", color: headlineColor }}
            >
              Let&apos;s work<br />together.
            </motion.h2>

            <motion.p
              variants={FADE_UP} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={2}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: bodyColor }}
            >
              Have a project in mind? I&apos;m currently available for freelance
              engagements. Let&apos;s talk.
            </motion.p>

            {/* Email CTAs */}
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

            {/* Meta */}
            <motion.div
              variants={FADE_UP} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={4}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-sm"
              style={{ color: metaColor }}
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={13} style={{ color: iconBase }} />
                {LOCATION}
              </span>
              <span className="hidden sm:inline" style={{ color: dotColor }} aria-hidden="true">·</span>
              <span>{PHONE}</span>
              <span className="hidden sm:inline" style={{ color: dotColor }} aria-hidden="true">·</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                {AVAILABILITY}
              </span>
            </motion.div>

            {/* Social icons */}
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
                  style={{ color: iconBase }}
                  onMouseEnter={e => (e.currentTarget.style.color = iconHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = iconBase)}
                >
                  <Icon size={18} strokeWidth={1.6} />
                </a>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div
        className="relative mx-auto"
        style={{ zIndex: 2, height: "1px", background: "rgba(255,255,255,0.10)", maxWidth: "calc(100% - 4rem)" }}
      />

      {/* ════════ FOOTER ═════════════════════════════════════ */}
      <footer className="relative" style={{ zIndex: 2 }}>
        <div className="container">
          <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              © {year}{" "}
              <span className="font-medium text-white">Ganesh Muniganti</span>
            </p>

            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5">
              {NAV_LINKS.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  onClick={!external ? (e) => { e.preventDefault(); scrollTo(href); } : undefined}
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-all duration-200 hover:scale-110"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
