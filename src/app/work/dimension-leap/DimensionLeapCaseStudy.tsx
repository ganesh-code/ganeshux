"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  Users, Lightbulb, Target, Zap, Film, Calendar, FileText,
  Layers, GitBranch, MessageSquare, TrendingUp, RefreshCw,
  ChevronRight, Star, Building, Code, PenTool, ArrowUpRight
} from "lucide-react";

const ACCENT       = "#7C3AED";
const ACCENT_LIGHT = "#A78BFA";
const EMERALD      = "#10B981";
const AMBER        = "#F59E0B";
const RED          = "#EF4444";
const BLUE         = "#0EA5E9";

const FU = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ── Reusable primitives ───────────────────────────────────────────────────────
function Label({ n, text }: { n: string; text: string }) {
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
    <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full"
      style={{ background: `${color}15`, color }}>{text}</span>
  );
}

// Standardized Decision Story — same pattern as Healthcare
function DecisionStory({ challenge, options, decision, tradeoff, outcome, whatChanged }: {
  challenge: string;
  options: { label: string; rejected: boolean; reason: string }[];
  decision: string;
  tradeoff: string;
  outcome: string;
  whatChanged: { role: string; change: string; color: string }[];
}) {
  const steps = [
    { label: "Challenge",          content: challenge, color: RED     },
    { label: "Decision",           content: decision,  color: EMERALD },
    { label: "Trade-off Accepted", content: tradeoff,  color: AMBER   },
    { label: "Outcome",            content: outcome,   color: ACCENT  },
  ];
  return (
    <div className="space-y-5">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map(({ label, content, color }) => (
          <div key={label} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <p className="text-[10px] font-mono font-bold tracking-widest mb-2" style={{ color }}>{label.toUpperCase()}</p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
      <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
        <p className="text-[10px] font-mono font-bold tracking-widest mb-3" style={{ color: ACCENT }}>WHY THIS DECISION MATTERED</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {whatChanged.map(({ role, change, color }) => (
            <div key={role} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
              <p className="text-xs text-[var(--text-secondary)]">
                <span className="font-semibold" style={{ color }}>{role}:</span> {change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function DimensionLeapCaseStudy() {
  const [activeRole, setActiveRole] = useState<"writer" | "director" | "producer" | "agency">("writer");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1],   ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roleContent = {
    writer: {
      label: "Writer", color: "#7C3AED",
      tasks: ["AI-assisted script drafting", "Scene-by-scene breakdown", "Character arc tracking", "Revision history", "Export to FDX / PDF"],
      challenge: "Writing happened in isolation. Handoff to director was a manual dump of files with no structure.",
      design: "Dual-pane interface: writing canvas on the left, AI suggestion drawer on the right — collapsible, triggered manually to avoid interrupting flow.",
    },
    director: {
      label: "Director", color: "#0EA5E9",
      tasks: ["Shot list from script scenes", "Visual reference boards", "Actor & location scheduling", "Crew approval workflows", "Daily notes"],
      challenge: "Directors received scripts too late and had no visibility into scheduling conflicts until the day of the shoot.",
      design: "Visual storyboard workspace where AI analyses script scenes and suggests camera angles, shot types, and blocking — all overrideable.",
    },
    producer: {
      label: "Producer", color: "#10B981",
      tasks: ["Production timeline & milestones", "Call sheet generation", "Crew assignment", "Budget breakdowns", "Schedule exports"],
      challenge: "Producers managed several spreadsheets for scheduling, budget, and crew — all prone to going out of sync with one another.",
      design: "Unified dashboard with Gantt-style production timeline, AI-generated call sheets from the approved schedule, and exportable budget breakdowns.",
    },
    agency: {
      label: "Agency", color: "#F59E0B",
      tasks: ["Client project overview", "Approval & revision workflows", "Milestone tracking", "Role-based access control", "Automated status reports"],
      challenge: "Agencies received status updates via email. Client approvals had no version control — leading to confusion over which version was approved.",
      design: "Lightweight client-facing view with approval cards, comment threads, and milestone checklists. Designed to require no training.",
    },
  };
  const current = roleContent[activeRole];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ paddingBottom: "80px", paddingTop: "120px" }}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 80% 80% at 60% 0%, ${ACCENT}22 0%, transparent 60%),
                       radial-gradient(ellipse 50% 50% at 100% 100%, ${ACCENT}0C 0%, transparent 70%)`,
        }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Link href="/#work" className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-5 group transition-colors duration-200 w-fit">
                <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                Back to Work
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
                style={{ background: `${ACCENT}20`, color: ACCENT, border: `1px solid ${ACCENT}30` }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                SaaS · Film Production · AI Workflows · 4 Roles
              </div>

              <h1 className="font-display font-black text-[var(--text-primary)] leading-[0.95] tracking-tight mb-4"
                style={{ fontSize: "clamp(36px, 6vw, 76px)" }}>
                AI-Powered Film<br />
                <span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Pre-Production
                </span>
              </h1>

              {/* Emotional hook */}
              <p className="text-base font-semibold text-[var(--text-primary)] mb-4 leading-relaxed border-l-4 pl-4"
                style={{ borderLeftColor: ACCENT }}>
                Film productions ran on WhatsApp groups and six spreadsheets. The question wasn&apos;t whether to add AI — it was how to design AI that production professionals would actually trust.
              </p>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10">
                Designing workflows for a platform that transformed how productions manage scripts, schedules, call sheets, and cross-functional collaboration.
              </p>

              <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
                {[
                  { label: "Role",     value: "Associate UX / Product Designer" },
                  { label: "Company",  value: "Dimension Leap" },
                  { label: "Duration", value: "May 2025 – June 2025" },
                  { label: "Team",     value: "1 Designer · 3 Engineers · PM · CEO" },
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
              <div className="absolute -inset-6 rounded-3xl blur-3xl opacity-30"
                style={{ background: `radial-gradient(ellipse, ${ACCENT}60 0%, transparent 70%)` }} />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                style={{ boxShadow: `0 32px 80px rgba(124,58,237,0.25), 0 8px 24px rgba(0,0,0,0.2)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pre-production.png" alt="AI-Powered Film Pre-Production Platform — Dimension Leap"
                  className="w-full h-auto object-cover block" draggable={false} />
                <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${ACCENT}18, transparent)` }} />
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
      {/* PROJECT AT A GLANCE                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pb-10 mb-10 border-b border-[var(--border)]">
            {[
              { label: "Role",          value: "Product Designer" },
              { label: "Duration",      value: "~2 Months" },
              { label: "Team",          value: "PM · 3 Devs · CEO · Client" },
              { label: "Platform",      value: "Web (SaaS)" },
              { label: "Tools",         value: "Figma · FigJam · Notion" },
              { label: "Deliverables",  value: "UX · UI · Design System · Handoff" },
            ].map(({ label, value }) => (
              <motion.div key={label} variants={FU}>
                <span className="text-[9px] font-mono font-bold tracking-widest block mb-1 text-[var(--text-tertiary)]">{label.toUpperCase()}</span>
                <span className="text-xs font-semibold text-[var(--text-primary)] leading-snug">{value}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: AlertTriangle, label: "Biggest Challenge",  text: "Designing role-specific experiences for four different mental models — writer, director, producer, agency — on a single platform, simultaneously.", color: RED    },
              { icon: GitBranch,     label: "Biggest Decision",   text: "Choosing a unified platform over plugins or chatbot-first AI — because the root problem was information fragmentation, not missing features.", color: ACCENT },
              { icon: Lightbulb,     label: "Biggest Lesson",     text: "Designing for AI isn't about making the AI impressive — it's about making the user feel in control. AI that suggests and explains builds trust. AI that decides creates anxiety.", color: AMBER  },
            ].map(({ icon: Icon, label, text, color }) => (
              <motion.div key={label} variants={FU} className="p-5 rounded-2xl border border-[var(--border)]"
                style={{ borderColor: `${color}25`, background: `${color}06` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} style={{ color }} />
                  <p className="text-[10px] font-mono font-bold tracking-widest" style={{ color }}>{label.toUpperCase()}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <p className="text-[10px] font-mono font-bold tracking-widest mb-4" style={{ color: ACCENT }}>KEY PRODUCT DECISIONS</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                "✓ Built shared design system before designing any role-specific view",
                "✓ Rejected chatbot-first AI — production work is visual, not conversational",
                "✓ Chose unified platform over plugins that would perpetuate fragmentation",
                "✓ Designed AI as a suggestion layer, not an autonomous decision-maker",
                "✓ Role-adaptive views on shared data — one source of truth, four perspectives",
                "✓ Collapsible AI panel: on-demand, not intrusive by default",
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

        {/* 01 · THE PROBLEM */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="01" text="The Problem" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-4">
              <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                Film pre-production was<br /><span style={{ color: ACCENT }}>systematically broken.</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Every production shared the same hidden crisis. Scripts lived in Google Docs. Schedules were copied from last season&apos;s Excel files. Call sheets were assembled the night before every shoot day — manually.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Producers coordinated through WhatsApp. Directors got different information than crew heads. One scene change meant manually updating several documents across different tools.
              </p>
              <ul className="space-y-2.5 pt-1">
                {[
                  "No shared source of truth across writer, director, producer, and agency",
                  "AI tools existed but were completely disconnected from production workflows",
                  "Manual call sheet assembly created risk of costly on-set errors",
                  "Status updates lived in WhatsApp — no version control, no accountability",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <XCircle size={13} className="mt-0.5 shrink-0 text-red-400" />
                    <p className="text-sm text-[var(--text-secondary)]">{p}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">BEFORE — Fragmented workflow</p>
                </div>
                <div className="p-5 space-y-2">
                  {[
                    { role: "Script",    tool: "Google Docs (no structure)",         c: RED   },
                    { role: "Schedule",  tool: "Copied Excel from last production",  c: AMBER },
                    { role: "Call Sheet",tool: "Manual assembly, night before",      c: RED   },
                    { role: "Status",    tool: "WhatsApp groups",                   c: AMBER },
                    { role: "Approvals", tool: "Email threads with no versions",    c: RED   },
                  ].map(({ role, tool, c }) => (
                    <div key={role} className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-0">
                      <span className="text-xs font-medium text-[var(--text-primary)] w-24 shrink-0">{role}</span>
                      <span className="text-xs text-[var(--text-secondary)] flex-1">{tool}</span>
                      <XCircle size={12} style={{ color: c }} className="shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-5 rounded-2xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: ACCENT }}>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  &ldquo;The hardest part isn&apos;t filming — it&apos;s the weeks before filming where everything is chaos. We spend more time coordinating than creating.&rdquo;
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2 font-mono">— Producer, Week 1 Interview</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 02 · CONSTRAINTS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="02" text="Constraints" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            The constraints that shaped every decision.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Greenfield product",           desc: "No existing platform, no prior design, no component library. Built from zero.", color: RED    },
              { label: "Two-month timeline",           desc: "Five product milestones needed to ship. Design had to stay ahead of development at all times.", color: AMBER  },
              { label: "No direct user research access", desc: "No access to live film productions during the project. Research relied on CEO domain knowledge, stakeholder interviews, and competitive analysis.", color: ACCENT },
              { label: "Four distinct mental models",  desc: "Writer, director, producer, and agency each approach production from a completely different perspective. One platform had to serve all four.", color: "#6366F1" },
              { label: "AI trust had to be earned",    desc: "Production professionals were open to AI but wary of unpredictable outputs. AI needed to suggest — not decide — with full override at every step.", color: EMERALD },
              { label: "Healthcare scope added late",  desc: "A healthcare product was added to scope mid-project with no timeline extension. Design system reuse was what made this feasible.", color: "#0EA5E9" },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={12} style={{ color }} />
                  <p className="text-xs font-semibold" style={{ color }}>{label}</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 03 · UNDERSTANDING THE INDUSTRY */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="03" text="Understanding the Industry" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            I started by learning how film production actually works.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: MessageSquare, label: "Stakeholder Discussions", desc: "Conversations with CEO, PM, and production professionals from different roles across two weeks of discovery." },
              { icon: Film,          label: "Competitive Analysis",    desc: "Studied professional pre-production tools — StudioBinder, Movie Magic, Celtx, Arc Studio — to understand what existed and where it fell short." },
              { icon: Users,         label: "Role Mapping",            desc: "Mapped a day-in-the-life of a producer, director, and writer during pre-production. Traced every information handoff between roles." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${ACCENT}18` }}>
                  <Icon size={16} style={{ color: ACCENT }} />
                </div>
                <p className="font-semibold text-[var(--text-primary)] text-sm mb-2">{label}</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Key research insights — without invented numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Coordination consumed pre-production time", body: "Teams spent more time syncing status across tools than on creative work. Information lived in multiple places simultaneously and was never current." },
              { n: "02", title: "AI tools were siloed from production workflows", body: "Teams used AI for creative tasks but had to manually transfer AI outputs into production documents — defeating the purpose of automation." },
              { n: "03", title: "Call sheet errors created real on-set risk", body: "Manual call sheet assembly led to wrong locations, unavailable talent, and crew conflicts — discovered only on the day of the shoot." },
              { n: "04", title: "Decisions lived in informal channels", body: "WhatsApp was the de facto project management tool. Decisions were lost, versions diverged, and accountability was absent." },
              { n: "05", title: "Four roles needed four different interfaces", body: "A writer and a producer have entirely different mental models. One platform with role-adaptive views was a core design requirement from day one." },
              { n: "06", title: "Trust in AI required predictability and control", body: "Production professionals were open to AI but wary of surprises. AI needed to suggest clearly and make it easy to override or modify any output." },
            ].map(({ n, title, body }) => (
              <motion.div key={n} variants={FU}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] flex flex-col gap-2">
                <span className="text-xs font-mono font-bold tracking-[0.16em] text-[var(--text-tertiary)]">{n}</span>
                <p className="font-semibold text-sm text-[var(--text-primary)] leading-snug">{title}</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 04 · DECISION STORY #1 — PLATFORM ARCHITECTURE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="04" text="Decision Story #1" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.8vw, 44px)" }}>
            Chatbot, plugins, or a unified platform?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            Before designing a single screen, the most important question was architectural: what kind of product would actually solve the fragmentation problem? Three directions were explored.
          </p>

          <DecisionStory
            challenge="Film productions used many disconnected tools. Adding AI to existing tools wouldn't solve the coordination problem — it would add complexity to a fragmented system."
            options={[
              { label: "Direction A — AI Chatbot Interface", rejected: true, reason: "Production work is non-linear and visual. Users needed to see all information simultaneously, not query it through a chat thread." },
              { label: "Direction B — Plugins for Existing Tools", rejected: true, reason: "Plugins layered on top of Celtx, Google Docs, and Excel would perpetuate fragmentation. The problem was the tools themselves, not missing features." },
              { label: "Direction C — Unified Production Platform ✓", rejected: false, reason: "A purpose-built SaaS platform with role-adaptive views, AI embedded in every workflow, and a single source of truth for all production data." },
            ]}
            decision="Purpose-built SaaS platform: one source of truth, four role-adaptive views, AI embedded at the workflow level — not layered on top."
            tradeoff="Higher upfront design and development investment — but the only direction that addressed the root cause: information fragmentation."
            outcome="The structural choice made every subsequent design decision easier. Because all data was centralised, role-adaptive views could show the same information through different lenses without duplication."
            whatChanged={[
              { role: "Writers",   change: "Script changes propagated automatically to director and producer views — no manual re-sharing.", color: ACCENT  },
              { role: "Producers", change: "Schedule changes automatically updated call sheets — removing the manual cascade of updates.", color: EMERALD },
              { role: "Agencies",  change: "Live visibility into production status without email updates or status calls.",                   color: AMBER   },
              { role: "Engineers", change: "Single data layer meant building once — not duplicating logic across role-specific backends.",   color: BLUE    },
            ]}
          />
        </motion.section>

        {/* 05 · DECISION STORY #2 — AI DESIGN APPROACH */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="05" text="Decision Story #2" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.8vw, 44px)" }}>
            How do you design AI that production professionals will actually trust?
          </h2>

          {/* AI trust pattern — visual */}
          <div className="rounded-3xl overflow-hidden border mb-8" style={{ borderColor: `${ACCENT}30`, background: `linear-gradient(135deg, ${ACCENT}0A 0%, ${ACCENT}05 100%)` }}>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="p-5 rounded-2xl border border-red-400/25 bg-red-400/06">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={14} className="text-red-400" />
                    <p className="text-xs font-mono font-bold text-red-400">AI THAT REDUCES TRUST</p>
                  </div>
                  <ul className="space-y-1.5">
                    {["Outputs without explanation", "Makes decisions autonomously", "Can't be overridden easily", "Appears unpredictably"].map((i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                        <XCircle size={10} className="mt-0.5 shrink-0 text-red-400" />{i}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center p-4 rounded-2xl" style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}25` }}>
                    <p className="text-xs font-mono text-[var(--text-tertiary)] mb-2">THE CORE PRINCIPLE</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">AI should suggest,<br />not decide.</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--bg-subtle)]" style={{ border: `1px solid ${EMERALD}30` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={14} style={{ color: EMERALD }} />
                    <p className="text-xs font-mono font-bold" style={{ color: EMERALD }}>AI THAT BUILDS TRUST</p>
                  </div>
                  <ul className="space-y-1.5">
                    {["Explains why it suggested something", "Full user override at every step", "Triggered manually, not intrusive", "Confidence indicators on uncertain outputs"].map((i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2 size={10} className="mt-0.5 shrink-0" style={{ color: EMERALD }} />{i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DecisionStory
            challenge="Research found that production professionals were open to AI but wary of surprises. AI outputs in V0 felt authoritative — users didn't know when to trust them and when not to."
            options={[
              { label: "Autonomous AI — acts without asking", rejected: true, reason: "Production professionals need to be accountable for their decisions. AI that acts autonomously removes accountability and creates anxiety." },
              { label: "AI hidden behind manual triggers only", rejected: false, reason: "Almost chosen — manual triggering respects user intent. But it meant AI was less discoverable for new users." },
              { label: "Contextual AI with manual trigger + confidence indicators ✓", rejected: false, reason: "AI suggests at relevant moments, is manually triggered, shows confidence signals, and makes override trivially easy." },
            ]}
            decision="AI positioned as a suggestion layer with explicit human override at every step. Collapsible AI panel triggered on demand. Confidence indicators on outputs that required judgment."
            tradeoff="AI is less visually prominent — but significantly more trusted when it appears."
            outcome="The suggestion model meant users remained accountable for their decisions while AI reduced the time spent on mechanical tasks like scheduling, metadata filling, and call sheet generation."
            whatChanged={[
              { role: "Writers",   change: "AI suggestions felt like a collaborator, not an autocomplete. Writers accepted or modified without anxiety.",          color: ACCENT  },
              { role: "Producers", change: "AI-generated call sheets came with a verify mode — producers could audit before approving.",                          color: EMERALD },
              { role: "Directors", change: "AI shot suggestions were presented as options with rationale — easy to accept, modify, or discard.",                  color: BLUE    },
              { role: "Business",  change: "Trust in the AI layer meant adoption — not avoidance. That's the difference between a feature and a product.",        color: AMBER   },
            ]}
          />
        </motion.section>

        {/* 06 · DECISION STORY #3 — MULTI-ROLE EXPERIENCE */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="06" text="Decision Story #3" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.8vw, 44px)" }}>
            One platform. Four completely different mental models.
          </h2>

          {/* Role tab switcher */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["writer", "director", "producer", "agency"] as const).map((role) => (
              <button key={role} onClick={() => setActiveRole(role)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize"
                style={activeRole === role
                  ? { background: roleContent[role].color, color: "white" }
                  : { background: "var(--bg-subtle)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                {role}
              </button>
            ))}
          </div>

          <motion.div key={activeRole} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${current.color}20` }}>
                  <Users size={20} style={{ color: current.color }} />
                </div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">{current.label} Experience</h3>
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold tracking-wider text-[var(--text-tertiary)] mb-3">KEY TASKS DESIGNED</p>
                <ul className="space-y-2">
                  {current.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: current.color }} />{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: "rgba(239,68,68,0.5)" }}>
                <p className="text-xs font-mono text-red-400 mb-1">CHALLENGE</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{current.challenge}</p>
              </div>
              <div className="p-4 rounded-xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: current.color }}>
                <p className="text-xs font-mono mb-1" style={{ color: current.color }}>DESIGN DECISION</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{current.design}</p>
              </div>
            </div>

            {/* Role ecosystem — visual */}
            <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                <p className="text-xs font-mono text-[var(--text-tertiary)]">HOW ROLES CONNECT — Information flow</p>
              </div>
              <div className="p-5">
                <div className="space-y-2">
                  {[
                    { from: "Writer",    to: "Script",        flow: "Creates script → available to all",           color: "#7C3AED" },
                    { from: "Director",  to: "Shot List",     flow: "Generates from script automatically",          color: "#0EA5E9" },
                    { from: "Producer",  to: "Schedule",      flow: "Built from script + director's shot plan",     color: "#10B981" },
                    { from: "Producer",  to: "Call Sheet",    flow: "Auto-generated from approved schedule",        color: "#10B981" },
                    { from: "Agency",    to: "Approval View", flow: "Read-only milestone tracking + sign-off",      color: "#F59E0B" },
                  ].map(({ from, to, flow, color }) => (
                    <div key={`${from}-${to}`} className="flex items-center gap-3 p-2.5 rounded-lg border border-[var(--border)]">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                      <span className="text-xs font-semibold text-[var(--text-primary)] w-16 shrink-0">{from}</span>
                      <ChevronRight size={10} className="shrink-0 text-[var(--text-tertiary)]" />
                      <span className="text-xs font-semibold shrink-0" style={{ color }}>{to}</span>
                      <span className="text-[10px] text-[var(--text-tertiary)] leading-relaxed">{flow}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <DecisionStory
            challenge="Four roles — writer, director, producer, agency — had completely different mental models, task priorities, and information needs. A single view would either overwhelm everyone or serve no one."
            options={[
              { label: "Single dashboard — all roles see everything", rejected: true, reason: "Information overload for every role. A writer doesn't need to see crew assignments; a producer doesn't need the script canvas." },
              { label: "Separate apps per role", rejected: true, reason: "Data would need to be manually synced between apps — recreating the fragmentation problem the platform was designed to solve." },
              { label: "Role-adaptive views on shared data ✓", rejected: false, reason: "One source of truth. Each role sees a view designed for their mental model. Changes in one view propagate automatically to all others." },
            ]}
            decision="Role-adaptive views on a single shared data layer. Each role logs in to an experience designed for their mental model — but all views reflect the same underlying data in real time."
            tradeoff="More design work upfront — four distinct view systems instead of one. Worth it: each role felt the platform was built for them specifically."
            outcome="Because the data layer was shared, a schedule change made by the producer automatically updated the director's shot plan and the agency's milestone view — without anyone sending a message."
            whatChanged={[
              { role: "Writers",   change: "Script editor felt like a writing tool — not a production management tool they had to tolerate.",   color: ACCENT  },
              { role: "Producers", change: "Dashboard showed exactly what they needed to manage the day — not what writers or directors needed.", color: EMERALD },
              { role: "Agencies",  change: "Clean approval interface required no training and no context about how production worked.",          color: AMBER   },
              { role: "Business",  change: "Role-specific design meant every user type had a reason to use the platform regularly.",            color: BLUE    },
            ]}
          />
        </motion.section>

        {/* 07 · DESIGNING AI WORKFLOWS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="07" text="Designing AI Workflows" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Each AI workflow had a specific job.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            AI wasn&apos;t added as a feature — it was designed into workflows where the before-state was clearly broken. For each: map the problem, design the AI interaction, validate with stakeholders, iterate until the workflow felt natural.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: "01", name: "Story Generation",       icon: Lightbulb, before: "Writers researched genre conventions manually before drafting.", after: "AI generates story outlines with genre-specific scene suggestions from a brief. Writer edits and owns the result." },
              { n: "02", name: "Script Editing",         icon: FileText,  before: "Revision was manual. No context-aware suggestions in the writing tool.", after: "AI offers line-level rewrites, pacing suggestions, and dialogue alternatives inline — collapsible, on-demand." },
              { n: "03", name: "Scene Metadata Auto-Fill", icon: Zap,    before: "Scene numbers, INT/EXT, and locations entered manually for every scene.", after: "AI parses script text and auto-fills scene metadata fields on import. Writer verifies and corrects." },
              { n: "04", name: "Scheduling Assistance",  icon: Calendar,  before: "Production scheduling required manually mapping scenes to locations, actors, and days.", after: "AI generates a scheduling suggestion based on locations, actor availability, and scene complexity. Producer approves or adjusts." },
              { n: "05", name: "Call Sheet Generation",  icon: FileText,  before: "Call sheets assembled manually the night before — from multiple spreadsheets.", after: "Auto-generated from the approved schedule. Includes a verify mode before export — producers audit critical fields." },
              { n: "06", name: "Production Coordination", icon: Users,   before: "Status updates shared via WhatsApp. No version control or single source of truth.", after: "Live status feed, role-based notifications, and milestone tracking — all in one place." },
            ].map(({ n, name, icon: Icon, before, after }) => (
              <motion.div key={n} variants={FU} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ACCENT}18` }}>
                      <Icon size={17} style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[var(--text-tertiary)] tracking-wider">WORKFLOW {n}</span>
                      <p className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{name}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <XCircle size={11} className="mt-0.5 shrink-0 text-red-400" />
                    <p className="text-xs text-[var(--text-secondary)]"><span className="font-mono text-[var(--text-tertiary)] mr-1">BEFORE:</span>{before}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={11} className="mt-0.5 shrink-0 text-emerald-400" />
                    <p className="text-xs text-[var(--text-secondary)]"><span className="font-mono text-[var(--text-tertiary)] mr-1">AFTER:</span>{after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 08 · DEVELOPER COLLABORATION */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="08" text="Developer Collaboration" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Design decisions made with the team — not handed over to them.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            With a two-month timeline across four roles and six AI workflows, every hour of ambiguity was a risk. Collaboration was designed into the process, not left to chance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                person: "CEO — Vision holder",
                dynamic: "Pushed for ambitious AI features. I balanced vision against sprint feasibility — maintaining a long-term reference prototype alongside sprint-scoped specs. This meant CEO reviews were on the vision, not on what was currently in development.",
                lesson: "Separating aspirational design from sprint-ready specs prevented scope creep from blocking delivery.",
                color: ACCENT,
              },
              {
                person: "Product Manager — Sprint gatekeeper",
                dynamic: "Design specs needed to arrive before sprint planning. I adapted by prototyping key interactions early — before scoping was finalised — so the PM had enough fidelity to scope confidently.",
                lesson: "Annotated Figma handoffs with clear state documentation reduced back-and-forth during builds.",
                color: EMERALD,
              },
              {
                person: "Engineers — Build partners",
                dynamic: "Frontend devs flagged early that complex animations were not feasible within sprint timeframes. Rather than holding to the design, I redesigned two AI panel interactions to use simpler transitions — achieving the same UX intent.",
                lesson: "Redesigning for constraints early is better than discovering conflicts during build.",
                color: BLUE,
              },
              {
                person: "Production Professionals — Domain experts",
                dynamic: "Film production professionals provided direct feedback on early prototypes. Their domain expertise shaped call sheet structure, scheduling logic terminology, and crew assignment patterns — areas where design intuition isn't enough.",
                lesson: "Using industry-standard terminology throughout made the platform instantly recognisable to professionals — reducing onboarding friction without documentation.",
                color: AMBER,
              },
            ].map(({ person, dynamic, lesson, color }) => (
              <div key={person} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{person}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{dynamic}</p>
                <div className="flex items-start gap-2 pt-3 border-t border-[var(--border)]">
                  <Star size={11} className="mt-0.5 shrink-0" style={{ color }} />
                  <p className="text-xs text-[var(--text-secondary)] italic">{lesson}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 09 · BEHIND THE DECISIONS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="09" text="Behind the Decisions" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            What the process actually looked like.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: PenTool,    label: "Dashboard went through multiple versions", desc: "The first producer dashboard surfaced everything at once. Stakeholder feedback was consistent: too much, too early. It was redesigned around a prioritised today view — showing what was most urgent, with depth accessible on demand.", tag: "ITERATION", color: ACCENT },
              { icon: XCircle,   label: "The AI panel was moved three times", desc: "AI suggestions started inline with the script text. Writers found it interrupting their flow. Moved to a right panel. Felt too prominent. Settled on a collapsible drawer triggered manually — appearing only when the writer wanted it.", tag: "PIVOT", color: RED    },
              { icon: MessageSquare, label: "Call sheet confidence indicators were added late", desc: "The first auto-generated call sheet version had no indication of which fields the AI was uncertain about. Producers couldn't tell what to verify. Added per-field confidence signals and a verify mode before export.", tag: "LEARNING", color: AMBER  },
              { icon: Code,      label: "Complex animations redesigned for sprint feasibility", desc: "Two AI panel transitions were flagged as too costly for the sprint timeline. Paired with the frontend developer to redesign them using simpler transitions that achieved the same user experience intent within the available effort.", tag: "CONSTRAINT", color: EMERALD },
              { icon: GitBranch, label: "Healthcare was added mid-project", desc: "A healthcare product scope was added with no timeline extension. The design system built for the film platform was adapted to the healthcare context. System reuse is what made this feasible without sacrificing quality.", tag: "ADAPTATION", color: BLUE   },
              { icon: Layers,    label: "Design system evolved through feedback", desc: "The component library went through revision after the first features shipped to staging. Implementation gaps revealed missing states and edge cases in the original handoff documentation — which were added before the next sprint.", tag: "REFINEMENT", color: "#6366F1" },
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
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 10 · IMPACT */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}
          className="py-14 px-10 rounded-3xl"
          style={{ background: `linear-gradient(135deg, ${ACCENT}14 0%, ${ACCENT}06 60%, transparent 100%)`, border: `1px solid ${ACCENT}22` }}>
          <Label n="10" text="Impact" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(26px, 3.8vw, 44px)" }}>
            What changed — by perspective.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed max-w-2xl">
            Impact described by audience — based on what was designed and delivered, not on metrics that weren&apos;t formally measured.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: "Product",
                icon: Target, color: ACCENT,
                items: [
                  "Single platform replacing the combination of Google Docs, Excel, and WhatsApp that productions relied on",
                  "AI embedded at the workflow level — not bolted on as a separate tool",
                  "Four role-adaptive views on one shared data layer — changes propagate automatically",
                ],
              },
              {
                category: "Users",
                icon: Users, color: BLUE,
                items: [
                  "Writers: AI collaboration without flow interruption — collapsible, on demand",
                  "Producers: call sheets generated from the approved schedule, with a verify mode",
                  "Directors: shot suggestions presented as options with rationale — easy to accept or reject",
                  "Agencies: approval interface requiring no training or production context",
                ],
              },
              {
                category: "Team",
                icon: MessageSquare, color: EMERALD,
                items: [
                  "Shared design system: healthcare product scope absorbed without timeline extension",
                  "Annotated specs: developers built with fewer questions about states and edge cases",
                  "Long-term prototype separated from sprint specs: CEO reviews stayed on vision",
                ],
              },
              {
                category: "Business",
                icon: TrendingUp, color: AMBER,
                items: [
                  "Five product milestones delivered within the two-month timeline",
                  "AI positioned as a trusted suggestion layer — not an autonomous decision-maker",
                  "Platform architecture scalable for additional role types and workflow integrations",
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
                      <ArrowUpRight size={12} className="mt-0.5 shrink-0" style={{ color }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 11 · KEY LEARNINGS */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="11" text="Key Learnings" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            How this project changed the way I think about product design.
          </h2>
          <div className="space-y-4 mb-10">
            {[
              { n: "01", color: ACCENT, title: "Designing for AI is designing for trust", text: "The most important AI design question isn't 'what can AI do?' — it's 'when will users trust it?' AI that suggests and explains builds trust incrementally. AI that decides and surprises creates avoidance. Designing the suggestion model first changed everything else." },
              { n: "02", color: BLUE,   title: "Root causes, not symptoms", text: "Plugins and chatbots would have added features to a fragmented system. The platform approach addressed the root cause — information fragmentation. Identifying the root cause before proposing a solution is a design skill, not a research task." },
              { n: "03", color: EMERALD, title: "Role-adaptive design is a structural decision, not a feature", text: "Giving each role a view designed for their mental model required deciding upfront that the data layer would be shared. That architectural decision made role-adaptive design possible. Getting that decision right early was more valuable than any individual screen." },
              { n: "04", color: AMBER,  title: "A design system is insurance against scope expansion", text: "When healthcare was added mid-project with no timeline extension, the design system made it feasible. Without it, the addition would have required a new visual language, new components, and new patterns from scratch — which the timeline couldn't absorb." },
              { n: "05", color: "#6366F1", title: "Constraints improve decisions when made explicit", text: "Listing constraints upfront — timeline, no user research, four mental models, AI trust requirements — changed how every design decision was framed. A decision that ignores its constraints isn't a decision, it's a preference." },
            ].map(({ n, title, text, color }) => (
              <motion.div key={n} variants={FU} className="flex gap-5 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="text-2xl font-display font-black opacity-20 shrink-0 w-8 leading-none" style={{ color }}>{n}</div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] mb-2 leading-snug">{title}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-8 rounded-2xl" style={{ background: `${ACCENT}0C`, border: `1px solid ${ACCENT}25` }}>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed italic mb-3">
              &ldquo;This project taught me that designing for AI isn&apos;t about making the AI impressive — it&apos;s about making the user confident. The best AI interface is one where users feel in control, not supervised by a machine.&rdquo;
            </p>
            <p className="text-xs font-mono" style={{ color: ACCENT }}>— Ganesh Muniganti · Dimension Leap, 2025</p>
          </div>
        </motion.section>

      </div>

      {/* Next project */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-6 text-center">Next Project</p>
          <Link href="/work/healthcare-platform" className="block group max-w-lg mx-auto">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all bg-[var(--bg)]">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">Healthcare · Enterprise UX</p>
                <p className="font-display font-bold text-xl text-[var(--text-primary)]">Unified Healthcare Platform</p>
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
