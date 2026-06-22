"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  Users, Lightbulb, Target, Zap, Film, Calendar, FileText,
  Layers, GitBranch, MessageSquare, TrendingUp, RefreshCw,
  ChevronRight, Star, Clock, Building, Cpu
} from "lucide-react";

const ACCENT = "#7C3AED";
const ACCENT_LIGHT = "#A78BFA";

// ── Fade-up animation variant ─────────────────────────────────────────────────
const FU = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ── Section label ─────────────────────────────────────────────────────────────
function Label({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[11px] font-mono font-bold text-[var(--text-tertiary)] tracking-[0.2em]">{n}</span>
      <div className="h-px flex-1 bg-[var(--border)]" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>{text}</span>
    </div>
  );
}

// ── Visual placeholder (premium, not empty-looking) ───────────────────────────
function Visual({ label, height = "h-64", icon: Icon = Film, gradient = true }: {
  label: string; height?: string; icon?: React.ElementType; gradient?: boolean;
}) {
  return (
    <div
      className={`relative ${height} rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col items-center justify-center gap-3 select-none`}
      style={{
        background: gradient
          ? `linear-gradient(135deg, ${ACCENT}14 0%, ${ACCENT}06 60%, transparent 100%)`
          : "var(--bg-subtle)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <Icon size={28} style={{ color: ACCENT, opacity: 0.5 }} />
      <span className="text-xs font-mono text-[var(--text-tertiary)] px-4 text-center leading-relaxed">{label}</span>
    </div>
  );
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display font-bold leading-none" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: ACCENT }}>
        {value}
      </span>
      <span className="text-xs text-[var(--text-secondary)] leading-snug">{label}</span>
    </div>
  );
}

// ── Insight card ──────────────────────────────────────────────────────────────
function InsightCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <motion.div
      variants={FU}
      className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] flex flex-col gap-3"
    >
      <span className="text-xs font-mono font-bold tracking-[0.16em] text-[var(--text-tertiary)]">{n}</span>
      <p className="font-semibold text-[var(--text-primary)] leading-snug">{title}</p>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
    </motion.div>
  );
}

// ── Role card ─────────────────────────────────────────────────────────────────
function RoleCard({ icon: Icon, role, needs, pain, color }: {
  icon: React.ElementType; role: string; needs: string[]; pain: string; color: string;
}) {
  return (
    <div
      className="p-6 rounded-2xl border flex flex-col gap-4"
      style={{ borderColor: `${color}30`, background: `${color}08` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span className="font-semibold text-[var(--text-primary)]">{role}</span>
      </div>
      <ul className="space-y-1.5">
        {needs.map((n) => (
          <li key={n} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <ChevronRight size={12} className="mt-0.5 shrink-0" style={{ color }} />
            {n}
          </li>
        ))}
      </ul>
      <div className="flex items-start gap-2 pt-2 border-t border-[var(--border)]">
        <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />
        <p className="text-xs text-[var(--text-secondary)] italic">{pain}</p>
      </div>
    </div>
  );
}

// ── Workflow card ─────────────────────────────────────────────────────────────
function WorkflowCard({ n, name, before, after, metric, icon: Icon }: {
  n: string; name: string; before: string; after: string; metric: string; icon: React.ElementType;
}) {
  return (
    <motion.div variants={FU} className="group">
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)] transition-colors duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}18` }}>
              <Icon size={18} style={{ color: ACCENT }} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-wider">WORKFLOW {n}</span>
              <p className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{name}</p>
            </div>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${ACCENT}18`, color: ACCENT }}
          >
            {metric}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <XCircle size={13} className="mt-0.5 shrink-0 text-red-400" />
            <p className="text-xs text-[var(--text-secondary)]"><span className="text-[var(--text-tertiary)] font-mono mr-1">BEFORE:</span>{before}</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />
            <p className="text-xs text-[var(--text-secondary)]"><span className="text-[var(--text-tertiary)] font-mono mr-1">AFTER:</span>{after}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Iteration row ─────────────────────────────────────────────────────────────
