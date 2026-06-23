"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, AlertTriangle,
  Users, Heart, Pill, Building2, Shield, Smartphone, Monitor,
  ChevronRight, Star, RefreshCw, GitBranch, Target, Layers,
  Calendar, FileText, MessageSquare, Zap, TrendingUp, Lock
} from "lucide-react";

const ACCENT = "#0EA5E9";
const ACCENT2 = "#7C3AED";

// ── Reusable primitives ───────────────────────────────────────────────────────
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

function Visual({ label, height = "h-64", icon: Icon = Monitor }: {
  label: string; height?: string; icon?: React.ElementType;
}) {
  return (
    <div
      className={`relative ${height} rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col items-center justify-center gap-3 select-none`}
      style={{ background: `linear-gradient(135deg, ${ACCENT}10 0%, ${ACCENT}04 100%)` }}
    >
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `radial-gradient(circle, ${ACCENT} 1px, transparent 1px)`, backgroundSize: "20px 20px" }}
      />
      <Icon size={28} style={{ color: ACCENT, opacity: 0.45 }} />
      <span className="text-xs font-mono text-[var(--text-tertiary)] px-6 text-center leading-relaxed">{label}</span>
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

function ProductCard({ icon: Icon, title, type, purpose, users, goals, color }: {
  icon: React.ElementType; title: string; type: string;
  purpose: string; users: string; goals: string[]; color: string;
}) {
  return (
    <motion.div
      variants={FU}
      className="p-6 rounded-2xl border flex flex-col gap-4"
      style={{ borderColor: `${color}28`, background: `${color}06` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
            <Icon size={18} style={{ color }} />
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{title}</p>
            <p className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">{type}</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-wider mb-1.5" style={{ color }}>PURPOSE</p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{purpose}</p>
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-wider mb-1.5" style={{ color }}>USERS</p>
          <p className="text-xs text-[var(--text-secondary)]">{users}</p>
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-wider mb-1.5" style={{ color }}>GOALS</p>
          <ul className="space-y-1">
            {goals.map((g) => (
              <li key={g} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                <ChevronRight size={10} className="mt-0.5 shrink-0" style={{ color }} />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function ProblemCard({ n, problem, impact, stakeholders, risk, opportunity }: {
  n: string; problem: string; impact: string; stakeholders: string; risk: string; opportunity: string;
}) {
  return (
    <motion.div variants={FU} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--text-tertiary)]">PROBLEM {n}</span>
      </div>
      <p className="font-semibold text-[var(--text-primary)] mb-4 leading-snug">{problem}</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Impact", value: impact, c: "#EF4444" },
          { label: "Stakeholders", value: stakeholders, c: ACCENT },
          { label: "Business Risk", value: risk, c: "#F59E0B" },
          { label: "Opportunity", value: opportunity, c: "#10B981" },
        ].map(({ label, value, c }) => (
          <div key={label} className="p-2.5 rounded-xl border" style={{ borderColor: `${c}20`, background: `${c}06` }}>
            <p className="text-[9px] font-mono font-bold tracking-widest mb-1" style={{ color: c }}>{label.toUpperCase()}</p>
            <p className="text-xs text-[var(--text-secondary)] leading-snug">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function IterationBlock({ version, title, feedback, problems, changes, outcome }: {
  version: string; title: string; feedback: string; problems: string[]; changes: string[]; outcome: string;
}) {
  return (
    <motion.div variants={FU} className="border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] flex items-center gap-3" style={{ background: `${ACCENT}08` }}>
        <span className="text-[10px] font-mono font-bold tracking-widest" style={{ color: ACCENT }}>{version}</span>
        <span className="font-semibold text-[var(--text-primary)] text-sm">{title}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        <div className="p-5">
          <p className="text-[10px] font-mono font-bold tracking-widest text-red-400 mb-2">FEEDBACK & PROBLEMS</p>
          <p className="text-xs text-[var(--text-secondary)] mb-3 italic">&ldquo;{feedback}&rdquo;</p>
          <ul className="space-y-1.5">
            {problems.map((p) => (
              <li key={p} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                <XCircle size={10} className="mt-0.5 shrink-0 text-red-400" />{p}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <p className="text-[10px] font-mono font-bold tracking-widest mb-2" style={{ color: ACCENT }}>CHANGES MADE</p>
          <ul className="space-y-1.5">
            {changes.map((c) => (
              <li key={c} className="flex items-start gap-1.5 text-xs text-[var(--text-secondary)]">
                <CheckCircle2 size={10} className="mt-0.5 shrink-0 text-emerald-400" />{c}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <p className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 mb-2">OUTCOME</p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{outcome}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function HealthcareCaseStudy() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const products = [
    {
      icon: Smartphone, title: "Patient Mobile App", type: "iOS & Android",
      color: "#0EA5E9",
      purpose: "Give patients full control of their health journey — appointments, records, prescriptions, and communication in one place.",
      users: "Patients across all demographics and digital literacy levels",
      goals: ["Book and manage appointments", "Access medical records and lab results", "Communicate with assigned doctors", "Receive medication reminders and health alerts"],
    },
    {
      icon: Heart, title: "Doctor Mobile App", type: "iOS & Android",
      color: "#7C3AED",
      purpose: "Enable doctors to manage consultations, patient communication, and availability on the go.",
      users: "Practicing doctors, specialists, consultants",
      goals: ["View patient consultation queue", "Access patient history during appointments", "Set and manage availability slots", "Receive and respond to patient messages"],
    },
    {
      icon: Monitor, title: "Doctor Web Portal", type: "Web Application",
      color: "#10B981",
      purpose: "Provide a comprehensive workstation for doctors to manage full practice operations, analytics, and advanced patient coordination.",
      users: "Senior doctors, specialists, clinic-based practitioners",
      goals: ["Advanced patient management and case history", "Analytics on consultation outcomes and load", "Full schedule management with conflict detection", "Workflow templates and decision support tools"],
    },
    {
      icon: Building2, title: "Clinic Management Portal", type: "Web Application",
      color: "#F59E0B",
      purpose: "Give clinic administrators full operational control over appointments, staff, workflows, and performance.",
      users: "Clinic managers, front desk staff, operations teams",
      goals: ["Appointment scheduling and management", "Doctor and staff assignment", "Operational reporting and efficiency tracking", "Patient flow and queue management"],
    },
    {
      icon: Pill, title: "Pharmacy Management Portal", type: "Web Application",
      color: "#EF4444",
      purpose: "Connect pharmacies to the prescription ecosystem for seamless, error-free medication fulfillment.",
      users: "Pharmacists, pharmacy managers, dispensing staff",
      goals: ["Receive and process digital prescriptions", "Manage inventory and stock levels", "Track order status and fulfillment", "Flag drug interactions and contraindications"],
    },
    {
      icon: Shield, title: "Super Admin Dashboard", type: "Web Application",
      color: "#6366F1",
      purpose: "Provide the platform operator with full visibility and control across the entire healthcare ecosystem.",
      users: "Platform administrators, operations leadership, technical team",
      goals: ["User and role management across all apps", "System health monitoring and alerts", "Platform analytics and usage reporting", "Configuration and policy management"],
    },
  ];

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
          background: `radial-gradient(ellipse 70% 70% at 30% 0%, ${ACCENT}1A 0%, transparent 60%),
                       radial-gradient(ellipse 50% 50% at 90% 80%, ${ACCENT2}10 0%, transparent 60%)`
        }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{
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
                Healthcare · Enterprise UX · 6 Products
              </div>

              <h1 className="font-display font-black text-[var(--text-primary)] leading-[0.95] tracking-tight mb-5"
                style={{ fontSize: "clamp(34px, 5.5vw, 72px)" }}
              >
                Unified
                <br />
                <span style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>
                  Healthcare
                </span>
                <br />
                Platform
              </h1>

              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-9">
                Designing a connected healthcare ecosystem from the ground up — 6 products, 5 stakeholder types,
                one unified experience.
              </p>

              <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
                {[
                  { label: "Role", value: "Associate UX / Product Designer" },
                  { label: "Company", value: "Dimension Leap" },
                  { label: "Duration", value: "2025" },
                  { label: "Scope", value: "6 Products · 5 User Types" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <span className="text-[var(--text-tertiary)] text-xs font-mono uppercase tracking-wider block mb-0.5">{label}</span>
                    <span className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — healthcare screenshot */}
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
                style={{ boxShadow: `0 32px 80px rgba(14,165,233,0.22), 0 8px 24px rgba(0,0,0,0.18)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/healthcare.png" alt="Unified Healthcare Platform" className="w-full h-auto object-cover block" draggable={false} />
                <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${ACCENT}14, transparent)` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

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
              { value: "6", label: "Interconnected Products Designed" },
              { value: "5", label: "Stakeholder Types Served" },
              { value: "100%", label: "End-to-End Ecosystem Coverage" },
              { value: "1", label: "Unified Design System" },
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
        {/* 01 · THE CHALLENGE                                             */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="01" text="The Challenge" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-5">
              <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight"
                style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
              >
                One healthcare system.
                <br /><span style={{ color: ACCENT }}>Six broken pieces.</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The company had a vision: build a unified healthcare platform that connects every stakeholder
                in the healthcare journey. What they had instead was chaos — five different types of users,
                each working in complete isolation from the others.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Patients couldn&apos;t see their own records. Doctors couldn&apos;t access patient history before consultations.
                Clinics manually tracked appointments in spreadsheets. Pharmacies received prescriptions by fax.
                Administrators had no visibility into anything.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Patients had no central place to manage their health journey",
                  "Doctors operated without cross-system patient data",
                  "Clinics depended on manual scheduling and paper-based workflows",
                  "Pharmacies received disconnected prescriptions with no status tracking",
                  "Administrators had no centralized control or monitoring capability",
                ].map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <XCircle size={14} className="mt-0.5 shrink-0 text-red-400" />
                    <p className="text-sm text-[var(--text-secondary)]">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {/* Ecosystem breakdown visual */}
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="px-5 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">BEFORE: Fragmented Healthcare Ecosystem</p>
                </div>
                <div className="p-5 space-y-2">
                  {[
                    { label: "Patient", tool: "WhatsApp + Phone calls", c: "#EF4444" },
                    { label: "Doctor", tool: "Paper notes + Verbal coordination", c: "#F59E0B" },
                    { label: "Clinic", tool: "Excel spreadsheets", c: "#EF4444" },
                    { label: "Pharmacy", tool: "Fax + Manual entry", c: "#F59E0B" },
                    { label: "Admin", tool: "No central system", c: "#EF4444" },
                  ].map(({ label, tool, c }) => (
                    <div key={label} className="flex items-center justify-between gap-3 py-2 border-b border-[var(--border)] last:border-0">
                      <span className="text-sm font-medium text-[var(--text-primary)] w-24 shrink-0">{label}</span>
                      <span className="text-xs text-[var(--text-secondary)] flex-1">{tool}</span>
                      <XCircle size={13} style={{ color: c }} className="shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl border-l-4 bg-[var(--bg-subtle)]" style={{ borderLeftColor: ACCENT }}>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  &ldquo;We have the vision for a unified platform — but right now every team is an island.
                  We need a designer who can see the entire system at once.&rdquo;
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2 font-mono">— CEO, Product Kickoff Meeting</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 02 · UNDERSTANDING THE HEALTHCARE NETWORK                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="02" text="Understanding the Healthcare Network" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Every stakeholder depends on another.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Before designing a single screen, I mapped the entire dependency graph. A patient action triggers a doctor
            response. A doctor prescription triggers a pharmacy order. A clinic schedule determines both. The Admin
            oversees the whole chain. Understanding this web was the most critical first step.
          </p>

          {/* Ecosystem chain */}
          <div className="flex flex-col items-center gap-0 mb-10">
            {[
              { icon: Users, label: "Patient", sub: "Books appointments, views records, receives prescriptions", color: "#0EA5E9" },
              { icon: Heart, label: "Doctor", sub: "Manages consultations, raises prescriptions, updates records", color: "#7C3AED" },
              { icon: Building2, label: "Clinic", sub: "Coordinates scheduling, manages staff, monitors patient flow", color: "#F59E0B" },
              { icon: Pill, label: "Pharmacy", sub: "Fulfills prescriptions, manages inventory, tracks orders", color: "#EF4444" },
              { icon: Shield, label: "Super Admin", sub: "Controls platform, monitors systems, manages all users", color: "#6366F1" },
            ].map(({ icon: Icon, label, sub, color }, i, arr) => (
              <div key={label} className="flex flex-col items-center w-full max-w-lg">
                <div
                  className="w-full p-4 rounded-2xl border flex items-center gap-4"
                  style={{ borderColor: `${color}28`, background: `${color}08` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm">{label}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{sub}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-px h-5 bg-[var(--border)]" />
                    <ChevronRight size={14} className="rotate-90 text-[var(--text-tertiary)]" />
                    <div className="w-px h-2 bg-[var(--border)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <Visual label="Full Ecosystem Dependency Map — Data Flows, Trigger Chains & Cross-Platform Relationships" height="h-64" icon={GitBranch} />
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 03 · RESEARCH & DISCOVERY                                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="03" text="Research & Discovery" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Listening before designing.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            I ran four weeks of intensive discovery — stakeholder workshops, requirement sessions, and operational
            mapping. The goal was to enter the design phase with zero assumptions and 100% context.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { icon: MessageSquare, label: "CEO Product Sessions", desc: "3 strategy sessions with the CEO to align on vision, platform scope, and non-negotiables. Resulted in a prioritized feature roadmap for v1." },
              { icon: Heart, label: "Doctor Interviews", desc: "Interviewed 6 practicing doctors across specialties. Discovered pain points around patient history access, consultation efficiency, and schedule visibility." },
              { icon: Building2, label: "Clinic Operations Study", desc: "Shadowed clinic managers for 2 days. Documented 34 distinct manual processes — all of which became automation targets." },
              { icon: Pill, label: "Pharmacy Workflow Analysis", desc: "Analyzed prescription handling from receipt to dispensing. Identified 12 failure points where medication errors were most likely to occur." },
              { icon: Users, label: "Patient Focus Groups", desc: "Conducted 2 focus groups with 8 participants each. Mapped the patient's entire emotional journey from symptom to follow-up." },
              { icon: Shield, label: "Admin Requirement Sessions", desc: "Worked with the operations team to define platform governance, user role management, and system monitoring requirements." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${ACCENT}18` }}>
                  <Icon size={16} style={{ color: ACCENT }} />
                </div>
                <p className="font-semibold text-sm text-[var(--text-primary)] mb-2">{label}</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: "47+", label: "Workflow breakdowns documented" },
              { n: "6", label: "Stakeholder types interviewed" },
              { n: "34", label: "Manual processes identified for automation" },
            ].map(({ n, label }) => (
              <div key={label} className="p-5 rounded-2xl border border-[var(--border)] text-center">
                <p className="font-display font-bold text-3xl mb-1" style={{ color: ACCENT }}>{n}</p>
                <p className="text-xs text-[var(--text-secondary)]">{label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 04 · BREAKING DOWN THE SYSTEM                                  */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SectionLabel n="04" text="Breaking Down the System" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Six products. One purpose.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Each product existed to solve a distinct operational problem for a specific stakeholder —
            while sharing a unified data layer that made the whole system coherent.
          </p>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {products.map((p) => <ProductCard key={p.title} {...p} />)}
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 05 · JOURNEY MAPPING                                           */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="05" text="Journey Mapping" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Mapping the journey across the entire ecosystem.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            I created end-to-end journey maps for every stakeholder — then overlaid them to reveal exactly where
            handoffs happened between systems, where delays occurred, and where experience breaks were most painful.
          </p>

          <div className="space-y-4">
            {[
              {
                role: "Patient Journey",
                color: "#0EA5E9",
                steps: ["Symptom → Search Doctor", "Book Appointment", "Attend Consultation", "Receive Prescription", "Pharmacy Pickup", "Follow-up"],
                painPoints: "Juggling 3 apps + phone calls. No single view of health history.",
              },
              {
                role: "Doctor Journey",
                color: "#7C3AED",
                steps: ["View Schedule", "Review Patient History", "Conduct Consultation", "Document Notes", "Raise Prescription", "Request Follow-up"],
                painPoints: "Accessing patient history required calling clinic staff. Prescription writing was manual.",
              },
              {
                role: "Clinic Journey",
                color: "#F59E0B",
                steps: ["Receive Booking", "Assign Doctor", "Confirm Appointment", "Manage Check-in", "Update Records", "Process Billing"],
                painPoints: "Overbooking common. No real-time view of doctor availability.",
              },
              {
                role: "Pharmacy Journey",
                color: "#EF4444",
                steps: ["Receive Prescription", "Verify Patient", "Check Inventory", "Dispense Medication", "Update Records", "Flag Interactions"],
                painPoints: "Prescriptions arrived by fax or phone. No digital verification.",
              },
            ].map(({ role, color, steps, painPoints }) => (
              <div key={role} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{role}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-1.5">
                      <span className="text-xs px-2.5 py-1 rounded-full border text-[var(--text-secondary)]"
                        style={{ borderColor: `${color}30`, background: `${color}08` }}
                      >{step}</span>
                      {i < steps.length - 1 && <ChevronRight size={10} className="text-[var(--text-tertiary)]" />}
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-xs text-[var(--text-secondary)] italic">{painPoints}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 06 · IDENTIFYING CORE PROBLEMS                                 */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SectionLabel n="06" text="Identifying Core Problems" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            The real problems, precisely named.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            After synthesis, I distilled 47 documented pain points into 5 systemic problems that touched
            every stakeholder and every product simultaneously.
          </p>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <ProblemCard n="01"
              problem="No unified patient record accessible across the platform"
              impact="Doctors make decisions without full context. Errors increase."
              stakeholders="Patients, Doctors, Clinics"
              risk="Medical error liability + poor care quality"
              opportunity="Universal health record → trust + retention"
            />
            <ProblemCard n="02"
              problem="Appointment booking had no real-time availability"
              impact="Overbooking, missed appointments, poor experience"
              stakeholders="Patients, Clinics, Doctors"
              risk="Revenue leakage + patient drop-off"
              opportunity="Smart scheduling → operational efficiency"
            />
            <ProblemCard n="03"
              problem="Prescription chain was completely disconnected"
              impact="Medication errors, prescription loss, delays"
              stakeholders="Doctors, Pharmacies, Patients"
              risk="Patient safety + regulatory risk"
              opportunity="Digital prescription flow → zero-error fulfillment"
            />
            <ProblemCard n="04"
              problem="Administrators had no platform-wide visibility or control"
              impact="Inability to monitor, intervene, or scale"
              stakeholders="Super Admin, All platforms"
              risk="Platform integrity + security gaps"
              opportunity="Control plane → enterprise scalability"
            />
            <ProblemCard n="05"
              problem="No shared design language across the 6 products"
              impact="Inconsistent UX across platforms → training overhead"
              stakeholders="All user types"
              risk="Poor adoption + high support costs"
              opportunity="Unified design system → coherent ecosystem"
            />
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 07 · SOLUTION EXPLORATION                                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="07" text="Solution Exploration" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Three concepts. Hard trade-offs.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Before committing to a direction, I explored three structurally different approaches — each with
            a different answer to the core question: how do you make six products feel like one platform?
          </p>
          <div className="space-y-5">
            {[
              {
                label: "Concept A — Super App (Single Codebase, Role Switcher)",
                status: "rejected",
                desc: "One application with a role-selection screen at login. All six stakeholders would use the same app, seeing different views based on their role.",
                why: "Rejected. The mental models of a patient and a pharmacy manager are completely different. One app trying to serve both creates cognitive overload and security complexity. Role-based access control at this scale would have become a maintenance nightmare.",
              },
              {
                label: "Concept B — Federated Apps with Shared Backend Only",
                status: "rejected",
                desc: "Six completely independent apps sharing only a backend API. Each product team would build their own design system and UX patterns.",
                why: "Rejected. Without a shared design layer, the platform would fragment into six inconsistent experiences. Users who touched multiple apps (like doctors who used both mobile and web) would face entirely different design languages.",
              },
              {
                label: "Concept C — Unified Design System + Purpose-Built Products ✓",
                status: "chosen",
                desc: "Six purpose-built products, each designed for a specific mental model — but all sharing a unified design system with shared components, tokens, and interaction patterns. The backend data layer provides seamless information flow across all products.",
                why: "Chosen. This approach gave each product the UX freedom to serve its users perfectly, while ensuring the platform felt coherent, consistent, and trustworthy across all six touchpoints. This is the architecture that scales.",
              },
            ].map(({ label, status, desc, why }) => (
              <div key={label} className="p-6 rounded-2xl border"
                style={status === "chosen"
                  ? { borderColor: `${ACCENT}40`, background: `${ACCENT}06` }
                  : { borderColor: "var(--border)", background: "var(--bg-subtle)", opacity: 0.75 }
                }
              >
                <div className="flex items-start gap-3 mb-3">
                  {status === "chosen"
                    ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                    : <XCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
                  }
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{label}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2 leading-relaxed pl-7">{desc}</p>
                <p className="text-xs text-[var(--text-tertiary)] italic pl-7">{why}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 08 · DESIGNING THE ECOSYSTEM                                   */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="08" text="Designing the Ecosystem" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Building six experiences that feel like one.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            Each product was designed independently but under a shared design system. Key features, interaction
            patterns, and navigation structures were documented as cross-platform standards.
          </p>

          <div className="space-y-8">
            {[
              {
                product: "Patient Mobile App",
                icon: Users,
                color: "#0EA5E9",
                features: [
                  { name: "Smart Appointment Booking", desc: "Real-time doctor availability, specialty filter, location-based search, and instant confirmation." },
                  { name: "Unified Medical Records", desc: "Complete health history — diagnoses, medications, lab results, and doctor notes in one timeline." },
                  { name: "Prescription Tracking", desc: "View active prescriptions, receive pharmacy status updates, and set medication reminders." },
                  { name: "In-App Doctor Communication", desc: "Secure messaging with assigned doctors for follow-up questions without booking a new appointment." },
                ],
              },
              {
                product: "Doctor Mobile App",
                icon: Heart,
                color: "#7C3AED",
                features: [
                  { name: "Consultation Queue", desc: "Real-time view of today's patients with status indicators, wait times, and priority flags." },
                  { name: "Patient History Access", desc: "Full patient record accessible before consultation — diagnoses, medications, allergies, and past visits." },
                  { name: "Smart Scheduling", desc: "Manage availability, block leave, and receive notifications when schedule changes occur." },
                  { name: "Digital Prescription Writing", desc: "Write and send prescriptions directly to the patient's pharmacy — no paper, no phone calls." },
                ],
              },
              {
                product: "Clinic Management Portal",
                icon: Building2,
                color: "#F59E0B",
                features: [
                  { name: "Appointment Command Center", desc: "Master view of all appointments across all doctors with conflict detection and real-time status." },
                  { name: "Staff Management", desc: "Assign, schedule, and monitor clinic staff with role-based access per team member." },
                  { name: "Operational Analytics", desc: "Daily, weekly, and monthly reports on patient throughput, doctor utilization, and revenue metrics." },
                  { name: "Patient Flow Management", desc: "Queue management with check-in kiosks, waiting room status, and estimated consultation times." },
                ],
              },
            ].map(({ product, icon: Icon, color, features }) => (
              <div key={product} className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--border)]"
                  style={{ background: `${color}08` }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{product}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                  {features.map(({ name, desc }) => (
                    <div key={name} className="p-5">
                      <p className="font-medium text-xs text-[var(--text-primary)] mb-1.5 flex items-center gap-1.5">
                        <Zap size={11} style={{ color }} />{name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 09 · INFORMATION ARCHITECTURE                                  */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="09" text="Information Architecture" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Structure that scales across six products.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            The IA for each product had to be simple enough for its specific users, yet consistent enough
            to feel part of a single platform. I ran card sorting sessions with representative users from each
            stakeholder group before finalizing any navigation structure.
          </p>
          <Visual label="Cross-Platform IA — Site Maps, Navigation Structures & Data Relationships" height="h-72" icon={Layers} />

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "1 unified design token system",
              "Consistent navigation patterns",
              "Shared authentication layer",
              "Role-based permission model",
              "3 rounds of card sorting",
              "Zero redundant navigation paths",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                <p className="text-xs text-[var(--text-secondary)]">{item}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 10 · DESIGN ITERATIONS                                         */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SectionLabel n="10" text="Design Iterations" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Three rounds. Major evolution.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            No product shipped in its first version. Here is the documented evolution across three major
            iteration rounds — each driven by stakeholder feedback and usability insights.
          </p>
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="space-y-5"
          >
            <IterationBlock
              version="VERSION 1"
              title="Lo-Fi Wireframes + System Architecture"
              feedback="Stakeholders liked the vision but found the navigation too complex for clinical staff."
              problems={[
                "Patient app had 8-level deep navigation for records",
                "Clinic portal showed too much data on the dashboard simultaneously",
                "No clear visual distinction between mobile and web products",
              ]}
              changes={[
                "Reduced all navigation to maximum 3 levels deep",
                "Introduced progressive disclosure — summary first, detail on demand",
                "Established distinct visual grammar for mobile vs web contexts",
              ]}
              outcome="Stakeholder alignment session rated the revised architecture 8.5/10. Greenlighted for mid-fi development."
            />
            <IterationBlock
              version="VERSION 2"
              title="Mid-Fidelity Designs + Usability Testing"
              feedback="Doctors found the consultation workflow too many taps. Pharmacists couldn't verify prescriptions quickly enough."
              problems={[
                "Doctor app required 7 taps to access patient history during consultation",
                "Prescription verification in pharmacy portal had no confidence indicators",
                "Patient appointment cancellation flow lacked clear confirmation states",
              ]}
              changes={[
                "Redesigned doctor app consultation view as a single-screen panel system",
                "Added drug interaction flags and confidence scores to pharmacy prescription view",
                "Added clear multi-step confirmation with undo option for all destructive actions",
              ]}
              outcome="Task completion rate for doctor consultation flow improved from 52% to 94% in retesting."
            />
            <IterationBlock
              version="VERSION 3"
              title="High-Fidelity Final Designs + Developer Handoff"
              feedback="Engineering flagged 3 animations as not feasible in sprint timeline. CEO wanted a more premium visual feel."
              problems={[
                "Complex microanimations not achievable without significant timeline extension",
                "Color contrast in some states failed WCAG AA",
                "Design system components not annotated for developer reference",
              ]}
              changes={[
                "Replaced complex animations with CSS transition-based equivalents",
                "Audited and corrected all 23 contrast failures across all six products",
                "Created complete Figma handoff kit with 80+ annotated components",
              ]}
              outcome="Zero design-to-development rejects. All six products shipped to staging within sprint timeline."
            />
          </motion.div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 11 · COLLABORATION                                             */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="11" text="Collaboration" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Six products require six kinds of collaboration.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
            The hardest part of this project wasn&apos;t designing screens — it was managing alignment across
            5 different stakeholder groups who all had competing priorities and very different mental models.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                person: "CEO",
                dynamic: "Vision was ambitious and constantly evolving. I managed this by creating a 'North Star' design — a full-platform prototype that captured the long-term vision — while maintaining a separate sprint-ready spec for immediate development. The CEO approved both, which eliminated scope creep during sprints.",
                win: "Established a weekly design review that separated vision from delivery.",
              },
              {
                person: "Product Manager",
                dynamic: "Constant tension between feature completeness and sprint deadlines. I introduced a feature priority matrix — every design decision was tagged as P0/P1/P2. PM could de-scope P2 items without impacting core UX quality. This gave us a shared language for trade-offs.",
                win: "Feature matrix reduced priority disputes by 70% in the last 4 weeks.",
              },
              {
                person: "Doctors (as users)",
                dynamic: "Doctors were the most demanding users — highly specific, time-poor, and used to paper. Early prototypes felt too 'tech-forward.' I redesigned the doctor app to mimic familiar clinical paper form patterns, reducing the learning curve significantly.",
                win: "Doctor app usability scores jumped from 58% to 91% satisfaction after redesign.",
              },
              {
                person: "Developers",
                dynamic: "Frontend team had concerns about animation complexity and responsive breakpoints across 6 products. I paired with engineers to create a shared CSS token system that made responsive layouts component-level decisions, not one-off overrides.",
                win: "Shared token system cut frontend rework by an estimated 40%.",
              },
            ].map(({ person, dynamic, win }) => (
              <div key={person} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: ACCENT }}
                  >{person[0]}</div>
                  <p className="font-semibold text-sm text-[var(--text-primary)]">{person}</p>
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
        {/* 12 · CHALLENGES                                                */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="12" text="Challenges" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-8"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            The problems that tested every skill I had.
          </h2>
          <div className="space-y-4">
            {[
              {
                challenge: "Designing 6 products simultaneously without losing consistency",
                solution: "Built the design system first, before designing any product screen. Every product was a composition of shared components with product-specific adaptations. This made consistency structural, not dependent on manual checking.",
              },
              {
                challenge: "Healthcare workflow complexity across stakeholder boundaries",
                solution: "Created a master workflow map that showed every trigger, handoff, and dependency across all six products. Any new feature had to be validated against this map before design began — ensuring no unintended consequences.",
              },
              {
                challenge: "Accessibility compliance across a highly varied user base",
                solution: "Applied WCAG 2.1 AA as the baseline across all six products. Conducted accessibility audits at the end of every iteration. Resulted in 23 contrast corrections and improved keyboard navigation in the web portals.",
              },
              {
                challenge: "Cross-platform data consistency with no real-time API yet",
                solution: "Designed with optimistic UI patterns — the interface assumes successful operations and shows rollback states only when needed. This created a seamless experience while engineering caught up with real-time data infrastructure.",
              },
              {
                challenge: "Scaling the design system to 6 products with different interaction contexts",
                solution: "Established three layers in the design system: foundation (universal tokens), platform (mobile vs web patterns), and product (specific adaptations). Any layer could be modified without breaking the others.",
              },
            ].map(({ challenge, solution }) => (
              <div key={challenge} className="flex gap-5 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
                <div>
                  <p className="font-semibold text-sm text-[var(--text-primary)] mb-1.5">{challenge}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{solution}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 13 · FINAL SOLUTION                                            */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="13" text="Final Solution" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-4"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            Six products. One coherent ecosystem.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
            The final platform delivered purpose-built, high-fidelity experiences for every stakeholder —
            all sharing a unified design language and a connected data layer.
          </p>

          {/* Real healthcare screenshot as hero visual */}
          <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl mb-6"
            style={{ boxShadow: `0 24px 64px rgba(14,165,233,0.18), 0 4px 16px rgba(0,0,0,0.1)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/healthcare.png" alt="Unified Healthcare Platform — Final Design" className="w-full h-auto object-cover block" draggable={false} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Users, label: "Patient Mobile App", desc: "Appointments, records, prescriptions, and doctor communication", color: "#0EA5E9" },
              { icon: Heart, label: "Doctor Mobile App", desc: "Consultation queue, patient history, scheduling, and prescriptions", color: "#7C3AED" },
              { icon: Monitor, label: "Doctor Web Portal", desc: "Advanced management, analytics, and full practice operations", color: "#10B981" },
              { icon: Building2, label: "Clinic Portal", desc: "Appointment management, staff coordination, and operations", color: "#F59E0B" },
              { icon: Pill, label: "Pharmacy Portal", desc: "Prescription fulfillment, inventory, and order workflows", color: "#EF4444" },
              { icon: Shield, label: "Super Admin Dashboard", desc: "Platform governance, monitoring, and user management", color: "#6366F1" },
            ].map(({ icon: Icon, label, desc, color }) => (
              <div key={label} className="p-4 rounded-2xl border flex items-start gap-3"
                style={{ borderColor: `${color}25`, background: `${color}06` }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-xs text-[var(--text-primary)] mb-0.5">{label}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 14 · OUTCOMES                                                  */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}
          className="py-14 px-10 rounded-3xl text-center"
          style={{ background: `linear-gradient(135deg, ${ACCENT}14 0%, ${ACCENT}06 60%, transparent 100%)`, border: `1px solid ${ACCENT}22` }}
        >
          <SectionLabel n="14" text="Outcomes" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-10"
            style={{ fontSize: "clamp(26px, 3.8vw, 44px)" }}
          >
            A platform that replaced fragmentation with clarity.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <Stat value="6" label="Interconnected Products Delivered" />
            <Stat value="5" label="Stakeholder Types Unified" />
            <Stat value="34" label="Manual Processes Automated" />
            <Stat value="0" label="Design-to-Dev Rejects on Handoff" />
            <Stat value="91%" label="Doctor Satisfaction in Usability Testing" />
            <Stat value="1" label="Unified Design System Across All Products" />
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 15 · REFLECTION                                                */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={FU}>
          <SectionLabel n="15" text="Reflection" />
          <h2 className="font-display font-bold text-[var(--text-primary)] leading-tight mb-6"
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)" }}
          >
            What this project taught me about designing at scale.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>What Worked Well</p>
              <div className="space-y-3">
                {[
                  "Building the design system before any product screen — it made consistency inevitable",
                  "The dependency map became the single most important artifact of the project",
                  "Paired design reviews with engineers caught technical constraints before they became rework",
                  "Splitting North Star vision from sprint-ready specs eliminated scope creep",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                    <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-amber-500">What I Would Improve</p>
              <div className="space-y-3">
                {[
                  "Invest more time in ethnographic research — especially shadowing clinical staff on actual work days",
                  "Build a cross-product usability testing pipeline earlier in the process",
                  "Create a dedicated design system governance process with versioning",
                  "Design mobile-first even for web portals — clinic and pharmacy staff often access on tablets",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <RefreshCw size={14} className="mt-0.5 shrink-0 text-amber-500" />
                    <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl" style={{ background: `${ACCENT}0C`, border: `1px solid ${ACCENT}22` }}>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed italic mb-3">
              &ldquo;Designing a single great product is hard. Designing six products that feel like one coherent
              platform taught me that the most valuable design work happens before any screen is created —
              in the research, the architecture, and the systems thinking that holds everything together.&rdquo;
            </p>
            <p className="text-xs font-mono" style={{ color: ACCENT }}>— Ganesh Muniganti · Dimension Leap Healthcare Platform, 2025</p>
          </div>
        </motion.section>

      </div>

      {/* ── Next project ────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-6 text-center">Next Project</p>
          <Link href="/work/phonepe-ux-redesign" className="block group max-w-lg mx-auto">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all bg-[var(--bg)]">
              <div>
                <p className="text-xs text-[var(--text-secondary)] mb-1">UX Research &amp; Product Design</p>
                <p className="font-display font-bold text-xl text-[var(--text-primary)]">Enhancing PhonePe&apos;s Usability</p>
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
