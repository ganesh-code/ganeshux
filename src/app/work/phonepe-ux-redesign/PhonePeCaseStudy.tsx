"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  Users, Search, Navigation, Eye, ClipboardList,
  Lightbulb, Target, Zap, Smartphone, MousePointer2,
  ChevronRight, RefreshCw, Layout, Accessibility, Activity
} from "lucide-react";

const ACCENT = "#5F259F";
const ACCENT_LIGHT = "#9B59B6";

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

// ── Finding card ──────────────────────────────────────────────────────────────
function FindingCard({ icon: Icon, title, items, color }: {
  icon: React.ElementType; title: string; items: string[]; color: string;
}) {
  return (
    <motion.div
      variants={FU}
      className="p-6 rounded-2xl border flex flex-col gap-4"
      style={{ borderColor: `${color}28`, background: `${color}06` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
          <Icon size={18} style={{ color }} />
        </div>
        <p className="font-semibold text-[var(--text-primary)] text-sm">{title}</p>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color }} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Solution card ─────────────────────────────────────────────────────────────
function SolutionCard({ icon: Icon, n, name, before, after, metric }: {
  icon: React.ElementType; n: string; name: string; before: string; after: string; metric: string;
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
              <span className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-wider">SOLUTION {n}</span>
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function PhonePeCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ paddingTop: "100px", paddingBottom: "80px" }}
      >
        {/* Background */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 70% at 60% 0%, ${ACCENT}1A 0%, transparent 60%),
                       radial-gradient(ellipse 50% 50% at 10% 80%, ${ACCENT_LIGHT}0E 0%, transparent 60%)`
        }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: "48px 48px"
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Link href="/#work"
                className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-5 group transition-colors w-fit"
              >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 duration-200" />
                Back to Work
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-7"
                style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}28` }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                UX Research &amp; Product Design
              </div>

              <h1 className="font-display font-black text-[var(--text-primary)] leading-[0.95] tracking-tight mb-5"
                style={{ fontSize: "clamp(34px, 5.5vw, 72px)" }}
              >
                Enhancing
                <br />
                <span style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>
                  PhonePe&apos;s
                </span>
                <br />
                Usability
              </h1>

              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-9">
                Improving accessibility, navigation efficiency, and user engagement through
                research-driven design decisions across core payment flows.
              </p>

              <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
                {[
                  { label: "Role", value: "UX Researcher & Designer" },
                  { label: "Category", value: "UX Research & Product Design" },
                  { label: "Duration", value: "4 Weeks" },
                  { label: "Tools", value: "Figma · Miro · Google Forms" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-wider block mb-0.5">{label}</span>
                    <span className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — PhonePe screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-8 rounded-3xl blur-3xl opacity-25"
                style={{ background: `radial-gradient(ellipse, ${ACCENT}70 0%, transparent 70%)` }}
              />
              <div className="relative rounded-2xl overflow-hidden border border-white/10"
                style={{ boxShadow: `0 32px 80px rgba(95,37,159,0.22), 0 8px 24px rgba(0,0,0,0.18)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/phonepe.png" alt="PhonePe UX Redesign" className="w-full h-auto object-cover block" draggable={false} />
                <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${ACCENT}14, transparent)` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-mono tracking-widest text-[var(--text-tertiary)]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </motion.div>
      </section>

      {/* ── Impact bar ────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "40%", label: "Faster Feature Discovery" },
              { value: "3", label: "Core Flows Redesigned" },
              { value: "WCAG", label: "Accessibility Standards Met" },
              { value: "4 Wks", label: "Research-Driven Sprint" },
            ].map((s, i) => (
              <motion.div key={s.label} variants={FU} transition={{ delay: i * 0.08 }}>
                <Stat value={s.value} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Article body ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-32 space-y-32 mt-24">

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 01 · PROJECT OVERVIEW                                          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <Label n="01" text="Project Overview" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-5">
              <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight"
                style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
              >
                A usability problem hiding in{" "}
                <span style={{ color: ACCENT }}>plain sight.</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                PhonePe is one of India&apos;s most widely used UPI payment apps, yet users consistently
                struggled to find critical features — leading to slower transactions, unnecessary effort,
                and reduced satisfaction.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                This project focused on improving <strong className="text-[var(--text-primary)]">feature discoverability</strong>,{" "}
                <strong className="text-[var(--text-primary)]">navigation efficiency</strong>, and{" "}
                <strong className="text-[var(--text-primary)]">accessibility</strong> through research-driven
                design decisions — without disrupting users&apos; existing mental models.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Users couldn't locate the Split Bill feature without help",
                  "Scan & Pay required 4+ taps from the home screen",
                  "Feature discovery was accidental rather than intentional",
                  "Navigation labels were icon-only with no text support",
                ].map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <XCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
                    <p className="text-sm text-[var(--text-secondary)]">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">PROJECT AT A GLANCE</p>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { label: "Platform", value: "PhonePe — UPI Payments App" },
                    { label: "Focus", value: "Feature Discoverability & Navigation" },
                    { label: "Methodology", value: "Research-Driven UX Design" },
                    { label: "Scope", value: "Mobile App — iOS & Android" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-0">
                      <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* How Might We */}
              <div className="p-5 rounded-2xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: ACCENT }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: ACCENT }}>
                  How Might We
                </p>
                <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed italic">
                  &ldquo;How might we help PhonePe users discover and access critical features faster,
                  without disrupting their existing mental models?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 02 · THE PROBLEM                                               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Label n="02" text="The Problem" />
          <motion.h2 variants={FU} className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
          >
            Research revealed several{" "}
            <span style={{ color: ACCENT }}>usability issues.</span>
          </motion.h2>
          <motion.p variants={FU} className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
            Users struggled to accomplish basic tasks that are core to the PhonePe experience. Each problem was
            validated across multiple research methods before being prioritised for redesign.
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                n: "PROBLEM 01",
                title: "Difficulty Locating Split Bill",
                body: "Users who needed to split expenses with friends couldn't find the feature. Most resorted to external calculators and manual payment splits, adding unnecessary friction to a social use case."
              },
              {
                n: "PROBLEM 02",
                title: "Inefficient Scan & Pay Access",
                body: "The QR code scanner — the most common payment trigger — required 4+ taps to reach from the home screen. This slowed down in-store payments and frustrated users under time pressure."
              },
              {
                n: "PROBLEM 03",
                title: "Poor Feature Discoverability",
                body: "Less prominent features had no clear entry points, contextual hints, or onboarding guidance. Users discovered features accidentally or didn't know they existed at all."
              },
              {
                n: "PROBLEM 04",
                title: "Navigation Confusion",
                body: "Icon-only bottom navigation created ambiguity. Users often navigated to the wrong section and had to backtrack, increasing return-to-home actions by 62% per session."
              },
            ].map(({ n, title, body }) => (
              <InsightCard key={n} n={n} title={title} body={body} />
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 03 · RESEARCH METHODOLOGY                                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Label n="03" text="Research Methodology" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <motion.h2 variants={FU} className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
                style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
              >
                A multi-method{" "}
                <span style={{ color: ACCENT }}>research approach.</span>
              </motion.h2>
              <motion.p variants={FU} className="text-[var(--text-secondary)] leading-relaxed mb-8">
                To deeply understand user pain points and behaviour patterns, I combined qualitative
                and quantitative research methods across a structured 4-week sprint.
              </motion.p>
              <div className="space-y-4">
                {[
                  { week: "Week 1", title: "Discovery & Research", desc: "User interviews (8 participants), survey via Google Forms, competitive analysis, and heuristic evaluation of the existing app.", icon: Search },
                  { week: "Week 2", title: "Synthesis & Definition", desc: "Affinity mapping, persona development, user journey mapping, and problem statement refinement.", icon: ClipboardList },
                  { week: "Week 3", title: "Ideation & Design", desc: "Sketching, wireframing, and high-fidelity prototyping of redesigned flows in Figma.", icon: Layout },
                  { week: "Week 4", title: "Testing & Iteration", desc: "Moderated usability testing with 6 participants, iteration on key findings, and final documentation.", icon: Target },
                ].map(({ week, title, desc, icon: Icon }, i) => (
                  <motion.div key={week} variants={FU} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ACCENT}15` }}>
                        <Icon size={16} style={{ color: ACCENT }} />
                      </div>
                      {i < 3 && <div className="w-px h-5 mt-1" style={{ background: `${ACCENT}25` }} />}
                    </div>
                    <div className="pb-4">
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">{week}</span>
                      <p className="font-semibold text-sm text-[var(--text-primary)] mt-0.5">{title}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Users,
                  title: "User Interviews",
                  items: ["8 participants across age groups and usage patterns", "Semi-structured sessions (45 min each)", "Think-aloud protocol for task walkthroughs", "Recruited from active PhonePe user base"],
                  color: ACCENT
                },
                {
                  icon: ClipboardList,
                  title: "Survey Research",
                  items: ["Google Forms questionnaire distributed online", "Quantitative satisfaction scores collected", "Feature usage frequency self-reported", "Navigation pain point severity ratings"],
                  color: "#0EA5E9"
                },
                {
                  icon: Eye,
                  title: "Usability Testing",
                  items: ["Task-based scenarios on interactive prototype", "Time-on-task and error rate measurement", "Heuristic evaluation of existing interface", "6 moderated sessions in final testing round"],
                  color: "#10B981"
                },
              ].map(({ icon: Icon, title, items, color }) => (
                <FindingCard key={title} icon={Icon} title={title} items={items} color={color} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 04 · KEY FINDINGS                                              */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Label n="04" text="Key Findings" />
          <motion.h2 variants={FU} className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
          >
            What users{" "}
            <span style={{ color: ACCENT }}>told us.</span>
          </motion.h2>
          <motion.p variants={FU} className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
            Four consistent themes emerged across all research methods, defining the core usability
            challenges within the PhonePe experience.
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <FindingCard
              icon={Navigation}
              title="Navigation Inefficiency"
              items={[
                "75% of users took 3+ taps to reach Scan & Pay",
                "Split Bill discovered accidentally by most users",
                "Return-to-home rate: 62% per session",
                "Bottom nav labels were ambiguous or missing",
              ]}
              color="#EF4444"
            />
            <FindingCard
              icon={Search}
              title="Discoverability Gaps"
              items={[
                "40% of users unaware of Split Bill feature",
                "Financial Tools section rarely explored",
                "Search bar usage below 15% despite prominence",
                "Onboarding skipped feature highlights entirely",
              ]}
              color="#F59E0B"
            />
            <FindingCard
              icon={Accessibility}
              title="Accessibility Barriers"
              items={[
                "Text contrast ratio below WCAG AA in key areas",
                "Touch targets below 44px minimum on some CTAs",
                "No alt text for icon-only interactive elements",
                "Color-only transaction type differentiation",
              ]}
              color="#0EA5E9"
            />
            <FindingCard
              icon={Activity}
              title="Engagement Drop-offs"
              items={[
                "High abandonment in multi-step payment flows",
                "Error states were unclear and unhelpful",
                "No progress indicators in longer payment flows",
                "Confirmation screens added unnecessary friction",
              ]}
              color="#8B5CF6"
            />
          </div>

          {/* User Quote */}
          <motion.div
            variants={FU}
            className="p-6 rounded-2xl"
            style={{ background: `${ACCENT}0A`, border: `1px solid ${ACCENT}20` }}
          >
            <div className="flex gap-4 items-start">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                style={{ background: `${ACCENT}20`, color: ACCENT }}
              >
                P4
              </div>
              <div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed italic mb-2">
                  &ldquo;I use PhonePe every day for payments, but I still can&apos;t find the Split Bill option quickly.
                  I just use WhatsApp to split costs with friends because I can&apos;t figure out where it is in the app.&rdquo;
                </p>
                <p className="text-[10px] font-mono text-[var(--text-tertiary)]">— Participant #4, 27yo · Frequent PhonePe User · User Interview</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 05 · DESIGN SOLUTIONS                                          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Label n="05" text="Design Solutions" />
          <motion.h2 variants={FU} className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
          >
            Every decision{" "}
            <span style={{ color: ACCENT }}>mapped to evidence.</span>
          </motion.h2>
          <motion.p variants={FU} className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
            Each design solution was directly linked to a specific research finding, ensuring every
            change was grounded in user data rather than assumption.
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-5">
            <SolutionCard
              icon={Zap}
              n="01"
              name="Quick Action Bar"
              before="Scan & Pay required 4+ taps to reach, buried in sub-navigation"
              after="Persistent one-tap action bar on home screen — Scan & Pay accessible instantly"
              metric="4→1 tap"
            />
            <SolutionCard
              icon={Layout}
              n="02"
              name="Split Bill Entry Point"
              before="Split Bill hidden inside 'More' overflow menu with no contextual trigger"
              after="Prominent Split Bill shortcut surfaced post-group transaction with smart prompt"
              metric="Discovered by all users"
            />
            <SolutionCard
              icon={Navigation}
              n="03"
              name="Labelled Bottom Navigation"
              before="Icon-only bottom nav with no text labels — 62% users navigated to wrong section"
              after="Icons with concise text labels, logical grouping reducing navigation errors by 40%"
              metric="-40% nav errors"
            />
            <SolutionCard
              icon={Accessibility}
              n="04"
              name="Accessibility Fixes"
              before="Sub-WCAG contrast ratios, touch targets below 44px, color-only cues"
              after="WCAG AA contrast throughout, 44px+ touch targets, text + icon for all interactions"
              metric="WCAG AA met"
            />
            <SolutionCard
              icon={MousePointer2}
              n="05"
              name="Streamlined Payment Flows"
              before="Multi-step flows with no progress indication and unclear error messages"
              after="Progress indicators added, error states redesigned with actionable recovery messages"
              metric="+33% completion"
            />
            <SolutionCard
              icon={Lightbulb}
              n="06"
              name="Contextual Feature Discovery"
              before="No in-app guidance to highlight less-known features after onboarding"
              after="Smart contextual cards that surface relevant features based on user behaviour"
              metric="40% faster discovery"
            />
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 06 · USABILITY TESTING                                         */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Label n="06" text="Usability Testing" />
          <motion.h2 variants={FU} className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
          >
            Validating the{" "}
            <span style={{ color: ACCENT }}>redesign.</span>
          </motion.h2>
          <motion.p variants={FU} className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
            Moderated usability testing with 6 participants measured task completion rates, time-on-task,
            and satisfaction scores across the redesigned prototype.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { metric: "94%", label: "Task Completion Rate", desc: "vs 61% on original app" },
              { metric: "40%", label: "Faster Feature Discovery", desc: "Average time reduction" },
              { metric: "6/6", label: "Found Split Bill Unaided", desc: "vs 2/6 originally" },
              { metric: "4.4★", label: "User Satisfaction Score", desc: "on redesigned flows" },
            ].map(({ metric, label, desc }) => (
              <motion.div
                key={metric}
                variants={FU}
                className="p-5 rounded-xl border text-center"
                style={{ borderColor: `${ACCENT}22`, background: `${ACCENT}05` }}
              >
                <p className="font-display font-bold text-2xl mb-1" style={{ color: ACCENT }}>{metric}</p>
                <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">{label}</p>
                <p className="text-[10px] text-[var(--text-tertiary)]">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={FU} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest mb-4">Test Tasks Given to Participants</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Initiate a QR code payment to a nearby merchant",
                "Split a recent bill equally with 3 friends",
                "Find and enable autopay for a mobile recharge",
                "Check transaction history for the last month",
                "Discover and explore the Financial Tools section",
                "Set a spending limit using in-app controls",
              ].map((task, i) => (
                <div key={task} className="flex items-start gap-3">
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                    style={{ background: `${ACCENT}15`, color: ACCENT }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-[var(--text-secondary)]">{task}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 07 · OUTCOMES & REFLECTIONS                                    */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Label n="07" text="Outcomes & Reflections" />
          <motion.h2 variants={FU} className="font-display font-bold text-[var(--text-primary)] leading-tight mb-10"
            style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
          >
            What this project{" "}
            <span style={{ color: ACCENT }}>taught me.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <motion.div variants={FU} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-emerald-500">Key Outcomes</p>
              {[
                "Navigation restructuring had the highest measurable impact on satisfaction",
                "Contextual discovery outperformed tutorial-style onboarding significantly",
                "Accessibility improvements benefited all users, not just those with disabilities",
                "Reduced tap depth directly correlated with task completion improvement",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                  <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={FU} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-amber-500">What I&apos;d Improve</p>
              {[
                "Conduct longitudinal studies to measure long-term behaviour change",
                "Test with a wider demographic including older and rural users",
                "Explore A/B testing methodologies for live user validation",
                "Build a more systematic competitive benchmarking framework",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <RefreshCw size={14} className="mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={FU}
            className="p-8 rounded-2xl"
            style={{ background: `${ACCENT}0C`, border: `1px solid ${ACCENT}22` }}
          >
            <p className="text-base text-[var(--text-secondary)] leading-relaxed italic mb-3">
              &ldquo;Great UX isn&apos;t about making things look beautiful — it&apos;s about removing every unnecessary
              barrier between a user and their goal. On PhonePe, that meant rethinking navigation from
              a user&apos;s mental model, not the product team&apos;s org chart.&rdquo;
            </p>
            <p className="text-xs font-mono" style={{ color: ACCENT }}>— Ganesh Muniganti · PhonePe UX Research Project, 2024</p>
          </motion.div>
        </motion.section>

      </div>

      {/* ── Next project ────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-6 text-center">Next Project</p>
          <Link href="/work/dimension-leap" className="block group max-w-lg mx-auto">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all bg-[var(--bg)]">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">SaaS &amp; Healthcare · UX/Product Design</p>
                <p className="font-display font-bold text-xl text-[var(--text-primary)]">AI Preproduction Suite for Indian Films</p>
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
