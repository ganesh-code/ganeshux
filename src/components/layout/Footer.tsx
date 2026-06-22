"use client";

import { useRef, useEffect } from "react";
import { Linkedin, Github } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ganesh-muniganti-4454b0267/" },
  { label: "GitHub",   icon: Github,   href: "https://github.com/ganesh-code/" },
];

const NAV_LINKS = [
  { label: "Work",    href: "#work"    },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
  { label: "Resume",  href: "https://drive.google.com/file/d/1qN7eYP4iT87dGrI9E_vp_xKh6V7YB9dQ/view?usp=sharing", external: true },
];

export default function Footer() {
  const year     = new Date().getFullYear();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted      = true;
    vid.loop       = true;
    vid.playsInline = true;
    vid.play().catch(() => {});
  }, []);

  const scrollTo = (href: string) => {
    if (href.startsWith("/")) return;
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>

      {/* ── BG Video ───────────────────────────────────────── */}
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

      {/* ── Overlay ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.58) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Content ────────────────────────────────────────── */}
      <div className="container relative" style={{ zIndex: 2 }}>
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Left — name + copyright */}
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {year}{" "}
            <span className="font-medium text-white">Ganesh Muniganti</span>
          </p>

          {/* Center — nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5">
            {NAV_LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={!external ? (e) => { e.preventDefault(); scrollTo(href); } : undefined}
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right — social icons */}
          <div className="flex items-center gap-4">
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
                <Icon size={16} strokeWidth={1.6} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