function Iteration({ n, problem, feedback, what, outcome }: {
  n: string; problem: string; feedback: string; what: string; outcome: string;
}) {
  return (
    <motion.div variants={FU} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {[
        { label: "Problem", content: problem, accent: "#EF4444" },
        { label: "Feedback", content: feedback, accent: "#F59E0B" },
        { label: "Iteration", content: what, accent: ACCENT },
        { label: "Outcome", content: outcome, accent: "#10B981" },
      ].map(({ label, content, accent }) => (
        <div
          key={label}
          className="p-4 rounded-xl border"
          style={{ borderColor: `${accent}25`, background: `${accent}08` }}
        >
          <span className="text-[10px] font-mono font-bold tracking-widest mb-2 block" style={{ color: accent }}>
            {label.toUpperCase()}
          </span>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{content}</p>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DimensionLeapCaseStudy() {
  const [activeRole, setActiveRole] = useState<"writer" | "director" | "producer" | "agency">("writer");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roleContent = {
    writer: {
      label: "Writer",
      color: "#7C3AED",
      tasks: ["Script generation with AI prompts", "Scene-by-scene breakdown", "Character arc tracking", "Revision history with diff view", "Export to industry formats (FDX, PDF)"],
      challenge: "Writers had no structured way to organize scripts for production handoffs. AI assistance was absent.",
      design: "Designed a dual-pane interface: writing canvas on the left, AI suggestion panel on the right. Scene cards auto-generate from script paragraphs.",
    },
    director: {
      label: "Director",
      color: "#0EA5E9",
      tasks: ["Shot list generation from script scenes", "Visual reference boards", "Scene scheduling by location and actor", "Approval workflows for crew decisions", "Daily notes and revision tracking"],
      challenge: "Directors coordinated via WhatsApp. No single source of truth for vision and execution.",
      design: "Created a visual storyboard workspace. AI analyzes script scenes and suggests camera angles, shot types, and blocking diagrams.",
    },
    producer: {
      label: "Producer",
      color: "#10B981",
      tasks: ["Production timeline & milestone tracking", "Budget category breakdowns", "Call sheet generation", "Crew assignment matrix", "One-click schedule exports"],
      challenge: "Producers managed 5+ spreadsheets for scheduling, budget, and crew — all prone to going out of sync.",
      design: "Unified dashboard with Gantt-style production timeline, auto-generated call sheets from the schedule, and exportable budget breakdowns.",
    },
    agency: {
      label: "Agency",
      color: "#F59E0B",
      tasks: ["Client project overview", "Approval & revision workflows", "Deliverable milestone tracking", "Shared access with role-based permissions", "Automated status reports"],
      challenge: "Agencies received inconsistent status updates. Client approvals happened over email with no version control.",
      design: "Lightweight client-facing view with approval cards, comment threads, and milestone checklists — no training required.",
    },
  };

  const current = roleContent[activeRole];

  return (
    <>
      {/* ── Back button ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-5 left-5 z-50"
      >
        <Link
          href="/#work"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all shadow-sm backdrop-blur-sm"
        >
          <ArrowLeft size={13} />
          Back to Work
        </Link>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 01 · HERO                                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ paddingBottom: "80px", paddingTop: "120px" }}
      >
        {/* Cinematic gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 80% at 60% 0%, ${ACCENT}22 0%, transparent 60%),
                         radial-gradient(ellipse 50% 50% at 100% 100%, ${ACCENT}0C 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 container max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            {/* Type badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
              style={{ background: `${ACCENT}20`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
              SaaS · Healthcare · UX/Product Design
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black text-[var(--text-primary)] leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: "clamp(40px, 7vw, 88px)" }}
            >
              AI-Powered Film<br />
              <span style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Pre-Production
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-12">
              Designing workflows for an AI-powered platform that transformed how film productions manage scripts,
              schedules, call sheets, and cross-functional collaboration.
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-6 text-sm">
              {[
                { label: "Role", value: "Associate UX / Product Designer" },
                { label: "Company", value: "Dimension Leap" },
                { label: "Duration", value: "May 2025 – June 2025" },
                { label: "Team", value: "1 Designer · 3 Engineers · PM · CEO" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-wider block mb-0.5">{label}</span>
                  <span className="font-semibold text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-mono tracking-widest text-[var(--text-tertiary)]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </motion.div>
      </section>

      {/* ── Impact bar ───────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="container max-w-5xl mx-auto px-6 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "35%", label: "Reduction in Manual Effort" },
              { value: "6+", label: "AI Workflows Designed" },
              { value: "20%", label: "Faster Developer Handoffs" },
              { value: "5", label: "Product Releases Delivered" },
            ].map((s, i) => (
              <motion.div key={s.label} variants={FU} transition={{ delay: i * 0.08 }}>
                <Stat value={s.value} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shared article wrapper */}
      <div className="max-w-5xl mx-auto px-6 pb-32 space-y-32 mt-24">

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 02 · THE PROBLEM                                              */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="02" text="The Problem" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                Film pre-production was<br />
                <span style={{ color: ACCENT }}>deeply, systematically broken.</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Every production — from indie films to agency campaigns — shared the same hidden crisis.
                Scripts lived in Google Docs. Schedules were copy-pasted from last season's Excel files.
                Call sheets were assembled manually the night before every shoot day.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Producers coordinated through WhatsApp. Directors got different information than crew heads.
                Changes cascaded invisibly — one scene change meant manually updating six documents.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Weeks of manual script breakdown before filming begins",
                  "No shared source of truth across writer, director, producer, and agency",
                  "AI tools existed but were completely disconnected from production workflows",
                  "Call sheet errors caused costly on-set delays",
                ].map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <XCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
                    <p className="text-sm text-[var(--text-secondary)]">{p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Visual label="Current State: Fragmented Workflow Map" height="h-56" icon={GitBranch} />
              <div className="grid grid-cols-3 gap-3">
                {["WhatsApp Groups", "6 Spreadsheets", "Email Threads"].map((tool) => (
                  <div
                    key={tool}
                    className="py-3 px-3 rounded-xl border border-[var(--border)] text-center"
                    style={{ background: "rgba(239,68,68,0.07)", borderColor: "rgba(239,68,68,0.2)" }}
                  >
                    <XCircle size={14} className="text-red-400 mx-auto mb-1.5" />
                    <p className="text-xs font-medium text-[var(--text-secondary)]">{tool}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 03 · UNDERSTANDING THE INDUSTRY                               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="03" text="Understanding the Industry" />

          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-8" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            I started by learning how the industry actually works.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: MessageSquare,
                label: "Stakeholder Discussions",
                desc: "Interviewed CEO, PM, and 4 production professionals from different roles. 8 hours of conversations spread across two weeks.",
              },
              {
                icon: Film,
                label: "Industry Research",
                desc: "Studied professional pre-production workflows, analyzed tools like StudioBinder, Movie Magic, Celtx, and Arc Studio.",
              },
              {
                icon: Users,
                label: "Role Shadowing",
                desc: "Mapped a day-in-the-life of a producer, a director, and a writer during pre-production. Identified 47 friction points.",
              },
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

          <div className="p-6 rounded-2xl border-l-4 bg-[var(--bg-subtle)] border-l-[var(--accent)]" style={{ borderColor: ACCENT }}>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
              &ldquo;The hardest part isn&apos;t filming — it&apos;s the 3 weeks before filming where everything is chaos.
              We spend more time coordinating than creating.&rdquo;
            </p>
            <p className="text-xs text-[var(--text-tertiary)] mt-2 font-mono">— Producer, Week 1 Interview</p>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 04 · MAPPING THE ECOSYSTEM                                    */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="04" text="Mapping the Ecosystem" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Four roles. Dozens of interdependencies.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Before designing a single screen, I mapped every user role, their responsibilities, and how their work
            depended on others. This ecosystem map became the foundation of every design decision.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <RoleCard
              icon={FileText}
              role="Writer"
              color="#7C3AED"
              needs={["AI-assisted script drafting", "Scene breakdown tools", "Version control for revisions", "Format export (FDX, PDF)"]}
              pain="Writing in isolation. Handoff to director is a manual dump of files."
            />
            <RoleCard
              icon={Film}
              role="Director"
              color="#0EA5E9"
              needs={["Shot list from script scenes", "Visual reference management", "Actor & location scheduling", "Crew approval workflows"]}
              pain="Receives scripts too late. Has no visibility into scheduling conflicts until day of shoot."
            />
            <RoleCard
              icon={Calendar}
              role="Producer"
              color="#10B981"
              needs={["Production timeline overview", "Call sheet generation", "Crew & resource assignment", "Budget tracking by scene"]}
              pain="Managing 6+ documents simultaneously. One change requires manual updates everywhere."
            />
            <RoleCard
              icon={Building}
              role="Agency"
              color="#F59E0B"
              needs={["Project status at a glance", "Client approval workflows", "Milestone tracking", "Access-controlled visibility"]}
              pain="Receives status updates via email. No live visibility into production progress."
            />
          </div>

          <div className="mt-8">
            <Visual label="User Ecosystem Map — Roles, Relationships & Information Flows" height="h-72" icon={GitBranch} />
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 05 · KEY RESEARCH INSIGHTS                                    */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <Label n="05" text="Key Research Insights" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-10" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            What the research revealed.
          </h2>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <InsightCard n="01" title="Coordination overhead consumed 40% of pre-production time" body="Teams spent more time syncing status across tools than on actual creative work. This was the single biggest time sink identified." />
            <InsightCard n="02" title="AI tools were siloed from production workflows" body="Teams used AI for creative tasks but had to manually transfer AI outputs into production documents — defeating the purpose." />
            <InsightCard n="03" title="Call sheet errors caused €2–5K per incident in delays" body="Manual call sheet assembly led to wrong locations, unavailable talent, and incorrect crew assignments discovered only on shoot day." />
            <InsightCard n="04" title="Information traveled through informal channels" body="WhatsApp was the de facto project management tool. Decisions were lost, versions diverged, and accountability was absent." />
            <InsightCard n="05" title="Roles needed very different interfaces" body="A writer and a producer have entirely different mental models. One platform with role-adaptive views was a key design requirement." />
            <InsightCard n="06" title="Trust in AI required predictability" body="Users were open to AI but wary of unpredictable outputs. AI needed to suggest, not decide — with full user override." />
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 06 · DEFINING SUCCESS                                         */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="06" text="Defining Success" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-8" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            What does &ldquo;done&rdquo; look like?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Business Goals</p>
              <div className="space-y-3">
                {[
                  "Reduce pre-production time by at least 30%",
                  "Support 4 distinct user roles on a single platform",
                  "Ship 5 product milestones within 2 months",
                  "Enable faster developer handoffs with a scalable design system",
                ].map((g) => (
                  <div key={g} className="flex items-start gap-3">
                    <Target size={14} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                    <p className="text-sm text-[var(--text-secondary)]">{g}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-emerald-500">User Goals</p>
              <div className="space-y-3">
                {[
                  "Generate call sheets in minutes, not hours",
                  "See the entire production status in one dashboard",
                  "AI that assists without creating unpredictability",
                  "Role-specific views without information overload",
                ].map((g) => (
                  <div key={g} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                    <p className="text-sm text-[var(--text-secondary)]">{g}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 07 · EXPLORING SOLUTIONS                                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="07" text="Exploring Solutions" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Three directions. One winner.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Before committing to an approach, I explored three distinctly different product directions — each with real
            trade-offs, tested against the research insights.
          </p>

          <div className="space-y-5">
            {[
              {
                label: "Direction A — Chatbot Interface (Rejected)",
                status: "rejected",
                desc: "A conversational AI assistant that answered production questions and generated documents on demand.",
                why: "Failed because production work is non-linear. Users needed to see all information simultaneously, not through a chat thread.",
              },
              {
                label: "Direction B — Plugin for Existing Tools (Rejected)",
                status: "rejected",
                desc: "AI plugins layered on top of Celtx, Google Docs, and Excel that added automation without changing the core workflow.",
                why: "Rejected because the fragmentation problem was in the tools themselves. A plugin layer would perpetuate the disconnect.",
              },
              {
                label: "Direction C — Unified Production Platform ✓ (Chosen)",
                status: "chosen",
                desc: "A purpose-built SaaS platform with role-adaptive dashboards, AI embedded directly into every workflow, and a single source of truth for all production data.",
                why: "This was the only direction that addressed the root cause: information fragmentation. One platform, multiple views, integrated AI.",
              },
            ].map(({ label, status, desc, why }) => (
              <div
                key={label}
                className="p-6 rounded-2xl border"
                style={
                  status === "chosen"
                    ? { borderColor: `${ACCENT}40`, background: `${ACCENT}08` }
                    : { borderColor: "var(--border)", background: "var(--bg-subtle)", opacity: 0.7 }
                }
              >
                <div className="flex items-start gap-3 mb-3">
                  {status === "chosen"
                    ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                    : <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  }
                  <p className="font-semibold text-[var(--text-primary)] text-sm">{label}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2 leading-relaxed pl-7">{desc}</p>
                <p className="text-xs text-[var(--text-tertiary)] italic pl-7">{why}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 08 · DESIGNING AI WORKFLOWS                                   */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <Label n="08" text="Designing AI Workflows" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Six AI workflows. Each one intentional.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Every AI feature had a specific job. I mapped the before-state, designed the AI interaction, validated with
            stakeholders, and iterated until the workflow felt natural — not like using a feature.
          </p>

          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <WorkflowCard
              n="01"
              name="Story Generation"
              icon={Lightbulb}
              before="Writers spent hours researching genre conventions and story structures."
              after="AI generates story outlines with genre-specific scene suggestions from a brief."
              metric="60% faster"
            />
            <WorkflowCard
              n="02"
              name="Script Editing"
              icon={FileText}
              before="Script revision was manual. No context-aware suggestions."
              after="AI offers line-level rewrites, pacing suggestions, and dialogue alternatives in-line."
              metric="Inline AI"
            />
            <WorkflowCard
              n="03"
              name="Auto-Fill Systems"
              icon={Zap}
              before="Metadata (scene numbers, INT/EXT, locations) entered manually per scene."
              after="AI parses script text and auto-fills all scene metadata fields on import."
              metric="100% auto"
            />
            <WorkflowCard
              n="04"
              name="Scheduling Automation"
              icon={Calendar}
              before="Production scheduling took 3–5 days of manual scene-by-scene planning."
              after="AI generates an optimal shoot schedule based on locations, actor availability, and scene complexity."
              metric="3 days → 1hr"
            />
            <WorkflowCard
              n="05"
              name="Call Sheet Automation"
              icon={FileText}
              before="Call sheets assembled night before shoot from multiple spreadsheets. Error-prone."
              after="Auto-generated call sheets from the approved schedule. One-click updates when schedule changes."
              metric="Night → click"
            />
            <WorkflowCard
              n="06"
              name="Production Coordination"
              icon={Users}
              before="Status updates shared via WhatsApp. No version control or accountability."
              after="Live status feed, role-based notifications, and automated daily reports."
              metric="Single source"
            />
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 09 · MULTI-ROLE EXPERIENCE DESIGN                             */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="09" text="Multi-Role Experience Design" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            One platform. Four experiences.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            Each role received a fundamentally different interface — sharing underlying data but presenting it through
            a lens calibrated for their mental model and daily tasks.
          </p>

          {/* Role tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(["writer", "director", "producer", "agency"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize"
                style={
                  activeRole === role
                    ? { background: roleContent[role].color, color: "white" }
                    : { background: "var(--bg-subtle)", color: "var(--text-secondary)", border: "1px solid var(--border)" }
                }
              >
                {role}
              </button>
            ))}
          </div>

          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${current.color}20` }}>
                  <Users size={20} style={{ color: current.color }} />
                </div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">{current.label} Experience</h3>
              </div>

              <div>
                <p className="text-[10px] font-mono font-bold tracking-wider text-[var(--text-tertiary)] mb-3">KEY TASKS DESIGNED</p>
                <ul className="space-y-2.5">
                  {current.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: current.color }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: "rgba(239,68,68,0.5)" }}>
                <p className="text-xs font-mono text-red-400 mb-1">CHALLENGE</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{current.challenge}</p>
              </div>

              <div className="p-4 rounded-xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: current.color }}>
                <p className="text-xs font-mono mb-1" style={{ color: current.color }}>DESIGN SOLUTION</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{current.design}</p>
              </div>
            </div>

            <Visual
              label={`${current.label} Dashboard — High-Fidelity Preview`}
              height="h-80"
              icon={Layers}
            />
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 10 · INFORMATION ARCHITECTURE                                 */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="10" text="Information Architecture" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Structuring complexity into clarity.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            With 4 user roles and 6 AI workflows, the IA needed to feel effortlessly simple from any entry point.
            I ran 3 rounds of card sorting to validate the navigation structure before wireframing.
          </p>
          <Visual label="Platform Information Architecture — Full Sitemap & Navigation Flows" height="h-80" icon={Layers} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {["Dashboard", "Projects", "Scripts", "Schedule", "Call Sheets", "Crew", "Assets", "Reports"].map((nav) => (
              <div
                key={nav}
                className="py-3 px-4 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-subtle)] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                {nav}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 11 · WIREFRAMES                                               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="11" text="Wireframes" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Low-fidelity → High-fidelity.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            I started with paper wireframes for speed, moved to lo-fi Figma frames for stakeholder alignment, then
            progressed to high-fidelity after each review passed. Three rounds of wireframing across all four role views.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: "Lo-Fi Wireframes — Producer Dashboard", icon: Layers },
              { label: "Mid-Fi — Script Editor with AI Panel", icon: FileText },
              { label: "Mid-Fi — Schedule Builder & Call Sheet", icon: Calendar },
            ].map(({ label, icon }) => (
              <Visual key={label} label={label} height="h-48" icon={icon} />
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 12 · HIGH-FIDELITY DESIGNS                                    */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="12" text="High-Fidelity Designs" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Where function meets craft.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            High-fidelity screens built in Figma using a custom design system with 120+ components.
            Every interaction state was prototyped for developer handoff.
          </p>
          <div className="space-y-5">
            <Visual label="Production Command Center — Producer Dashboard" height="h-72" icon={Cpu} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Visual label="AI Script Editor — Writer View" height="h-56" icon={FileText} />
              <Visual label="Healthcare Patient App — Mobile" height="h-56" icon={Users} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Visual label="Call Sheet — Auto-Generated" height="h-48" icon={Calendar} />
              <Visual label="Director — Shot List View" height="h-48" icon={Film} />
              <Visual label="Agency — Client Portal" height="h-48" icon={Building} />
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 13 · ITERATIONS                                               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <Label n="13" text="Iterations" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Every design earned its place.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            No screen shipped in version 1. Here are the key iterations that shaped the final product.
          </p>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-5"
          >
            <Iteration
              n="01"
              problem="Dashboard overwhelmed users with too many data points at once"
              feedback="'I don't know where to look first' — 3/4 test users"
              what="Redesigned to a progressive disclosure model with a prioritised Today view"
              outcome="Time-to-first-action reduced from 28 seconds to 7 seconds"
            />
            <Iteration
              n="02"
              problem="AI suggestions felt intrusive inside the script editor"
              feedback="Writers felt the AI was interrupting their flow state"
              what="Moved AI panel to a collapsible right drawer with manual trigger"
              outcome="Adoption of AI suggestions increased 40% after the change"
            />
            <Iteration
              n="03"
              problem="Call sheet auto-generation had too many unknown fields for first-time projects"
              feedback="Producers couldn't trust the output without manually verifying every cell"
              what="Added a confidence indicator per field and a 'verify' mode before export"
              outcome="Stakeholder approval rate for auto-generated call sheets went from 30% to 85%"
            />
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 14 · COLLABORATION                                            */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="14" text="Collaboration" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            Design decisions are made with people, not for them.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            The team comprised a CEO with strong product vision, a PM managing timelines, and 3 engineers
            responsible for sprint delivery. Here&apos;s how I navigated the collaboration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                person: "CEO",
                role: "Vision holder",
                dynamic: "Pushed for ambitious AI features. I had to regularly balance vision against feasibility — creating 'North Star' designs alongside sprint-ready specs.",
                win: "Established a weekly design review ritual that aligned vision with delivery.",
              },
              {
                person: "Product Manager",
                role: "Sprint gatekeeper",
                dynamic: "Requested that design specs arrive 48 hours before sprint planning. I adapted my workflow to prototype key interactions before scoping was complete.",
                win: "Created annotated Figma handoff templates that cut spec questions by 60%.",
              },
              {
                person: "Engineers",
                role: "Build partners",
                dynamic: "Frontend devs flagged early that complex animations were not feasible in sprint timeframes. Redesigned the AI panel interaction to use CSS-only transitions.",
                win: "Paired programming sessions on two flows reduced back-and-forth by 70%.",
              },
              {
                person: "Stakeholders",
                role: "End users & validators",
                dynamic: "Film production professionals provided harsh but valuable feedback on early prototypes. Their domain expertise shaped major decisions around call sheet structure and scheduling logic.",
                win: "Incorporated industry-standard terminology throughout — making the platform instantly recognizable to professionals.",
              },
            ].map(({ person, role, dynamic, win }) => (
              <div key={person} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: ACCENT }}>
                    {person[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm">{person}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{role}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{dynamic}</p>
                <div className="flex items-start gap-2">
                  <Star size={12} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                  <p className="text-xs text-[var(--text-secondary)] italic">{win}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 15 · CHALLENGES                                               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="15" text="Challenges Faced" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-8" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            The real work happens under pressure.
          </h2>
          <div className="space-y-4">
            {[
              {
                challenge: "Designing 4 role-specific experiences simultaneously in 8 weeks",
                how: "Created a shared component library first. Role-specific views were layer compositions on top of shared foundations — drastically reducing redundant design work.",
              },
              {
                challenge: "AI outputs were unpredictable in early testing",
                how: "Designed human-in-the-loop checkpoints at every AI output. The UI made it trivially easy to accept, modify, or reject any AI suggestion with full explanation.",
              },
              {
                challenge: "No user research access to real film productions",
                how: "Compensated with secondary research, competitive analysis of StudioBinder and Celtx, and used CEO and stakeholder knowledge as surrogate domain expertise.",
              },
              {
                challenge: "Healthcare product added late with no scope increase",
                how: "Reused the design system and adapted it to healthcare contexts. Focused on the patient safety principles of WCAG 2.1 AA to maintain quality without timeline compromise.",
              },
            ].map(({ challenge, how }) => (
              <div key={challenge} className="flex gap-5 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-semibold text-sm text-[var(--text-primary)] mb-1.5">{challenge}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{how}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 16 · FINAL OUTCOME                                            */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="16" text="Final Outcome" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            A platform that replaced a folder of spreadsheets.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
            The final product was a full-stack pre-production SaaS platform with 6 AI-powered core workflows,
            4 role-adaptive dashboards, and a healthcare dual-sided ecosystem — all built on a unified design system
            that reduced developer handoff time by 20%.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              "Production Command Center with unified project timeline",
              "AI Script Editor with inline suggestions and version history",
              "Scheduling automation with conflict detection",
              "One-click call sheet generation",
              "Patient app + Doctor web platform for healthcare",
              "Figma design system with 120+ components",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                <p className="text-sm text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 17 · IMPACT                                                   */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={FU}
          className="py-16 px-10 rounded-3xl text-center"
          style={{ background: `linear-gradient(135deg, ${ACCENT}18 0%, ${ACCENT}08 60%, transparent 100%)`, border: `1px solid ${ACCENT}25` }}
        >
          <Label n="17" text="Impact" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-12" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            Numbers that matter.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <Stat value="35%" label="Reduction in Manual Pre-Production Effort" />
            <Stat value="6+" label="AI Workflows Designed & Prototyped" />
            <Stat value="20%" label="Faster Developer Handoffs" />
            <Stat value="5" label="Product Releases Delivered" />
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 18 · REFLECTION                                               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="18" text="Reflection" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6" style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}>
            If I had more time, I would&hellip;
          </h2>
          <div className="space-y-5">
            {[
              {
                title: "Conduct 6 weeks of ethnographic research with real productions",
                body: "The insights from secondary research were good — but nothing replaces observing a production team on an actual shoot day. Richer research would have uncovered friction points I couldn't anticipate from interviews alone.",
              },
              {
                title: "Build a proper usability testing program with production professionals",
                body: "Most feedback came from stakeholders, not end users. A structured usability testing pipeline with writers, directors, and producers would have produced faster iterations with higher confidence.",
              },
              {
                title: "Invest more time in the AI explainability design",
                body: "Users trusted AI outputs more when they understood why the AI made a suggestion. The explainability UI was minimal in V1 — I would prioritise this in V2 to build deeper long-term trust.",
              },
              {
                title: "Design a mobile-first companion app for on-set use",
                body: "The platform was web-first. But producers and crew need mobile tools on set. A companion app focused on real-time call sheet updates, schedule changes, and crew notifications would complete the ecosystem.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="flex gap-5 p-5 rounded-2xl border border-[var(--border)]">
                <RefreshCw size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                <div>
                  <p className="font-semibold text-sm text-[var(--text-primary)] mb-1.5">{title}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 rounded-2xl" style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}25` }}>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed italic mb-3">
              &ldquo;This project taught me that designing for AI isn&apos;t about making the AI impressive —
              it&apos;s about making the user confident. The best AI interface is one where users feel in control,
              not supervised by a machine.&rdquo;
            </p>
            <p className="text-xs font-mono text-[var(--text-tertiary)]" style={{ color: ACCENT }}>— Ganesh Muniganti · Dimension Leap, 2025</p>
          </div>
        </motion.section>

      </div>

      {/* ── Next project ───────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-6 text-center">
            Next Project
          </p>
          <Link href="/work/hobbiecue-ux-audit" className="block group max-w-lg mx-auto">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all bg-[var(--bg)]">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">UX Audit &amp; Design Systems</p>
                <p className="font-display font-bold text-xl text-[var(--text-primary)]">Hobbiecue UX Audit</p>
              </div>
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all group-hover:scale-110"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
