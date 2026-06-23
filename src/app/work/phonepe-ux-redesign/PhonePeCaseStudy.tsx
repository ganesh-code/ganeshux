"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Search, Navigation, Users, Eye,
  CheckCircle2, AlertTriangle, Lightbulb, BarChart2,
  Smartphone, MousePointer2, Zap, Target, TrendingUp,
  FileText, MessageSquare, ChevronRight, Star, RefreshCw,
  ClipboardList, Activity, Layout, Accessibility
} from "lucide-react";

const ACCENT = "#5F259F";
const ACCENT2 = "#9B59B6";
const ACCENT_LIGHT = "#E8D5F5";

const FU = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function SectionLabel({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[11px] font-mono font-bold text-[var(--text-tertiary)] tracking-[0.2em]">{n}</span>
      <div className="h-px flex-1 bg-[var(--border)]" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>{text}</span>
    </div>
  );
}

function Stat({ value, label, color = ACCENT }: { value: string; label: string; color?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display font-bold leading-none" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color }}>
        {value}
      </span>
      <span className="text-xs text-[var(--text-secondary)] leading-snug">{label}</span>
    </div>
  );
}

function InsightCard({ icon: Icon, title, items, color = ACCENT }: {
  icon: React.ElementType; title: string; items: string[]; color?: string;
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

function ProblemCard({ title, desc, severity }: { title: string; desc: string; severity: "high" | "medium" }) {
  const color = severity === "high" ? "#EF4444" : "#F59E0B";
  return (
    <motion.div
      variants={FU}
      className="p-5 rounded-xl border flex gap-4"
      style={{ borderColor: `${color}28`, background: `${color}06` }}
    >
      <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color }} />
      <div>
        <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">{title}</p>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function SolutionCard({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <motion.div
      variants={FU}
      className="p-6 rounded-2xl border flex flex-col gap-3"
      style={{ borderColor: `${ACCENT}22`, background: `${ACCENT}05` }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}15` }}>
        <Icon size={20} style={{ color: ACCENT }} />
      </div>
      <p className="font-semibold text-[var(--text-primary)] text-sm">{title}</p>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function PhonePeCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const overviewRef = useRef(null);
  const problemRef = useRef(null);
  const researchRef = useRef(null);
  const findingsRef = useRef(null);
  const solutionsRef = useRef(null);
  const testingRef = useRef(null);
  const outcomeRef = useRef(null);

  const isOverviewInView = useInView(overviewRef, { once: true, amount: 0.15 });
  const isProblemInView = useInView(problemRef, { once: true, amount: 0.15 });
  const isResearchInView = useInView(researchRef, { once: true, amount: 0.15 });
  const isFindingsInView = useInView(findingsRef, { once: true, amount: 0.15 });
  const isSolutionsInView = useInView(solutionsRef, { once: true, amount: 0.15 });
  const isTestingInView = useInView(testingRef, { once: true, amount: 0.15 });
  const isOutcomeInView = useInView(outcomeRef, { once: true, amount: 0.15 });

  return (
    <>
      {/* ── Back Button ─────────────────────────────────────────────────────── */}
      <Link
        href="/#work"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}22 0%, ${ACCENT}0A 50%, transparent 100%)`,
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle, ${ACCENT} 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          {/* PhonePe hero image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/phonepe.png"
            alt="PhonePe UX Redesign"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 pt-36 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                UX Research &amp; Product Design
              </span>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">4 Weeks · 2024</span>
            </div>

            <h1
              className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
              style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
            >
              Enhancing PhonePe&apos;s Usability
            </h1>
            <p
              className="font-display text-[var(--text-secondary)] leading-snug mb-8 max-w-2xl"
              style={{ fontSize: "clamp(16px, 2vw, 22px)" }}
            >
              Improving Accessibility, Navigation &amp; User Engagement
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: "Role", value: "UX Researcher & Designer" },
                { label: "Duration", value: "4 Weeks" },
                { label: "Tools", value: "Figma · Miro · Google Forms" },
                { label: "Category", value: "UX Research & Product Design" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">{label}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Bar ──────────────────────────────────────────────────────── */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <Stat value="40%" label="Faster Feature Discovery" />
            <Stat value="3" label="Core Flows Redesigned" color={ACCENT2} />
            <Stat value="WCAG" label="Accessibility Standards Met" />
            <Stat value="4 Wks" label="Research-Driven Sprint" color={ACCENT2} />
          </motion.div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">

        {/* ─── 01 PROJECT OVERVIEW ─────────────────────────────────────────── */}
        <motion.section
          ref={overviewRef}
          initial="hidden"
          animate={isOverviewInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel n="01" text="Project Overview" />
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div variants={FU} className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                Understanding the Challenge
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                PhonePe users face challenges discovering critical features quickly, leading to slower
                transactions, unnecessary effort, and reduced usability. This project focused on improving
                feature discoverability, accessibility, navigation efficiency, and overall user experience
                through research-driven design decisions.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The redesign explored how users interact with core features such as <strong className="text-[var(--text-primary)]">Scan &amp; Pay</strong>,{" "}
                <strong className="text-[var(--text-primary)]">Split Bill</strong>, and feature discovery
                mechanisms across the platform.
              </p>
            </motion.div>

            <motion.div variants={FU} className="space-y-3">
              {[
                { label: "Platform", value: "PhonePe (UPI Payments App)" },
                { label: "Focus Area", value: "Feature Discoverability & Navigation" },
                { label: "Methodology", value: "Research-Driven UX Design" },
                { label: "Scope", value: "Mobile App — iOS & Android" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-3 border-b border-[var(--border)]">
                  <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wide">{label}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ─── 02 THE PROBLEM ──────────────────────────────────────────────── */}
        <motion.section
          ref={problemRef}
          initial="hidden"
          animate={isProblemInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel n="02" text="The Problem" />
          <motion.div variants={FU} className="mb-8">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              Research Revealed Several Usability Issues
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Research revealed several usability issues within the existing PhonePe experience that hindered
              users from completing their goals efficiently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <ProblemCard
              title="Difficulty Locating Split Bill"
              desc="Users struggled to find the Split Bill feature, often resorting to manual calculations and separate payment flows."
              severity="high"
            />
            <ProblemCard
              title="Inefficient Scan & Pay Access"
              desc="The QR scanner was buried multiple taps deep, creating friction in the most common payment flow."
              severity="high"
            />
            <ProblemCard
              title="Poor Feature Discoverability"
              desc="New and infrequently used features had no clear entry points or contextual hints for users."
              severity="medium"
            />
            <ProblemCard
              title="Navigation Confusion"
              desc="Users couldn't efficiently navigate between primary features, leading to increased return-to-home actions."
              severity="medium"
            />
          </div>

          {/* How Might We */}
          <motion.div
            variants={FU}
            className="p-8 rounded-2xl border-l-4 bg-[var(--bg-subtle)]"
            style={{ borderLeftColor: ACCENT }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: ACCENT }}>
              How Might We
            </p>
            <p className="font-display text-lg font-semibold text-[var(--text-primary)] leading-relaxed">
              &ldquo;How might we help PhonePe users discover and access critical features faster,
              without disrupting their existing mental models?&rdquo;
            </p>
          </motion.div>
        </motion.section>

        {/* ─── 03 RESEARCH METHODOLOGY ─────────────────────────────────────── */}
        <motion.section
          ref={researchRef}
          initial="hidden"
          animate={isResearchInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <SectionLabel n="03" text="Research Methodology" />
          <motion.div variants={FU} className="mb-8">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              A Multi-Method Research Approach
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              To deeply understand user pain points and behaviors, I employed a combination of qualitative
              and quantitative research methods over two weeks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <InsightCard
              icon={Users}
              title="User Interviews"
              items={[
                "8 participants across demographics",
                "Semi-structured sessions (45 min each)",
                "Think-aloud protocol",
                "Task-based scenarios",
              ]}
            />
            <InsightCard
              icon={ClipboardList}
              title="Survey Research"
              items={[
                "Google Forms questionnaire",
                "Quantitative satisfaction data",
                "Feature usage frequency",
                "Navigation pain point ratings",
              ]}
            />
            <InsightCard
              icon={Eye}
              title="Usability Testing"
              items={[
                "Task completion rate analysis",
                "Time-on-task measurement",
                "Error rate tracking",
                "Heuristic evaluation",
              ]}
            />
          </div>

          {/* Research Process Timeline */}
          <motion.div variants={FU} className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-4">Research Timeline</p>
            {[
              { week: "Week 1", title: "Discovery & Research", desc: "User interviews, surveys, competitive analysis, and heuristic evaluation of the existing app." },
              { week: "Week 2", title: "Synthesis & Definition", desc: "Affinity mapping, persona development, journey mapping, and problem statement refinement." },
              { week: "Week 3", title: "Ideation & Design", desc: "Sketching, wireframing, and high-fidelity prototyping of redesigned flows in Figma." },
              { week: "Week 4", title: "Testing & Iteration", desc: "Usability testing with 6 participants, iteration on findings, and final design documentation." },
            ].map(({ week, title, desc }, i) => (
              <div key={week} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: `${ACCENT}15`, color: ACCENT }}
                  >
                    {i + 1}
                  </div>
                  {i < 3 && <div className="w-px h-6 mt-1" style={{ background: `${ACCENT}25` }} />}
                </div>
                <div className="pb-4">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest">{week}</span>
                  <p className="font-semibold text-sm text-[var(--text-primary)] mt-0.5">{title}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── 04 KEY FINDINGS ─────────────────────────────────────────────── */}
        <motion.section
          ref={findingsRef}
          initial="hidden"
          animate={isFindingsInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel n="04" text="Key Findings" />
          <motion.div variants={FU} className="mb-8">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              What Users Told Us
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Across all research methods, three consistent themes emerged that defined the core usability
              challenges within the PhonePe app.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <InsightCard
              icon={Navigation}
              title="Navigation Inefficiency"
              items={[
                "75% of users took 3+ taps to reach Scan & Pay",
                "Split Bill discovered accidentally by most users",
                "Return-to-home rate was 62% per session",
                "Bottom nav labels were ambiguous",
              ]}
              color="#EF4444"
            />
            <InsightCard
              icon={Search}
              title="Discoverability Gaps"
              items={[
                "40% of users unaware of Split Bill feature",
                "Financial Tools section rarely explored",
                "Search bar underutilized (< 15% usage)",
                "Onboarding flow skipped feature highlights",
              ]}
              color="#F59E0B"
            />
            <InsightCard
              icon={Accessibility}
              title="Accessibility Barriers"
              items={[
                "Text contrast ratio below WCAG AA in key areas",
                "Touch targets below 44px minimum in some CTA areas",
                "No alternative text for icon-only buttons",
                "Color-only differentiation for transaction types",
              ]}
              color="#0EA5E9"
            />
            <InsightCard
              icon={Activity}
              title="Engagement Drop-offs"
              items={[
                "High abandonment in multi-step flows",
                "Confirmation screens added unnecessary friction",
                "Error states unclear and unhelpful",
                "No progress indicators in longer flows",
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
                U1
              </div>
              <div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed italic mb-2">
                  &ldquo;I use PhonePe every day for payments, but I still can&apos;t find the Split Bill option quickly. I just use WhatsApp to split costs with friends because I can&apos;t figure out where it is in the app.&rdquo;
                </p>
                <p className="text-[10px] font-mono text-[var(--text-tertiary)]">— Participant #4, 27yo, Frequent PhonePe User</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── 05 DESIGN SOLUTIONS ─────────────────────────────────────────── */}
        <motion.section
          ref={solutionsRef}
          initial="hidden"
          animate={isSolutionsInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel n="05" text="Design Solutions" />
          <motion.div variants={FU} className="mb-8">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              Research-Driven Redesign
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Each design solution was directly mapped to a specific research finding, ensuring every
              decision was grounded in evidence rather than assumption.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            <SolutionCard
              icon={Zap}
              title="Quick Action Bar"
              desc="Surfaced Scan & Pay, Send Money, and Pay Bills into a persistent, one-tap action bar visible from the home screen — eliminating multi-step navigation."
            />
            <SolutionCard
              icon={Layout}
              title="Contextual Feature Discovery"
              desc="Introduced smart contextual cards that suggest Split Bill after group payments, and relevant features based on user behaviour patterns."
            />
            <SolutionCard
              icon={Navigation}
              title="Simplified Navigation Architecture"
              desc="Redesigned the bottom navigation with clear, labelled icons and grouped features logically — reducing cognitive load and navigation errors."
            />
            <SolutionCard
              icon={Accessibility}
              title="Accessibility Improvements"
              desc="Met WCAG AA contrast ratios, increased touch targets to 44px minimum, added descriptive labels to icon buttons, and removed color-only cues."
            />
            <SolutionCard
              icon={MousePointer2}
              title="Streamlined Core Flows"
              desc="Reduced Scan & Pay from 4+ taps to 2, streamlined the Split Bill flow with a clear entry point, and added progress indicators to multi-step flows."
            />
            <SolutionCard
              icon={Target}
              title="Improved Onboarding"
              desc="Redesigned the feature discovery onboarding to highlight hidden features contextually, with opt-in tooltip tours for new capabilities."
            />
          </div>

          {/* PhonePe mockup display */}
          <motion.div
            variants={FU}
            className="rounded-2xl overflow-hidden border border-[var(--border)] relative"
            style={{ background: `${ACCENT}08` }}
          >
            <div className="p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: ACCENT }}>
                Design Reference
              </p>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">
                    Before &amp; After: Navigation Redesign
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Before", items: ["Scan & Pay: 4 taps", "Split Bill: Hidden in more menu", "Navigation labels: Icon-only", "Home screen: Cluttered grid"] },
                      { label: "After", items: ["Scan & Pay: 1 tap from home", "Split Bill: Prominent in payments", "Navigation: Icons + labels", "Home screen: Priority hierarchy"] },
                    ].map(({ label, items }) => (
                      <div key={label}>
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                          style={{
                            background: label === "After" ? `${ACCENT}18` : "#EF444415",
                            color: label === "After" ? ACCENT : "#EF4444",
                          }}
                        >
                          {label}
                        </span>
                        <ul className="mt-2 space-y-1">
                          {items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                              {label === "After"
                                ? <CheckCircle2 size={14} style={{ color: ACCENT }} />
                                : <AlertTriangle size={14} className="text-red-400" />
                              }
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="rounded-xl overflow-hidden border"
                  style={{ borderColor: `${ACCENT}25` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/phonepe.png"
                    alt="PhonePe redesign mockup"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── 06 USABILITY TESTING ────────────────────────────────────────── */}
        <motion.section
          ref={testingRef}
          initial="hidden"
          animate={isTestingInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel n="06" text="Usability Testing" />
          <motion.div variants={FU} className="mb-8">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              Validating the Design
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Conducted moderated usability testing with 6 participants across the redesigned prototype,
              measuring task completion, time-on-task, and satisfaction scores.
            </p>
          </motion.div>

          {/* Test Results */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { metric: "94%", label: "Task Completion Rate", desc: "vs 61% in original" },
              { metric: "40%", label: "Faster Feature Discovery", desc: "Avg time reduction" },
              { metric: "6/6", label: "Participants Found Split Bill", desc: "vs 2/6 originally" },
              { metric: "4.4★", label: "Satisfaction Score", desc: "on redesigned flows" },
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

          {/* Testing tasks */}
          <motion.div variants={FU} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-4">Test Tasks</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Initiate a QR code payment to a nearby merchant",
                "Split a recent bill equally with 3 friends",
                "Find and enable the autopay feature for a recharge",
                "Check transaction history for last month",
                "Discover and explore the Financial Tools section",
                "Set a spending limit using the in-app controls",
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

        {/* ─── 07 OUTCOMES & REFLECTIONS ───────────────────────────────────── */}
        <motion.section
          ref={outcomeRef}
          initial="hidden"
          animate={isOutcomeInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel n="07" text="Outcomes & Reflections" />
          <motion.div variants={FU} className="mb-8">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-3">
              What This Project Taught Me
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <motion.div variants={FU} className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-emerald-500">Key Outcomes</p>
              {[
                "Navigation restructuring had the highest positive impact on user satisfaction",
                "Contextual feature discovery proved more effective than onboarding tutorials",
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
                "Explore A/B testing methodologies with live user data",
                "Build a more systematic approach to competitive benchmarking",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <RefreshCw size={14} className="mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Closing quote */}
          <motion.div
            variants={FU}
            className="p-8 rounded-2xl"
            style={{ background: `${ACCENT}0C`, border: `1px solid ${ACCENT}22` }}
          >
            <p className="text-base text-[var(--text-secondary)] leading-relaxed italic mb-3">
              &ldquo;Great UX isn&apos;t about making things look beautiful — it&apos;s about removing
              every unnecessary barrier between a user and their goal. On PhonePe, that meant rethinking
              the navigation from a user&apos;s mental model, not the product team&apos;s org chart.&rdquo;
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
