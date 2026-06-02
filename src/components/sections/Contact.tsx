"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowRight, Linkedin, ExternalLink, Github, MapPin, Clock } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("ganesh@designer.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section-py">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/8 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-semibold uppercase tracking-widest mb-6">
            <span>✦</span> Get In Touch
          </span>
          <h2 className="font-inter-tight font-black text-section-mobile md:text-section-desktop text-[var(--text-primary)] leading-tight tracking-tight mb-4">
            Let&apos;s create something
            <br />
            <span className="gradient-text">extraordinary together</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-body-mobile md:text-body-desktop leading-relaxed mb-12 max-w-xl mx-auto">
            Whether you have a project in mind, a question, or just want to say hello &mdash; my inbox is always open.
          </p>

          {/* Email card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-3xl border border-[var(--border)] bg-white dark:bg-[var(--dark-surface)] p-8 md:p-10 mb-8 shadow-soft overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/3 via-transparent to-pink-500/3 pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <Mail size={22} className="text-[var(--accent)]" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-[var(--text-secondary)] font-medium mb-0.5">Email address</p>
                  <p className="text-lg font-semibold text-[var(--text-primary)] font-mono">
                    ganesh@designer.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MagneticButton>
                  <motion.button
                    onClick={copyEmail}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all bg-[var(--bg)]"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        <span className="text-emerald-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </motion.button>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="mailto:ganesh@designer.com"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-dark)] transition-all shadow-glow hover:shadow-glow-strong"
                  >
                    Send Email
                    <ArrowRight size={14} />
                  </a>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Info row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-secondary)] mb-10"
          >
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[var(--accent)]" />
              <span>India (Remote-first)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[var(--accent)]" />
              <span>IST (UTC+5:30)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Usually responds in 24h</span>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            {[
              { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
              { label: "Behance", icon: ExternalLink, href: "https://behance.net" },
              { label: "Dribbble", icon: ExternalLink, href: "https://dribbble.com" },
              { label: "GitHub", icon: Github, href: "https://github.com" },
            ].map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                aria-label={label}
              >
                <Icon size={13} />
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
