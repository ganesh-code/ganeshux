"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  Users, Heart, Pill, Building2, Shield, Smartphone, Monitor,
  ChevronRight, Star, GitBranch, FileText, MessageSquare,
  Zap, TrendingUp, Target, RefreshCw, Code,
  Lightbulb, BarChart3, ArrowUpRight, Layers, PenTool, Layout
} from "lucide-react";

const ACCENT  = "#0EA5E9";
const ACCENT2 = "#7C3AED";
const EMERALD = "#10B981";
const AMBER   = "#F59E0B";
const RED     = "#EF4444";

const FU = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ── Reusable primitives ───────────────────────────────────────────────────────
function SectionLabel({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[11px] font-mono font-bold text-[var(--text-tertiary)] tracking-[0.2em]">{n}</span>
      <div className="h-px flex-1 bg-[var(--border)]" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>{text}</span>
    </div>
  );
}

function Tag({ text, color }: { text: string; color: string }) {
  return (
    <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full"
      style={{ background: `${color}15`, color }}>{text}</span>
  );
}

// Standardized Decision Story format — visually consistent, instantly scannable
function DecisionStory({ challenge, options, decision, tradeoff, outcome, whatChanged }: {
  challenge: string;
  options: { label: string; rejected: boolean; reason: string }[];
  decision: string;
  tradeoff: string;
  outcome: string;
  whatChanged: { role: string; change: string; color: string }[];
}) {
  const steps = [
    { label: "Challenge",          content: challenge,  color: RED     },
    { label: "Decision",           content: decision,   color: EMERALD },
    { label: "Trade-off Accepted", content: tradeoff,   color: AMBER   },
    { label: "Outcome",            content: outcome,    color: ACCENT2 },
  ];
  return (
    <div className="space-y-6">
      {/* Options considered */}
      <div>
        <p className="text-[10px] font-mono font-bold tracking-widest mb-3 text-[var(--text-tertiary)]">OPTIONS CONSIDERED</p>
        <div className="space-y-2">
          {options.map(({ label, rejected, reason }) => (
            <div key={label} className="flex items-start gap-3 p-3 rounded-xl border border-[var(--border)]"
              style={{ background: rejected ? `${RED}06` : `${EMERALD}06`, opacity: rejected ? 0.85 : 1 }}>
              {rejected
                ? <XCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
                : <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: EMERALD }} />}
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)] mb-0.5">{label}</p>
                <p className="text-xs text-[var(--text-secondary)]">{reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linear story flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map(({ label, content, color }) => (
          <div key={label} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <p className="text-[10px] font-mono font-bold tracking-widest mb-2" style={{ color }}>{label.toUpperCase()}</p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{content}</p>
          </div>
        ))}
      </div>

      {/* What Changed */}
      <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
        <p className="text-[10px] font-mono font-bold tracking-widest mb-3" style={{ color: ACCENT }}>WHY THIS DECISION MATTERED</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {whatChanged.map(({ role, change, color }) => (
            <div key={role} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
              <p className="text-xs text-[var(--text-secondary)]"><span className="font-semibold" style={{ color }}>{role}:</span> {change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function HealthcareCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1],   ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 70% at 30% 0%, ${ACCENT}1A 0%, transparent 60%),
                       radial-gradient(ellipse 50% 50% at 90% 80%, ${ACCENT2}10 0%, transparent 60%)`
        }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Link href="/#work" className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-5 group transition-colors w-fit">
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 duration-200" />
                Back to Work
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7"
                style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}28` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                Healthcare · Enterprise UX · AI Integration · 6 Products
              </div>

              <h1 className="font-display font-black text-[var(--text-primary)] leading-[1.05] tracking-tight mb-4"
                style={{ fontSize: "clamp(28px, 4.5vw, 58px)" }}>
                How a client rejection{" "}
                <span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  taught me where AI
                </span>{" "}
                actually belongs in a healthcare app
              </h1>

              {/* Emotional hook */}
              <p className="text-base font-semibold text-[var(--text-primary)] mb-4 leading-relaxed border-l-4 pl-4"
                style={{ borderLeftColor: ACCENT }}>
                One client request — &ldquo;Add AI&rdquo; — became the biggest product decision of the project:
                where AI should, and shouldn&apos;t, live in a healthcare experience.
              </p>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-9">
                We proposed AI as the homepage. Stakeholders rejected it. That rejection changed how I think about product strategy entirely.
              </p>

              <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
                {[
                  { label: "Role",    value: "Associate UX / Product Designer" },
                  { label: "Company", value: "Dimension Leap" },
                  { label: "Year",    value: "2025" },
                  { label: "Scope",   value: "6 Products · 5 Stakeholder Types" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-wider block mb-0.5">{label}</span>
                    <span className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} className="relative hidden lg:block">
              <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-25"
                style={{ background: `radial-gradient(ellipse, ${ACCENT}70 0%, transparent 70%)` }} />
              <div className="relative rounded-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: `0 32px 80px rgba(14,165,233,0.22), 0 8px 24px rgba(0,0,0,0.18)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/healthcare.png" alt="Unified Healthcare Platform" className="w-full h-auto object-cover block" draggable={false} />
                <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${ACCENT}14, transparent)` }} />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <span className="text-[10px] font-mono tracking-widest text-[var(--text-tertiary)]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PROJECT AT A GLANCE                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-12">

          {/* Quick context row */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pb-10 mb-10 border-b border-[var(--border)]">
            {[
              { label: "Role",             value: "Product Designer" },
              { label: "Duration",         value: "~1 Year" },
              { label: "Team",             value: "1 PM · Devs · QA · Client" },
              { label: "Platforms",        value: "Mobile & Web" },
              { label: "Tools",            value: "Figma · FigJam · Notion" },
              { label: "Deliverables",     value: "Design System · UI · Handoff · QA" },
            ].map(({ label, value }) => (
              <motion.div key={label} variants={FU}>
                <span className="text-[9px] font-mono font-bold tracking-widest block mb-1 text-[var(--text-tertiary)]">{label.toUpperCase()}</span>
                <span className="text-xs font-semibold text-[var(--text-primary)] leading-snug">{value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Three headline facts */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: AlertTriangle, label: "Biggest Challenge",  text: "Designing six products simultaneously, from zero infrastructure, for stakeholders with completely different mental models.", color: RED     },
              { icon: GitBranch,     label: "Biggest Decision",   text: "Rejecting AI as the homepage — and repositioning it as contextual assistance embedded within existing healthcare workflows.", color: ACCENT  },
              { icon: Lightbulb,     label: "Biggest Lesson",     text: "Where you place a feature is a product strategy decision. AI at the wrong moment reduces trust — even if the feature itself is well-designed.", color: AMBER   },
            ].map(({ icon: Icon, label, text, color }) => (
              <motion.div key={label} variants={FU} className="p-5 rounded-2xl border border-[var(--border)]"
                style={{ borderColor: `${color}25`, background: `${color}06` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={15} style={{ color }} />
                  <p className="text-[10px] font-mono font-bold tracking-widest" style={{ color }}>{label.toUpperCase()}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Key decisions at a glance */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <p className="text-[10px] font-mono font-bold tracking-widest mb-4" style={{ color: ACCENT }}>KEY PRODUCT DECISIONS</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                "✓ Built shared design system before any product screen",
                "✓ Proposed AI-first homepage — and supported its rejection",
                "✓ Repositioned AI from entry point to contextual assistance",
                "✓ Chose purpose-built products over a super-app",
                "✓ Applied progressive disclosure to solve clinical navigation",
                "✓ Introduced pre-QA design validation every sprint",
              ].map((d) => (
                <div key={d} className="flex items-start gap-2.5 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                  <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article body ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-32 space-y-28 mt-24">

        {/* 01 · THE OPPORTUNITY */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="01" text="The Opportunity" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-4">
              <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight"
                style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}>
                Not a design brief.<br /><span style={{ color: ACCENT }}>A business problem.</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Healthcare in India runs on fragmentation. The client saw a market opportunity: build a unified, AI-powered platform before competitors did. The business case was first-mover advantage in a market where patients, doctors, clinics, pharmacies, and administrators each operated in isolation.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The real brief: <em>design a system complex enough to replace five broken workflows — simple enough for a 60-year-old doctor and an 18-year-old patient.</em>
              </p>
              <div className="p-5 rounded-2xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: ACCENT }}>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  &ldquo;We have the vision for a unified platform. We need a designer who can see the entire system at once and make it feel like one product.&rdquo;
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2 font-mono">— CEO, Product Kickoff</p>
              </div>
            </div>
            <div>
              {/* Before-state visual */}
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">BEFORE — Fragmented ecosystem</p>
                </div>
                <div className="p-5 space-y-2">
                  {[
                    { label: "Patient",  tool: "WhatsApp + phone calls",           c: RED    },
                    { label: "Doctor",   tool: "Paper notes + verbal coordination", c: AMBER  },
                    { label: "Clinic",   tool: "Excel spreadsheets",               c: RED    },
                    { label: "Pharmacy", tool: "Fax + manual entry",               c: AMBER  },
                    { label: "Admin",    tool: "No central system",                c: RED    },
                  ].map(({ label, tool, c }) => (
                    <div key={label} className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-0">
                      <span className="text-sm font-medium text-[var(--text-primary)] w-24 shrink-0">{label}</span>
                      <span className="text-xs text-[var(--text-secondary)] flex-1">{tool}</span>
                      <XCircle size={13} style={{ color: c }} className="shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 02 · CONSTRAINTS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="02" text="Constraints" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            The constraints that made every decision harder.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            Without these constraints, the decisions below look easy. They weren&apos;t.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Greenfield — 0 to 1",        desc: "No prior product, no design system, no prior designer. Everything built from scratch.", color: RED     },
              { label: "No design system",           desc: "Six products needed to feel like one platform. No shared foundation existed.", color: AMBER  },
              { label: "Undefined AI requirements",  desc: "Client wanted AI but hadn&apos;t specified what it should do, where, or what it replaces.", color: ACCENT  },
              { label: "Six products in parallel",   desc: "All products designed simultaneously. Design had to stay ahead of development without creating speculative work.", color: ACCENT2 },
              { label: "Sprint-based delivery",      desc: "Features were shipping while design was still progressing. Tight synchronisation required.", color: EMERALD },
              { label: "Continuous stakeholder feedback", desc: "Client and CEO feedback arrived mid-sprint, sometimes requiring direction changes without slipping timelines.", color: "#6366F1" },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={12} style={{ color }} />
                  <p className="text-xs font-semibold" style={{ color }}>{label}</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* 03 · BUILDING THE FOUNDATION */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="03" text="Building the Foundation" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Why I built the design system before a single product screen.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
            <div className="flex flex-col gap-4">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Six products. One designer. No shared foundation. If design began with features, each product would grow its own visual language. By sprint eight, inconsistency would be structural and expensive to reverse.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                I proposed pausing feature design to build the system first. To the PM: <em>&ldquo;Every sprint after this becomes faster because components already exist.&rdquo;</em>
              </p>

              {/* Key outcome — specific, defensible */}
              <div className="p-5 rounded-2xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: EMERALD }}>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">The outcome</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Reusable components allowed screens across the Patient, Clinic, Pharmacy, and Admin products to follow a shared interaction language — without each screen requiring new design decisions from scratch.
                </p>
              </div>
            </div>

            {/* Design System Visual Artifact */}
            <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                <p className="text-xs font-mono text-[var(--text-tertiary)]">DESIGN SYSTEM — What was built</p>
              </div>
              <div className="p-5 space-y-4">
                {/* Typography scale */}
                <div>
                  <p className="text-[9px] font-mono font-bold tracking-widest mb-2" style={{ color: ACCENT }}>TYPOGRAPHY HIERARCHY</p>
                  <div className="space-y-1.5">
                    {[
                      { size: "32px", weight: "800", label: "Display / Hero", sample: "Aa" },
                      { size: "20px", weight: "700", label: "Section heading", sample: "Aa" },
                      { size: "16px", weight: "600", label: "Card title",      sample: "Aa" },
                      { size: "14px", weight: "400", label: "Body text",       sample: "Aa" },
                      { size: "12px", weight: "400", label: "Caption / Label", sample: "Aa" },
                    ].map(({ size, weight, label, sample }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="font-bold text-[var(--text-primary)] w-10 shrink-0" style={{ fontSize: size, fontWeight: weight }}>{sample}</span>
                        <span className="text-xs text-[var(--text-tertiary)]">{size} / {weight} — {label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Colour tokens */}
                <div>
                  <p className="text-[9px] font-mono font-bold tracking-widest mb-2" style={{ color: ACCENT }}>COLOUR TOKENS</p>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { name: "Brand",     c: ACCENT  },
                      { name: "Purple",    c: ACCENT2 },
                      { name: "Success",   c: EMERALD },
                      { name: "Warning",   c: AMBER   },
                      { name: "Danger",    c: RED     },
                      { name: "Surface",   c: "#1F2937" },
                    ].map(({ name, c }) => (
                      <div key={name} className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-lg" style={{ background: c }} />
                        <span className="text-[8px] text-[var(--text-tertiary)] font-mono">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Spacing scale */}
                <div>
                  <p className="text-[9px] font-mono font-bold tracking-widest mb-2" style={{ color: ACCENT }}>8PT SPACING SCALE</p>
                  <div className="flex items-end gap-2">
                    {[4, 8, 12, 16, 24, 32, 48].map((s) => (
                      <div key={s} className="flex flex-col items-center gap-1">
                        <div className="rounded" style={{ width: "12px", height: `${s * 0.6}px`, background: `${ACCENT}50` }} />
                        <span className="text-[8px] text-[var(--text-tertiary)] font-mono">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Components */}
                <div>
                  <p className="text-[9px] font-mono font-bold tracking-widest mb-2" style={{ color: ACCENT }}>COMPONENT LIBRARY</p>
                  <div className="flex flex-wrap gap-2">
                    {["Buttons", "Inputs", "Cards", "Modals", "Nav", "Tables", "Badges", "States"].map((c) => (
                      <span key={c} className="text-[10px] px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)] font-mono">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 04 · UNDERSTANDING THE PRODUCT */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="04" text="Understanding the Product" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Before screens, I mapped the transaction chain.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Every design decision in one product triggered effects in others. Mapping this upfront prevented conflicts that would have surfaced much later.
          </p>

          {/* Transaction flow — product-oriented */}
          <div className="rounded-2xl border border-[var(--border)] overflow-hidden mb-10">
            <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
              <p className="text-xs font-mono text-[var(--text-tertiary)]">THE CORE TRANSACTION CHAIN</p>
            </div>
            <div className="p-6 overflow-x-auto">
              <div className="flex items-start gap-0 min-w-max">
                {[
                  { actor: "Patient",  action: "Books consultation",     platform: "Mobile App", color: "#0EA5E9", icon: Users      },
                  { actor: "Clinic",   action: "Assigns doctor + slot",  platform: "Web Portal", color: "#F59E0B", icon: Building2  },
                  { actor: "Doctor",   action: "Reviews history + consults", platform: "Mobile/Web", color: "#7C3AED", icon: Heart   },
                  { actor: "Doctor",   action: "Raises prescription",    platform: "Mobile App", color: "#7C3AED", icon: FileText   },
                  { actor: "Pharmacy", action: "Receives + fulfils",     platform: "Web Portal", color: "#EF4444", icon: Pill       },
                  { actor: "Patient",  action: "Gets status + AI guidance", platform: "Mobile App", color: "#0EA5E9", icon: Users   },
                ].map(({ actor, action, platform, color, icon: Icon }, i, arr) => (
                  <div key={`${actor}-${i}`} className="flex items-center gap-0">
                    <div className="flex flex-col items-center gap-2 w-28">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <p className="text-[10px] font-mono font-bold" style={{ color }}>{actor.toUpperCase()}</p>
                      <p className="text-[10px] text-[var(--text-primary)] font-medium text-center leading-tight">{action}</p>
                      <p className="text-[9px] text-[var(--text-tertiary)] font-mono text-center">{platform}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex flex-col items-center px-2 pb-10">
                        <div className="w-6 h-px bg-[var(--border)]" />
                        <ArrowRight size={10} className="text-[var(--text-tertiary)] -mt-1.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6 products grid */}
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Smartphone, title: "Patient Mobile App",          type: "iOS & Android",    color: "#0EA5E9", purpose: "Appointments, records, prescriptions, AI guidance" },
              { icon: Heart,      title: "Doctor Mobile App",           type: "iOS & Android",    color: "#7C3AED", purpose: "Consultation queue, patient history, prescriptions" },
              { icon: Monitor,    title: "Doctor Web Portal",           type: "Web Application",  color: "#10B981", purpose: "Practice management, analytics, full case history" },
              { icon: Building2,  title: "Clinic Management Portal",    type: "Web Application",  color: "#F59E0B", purpose: "Scheduling, staff assignment, patient flow" },
              { icon: Pill,       title: "Pharmacy Management Portal",  type: "Web Application",  color: "#EF4444", purpose: "Digital prescriptions, inventory, fulfilment tracking" },
              { icon: Shield,     title: "Super Admin Dashboard",       type: "Web Application",  color: "#6366F1", purpose: "User management, system monitoring, platform analytics" },
            ].map(({ icon: Icon, title, type, color, purpose }) => (
              <motion.div key={title} variants={FU}
                className="p-5 rounded-2xl border flex items-start gap-3"
                style={{ borderColor: `${color}28`, background: `${color}06` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{title}</p>
                  <p className="text-[10px] font-mono text-[var(--text-tertiary)] mb-1">{type}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{purpose}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* 05 · REJECTED CONCEPTS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="05" text="Rejected Concepts" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            The ideas that didn&apos;t make it — and why.
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "❌ AI-First Homepage",
                proposed: "Open the Patient App directly into an AI chat — patients describe symptoms before accessing any other feature.",
                rejected: "Felt experimental and untrustworthy. Patients who wanted to book an appointment had to navigate through AI first.",
                instead:  "AI repositioned as contextual assistance within existing workflows — appearing at moments of uncertainty, not as a gatekeeper.",
              },
              {
                label: "❌ Single Super-App with Role Switcher",
                proposed: "One app for all six stakeholder types. Role selection at login reveals the relevant view.",
                rejected: "A patient browsing doctors and a pharmacist processing prescriptions share nothing in terms of mental model. Cognitive overload and security complexity at scale.",
                instead:  "Six purpose-built products sharing one design system and one data layer.",
              },
              {
                label: "❌ Federated Apps, No Shared Design Layer",
                proposed: "Six independent apps, shared backend only. Each product with its own visual language.",
                rejected: "We were hired to solve fragmentation. Six independently designed products would replicate the same problem.",
                instead:  "Unified design system across all products, with platform-specific adaptations built in.",
              },
              {
                label: "❌ 8-Level Navigation for Patient Records",
                proposed: "Clinically complete record hierarchy — 8 levels deep for full health history access.",
                rejected: "Clinically complete, practically unusable. Staff couldn't complete common tasks without getting lost.",
                instead:  "Progressive disclosure — primary navigation capped at 3 levels. Clinical depth accessible for those who need it, not imposed on everyone.",
              },
            ].map(({ label, proposed, rejected, instead }) => (
              <div key={label} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="px-6 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{label}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
                  <div className="p-5">
                    <p className="text-[9px] font-mono font-bold tracking-widest mb-2" style={{ color: ACCENT }}>PROPOSED</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{proposed}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] font-mono font-bold tracking-widest text-red-400 mb-2">WHY REJECTED</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{rejected}</p>
                  </div>
                  <div className="p-5">
                    <p className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 mb-2">WHAT WE DID INSTEAD</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{instead}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 06 · DECISION STORY #1 — AI PLACEMENT (SIGNATURE MOMENT — LARGE) */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="06" text="Decision Story #1 — The Signature Moment" />

          {/* Large visual treatment */}
          <div className="rounded-3xl overflow-hidden border mb-8"
            style={{ borderColor: `${ACCENT}30`, background: `linear-gradient(135deg, ${ACCENT}0A 0%, ${ACCENT2}08 100%)` }}>
            <div className="p-8 md:p-12">
              <h2 className="font-display font-black text-[var(--text-primary)] leading-tight mb-6"
                style={{ fontSize: "clamp(26px, 4vw, 52px)" }}>
                Why didn&apos;t AI become the home screen?
              </h2>

              {/* The visual story — large format */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {/* Step 1 — First proposal */}
                <div className="md:col-span-2 p-5 rounded-2xl border border-red-400/25 bg-red-400/06">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={16} className="text-red-400 shrink-0" />
                    <p className="text-xs font-mono font-bold tracking-widest text-red-400">FIRST PROPOSAL</p>
                  </div>
                  <p className="text-lg font-bold text-[var(--text-primary)] mb-2">AI Chat as Homepage</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                    Patient opens app → AI conversation → describes symptoms → then accesses the rest of the product.
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "Felt experimental, not trustworthy",
                      "Patients wanting to book were forced through AI first",
                      "No equivalent path for clinical staff",
                    ].map((p) => (
                      <div key={p} className="flex items-start gap-1.5">
                        <XCircle size={11} className="mt-0.5 shrink-0 text-red-400" />
                        <p className="text-xs text-[var(--text-secondary)]">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow + feedback */}
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <div className="h-px w-full md:h-full md:w-px bg-[var(--border)]" />
                  <div className="px-3 py-2 rounded-xl text-center" style={{ background: `${AMBER}15`, border: `1px solid ${AMBER}30` }}>
                    <p className="text-[9px] font-mono font-bold tracking-widest" style={{ color: AMBER }}>CLIENT FEEDBACK</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 italic">&ldquo;Users want to find a doctor. AI should help them — not replace what they came to do.&rdquo;</p>
                  </div>
                  <div className="h-px w-full md:h-full md:w-px bg-[var(--border)]" />
                </div>

                {/* Step 2 — Final solution */}
                <div className="md:col-span-2 p-5 rounded-2xl border bg-[var(--bg)]" style={{ borderColor: `${EMERALD}30`, background: `${EMERALD}06` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={16} style={{ color: EMERALD }} className="shrink-0" />
                    <p className="text-xs font-mono font-bold tracking-widest" style={{ color: EMERALD }}>FINAL SOLUTION</p>
                  </div>
                  <p className="text-lg font-bold text-[var(--text-primary)] mb-2">AI as Contextual Assistance</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                    Familiar healthcare dashboard → AI appears at specific moments of uncertainty within existing flows.
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "Before booking: AI suggests relevant specialists",
                      "Post-consultation: AI surfaces relevant health guidance",
                      "Prescription flow: AI flags potential interactions",
                    ].map((p) => (
                      <div key={p} className="flex items-start gap-1.5">
                        <CheckCircle2 size={11} className="mt-0.5 shrink-0" style={{ color: EMERALD }} />
                        <p className="text-xs text-[var(--text-secondary)]">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Annotation */}
              <div className="p-4 rounded-2xl text-center" style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}20` }}>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  AI now supports decisions — instead of replacing navigation.
                </p>
              </div>
            </div>
          </div>

          {/* Standardized Decision Story */}
          <DecisionStory
            challenge="Client wanted AI front and center. Our first concept made it the entry point. Stakeholders rejected it — it felt like a chatbot product, not a healthcare platform."
            options={[
              { label: "AI-First Homepage", rejected: true,  reason: "Experimental feel. Patients wanting to book had to navigate through AI first. Trust dropped before any value was delivered." },
              { label: "No AI at all",      rejected: true,  reason: "Abandoned the client&apos;s core product vision and competitive differentiator." },
              { label: "Contextual AI within existing workflows ✓", rejected: false, reason: "AI appears at specific decision moments inside familiar flows. Familiar navigation preserved; AI adds value without adding friction." },
            ]}
            decision="AI repositioned from homepage entry point to contextual assistance embedded within existing healthcare workflows."
            tradeoff="AI is less visible on first open — but far more trusted and useful when it appears."
            outcome="Client accepted the direction. The platform preserved familiar healthcare navigation while AI became a layer that genuinely enhances specific moments."
            whatChanged={[
              { role: "Users",       change: "Familiar navigation reduced learning curve. AI supported existing intent rather than redirecting it.",         color: "#0EA5E9" },
              { role: "Business",    change: "Preserved the client&apos;s AI vision without restructuring the entire product.",                             color: EMERALD  },
              { role: "Engineering", change: "Reused existing navigation. AI was a layer, not a rebuild.",                                                  color: ACCENT2  },
              { role: "Design",      change: "Created room to expand AI features incrementally into more workflows in future sprints.",                     color: AMBER    },
            ]}
          />
        </motion.section>

        {/* 07 · DECISION STORY #2 — ARCHITECTURE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SectionLabel n="07" text="Decision Story #2" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.8vw, 44px)" }}>
            One app for all stakeholders, or six purpose-built products?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            The most consequential structural decision of the project. It locked in the entire design and development trajectory.
          </p>

          <DecisionStory
            challenge="Six stakeholder types. Completely different mental models and tasks. One wrong architectural decision would compound through every sprint."
            options={[
              { label: "Super App — Role switcher at login",           rejected: true,  reason: "Patient browsing doctors and pharmacist processing prescriptions share nothing. Cognitive overload, security complexity." },
              { label: "Federated Apps — Shared backend only",         rejected: true,  reason: "Six independently designed products = six inconsistent experiences. Replicates the fragmentation we were hired to solve." },
              { label: "Unified design system + purpose-built products ✓", rejected: false, reason: "Each product owns its interaction model. Design system owns the shared language. Consistency is structural, not manual." },
            ]}
            decision="Six purpose-built products, each designed for a specific mental model, connected by a unified design system and a shared data layer."
            tradeoff="More upfront investment in the design system — but every sprint after benefits as components are reused and decisions made once apply everywhere."
            outcome="Shared component library reduced repetition across six products. Visual and interaction coherence didn't require manual checking — it was built into the system."
            whatChanged={[
              { role: "Users",       change: "Each stakeholder got a product designed for their mental model, not a reduced version of someone else's.",  color: "#0EA5E9" },
              { role: "Business",    change: "Platform coherence made onboarding easier. Users who touched multiple products recognised the shared language.", color: EMERALD  },
              { role: "Engineering", change: "Shared component library reduced the frontend surface area across six products.",                             color: ACCENT2  },
              { role: "Design",      change: "Decisions made in the design system applied everywhere. Consistency was the default, not the exception.",      color: AMBER    },
            ]}
          />
        </motion.section>

        {/* 08 · DECISION STORY #3 — NAVIGATION */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="08" text="Decision Story #3" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.8vw, 44px)" }}>
            Healthcare is genuinely complex. How do you design for that without building a complex product?
          </h2>

          {/* Before / After navigation diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <div className="rounded-2xl border border-red-400/25 overflow-hidden">
              <div className="px-5 py-3 border-b border-red-400/20 bg-red-400/06">
                <div className="flex items-center gap-2">
                  <XCircle size={12} className="text-red-400" />
                  <p className="text-xs font-mono font-bold text-red-400">VERSION 1 — 8 LEVELS DEEP</p>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-1">
                  {["Home", "→ Health", "→→ Records", "→→→ Medical", "→→→→ History", "→→→→→ Lab", "→→→→→→ Results", "→→→→→→→ Detail"].map((item, i) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="h-px flex-shrink-0" style={{ width: `${i * 12}px`, background: "var(--border)" }} />
                      <span className="text-xs font-mono text-[var(--text-secondary)]">{item.trim()}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-red-400 mt-3 italic">Clinically complete. Practically unusable.</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${EMERALD}30` }}>
              <div className="px-5 py-3 border-b bg-[var(--bg-subtle)]" style={{ borderColor: `${EMERALD}25` }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} style={{ color: EMERALD }} />
                  <p className="text-xs font-mono font-bold" style={{ color: EMERALD }}>FINAL — 3 LEVELS MAX</p>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-1">
                  {[
                    { label: "Home", depth: 0 },
                    { label: "→ Health Records", depth: 1 },
                    { label: "→→ Lab Result Detail", depth: 2 },
                  ].map(({ label, depth }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="h-px flex-shrink-0" style={{ width: `${depth * 16}px`, background: `${EMERALD}40` }} />
                      <span className="text-xs font-mono" style={{ color: depth === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>{label.trim()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t" style={{ borderColor: `${EMERALD}20` }}>
                  <p className="text-xs text-[var(--text-secondary)]">Full clinical depth still accessible — not forced on every path.</p>
                </div>
                <div className="mt-3 p-3 rounded-xl" style={{ background: `${EMERALD}08` }}>
                  <p className="text-xs font-semibold" style={{ color: EMERALD }}>
                    The goal wasn&apos;t to reduce features — it was to reduce perceived complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DecisionStory
            challenge="Version 1 had 8-level deep navigation. Clinically complete but unusable in practice. Clinical staff couldn't complete common tasks without getting lost."
            options={[
              { label: "Reduce features",             rejected: true,  reason: "Would have removed real clinical value. Depth wasn't the problem — who sees it and when was." },
              { label: "Add navigation shortcuts",    rejected: true,  reason: "Shortcuts over a broken structure add complexity without solving the root issue." },
              { label: "Progressive disclosure ✓",   rejected: false, reason: "Common tasks capped at 3 levels. Clinical depth accessible to those who need it, not imposed on everyone." },
            ]}
            decision="Progressive disclosure applied across all products. Maximum 3 levels for primary navigation. Full depth accessible without forcing it on the default path."
            tradeoff="Power users must navigate one additional step to reach advanced clinical data. Worth it: the primary user population doesn't need that depth on every visit."
            outcome="Users completing common tasks — booking, viewing recent records — could do so without encountering clinical complexity they didn't need."
            whatChanged={[
              { role: "Users",        change: "Common tasks achievable without training. Power users retained full access.",                  color: "#0EA5E9" },
              { role: "Clinic staff", change: "Faster onboarding. Fewer navigation-related support escalations.",                            color: "#7C3AED" },
              { role: "Engineering",  change: "Simpler routing structure. Fewer navigation-related edge cases to handle.",                   color: EMERALD  },
              { role: "Business",     change: "Users previously abandoning tasks silently now completing them. Clearer paths matter.",       color: AMBER    },
            ]}
          />
        </motion.section>

        {/* 09 · DESIGNING MULTIPLE PLATFORMS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="09" text="Designing Multiple Platforms" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Same design system. Different interaction languages.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            A doctor between consultations on mobile has entirely different needs from a clinic manager at a desktop managing a full day. Platform-specific interaction rules were documented within the shared design language.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                platform: "Mobile — Patient & Doctor",
                icon: Smartphone, color: "#0EA5E9",
                context: "On the go — waiting rooms, between consultations, at home.",
                principles: ["Thumb-first navigation: critical actions within comfortable reach", "Minimal text input: smart defaults and selection patterns", "Task-focused flows: one primary action per screen", "Offline-accessible records for unreliable networks"],
                tradeoff: "Feature depth reduced in favour of access speed.",
              },
              {
                platform: "Web — Doctor, Clinic, Pharmacy, Admin",
                icon: Monitor, color: "#7C3AED",
                context: "At workstations — full-session, information-dense tools.",
                principles: ["Multi-panel layouts: patient detail + history side by side", "Data tables with sort, filter, and export", "Keyboard accessibility: workflows navigable without a mouse", "Information density: multiple data streams visible at once"],
                tradeoff: "Higher visual complexity accepted — users are trained on the tool.",
              },
            ].map(({ platform, icon: Icon, color, context, principles, tradeoff }) => (
              <div key={platform} className="p-6 rounded-2xl border" style={{ borderColor: `${color}25`, background: `${color}05` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{platform}</p>
                </div>
                <p className="text-xs italic text-[var(--text-secondary)] mb-4">{context}</p>
                <ul className="space-y-1.5 mb-4">
                  {principles.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                      <ChevronRight size={10} className="mt-0.5 shrink-0" style={{ color }} />{p}
                    </li>
                  ))}
                </ul>
                <div className="p-3 rounded-xl" style={{ background: `${color}08` }}>
                  <p className="text-[9px] font-mono font-bold tracking-widest mb-1" style={{ color }}>TRADE-OFF ACCEPTED</p>
                  <p className="text-xs text-[var(--text-secondary)]">{tradeoff}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 10 · DESIGNING FOR CONTINUOUS DELIVERY (renamed) */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="10" text="Designing for Continuous Delivery" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Translating product priorities into sprint-ready designs — across six products at once.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-mono font-bold tracking-widest mb-5" style={{ color: ACCENT }}>HOW IT WORKED</p>
              <div className="space-y-4">
                {[
                  { icon: Target,      label: "Long-term reference prototype", desc: "A full-platform prototype for CEO and client reviews — kept separate from what was being built each sprint." },
                  { icon: Zap,         label: "Sprint-scoped design specs",    desc: "Figma files annotated and scoped precisely to what development was building that sprint. No aspirational elements." },
                  { icon: GitBranch,   label: "Working with prioritised features", desc: "Features prioritised by the PM. My role: translate those priorities into design specs that could be built on time." },
                  { icon: RefreshCw,   label: "Handling mid-sprint direction changes", desc: "Separating the long-term prototype from sprint specs meant feedback could be absorbed without disrupting the current build." },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${ACCENT}18` }}>
                      <Icon size={14} style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)] mb-0.5">{label}</p>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono font-bold tracking-widest mb-5" style={{ color: ACCENT2 }}>PROBLEMS THIS ADDRESSED</p>
              <div className="space-y-3">
                {[
                  { problem: "CEO vision expanding mid-sprint",    solution: "Long-term prototype absorbed new directions without touching sprint specs",       color: RED    },
                  { problem: "Priorities shifting without warning", solution: "Sprint specs were tightly scoped — changes outside scope queued without blocking", color: AMBER  },
                  { problem: "Ambiguity about which version to build", solution: "Sprint-specific Figma with clear labelling eliminated guesswork",              color: ACCENT },
                  { problem: "Design falling behind across 6 products", solution: "Shared design system: new screens were compositions, not new designs",        color: EMERALD },
                ].map(({ problem, solution, color }) => (
                  <div key={problem} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                    <div className="flex items-start gap-2 mb-1.5">
                      <XCircle size={11} className="mt-0.5 shrink-0" style={{ color: RED }} />
                      <p className="text-xs font-semibold text-[var(--text-primary)]">{problem}</p>
                    </div>
                    <div className="flex items-start gap-2 pl-4">
                      <ChevronRight size={9} className="mt-0.5 shrink-0" style={{ color }} />
                      <p className="text-xs text-[var(--text-secondary)]">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 11 · DEVELOPER COLLABORATION */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="11" text="Developer Collaboration" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            I didn&apos;t hand off screens. I handed off decisions.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            Every sprint: explain interaction logic to developers, verify builds before QA, document gaps, collaborate on fixes. Developers should never have to guess what a component does, how it behaves in an edge case, or what the correct state looks like.
          </p>

          {/* Concrete example */}
          <div className="rounded-2xl border border-[var(--border)] overflow-hidden mb-8">
            <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
              <p className="text-xs font-mono text-[var(--text-tertiary)]">CONCRETE EXAMPLE — Prescription Card Component</p>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-max p-5 gap-0">
                {[
                  { step: "Component",          desc: "Prescription status card with 4 states: pending, processing, ready, dispensed",    icon: Layout,       color: ACCENT  },
                  { step: "States Specified",   desc: "All 4 states designed, labelled, and annotated. Loading, error, and empty states included", icon: FileText, color: ACCENT2 },
                  { step: "Developer Build",    desc: "Frontend implements the component against the spec",                                icon: Code,         color: AMBER   },
                  { step: "Issue Found",         desc: "Pre-QA review: 'ready' state was missing the timestamp. Tap target below minimum on mobile", icon: AlertTriangle, color: RED },
                  { step: "Fix + Sign-off",     desc: "Resolved directly with the developer. Verified. Passed to QA with full spec coverage", icon: CheckCircle2, color: EMERALD },
                ].map(({ step, desc, icon: Icon, color }, i, arr) => (
                  <div key={step} className="flex items-center gap-0">
                    <div className="w-36 flex flex-col items-center text-center gap-2 px-2">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${color}18` }}>
                        <Icon size={15} style={{ color }} />
                      </div>
                      <p className="text-[10px] font-mono font-bold tracking-widest" style={{ color }}>{step.toUpperCase()}</p>
                      <p className="text-[10px] text-[var(--text-secondary)] leading-snug">{desc}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex items-center pb-10">
                        <div className="w-3 h-px bg-[var(--border)]" />
                        <ArrowRight size={10} className="text-[var(--text-tertiary)]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Code,         label: "Interaction Specifications",  desc: "Every handoff included: hover, focus, active, loading, error, empty, and disabled states. Responsive breakpoints and edge cases documented per component.",  color: ACCENT  },
              { icon: MessageSquare,label: "Explaining Flows Before Building", desc: "Before development started, I walked developers through interaction sequences — explaining conditional states and the reason behind each decision.",       color: ACCENT2 },
              { icon: FileText,     label: "Reviewing Builds Before QA",  desc: "I reviewed implemented screens against specs before formal QA — checking spacing, typography, component states, and responsive behaviour.",                  color: EMERALD },
              { icon: RefreshCw,    label: "Pragmatic on Constraints",    desc: "When engineering flagged interactions as too costly for the sprint, I collaborated on equivalent experiences that achieved the same UX intent within available effort.", color: AMBER },
            ].map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{label}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 12 · FINDING UI DEFECTS WHEN CHEAPEST TO FIX (renamed) */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="12" text="Pre-QA Design Validation" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Finding UI defects when they were cheapest to fix.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            In most projects, design issues surface during QA and become bug tickets. By reviewing builds before they reached the QA team, issues were caught and resolved at the cheapest possible moment — directly with the developer who built them.
          </p>

          <div className="rounded-2xl border border-[var(--border)] overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
              <p className="text-xs font-mono text-[var(--text-tertiary)]">THE PROCESS — EACH SPRINT</p>
            </div>
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
              {[
                { step: "01", label: "Build Review",     desc: "Review implementation against Figma spec",  icon: Target       },
                { step: "02", label: "Document Gaps",    desc: "Log visual and interaction deviations",     icon: FileText     },
                { step: "03", label: "Resolve with Dev", desc: "Work through fixes directly",               icon: Code         },
                { step: "04", label: "Pass to QA",       desc: "Hand off only after design sign-off",       icon: CheckCircle2 },
              ].map(({ step, label, desc, icon: Icon }) => (
                <div key={step} className="flex-1 p-5 flex flex-col items-center text-center gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
                    <Icon size={15} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-[9px] font-mono font-bold tracking-widest" style={{ color: ACCENT }}>STEP {step}</p>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{label}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <p className="text-[9px] font-mono font-bold tracking-widest mb-4" style={{ color: ACCENT }}>WHAT VALIDATION COVERED</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Accessibility — contrast ratios, touch target sizes, keyboard reachability",
                "Spacing and layout — alignment against 8pt grid across breakpoints",
                "Typography — font sizes, weights, and line heights matching design tokens",
                "Component states — hover, focus, loading, error, empty, disabled",
                "Interaction sequences — transitions, timing, and conditional logic",
                "Edge cases — empty states, overflow content, long text, network failure",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 p-3 rounded-xl border border-[var(--border)]">
                  <CheckCircle2 size={11} className="mt-0.5 shrink-0" style={{ color: EMERALD }} />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 13 · BEHIND THE DECISIONS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="13" text="Behind the Decisions" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            What the process actually looked like.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            The decisions in this case study didn&apos;t arrive fully formed. They went through iterations, client notes, developer constraints, and version changes before reaching the outcomes described here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: PenTool,
                label: "Early whiteboard sessions",
                desc: "The first architecture decision started on a FigJam whiteboard — mapping out all six stakeholders, their workflows, and the data handoffs between them. Three full architecture diagrams were drawn before Option C was chosen.",
                tag: "DISCOVERY",  color: ACCENT,
              },
              {
                icon: XCircle,
                label: "Rejected navigation iterations",
                desc: "The Patient App navigation went through four structural iterations before progressive disclosure was applied. Each version was tested with stakeholder walkthroughs. The 8-level version was Version 1 of four.",
                tag: "ITERATION",  color: RED,
              },
              {
                icon: MessageSquare,
                label: "Client feedback that changed direction",
                desc: "The AI homepage rejection happened in a formal client review — not in a design session. The feedback was direct: &apos;This feels like a chatbot product.&apos; That one sentence reframed the entire AI strategy.",
                tag: "PIVOT",      color: AMBER,
              },
              {
                icon: Code,
                label: "Developer constraints that shaped design",
                desc: "Three animation sequences were flagged as too complex for the sprint timeline. Each was redesigned in a paired session with the frontend developer — achieving the same UX intent within the available effort.",
                tag: "CONSTRAINT", color: EMERALD,
              },
              {
                icon: Layers,
                label: "Design system evolution",
                desc: "The component library went through two rounds of revision after the first product shipped to staging. Inconsistencies in the implementation revealed gaps in the original handoff documentation.",
                tag: "LEARNING",   color: ACCENT2,
              },
              {
                icon: GitBranch,
                label: "The moment the direction changed",
                desc: "Between Version 1 and Version 2 of the Patient App, the entire information architecture was restructured. Not because of new features — but because the first usability walkthrough showed clearly that the structure was wrong.",
                tag: "REFLECTION", color: "#6366F1",
              },
            ].map(({ icon: Icon, label, desc, tag, color }) => (
              <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                      <Icon size={13} style={{ color }} />
                    </div>
                    <p className="font-semibold text-sm text-[var(--text-primary)]">{label}</p>
                  </div>
                  <Tag text={tag} color={color} />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* 14 · IMPACT — restructured by audience */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}
          className="py-14 px-10 rounded-3xl"
          style={{ background: `linear-gradient(135deg, ${ACCENT}14 0%, ${ACCENT}06 60%, transparent 100%)`, border: `1px solid ${ACCENT}22` }}>
          <SectionLabel n="14" text="Impact" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(26px, 3.8vw, 44px)" }}>
            What changed — by perspective.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed max-w-2xl">
            Impact described by audience — based on what was designed and delivered, not on metrics that weren&apos;t formally measured.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: "Product",
                icon: BarChart3,
                color: ACCENT,
                items: [
                  "Unified ecosystem replacing five fragmented, disconnected workflows",
                  "AI integrated into patient journeys as contextual assistance, not a gimmick",
                  "Scalable platform architecture accepted by client — extensible for future features",
                ],
              },
              {
                category: "Users",
                icon: Users,
                color: "#7C3AED",
                items: [
                  "Patients: one app replacing WhatsApp + phone coordination for health management",
                  "Doctors: patient history accessible before consultations, not after",
                  "Clinical staff: familiar navigation reduced onboarding time",
                ],
              },
              {
                category: "Team",
                icon: Heart,
                color: EMERALD,
                items: [
                  "Shared design system: a common interaction language across all six products",
                  "Annotated specs: developers could build without asking for clarification on states",
                  "Pre-QA validation: visual issues resolved before reaching formal testing",
                ],
              },
              {
                category: "Business",
                icon: TrendingUp,
                color: AMBER,
                items: [
                  "AI repositioned: client&apos;s AI vision preserved within a trustworthy product structure",
                  "All six products shipped to staging within sprint schedule",
                  "Multi-platform design system: scalable for additional clinic deployments",
                ],
              },
            ].map(({ category, icon: Icon, color, items }) => (
              <div key={category} className="p-6 rounded-2xl border" style={{ borderColor: `${color}25`, background: `${color}06` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="font-bold text-lg text-[var(--text-primary)]">{category}</p>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <ArrowUpRight size={12} className="mt-0.5 shrink-0" style={{ color }} />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 15 · HOW THIS PROJECT CHANGED THE WAY I THINK (renamed) */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="15" text="Key Learnings" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            How this project changed the way I think about product design.
          </h2>

          <div className="space-y-4 mb-10">
            {[
              {
                n: "01", color: ACCENT,
                title: "Rejections are product data",
                text: "The AI homepage rejection was the most useful insight of the project. Where you place a feature is a product strategy decision. AI at the wrong moment in a user journey reduces trust — even when the feature itself is well-designed.",
              },
              {
                n: "02", color: ACCENT2,
                title: "Design systems are an infrastructure investment, not a design preference",
                text: "The only way to get the design system approved was to frame it as a sprint-efficiency decision. Reusable components allowed screens across all six products to follow a shared interaction language — compounding value with every sprint.",
              },
              {
                n: "03", color: EMERALD,
                title: "The goal isn&apos;t to reduce complexity — it&apos;s to structure it",
                text: "Progressive disclosure solved navigation without removing features. The design question isn&apos;t &apos;how do we simplify this?&apos; — it&apos;s &apos;who needs to see this complexity, when, and on which path?&apos;",
              },
              {
                n: "04", color: AMBER,
                title: "Pre-QA review is the highest-leverage moment in the sprint",
                text: "Catching issues before QA — directly with the developer who built them — is faster, cheaper, and produces better output than escalating through a bug-tracking process.",
              },
              {
                n: "05", color: "#6366F1",
                title: "A single designer working at scale needs a system, not just skills",
                text: "The design system was the only reason designing six products simultaneously without inconsistency was possible. Designers who build for scale don&apos;t just execute well — they build the infrastructure that makes consistent execution possible.",
              },
            ].map(({ n, title, text, color }) => (
              <motion.div key={n} variants={FU}
                className="flex gap-5 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="text-2xl font-display font-black opacity-20 shrink-0 w-8 leading-none" style={{ color }}>{n}</div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] mb-2 leading-snug" dangerouslySetInnerHTML={{ __html: title }} />
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-8 rounded-2xl" style={{ background: `${ACCENT}0C`, border: `1px solid ${ACCENT}22` }}>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed italic mb-3">
              &ldquo;Designing six products that feel like one coherent platform — with an AI strategy that was initially rejected and then repositioned — taught me that the most valuable design work happens before any screen is created. In the research, the architecture, the framing of decisions, and the systems that hold everything together.&rdquo;
            </p>
            <p className="text-xs font-mono" style={{ color: ACCENT }}>— Ganesh Muniganti · Dimension Leap Healthcare Platform, 2025</p>
          </div>
        </motion.section>

      </div>

      {/* Next project */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-6 text-center">Next Project</p>
          <Link href="/work/phonepe-ux-redesign" className="block group max-w-lg mx-auto">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all bg-[var(--bg)]">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">UX Research &amp; Product Design</p>
                <p className="font-display font-bold text-xl text-[var(--text-primary)]">Enhancing PhonePe&apos;s Usability</p>
              </div>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-all group-hover:scale-110"
                style={{ borderColor: ACCENT, color: ACCENT }}>
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
