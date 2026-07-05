"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  Users, Heart, Pill, Building2, Shield, Smartphone, Monitor,
  ChevronRight, Star, GitBranch, FileText, MessageSquare,
  Zap, TrendingUp, Target, RefreshCw, Code,
  Lightbulb, BarChart3, ArrowUpRight, Layers, PenTool, Layout
} from "lucide-react";
import CaseStudyTOC from "@/components/ui/CaseStudyTOC";

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

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════ */}
      {/* COVER — Notion-style full-width banner                       */}
      {/* ══════════════════════════════════════════════════════════════ */}

      <div
        id="hc-hero"
        className="relative w-full overflow-hidden bg-[#F8F9FA] dark:bg-[#1C1D1F] border-b border-[var(--border)]"
        style={{ height: "clamp(220px, 42vh, 440px)", marginTop: "64px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Healthcare Project/bannerHealthcareproject.png"
          alt="Unified Healthcare Platform"
          className="w-full h-full object-contain object-center"
          draggable={false}
        />
        {/* Floating back button on banner, aligned with page content margin */}
        <div className="absolute inset-0 max-w-5xl mx-auto px-6 pointer-events-none">
          <div className="relative w-full h-full">
            <Link
              href="/#work"
              className="absolute top-4 left-0 inline-flex items-center gap-1.5 group transition-all duration-200 pointer-events-auto z-10"
              style={{
                background: "rgba(0,0,0,0.42)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "rgba(255,255,255,0.92)",
                fontSize: "13px",
                padding: "6px 14px 6px 10px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1 duration-200" />
              Back to Work
            </Link>
          </div>
        </div>
      </div>

      {/* Page title block — below the cover */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-display font-black text-[var(--text-primary)] leading-[1.15] tracking-tight mb-5"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            How I helped transform a single aesthetic clinic booking app into a multi-clinic healthcare platform
          </h1>

          <p
            className="text-[var(--text-secondary)] leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
          >
            What began as a patient booking application evolved into a multi-product platform for aesthetic clinics. Along the way, the biggest product decision wasn&apos;t whether to use AI—it was deciding where AI genuinely belonged.
          </p>
        </motion.div>
      </div>



      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PROJECT OVERVIEW                                              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-overview" className="max-w-5xl mx-auto px-6 mb-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
          <p className="text-[10px] font-mono font-bold tracking-widest mb-5 text-[var(--text-tertiary)]">
            PROJECT OVERVIEW
          </p>
          <div className="rounded-[20px] border border-[var(--border)] bg-[var(--bg-subtle)] p-8 md:p-10">
            {/* Main meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8 mb-8 pb-8 border-b border-[var(--border)]">
              {[
                { label: "Role",         value: "Associate UX / Product Designer" },
                { label: "Company",      value: "Dimension Leap" },
                { label: "Timeline",     value: "12 Months" },
                { label: "Team",         value: "PM · Frontend · Backend · QA · Client" },
                { label: "Platform",     value: "Mobile & Web" },
                { label: "Industry",     value: "Aesthetic Healthcare SaaS" },
                { label: "Products",     value: "Patient · Doctor · Clinic · Pharmacy · Admin" },
                { label: "Deliverables", value: "Design System · Product Design · Engineering Handoff" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="text-[9px] font-mono font-bold tracking-widest block mb-1.5 text-[var(--text-tertiary)]">
                    {label.toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{value}</span>
                </div>
              ))}
            </div>

            {/* Core Challenge — full width callout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
              <span className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-tertiary)] shrink-0 pt-0.5">
                CORE CHALLENGE
              </span>
              <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                Transform a single-clinic booking app into a scalable multi-clinic platform while integrating AI without disrupting familiar healthcare workflows.
              </p>
            </div>
          </div>
        </motion.div>
      </section>



      {/* ══════════════════════════════════════════════════════════════ */}
      {/* THE BUSINESS OPPORTUNITY                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-opportunity" className="max-w-5xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
          <SectionLabel n="01" text="The Business Opportunity" />

          <h2 className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
            It started as a booking app.<br />It became a platform.
          </h2>

          <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-14">
            Tamira Aesthetic Clinic initially approached us to build a patient booking application. As we explored the business and operational workflows, we realized the problem extended far beyond appointment scheduling. Instead of solving it for a single clinic, the product evolved into a platform that could support multiple aesthetic clinics under one connected ecosystem.
          </p>

          {/* Scope evolution visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-4" style={{ color: RED }}>ORIGINAL REQUEST</p>
              <p className="text-lg font-display font-bold text-[var(--text-primary)] mb-3">
                &ldquo;Build a patient booking app for our clinic.&rdquo;
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Designed for one clinic, one patient journey, and one operational workflow.
              </p>
            </div>
            <div className="p-6 rounded-2xl border" style={{ borderColor: `${EMERALD}30`, background: `${EMERALD}06` }}>
              <p className="text-[10px] font-mono font-bold tracking-widest mb-4" style={{ color: EMERALD }}>WHAT WE ACTUALLY BUILT</p>
              <p className="text-lg font-display font-bold text-[var(--text-primary)] mb-3">
                A connected platform for aesthetic clinics with shared patient data, clinic operations, pharmacy management, and AI-assisted healthcare workflows.
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Multi-clinic scaling. Five integrated user portals. One unified data layer.
              </p>
            </div>
          </div>

          {/* Five portals */}
          <p className="text-[10px] font-mono font-bold tracking-widest mb-2 text-[var(--text-tertiary)]">THE FIVE PRODUCTS</p>
          <p className="text-base font-semibold text-[var(--text-primary)] mb-6">
            One platform. Five products. One shared source of truth.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-14">
            {[
              { icon: Smartphone,  label: "Patient App",   sub: "Mobile",  color: ACCENT  },
              { icon: Monitor,     label: "Doctor Portal", sub: "Web",     color: ACCENT2 },
              { icon: Building2,   label: "Clinic Portal", sub: "Web",     color: EMERALD },
              { icon: Pill,        label: "Pharmacy",      sub: "Web",     color: AMBER   },
              { icon: Shield,      label: "Admin Panel",   sub: "Web",     color: RED     },
            ].map(({ icon: Icon, label, sub, color }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] text-center">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug">{label}</p>
                <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{sub}</p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div className="border-l-2 pl-6 py-2" style={{ borderColor: ACCENT }}>
            <p className="text-xl font-display font-semibold text-[var(--text-primary)] leading-snug italic mb-2">
              &ldquo;The scope expansion wasn&apos;t scope creep — it was a better problem definition.&rdquo;
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              A single-clinic app would have solved one customer&apos;s problem. Expanding it into a platform created a foundation that could support many clinics using the same system. That decision influenced every product and UX decision that followed.
            </p>
          </div>
        </motion.div>
      </section>


      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BUILDING THE PRODUCT FOUNDATION                               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-foundation" className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <SectionLabel n="02" text="Building the Foundation" />

            <h2 className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              Before designing features,<br />I built the infrastructure.
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-10">
              The product was expected to grow across multiple products and engineering teams, but there was no shared design foundation. Before shipping new features, I paused feature work and established a design system that every product could build upon.
            </p>

            {/* Product Decision Callout — WHY I paused */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 mb-14">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-4 text-[var(--text-tertiary)]">PRODUCT DECISION</p>
              <div className="space-y-3">
                {[
                  { label: "The ask",      text: "PMs wanted to continue designing new screens immediately." },
                  { label: "My call",      text: "I recommended pausing feature work for two weeks to build a shared design foundation first." },
                  { label: "The reason",   text: "Without shared tokens and components, every new sprint would multiply inconsistency across five connected products." },
                  { label: "The outcome",  text: "The short-term delay prevented long-term design debt across 300+ screens." },
                ].map(({ label, text }) => (
                  <div key={label} className="flex gap-4">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-tertiary)] shrink-0 pt-0.5 w-20 uppercase">{label}</span>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After — categorized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {/* BEFORE */}
              <div className="p-6 rounded-2xl border" style={{ borderColor: `${RED}25`, background: `${RED}05` }}>
                <p className="text-[10px] font-mono font-bold tracking-widest mb-5" style={{ color: RED }}>WHEN I JOINED</p>
                <div className="space-y-5">
                  {[
                    { category: "Design",      items: ["No design system", "No reusable components", "No interaction patterns"] },
                    { category: "Engineering", items: ["No design tokens", "No handoff documentation"] },
                    { category: "Product",     items: ["Screens evolved independently"] },
                  ].map(({ category, items }) => (
                    <div key={category}>
                      <p className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-tertiary)] mb-2 uppercase">{category}</p>
                      <div className="space-y-1.5">
                        {items.map((item) => (
                          <div key={item} className="flex items-center gap-3">
                            <XCircle size={13} className="text-red-400 shrink-0" />
                            <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AFTER */}
              <div className="p-6 rounded-2xl border" style={{ borderColor: `${EMERALD}25`, background: `${EMERALD}05` }}>
                <p className="text-[10px] font-mono font-bold tracking-widest mb-5" style={{ color: EMERALD }}>WHAT I BUILT IN 2 WEEKS</p>
                <div className="space-y-2.5">
                  {[
                    "Design tokens — color, spacing, radius, type",
                    "Typography scale across all breakpoints",
                    "Color system — semantic · brand · status",
                    "Spacing & grid — responsive layout rules",
                    "Component library — buttons, inputs, cards, modals",
                    "Interaction patterns — documented for devs",
                    "Developer documentation & handoff guide",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={13} style={{ color: EMERALD }} className="shrink-0" />
                      <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2-Week Timeline */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 mb-12">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-5 text-[var(--text-tertiary)]">FOUNDATION TIMELINE</p>
              <div className="flex flex-col sm:flex-row gap-0">
                {[
                  { week: "Week 1", items: ["Design tokens", "Typography & color", "Spacing & grid"] },
                  { week: "Week 2", items: ["Component library", "Interaction patterns", "Dev documentation"] },
                  { week: "Week 3+", items: ["Feature design begins", "300+ screens shipped", "5 products built on same system"] },
                ].map(({ week, items }, i) => (
                  <div key={week} className="flex-1 flex flex-col sm:flex-row">
                    <div className="flex-1 pb-4 sm:pb-0 sm:pr-4">
                      <p className="text-[10px] font-mono font-bold tracking-widest mb-3" style={{ color: i === 2 ? EMERALD : ACCENT }}>{week}</p>
                      <div className="space-y-1.5">
                        {items.map((item) => (
                          <p key={item} className="text-xs text-[var(--text-secondary)]">↓ {item}</p>
                        ))}
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="hidden sm:flex items-center px-3">
                        <ChevronRight size={14} className="text-[var(--text-tertiary)]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Why it mattered — stronger card titles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              {[
                {
                  icon: Layers,
                  title: "One change updated five products",
                  body: "Design tokens meant a single update propagated across every product. No more manually fixing the same issue in five separate files.",
                  color: ACCENT,
                },
                {
                  icon: Code,
                  title: "Developers stopped rebuilding UI",
                  body: "Developers referenced components rather than re-inspecting designs screen by screen. Handoff moved from 'what does this look like?' to 'which component is this?'",
                  color: ACCENT2,
                },
                {
                  icon: RefreshCw,
                  title: "We prevented inconsistency before it existed",
                  body: "Building the system first avoided the most common 0→1 mistake: shipping fast, then spending months undoing the inconsistency that speed created.",
                  color: EMERALD,
                },
              ].map(({ icon: Icon, title, body, color }) => (
                <div key={title} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)] mb-2">{title}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Callout — punchier */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: `${ACCENT}25`, background: `${ACCENT}06` }}>
              <p className="text-[10px] font-mono font-bold tracking-widest mb-2" style={{ color: ACCENT }}>CALLOUT</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                <span className="font-semibold text-[var(--text-primary)]">A design system isn&apos;t a UI library — it&apos;s product infrastructure.</span>{" "}
                Investing two weeks upfront saved months of inconsistency across five connected products.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════ */}
      {/* DECISION #1 — WHERE AI ACTUALLY BELONGS                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-ai" className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <SectionLabel n="03" text="Decision Story #1" />

            <h2 className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              We almost made AI<br />the entire product.
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-14">
              The client wanted AI to differentiate the product, but they also wanted users to recognize it as a familiar healthcare app. Our first concept made AI the primary entry point. Users would open directly into an AI conversation before browsing doctors or services. Although innovative, the client felt it disrupted expectations. That feedback changed how we approached AI across the entire platform.
            </p>

            {/* V1 vs V2 User Journey */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 mb-14">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-5 text-[var(--text-tertiary)]">USER JOURNEY — VERSION 1 vs VERSION 2</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[9px] font-mono font-bold tracking-widest mb-4" style={{ color: RED }}>VERSION 1 — REJECTED</p>
                  <div className="space-y-2">
                    {["Open App", "AI Chat", "Describe symptoms / needs", "Get doctor recommendations", "Booking"].map((step, i, arr) => (
                      <div key={step}>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: `${RED}20`, color: RED }}>{i + 1}</div>
                          <p className="text-xs font-medium text-[var(--text-primary)]">{step}</p>
                        </div>
                        {i < arr.length - 1 && <div className="ml-2.5 w-px h-3 bg-[var(--border)] ml-[9px] mt-1" />}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-mono font-bold tracking-widest mb-4" style={{ color: EMERALD }}>VERSION 2 — SHIPPED</p>
                  <div className="space-y-2">
                    {["Home / Browse", "Services · Doctors · Clinics", "Doctor Profile", "Booking", "AI assists when needed"].map((step, i, arr) => (
                      <div key={step}>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0" style={{ background: `${EMERALD}20`, color: EMERALD }}>{i + 1}</div>
                          <p className="text-xs font-medium text-[var(--text-primary)]">{step}</p>
                        </div>
                        {i < arr.length - 1 && <div className="w-px h-3 bg-[var(--border)] ml-[9px] mt-1" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* The two approaches side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
              <div className="p-6 rounded-2xl border" style={{ borderColor: `${RED}25`, background: `${RED}05` }}>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle size={14} className="text-red-400" />
                  <p className="text-[10px] font-mono font-bold tracking-widest" style={{ color: RED }}>FIRST PROPOSAL — REJECTED</p>
                </div>
                <p className="text-base font-display font-bold text-[var(--text-primary)] mb-3">AI-first onboarding.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Open the app → AI chatbot. Describe needs. Get doctor recommendations. Book from there.
                </p>
                <div className="space-y-2">
                  {[
                    "Users expected to browse first",
                    "AI interrupted a familiar journey",
                    "Trust wasn't established yet",
                    "The experience felt unfamiliar",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: RED }} />
                      <p className="text-xs text-[var(--text-secondary)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border" style={{ borderColor: `${EMERALD}30`, background: `${EMERALD}06` }}>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={14} style={{ color: EMERALD }} />
                  <p className="text-[10px] font-mono font-bold tracking-widest" style={{ color: EMERALD }}>FINAL APPROACH — SHIPPED</p>
                </div>
                <p className="text-base font-display font-bold text-[var(--text-primary)] mb-3">AI as contextual assistance.</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Familiar catalogue browsing stays intact. AI appears at moments of genuine decision friction.
                </p>
                <div className="space-y-2">
                  {[
                    "Browse services, doctors and clinics naturally",
                    "AI appears only during high-friction moments",
                    "Supports decisions instead of replacing navigation",
                    "Feels like part of the product — not another feature",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: EMERALD }} />
                      <p className="text-xs text-[var(--text-secondary)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why AI didn't become the homepage */}
            <div className="border-l-2 pl-6 py-2 mb-14" style={{ borderColor: ACCENT2 }}>
              <p className="text-[10px] font-mono font-bold tracking-widest mb-3 text-[var(--text-tertiary)]">THE DECISION</p>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                We realised people don&apos;t open healthcare apps because they want to chat. They open them because they already know what they need — book a doctor, schedule a service, order medicines, or review previous consultations. AI needed to support that intent, not replace the entry point for it.
              </p>
            </div>

            {/* The reframe */}
            <div className="border-l-2 pl-6 py-3 mb-14" style={{ borderColor: ACCENT }}>
              <p className="text-[10px] font-mono font-bold tracking-widest mb-3 text-[var(--text-tertiary)]">THE REFRAME THAT CHANGED EVERYTHING</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-mono tracking-widest mb-2" style={{ color: RED }}>WRONG QUESTION</p>
                  <p className="text-base font-display font-bold text-[var(--text-primary)]">
                    &ldquo;How do we add AI to the product?&rdquo;
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest mb-2" style={{ color: EMERALD }}>RIGHT QUESTION</p>
                  <p className="text-base font-display font-bold text-[var(--text-primary)]">
                    &ldquo;Where does AI genuinely reduce user effort?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Where AI landed */}
            <p className="text-[10px] font-mono font-bold tracking-widest mb-5 text-[var(--text-tertiary)]">WHERE AI ACTUALLY LANDED — AND WHY EACH PLACEMENT MAKES SENSE</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
              {[
                {
                  label: "AI Assistant in Navigation",
                  user: "All Users",
                  reasoning: "Instead of replacing the home screen, AI remained available throughout the application via persistent navigation. Patients could ask questions whenever they needed help without interrupting the primary healthcare journey.",
                  color: ACCENT,
                },
                {
                  label: "EMR Summarization",
                  user: "Doctor",
                  reasoning: "Doctors review patient history before every consultation. Medical records are dense. AI condenses critical information before the appointment starts — reducing cognitive load at the highest-stakes moment.",
                  color: ACCENT2,
                },
                {
                  label: "Pre-consultation Briefing",
                  user: "Doctor",
                  reasoning: "Previous diagnoses, prescribed medications, treatment history — surfaced automatically before the doctor enters the room. AI reducing friction in an existing workflow, not replacing it.",
                  color: EMERALD,
                },
                {
                  label: "Service & Treatment Recommendations",
                  user: "Patient",
                  reasoning: "After a patient books a service, AI suggests complementary treatments based on their profile. Contextual, non-intrusive, and genuinely useful — not a chatbot at the entry point.",
                  color: AMBER,
                },
                {
                  label: "Follow-up Reminders",
                  user: "Patient",
                  reasoning: "Aesthetic treatments require follow-up care. AI triggers personalized reminders post-appointment. Invisible to the user as 'AI' — just a service that remembers what their treatment required.",
                  color: RED,
                },
                {
                  label: "In-app Patient Q&A",
                  user: "Patient",
                  reasoning: "Patients have questions between appointments. Rather than calling the clinic, they get contextual answers inside the app. Available when needed, absent when not.",
                  color: ACCENT,
                },
              ].map(({ label, user, reasoning, color }) => (
                <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-[var(--text-primary)]">{label}</p>
                    <Tag text={user} color={color} />
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{reasoning}</p>
                </div>
              ))}
            </div>

            {/* Pull quote — stronger */}
            <div className="p-8 rounded-2xl border text-center" style={{ borderColor: `${ACCENT}25`, background: `${ACCENT}06` }}>
              <p className="text-xl font-display font-semibold text-[var(--text-primary)] leading-snug mb-4 max-w-xl mx-auto">
                &ldquo;The rejection didn&apos;t kill the AI strategy. It improved it.&rdquo;
              </p>
              <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
                Instead of asking how AI could replace the experience, we asked where it could reduce effort. That single question changed the product direction.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════ */}
      {/* DECISION #2 — CONNECTING FIVE PRODUCTS INTO ONE ECOSYSTEM     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-platform" className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <SectionLabel n="04" text="Decision Story #2" />

            <h2 className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              The hardest part wasn&apos;t the screens.<br />It was connecting the ecosystem.
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-14">
              Building a platform wasn&apos;t about designing five products independently. Every workflow shared the same patient data, meaning decisions in one product affected every other. The challenge was creating one system that felt consistent while serving completely different users.
            </p>

            {/* Connected ecosystem visual */}
            <div className="mb-14">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-6 text-[var(--text-tertiary)]">THE PATIENT APP AS THE CENTER OF THE ECOSYSTEM</p>
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
                  During product discussions we aligned on treating the Patient App as the centre of the ecosystem. Every other product would read from and contribute to the same patient record. This meant a doctor&apos;s prescription, a pharmacy order, an invoice, and a delivery all traced back to one appointment — eliminating duplicate state and conflicting records.
                </p>
                {/* Flow diagram */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="px-5 py-2.5 rounded-xl font-semibold text-sm" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                    Appointment Confirmed
                  </div>
                  {[
                    { label: "Doctor Reviews + Prescribes",   color: ACCENT2 },
                    { label: "EMR Updated Automatically",     color: ACCENT2 },
                    { label: "Prescription Sent to Pharmacy", color: EMERALD },
                    { label: "Invoice Generated",             color: AMBER   },
                    { label: "Delivery Tracked",              color: EMERALD },
                  ].map(({ label, color }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <ChevronRight size={14} className="rotate-90 text-[var(--text-tertiary)]" />
                      <div className="px-5 py-2.5 rounded-xl text-xs font-semibold" style={{ background: `${color}12`, color }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-secondary)] text-center mt-6">
                  Designing this data spine first meant every feature built on the same truth.
                  No duplicate state. No conflicting records.
                </p>
              </div>
            </div>

            {/* Decision: Appointment after payment */}
            <div className="mb-10">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-6 text-[var(--text-tertiary)]">PRODUCT DECISION: APPOINTMENT CREATION TIMING</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="p-6 rounded-2xl border" style={{ borderColor: `${RED}25`, background: `${RED}05` }}>
                  <p className="text-[10px] font-mono font-bold tracking-widest mb-4" style={{ color: RED }}>INITIAL PRODUCT LOGIC</p>
                  <div className="space-y-2 mb-4">
                    {[
                      { step: "1", text: "User selects a slot", highlight: false },
                      { step: "2", text: "Appointment created in database", highlight: true },
                      { step: "3", text: "User proceeds to payment", highlight: false },
                      { step: "4", text: "Payment fails / user drops off", highlight: false },
                    ].map(({ step, text, highlight }) => (
                      <div key={step} className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <span className="font-mono bg-[var(--bg)] border border-[var(--border)] px-2 py-0.5 rounded">{step}</span>
                        <span className={highlight ? "font-bold text-red-400" : ""}>{text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">Result: invalid appointments filling doctor schedules. Slots unavailable to other patients. No revenue.</p>
                </div>
                <div className="p-6 rounded-2xl border" style={{ borderColor: `${EMERALD}30`, background: `${EMERALD}06` }}>
                  <p className="text-[10px] font-mono font-bold tracking-widest mb-4" style={{ color: EMERALD }}>REVISED PRODUCT LOGIC</p>
                  <div className="space-y-2 mb-4">
                    {[
                      { step: "1", text: "User selects a slot", highlight: false },
                      { step: "2", text: "Slot temporarily held (timer)", highlight: false },
                      { step: "3", text: "User completes payment", highlight: false },
                      { step: "4", text: "Appointment created in database", highlight: true },
                    ].map(({ step, text, highlight }) => (
                      <div key={step} className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                        <span className="font-mono bg-[var(--bg)] border border-[var(--border)] px-2 py-0.5 rounded">{step}</span>
                        <span className={highlight ? `font-bold` : ""} style={highlight ? { color: EMERALD } : {}}>{text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">Result: only confirmed payments create valid appointments. Slots stay available until payment clears.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border" style={{ borderColor: `${ACCENT}25`, background: `${ACCENT}06` }}>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-semibold text-[var(--text-primary)]">This wasn&apos;t a design problem. It was a product logic problem.</span>{" "}
                  I caught it during flow review — not QA. Identifying it before development saved debugging time, prevented bad data in production, and fixed the business model before it went live.
                </p>
              </div>
            </div>

            {/* Decision: Split invoices */}
            <div className="mb-14">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-6 text-[var(--text-tertiary)]">PRODUCT DECISION: SPLIT INVOICING FOR MULTI-PHARMACY ORDERS</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
                Patients could order medicines from multiple pharmacies in a single checkout. The initial proposal generated one invoice. During review, I questioned whether that reflected how pharmacies actually operate.
              </p>
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] mb-4">
                <p className="text-[10px] font-mono font-bold tracking-widest mb-4 text-[var(--text-tertiary)]">THE PROBLEM WITH ONE INVOICE</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { issue: "Different GST registrations",  detail: "Each pharmacy is a separate entity with separate tax obligations. One invoice creates a compliance problem." },
                    { issue: "Different inventory systems",  detail: "Stock, fulfillment, and delivery timelines are managed independently. One invoice conflates them." },
                    { issue: "Different business ownership", detail: "Revenue attribution breaks if one invoice spans multiple owners. Finance becomes unmanageable at scale." },
                  ].map(({ issue, detail }) => (
                    <div key={issue} className="flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <AlertTriangle size={13} style={{ color: AMBER }} className="mt-0.5 shrink-0" />
                        <p className="text-xs font-semibold text-[var(--text-primary)]">{issue}</p>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl border" style={{ borderColor: `${EMERALD}30`, background: `${EMERALD}06` }}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={14} style={{ color: EMERALD }} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)] mb-1">Solution: Shared Order ID. Separate Invoice IDs.</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      One order reference for the user-facing experience — familiar and simple. Separate invoices per pharmacy for legal, tax, and operational compliance.
                      I referenced familiar e-commerce patterns like Amazon&apos;s split-order experience to explain why one order could legitimately generate multiple invoices. It aligned the team and client on why this was the right structure — not the complex one.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Beyond designing screens */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-4 text-[var(--text-tertiary)]">BEYOND DESIGNING SCREENS</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                Both decisions above were identified before development began. That only happens when a designer is embedded in the product process, not just the design process.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Explained interaction logic to frontend and backend teams",
                  "Reviewed implementations before QA handoff",
                  "Identified product logic issues during feature reviews",
                  "Worked sprint-by-sprint alongside PM and engineering",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} style={{ color: ACCENT }} className="mt-0.5 shrink-0" />
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════ */}
      {/* 05 — SHIPPING THE PRODUCT                                     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-figma" className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <SectionLabel n="05" text="Shipping the Product" />

            <h2 className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              I didn&apos;t hand off screens.<br />I handed off decisions.
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-14">
              Designing the interface was only one part of my role. Every sprint I worked with PMs, frontend and backend engineers to explain interaction logic, review implementations, validate product behavior, and ensure features matched both design intent and business requirements before QA.
            </p>

            {/* Delivery workflow diagram */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 mb-14">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-6 text-[var(--text-tertiary)]">MY ROLE THROUGH EVERY SPRINT</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { label: "Design",           color: ACCENT  },
                  { label: "Sprint Walkthrough", color: ACCENT2 },
                  { label: "Development",       color: ACCENT2 },
                  { label: "Review Build",       color: EMERALD },
                  { label: "Fixes",              color: EMERALD },
                  { label: "Pre-QA Review",      color: AMBER   },
                  { label: "Release",            color: EMERALD },
                ].map(({ label, color }, i, arr) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="px-3.5 py-2 rounded-xl text-xs font-semibold" style={{ background: `${color}15`, color }}>
                      {label}
                    </div>
                    {i < arr.length - 1 && (
                      <ChevronRight size={13} className="text-[var(--text-tertiary)] shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sprint cycle cards */}
            <div className="mb-14">
              <p className="text-[10px] font-mono font-bold tracking-widest mb-6 text-[var(--text-tertiary)]">SPRINT INVOLVEMENT — PHASE BY PHASE</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    phase: "Before Sprint",
                    icon: PenTool,
                    activities: [
                      "Design new user flows",
                      "Update existing workflows",
                      "Define interaction states",
                      "Prepare developer handoff",
                    ],
                    color: ACCENT,
                  },
                  {
                    phase: "Sprint Kickoff",
                    icon: MessageSquare,
                    activities: [
                      "Walk developers through user flows",
                      "Explain interaction logic",
                      "Clarify edge cases",
                      "Discuss dependencies with PM and engineering",
                    ],
                    color: ACCENT2,
                  },
                  {
                    phase: "Mid-Sprint Review",
                    icon: Layout,
                    activities: [
                      "Review builds against Figma",
                      "Document spacing and visual issues",
                      "Work directly with developers on fixes",
                      "Validate interaction behavior in browser",
                    ],
                    color: EMERALD,
                  },
                  {
                    phase: "Pre-QA Review",
                    icon: CheckCircle2,
                    activities: [
                      "UI quality sign-off before QA begins",
                      "Document remaining known issues",
                      "Handoff QA checklist with screen states",
                      "Available for edge case questions",
                    ],
                    color: AMBER,
                  },
                ].map(({ phase, icon: Icon, activities, color }) => (
                  <div key={phase} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                        <Icon size={13} style={{ color }} />
                      </div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{phase}</p>
                    </div>
                    <div className="space-y-2">
                      {activities.map((a) => (
                        <div key={a} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes — specific, connected */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
              {[
                {
                  title: "Faster Decision Making",
                  body: "Developers resolved interaction questions during sprint reviews instead of waiting for multiple feedback cycles.",
                  color: ACCENT,
                },
                {
                  title: "Better Implementation Quality",
                  body: "Reviewing builds before QA helped catch interaction and product issues before they became costly fixes.",
                  color: ACCENT2,
                },
                {
                  title: "Stronger Cross-Team Alignment",
                  body: "PMs, developers and QA worked from the same product logic, reducing misunderstandings during implementation.",
                  color: EMERALD,
                },
              ].map(({ title, body, color }) => (
                <div key={title} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <div className="w-2 h-2 rounded-full mb-4" style={{ background: color }} />
                  <p className="text-sm font-bold text-[var(--text-primary)] mb-2 leading-snug">{title}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Callout — collaboration-focused */}
            <div className="border-l-2 pl-6 py-2" style={{ borderColor: AMBER }}>
              <p className="text-base font-display font-semibold text-[var(--text-primary)] italic mb-2">
                &ldquo;Design doesn&apos;t end in Figma. It ends when the product behaves the way users expect.&rdquo;
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Working closely with engineering throughout every sprint helped surface product and implementation issues before they reached QA. Staying involved after handoff ensured the experience matched the intended design — not just the mockups.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════ */}
      {/* IMPACT                                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-impact" className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <SectionLabel n="06" text="Impact" />

            <h2 className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-14"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              What we built.
            </h2>

            {/* Top metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-14">
              {[
                { n: "5",      label: "Interconnected products",  sub: "Mobile + Web",          color: ACCENT  },
                { n: "300+",   label: "Screens designed",         sub: "Across all portals",    color: ACCENT2 },
                { n: "5",      label: "Stakeholder types served",  sub: "Patient to Admin",      color: EMERALD },
                { n: "0→1",    label: "Platform built",           sub: "Design System adopted", color: AMBER   },
              ].map(({ n, label, sub, color }) => (
                <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-center">
                  <p className="font-display font-black text-4xl mb-2" style={{ color }}>{n}</p>
                  <p className="text-xs font-semibold text-[var(--text-primary)] mb-1 leading-snug">{label}</p>
                  <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{sub}</p>
                </div>
              ))}
            </div>

            {/* Decision outcome cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Layers,
                  title: "Platform evolution",
                  body: "From a single clinic booking application to a multi-clinic healthcare ecosystem serving patients, doctors, clinics, pharmacies and administrators.",
                  color: ACCENT,
                },
                {
                  icon: FileText,
                  title: "Design system adopted across products",
                  body: "Design system adopted across every product, creating a shared language for design and engineering.",
                  color: ACCENT2,
                },
                {
                  icon: GitBranch,
                  title: "AI repositioned as contextual assistance",
                  body: "Rejected as the entry point. Embedded in six distinct workflow moments. Familiar to users. Genuinely useful to doctors.",
                  color: EMERALD,
                },
                {
                  icon: TrendingUp,
                  title: "Appointment confirmation after payment",
                  body: "Product logic corrected before production. Invalid appointments eliminated. Doctor schedules protected.",
                  color: AMBER,
                },
                {
                  icon: BarChart3,
                  title: "Multi-pharmacy invoice architecture",
                  body: "Multi-pharmacy orders handled correctly at legal, tax, and operational levels. Built for scale from day one.",
                  color: RED,
                },
              ].map(({ icon: Icon, title, body, color }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${color}15` }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)] mb-1.5">{title}</p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════ */}
      {/* REFLECTION                                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hc-reflection" className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FU}>
            <SectionLabel n="07" text="Reflection" />

            <h2 className="font-display font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
              What this project changed<br />about how I design.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
              {[
                {
                  n: "01",
                  insight: "Product decisions matter more than interface decisions.",
                  body: "The scope change, the AI reframe, the invoice architecture — none happened in Figma. They happened in conversations, flow reviews, and alignment sessions. Design thinking starts earlier than most designers enter.",
                  color: ACCENT,
                },
                {
                  n: "02",
                  insight: "Design systems create organizational leverage.",
                  body: "Not deliverables. Not documentation. Infrastructure. The weeks spent building tokens and components before any feature work were the highest-leverage investment on this project.",
                  color: ACCENT2,
                },
                {
                  n: "03",
                  insight: "Great UX starts with understanding how the business works.",
                  body: "The appointment timing issue wasn't found by QA or engineering. It was found in a design walkthrough. Understanding product logic — how business rules translate into system behavior — makes design much harder to get wrong.",
                  color: EMERALD,
                },
                {
                  n: "04",
                  insight: "AI should support existing workflows — not replace familiar behavior.",
                  body: "Users trust systems before they trust new patterns. Meet them where they already are. The right question isn't how to add AI — it's where AI genuinely reduces effort for the user.",
                  color: AMBER,
                },
              ].map(({ n, insight, body, color }) => (
                <div key={n} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                  <p className="font-mono text-xs font-bold tracking-widest mb-3" style={{ color }}>{n}</p>
                  <p className="text-sm font-bold text-[var(--text-primary)] leading-snug mb-3">{insight}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Closing statement */}
            <div className="p-8 rounded-2xl border border-[var(--border)] text-center">
              <p className="text-lg font-display font-semibold text-[var(--text-primary)] leading-snug mb-4 max-w-2xl mx-auto">
                The most valuable work in this project happened before the first high-fidelity screen.
              </p>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
                Aligning business goals, user expectations and technical constraints created a product that felt familiar while solving a much larger problem. I joined expecting to design a healthcare application. I left understanding that great products are shaped by decisions long before pixels.
              </p>
            </div>

          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BOTTOM NAV                                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1 duration-200" />
            Back to Work
          </Link>
          <Link
            href="/work/dimension-leap"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
          >
            Next Case Study
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 duration-200" />
          </Link>
        </div>
      </section>
      {/* Fixed right-side TOC */}
      <CaseStudyTOC
        sections={[
          { id: "hc-hero",        label: "Hero / Banner" },
          { id: "hc-opportunity", label: "Business Opportunity", number: "01" },
          { id: "hc-foundation",  label: "Foundation",          number: "02" },
          { id: "hc-ai",          label: "Where AI Belongs",    number: "03" },
          { id: "hc-platform",    label: "Multi-Stakeholder",   number: "04" },
          { id: "hc-figma",       label: "Beyond Figma",        number: "05" },
          { id: "hc-impact",      label: "Impact",              number: "06" },
          { id: "hc-reflection",  label: "Reflection",          number: "07" },
        ]}
      />
    </>
  );
}

