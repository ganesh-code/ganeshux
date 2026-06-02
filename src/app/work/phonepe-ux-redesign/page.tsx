"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Clock,
  TrendingUp,
  CheckCircle2,
  Star,
  AlertTriangle,
  Layout,
  Search,
  Compass,
  Eye,
  Check,
  X,
  Sparkles,
  Layers,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  BarChart3,
  MessageSquare,
  Bookmark,
  Award,
} from "lucide-react";
import { projects } from "@/data/projects";

const color = "#6C47FF";

/* ─── Animation preset ─────────────────────────────── */
const up = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ─── Section label + title ─────────────────────────── */
function SectionHeading({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0 shadow-md shadow-purple-500/10"
        style={{ background: `linear-gradient(135deg, ${color}, #8B5CF6)` }}
      >
        {num}
      </span>
      <h2 className="font-inter-tight font-black text-2xl md:text-3xl text-[var(--text-primary)] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

/* ─── Divider ───────────────────────────────────────── */
function Divider() {
  return <div className="border-t border-[var(--border)] my-24" />;
}

/* ─── Premium Phone Shell ─────────────────────────────── */
function Phone({
  label,
  children,
  tag,
  tagColor = color,
}: {
  label: string;
  children: React.ReactNode;
  tag?: string;
  tagColor?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      {tag && (
        <span
          className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm"
          style={{ background: `${tagColor}12`, color: tagColor }}
        >
          {tag}
        </span>
      )}
      <div
        className="relative w-[230px] rounded-[38px] overflow-hidden border-[8px] border-black bg-black flex-shrink-0"
        style={{
          height: 460,
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black z-30 rounded-full flex items-center justify-between px-3">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
          <div className="w-8 h-1 bg-gray-900 rounded-full" />
        </div>
        
        {/* Screen Content Wrapper */}
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
      <p className="text-xs font-medium text-[var(--text-secondary)] text-center max-w-[210px] leading-relaxed">
        {label}
      </p>
    </div>
  );
}

/* ─── Phone Screens ─── */
function OldHomeScreen() {
  const grid = [
    { name: "Send", icon: "💸" },
    { name: "Receive", icon: "💰" },
    { name: "Scan & Pay", icon: "📸", highlight: true },
    { name: "Bill Pay", icon: "📄" },
    { name: "Recharge", icon: "📱" },
    { name: "Travel", icon: "✈️" },
    { name: "Insurance", icon: "🛡️" },
    { name: "More", icon: "➕" }
  ];
  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAFA] text-[#111111] font-sans">
      {/* Header */}
      <div className="bg-[#5f259f] px-3 pt-6 pb-2.5 text-white flex flex-col gap-1.5 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-tight uppercase">PhonePe</span>
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[7px]">👤</div>
        </div>
        <div className="bg-white/10 rounded-md px-2 py-1 text-left">
          <span className="text-[7px] text-white/50 block truncate">Search mobile, bank account...</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-2.5 overflow-hidden flex flex-col gap-2.5">
        <div>
          <p className="text-[7px] text-gray-400 font-bold mb-1 uppercase tracking-wider text-left">Transfer Money</p>
          <div className="grid grid-cols-4 gap-1.5">
            {grid.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-0.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    item.highlight ? "border border-red-500 bg-red-50 animate-pulse" : "bg-white border border-gray-100"
                  }`}
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}
                >
                  <span className="text-[10px]">{item.icon}</span>
                </div>
                <span className="text-[6px] text-gray-500 font-bold text-center leading-tight truncate w-full">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Clutter Alert */}
        <div className="mt-1 flex items-start gap-1 bg-red-50 border border-red-100 rounded-lg p-1.5 text-left shrink-0">
          <AlertTriangle size={8} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-[6px] text-red-700 leading-normal font-medium">
            <strong>Critical Issue:</strong> Scan &amp; Pay is buried inside the grid. Demographics face severe friction trying to scan fast.
          </p>
        </div>

        {/* Ads and Banners */}
        <div className="mt-auto space-y-1.5 shrink-0">
          <div className="w-full h-8 rounded-lg bg-gray-100 border border-gray-200/50 flex items-center justify-center p-1.5 text-left">
            <div>
              <div className="w-4 h-1.5 rounded-sm bg-gray-200 mb-0.5" />
              <div className="w-8 h-1 rounded-sm bg-gray-200" />
            </div>
          </div>
          <div className="w-full h-8 rounded-lg bg-gray-100 border border-gray-200/50 flex items-center justify-center p-1.5 text-left">
            <div className="w-12 h-1 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NewHomeScreen() {
  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAFA] text-[#111111] font-sans relative">
      {/* Header */}
      <div className="bg-[#6C47FF] px-3 pt-6 pb-3 text-white flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-[6px] text-white/60 uppercase tracking-wider font-semibold">Good morning</p>
            <p className="text-[9px] font-black text-white">Rahul Sharma 👋</p>
          </div>
          <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-[8px] font-extrabold shadow-sm">
            R
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-2.5 py-1.5 flex justify-between items-center border border-white/5 shadow-inner">
          <div className="text-left">
            <p className="text-[5px] text-white/60 uppercase font-bold tracking-wider">Primary Balance</p>
            <p className="text-[10px] font-black text-white leading-tight">₹ 12,450.00</p>
          </div>
          <span className="text-[5px] font-bold text-[#6C47FF] bg-white px-2 py-0.5 rounded-full shadow-sm">Details →</span>
        </div>
      </div>

      {/* Floating FAB for Scan & Pay */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${color}, #8B5CF6)`,
            boxShadow: "0 8px 20px -2px rgba(108,71,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span className="text-[8px]">📸</span>
          <span className="text-[7px] font-black text-white uppercase tracking-widest">Scan &amp; Pay</span>
        </div>
      </div>

      {/* Clean 4 actions */}
      <div className="p-3 flex-1 flex flex-col gap-3 overflow-hidden">
        <div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Send", color: "#6C47FF", icon: "💸" },
              { label: "Bills", color: "#6C47FF", icon: "📄" },
              { label: "Recharge", color: "#6C47FF", icon: "📱" },
              { label: "More", color: "#6C47FF", icon: "➕" }
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                  <span className="text-[10px]">{item.icon}</span>
                </div>
                <span className="text-[6.5px] text-gray-500 font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Recents List */}
        <div>
          <p className="text-[7px] font-bold text-gray-400 mb-1 uppercase tracking-wider text-left">Recent Transactions</p>
          <div className="space-y-1">
            {[
              { name: "Swiggy Delivery", amount: "−₹240", sub: "Food delivery" },
              { name: "Rahul Verma", amount: "−₹500", sub: "Bank transfer" },
              { name: "BSNL Recharge", amount: "−₹1,200", sub: "Utilities" }
            ].map(item => (
              <div key={item.name} className="flex items-center justify-between p-1 rounded-lg bg-white border border-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.01)] text-left">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-purple-50 flex items-center justify-center text-[6px] font-bold text-[#6C47FF]">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-[7px] font-bold text-gray-700 leading-tight">{item.name}</p>
                    <p className="text-[5px] text-gray-400">{item.sub}</p>
                  </div>
                </div>
                <span className="text-[7px] font-bold text-gray-600">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="border-t border-gray-100 bg-white/90 backdrop-blur-md flex justify-around py-2 px-2 shrink-0">
        {[
          { icon: "🏠", active: true },
          { icon: "📋", active: false },
          { icon: "📷", active: false },
          { icon: "👤", active: false }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center">
            <span className={`text-[9px] ${item.active ? "opacity-100" : "opacity-30"}`}>{item.icon}</span>
            {item.active && <div className="w-2.5 h-0.5 rounded-full mt-0.5" style={{ background: "#6C47FF" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat card ─────────────────────────────────────── */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center py-7 px-4 rounded-3xl border border-[var(--border)] bg-white dark:bg-[#111] shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-md hover:border-purple-500/20 transition-all">
      <p
        className="font-inter-tight font-black text-3xl md:text-4xl mb-1 tracking-tight"
        style={{ color }}
      >
        {value}
      </p>
      <p className="text-xs font-semibold text-[var(--text-secondary)] leading-relaxed uppercase tracking-wider text-[10px]">{label}</p>
    </div>
  );
}

/* ─── Review card ───────────────────────────────────── */
function ReviewCard({
  stars,
  text,
  platform,
}: {
  stars: number;
  text: string;
  platform: string;
}) {
  return (
    <div className="p-6 rounded-3xl border border-[var(--border)] bg-white dark:bg-[#111] flex flex-col gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              fill={i < stars ? "#F59E0B" : "none"}
              stroke={i < stars ? "#F59E0B" : "#d1d5db"}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] bg-gray-50 dark:bg-gray-800/40 px-2 py-0.5 rounded-full">
          {platform}
        </span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">&ldquo;{text}&rdquo;</p>
    </div>
  );
}

/* ─── Bar chart row ─────────────────────────────────── */
function Bar({ label, pct, icon: IconComponent }: { label: string; pct: number; icon: any }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2.5 font-sans">
          <span className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-[#6C47FF] shrink-0">
            <IconComponent size={14} />
          </span>
          {label}
        </span>
        <span className="text-sm font-bold tabular-nums text-[#6C47FF]">
          {pct}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, #A78BFA)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ─── Main Case Study Page ─── */
export default function PhonePeCaseStudy() {
  const nextProject = projects.find((p) => p.slug === "creatiwise-website-redesign")!;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#111] border border-[var(--border)] text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-md shadow-gray-200/50 dark:shadow-none"
        >
          <ArrowLeft size={12} />
          Back to Work
        </Link>
      </motion.div>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-32 pb-20 border-b border-[var(--border)] bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6C47FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom max-w-3xl relative z-10">
          <motion.div variants={up} initial="hidden" animate="show" className="space-y-6">
            {/* Type tag */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: `${color}12`, color }}
            >
              <Sparkles size={12} />
              Mobile App · UX Research &amp; Design · 2024
            </div>

            {/* Title */}
            <h1 className="font-inter-tight font-black text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] leading-[1.08] tracking-tight">
              PhonePe UX Redesign
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-medium">
              Reimagining India&apos;s most-used payment app — improving feature discovery,
              accessibility, and navigation for 500 million users.
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--text-secondary)] pt-2 border-t border-[var(--border)] mt-4">
              <span className="flex items-center gap-2">
                <Users size={14} style={{ color }} />
                <span className="font-bold text-[var(--text-primary)]">Lead UX Designer</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} style={{ color }} />
                <span className="font-bold text-[var(--text-primary)]">12 Weeks</span>
              </span>
              <span className="bg-gray-50 dark:bg-gray-900/60 px-3 py-1 rounded-lg text-xs font-mono border border-[var(--border)]">
                Figma · Maze · Hotjar · FigJam · Principle
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────── */}
      <section className="py-12 border-b border-[var(--border)] bg-gray-50/50 dark:bg-black/20">
        <div className="container-custom max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "50%", label: "Faster discovery" },
              { value: "30%", label: "Fewer return actions" },
              { value: "WCAG AA", label: "Accessibility score" },
              { value: "4.6 ★", label: "Post-launch rating" },
            ].map((m, i) => (
              <motion.div
                key={m.value}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <StatCard value={m.value} label={m.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────── */}
      <div className="container-custom max-w-3xl py-24">
        
        {/* ── 01 Problem ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="01" title="Problem Statement" />
          <div
            className="rounded-3xl p-8 border-l-4 text-[var(--text-secondary)] leading-relaxed text-base shadow-sm relative overflow-hidden"
            style={{ borderColor: color, background: `${color}06` }}
          >
            <div className="absolute top-4 right-4 text-purple-200 dark:text-purple-950/40 font-mono text-7xl select-none font-bold">!</div>
            <p className="relative z-10 text-base leading-relaxed">
              Users struggled to discover key features quickly in PhonePe&apos;s dense interface.
              Critical actions like <strong className="text-[var(--text-primary)]">Scan &amp; Pay</strong> were
              buried under multiple visual rows, causing high friction and elevated return-action rates. The app
              also presented significant accessibility gaps and inconsistent navigation flow.
            </p>
          </div>
        </motion.section>

        <Divider />

        {/* ── 02 Overview + Phones ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="02" title="Overview" />
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-12">
            PhonePe serves over <strong className="text-[var(--text-primary)]">500 million users</strong> in India,
            handling payments, investments, and utilities. Despite massive scale, user research
            revealed significant friction in core task flows — particularly around feature discovery
            and accessibility for diverse demographics.
          </p>

          {/* Phones side by side */}
          <div className="rounded-3xl border border-[var(--border)] bg-gray-50/50 dark:bg-[#111]/10 p-8 md:p-12 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-10 text-center">
              Interaction Comparison
            </p>
            <div className="flex items-start justify-center gap-8 md:gap-14 flex-wrap">
              <Phone label="Overcrowded UI · Scan feature buried inside dense layout" tag="Before Design" tagColor="#EF4444">
                <OldHomeScreen />
              </Phone>
              
              <div className="hidden lg:flex flex-col items-center justify-center self-center gap-3 pt-8">
                <div className="w-10 h-px bg-[var(--border)]" />
                <ArrowRight size={18} style={{ color }} />
                <div className="w-10 h-px bg-[var(--border)]" />
              </div>

              <Phone label="Persistent Scan FAB · Balanced content priority" tag="Proposed UX" tagColor="#10B981">
                <NewHomeScreen />
              </Phone>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* ── 03 Primary Research ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="03" title="Primary Research" />
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-10">
            Conducted <strong className="text-[var(--text-primary)]">24 moderated usability sessions</strong> with
            participants across urban and semi-urban India, supported by
            <strong className="text-[var(--text-primary)]"> 10,000+ Hotjar heatmap sessions</strong> to identify
            dead zones and rage-click patterns.
          </p>

          {/* 4 quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { val: "68%", label: "Failed to find scan under 5s" },
              { val: "24", label: "Moderated sessions" },
              { val: "10k+", label: "Heatmap trackings" },
              { val: "2.3×", label: "Return-action multiplier" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="p-5 rounded-3xl border border-[var(--border)] bg-white dark:bg-[#111] text-center shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
              >
                <p className="font-inter-tight font-black text-2xl" style={{ color }}>{val}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mt-1.5 leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* Pain point bars */}
          <div className="rounded-3xl border border-[var(--border)] bg-white dark:bg-[#111] p-8 space-y-6 shadow-sm">
            <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2 text-left">
              <BarChart3 size={18} className="text-purple-500" />
              Pain Points Identified in Sessions
            </h3>
            <Bar icon={Layout} label="App feels cluttered and overwhelming" pct={71} />
            <Bar icon={Search} label="Cannot locate Scan & Pay quickly" pct={68} />
            <Bar icon={Compass} label="Navigation layout is confusing" pct={54} />
            <Bar icon={Eye} label="Poor text contrast & small touch targets" pct={43} />
            <Bar icon={AlertTriangle} label="Lack of prompt feedback after payment" pct={39} />
          </div>
        </motion.section>

        <Divider />

        {/* ── 04 Secondary Research ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="04" title="Secondary Research — Review Analysis" />
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-10">
            Analysed <strong className="text-[var(--text-primary)]">2,400+ reviews</strong> across Google Play
            and the App Store to validate usability feedback at a quantitative scale.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <ReviewCard stars={2} platform="Google Play" text="The new update made everything worse. I can't find where to scan QR anymore. Very frustrating for daily use." />
            <ReviewCard stars={2} platform="App Store" text="Too many options on the home screen. I just want to pay money fast — why is Scan buried?" />
            <ReviewCard stars={3} platform="Google Play" text="Good app but navigation is confusing. After paying, I never know if it went through. Needs clearer confirmation." />
            <ReviewCard stars={2} platform="App Store" text="Accessibility is poor. As a senior citizen, the text is too small to read without zooming in constantly." />
          </div>

          {/* Theme pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { theme: "Navigation", count: "847 mentions", dot: "#EF4444" },
              { theme: "Feature Discovery", count: "623 mentions", dot: color },
              { theme: "Accessibility", count: "412 mentions", dot: "#F59E0B" },
              { theme: "Payment Feedback", count: "318 mentions", dot: "#10B981" },
            ].map(({ theme, count, dot }) => (
              <div key={theme} className="p-5 rounded-3xl border border-[var(--border)] bg-white dark:bg-[#111] shadow-[0_8px_30px_rgb(0,0,0,0.01)] text-left flex flex-col justify-between min-h-[100px]">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: dot }} />
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{theme}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-medium">{count}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ── 05 Heuristic Analysis ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="05" title="Heuristic Evaluation" />
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-10">
            Mapped critical interface bottlenecks against <strong className="text-[var(--text-primary)]">Nielsen&apos;s Usability Heuristics</strong> to isolate visual architecture priorities.
          </p>

          <div className="space-y-6">
            {[
              { heuristic: "Visibility of System Status", sev: "High", issue: "Scan & Pay buried 3 taps deep inside grids", fix: "Introduce a persistent, high-contrast Floating Action Button" },
              { heuristic: "Recognition Over Recall", sev: "High", issue: "Users must navigate complex hierarchies to repeat payments", fix: "Incorporate a contextual Smart Recents list of frequent receivers" },
              { heuristic: "Aesthetic & Minimalist Design", sev: "High", issue: "16+ different visual features competing with prominent ads on Home", fix: "Implement Progressive Disclosure; reveal complex details only when needed" },
              { heuristic: "Accessibility (WCAG)", sev: "Critical", issue: "Low color contrast (2.1:1) and touch targets smaller than 40px", fix: "Reconfigure styles for 4.5:1 contrast and minimum 44px touch targets" },
              { heuristic: "Match System & Real World", sev: "Medium", issue: "Confusing terminology such as 'UPI Lite' confuses non-tech audiences", fix: "Utilize simple, user-centric copy: 'Quick Pay', 'Split Bill'" },
            ].map(({ heuristic, sev, issue, fix }) => (
              <div key={heuristic} className="p-6 bg-white dark:bg-[#111] rounded-3xl border border-[var(--border)] shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col gap-4 text-left">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                    <Bookmark size={15} style={{ color }} />
                    {heuristic}
                  </h3>
                  <span
                    className={`inline-block text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                      sev === "Critical"
                        ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"
                        : sev === "High"
                        ? "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400"
                        : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400"
                    }`}
                  >
                    {sev} Severity
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-2xl bg-red-50/40 dark:bg-red-950/10 border border-red-100/40 dark:border-red-950/20">
                    <p className="text-[10px] font-bold text-red-600 dark:text-red-400 mb-1.5 uppercase tracking-wider">Interface Friction</p>
                    <p className="text-sm text-[var(--text-secondary)] flex items-start gap-2 leading-relaxed">
                      <X size={14} className="text-red-500 shrink-0 mt-0.5" />
                      {issue}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50/40 dark:bg-green-950/10 border border-green-100/40 dark:border-green-950/20">
                    <p className="text-[10px] font-bold text-green-600 dark:text-green-400 mb-1.5 uppercase tracking-wider">UX Improvement</p>
                    <p className="text-sm text-[var(--text-secondary)] flex items-start gap-2 leading-relaxed">
                      <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                      {fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ── 06 Task Analysis ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="06" title="Task Success Metrics" />
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-10">
            Tracked usability indicators across key flows to identify which critical user tasks suffered from the highest friction levels.
          </p>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { task: "Send Money", pct: 82, avg: "23 sec", note: "Occasional label mixups (Send vs Pay Bills)", dot: "#10B981" },
              { task: "Scan & Pay", pct: 34, avg: "78 sec", note: "68% of users selected incorrect icons on launch", dot: "#EF4444" },
              { task: "Recharge Mobile", pct: 71, avg: "41 sec", note: "Redundant flow options generated confusion", dot: "#F59E0B" },
            ].map(({ task, pct, avg, note, dot }) => (
              <div key={task} className="p-6 rounded-3xl border border-[var(--border)] bg-white dark:bg-[#111] shadow-[0_8px_30px_rgb(0,0,0,0.01)] text-left flex flex-col justify-between min-h-[230px]">
                <div>
                  <h3 className="font-black text-base text-[var(--text-primary)] mb-1 leading-tight">{task}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-4 flex items-center gap-1.5 font-medium">
                    <Clock size={12} className="text-purple-500" /> {avg} avg duration
                  </p>
                </div>
                
                <div>
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span className="text-[var(--text-secondary)]">Success Rate</span>
                    <span className="font-bold" style={{ color: dot }}>{pct}%</span>
                  </div>
                  <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: dot }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] bg-gray-50 dark:bg-gray-800/40 rounded-2xl px-3 py-2.5 leading-relaxed font-medium">
                    {note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ── 07 Solution ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="07" title="Core Design Solution" />
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-10">
            Redesign parameters prioritized <strong className="text-[var(--text-primary)]">unparalleled efficiency</strong>,
            reducing visual noise to build an aesthetic that works smoothly across all user backgrounds.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: Layout, title: "Persistent Scan FAB", desc: "Always-on floating button is highly visible from any page grid — zero visual hunting required." },
              { icon: Compass, title: "Thumb-friendly Navigation", desc: "4 primary, thumb-reachable tabs (Home, History, Scan, Profile) simplify task transition." },
              { icon: Layers, title: "Progressive Disclosure", desc: "Main actions surface by default; less critical widgets expand under a dedicated 'More' layout." },
              { icon: ShieldCheck, title: "Accessibility Standard", desc: "Fully WCAG AA compliant. Large 44px touch targets ensure a comfortable demographic interface." },
              { icon: Sparkles, title: "Smart Recents Bar", desc: "Displays frequent contacts directly above the payment viewport to speed up daily transactions." },
              { icon: MessageSquare, title: "Optimized Onboarding", desc: "Gradual step indicators guide users smoothly through registration parameters." },
            ].map(({ icon: IconComponent, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-3xl border border-[var(--border)] bg-white dark:bg-[#111] shadow-[0_8px_30px_rgb(0,0,0,0.01)] text-left">
                <span className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-[#6C47FF] shrink-0 mt-0.5">
                  <IconComponent size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1 leading-tight">{title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Prototype mockup section */}
          <div
            className="rounded-3xl border border-[var(--border)] p-8 md:p-12 shadow-sm bg-gray-50/50 dark:bg-[#111]/10"
          >
            <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-10 text-center">
              Final Refined Prototype
            </p>
            <div className="flex justify-center gap-10 flex-wrap">
              <Phone label="Proposed dynamic design layout with active highlights" tag="Home Dashboard" tagColor="#6C47FF">
                <NewHomeScreen />
              </Phone>
              
              <Phone label="Original complex interface with high feature friction" tag="Current Build" tagColor="#EF4444">
                <OldHomeScreen />
              </Phone>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* ── 08 Impact ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="08" title="Impact &amp; Results" />
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-10">
            A/B tested with <strong className="text-[var(--text-primary)]">50,000 active users</strong> over a 6-week window, comparing the redesign variant against the live application benchmark.
          </p>

          <div className="border border-[var(--border)] rounded-3xl overflow-hidden bg-white dark:bg-[#111] shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
            <div className="grid grid-cols-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/40 border-b border-[var(--border)] text-left">
              <span className="text-xs font-black uppercase tracking-wider text-[var(--text-secondary)]">Usability Indicator</span>
              <span className="text-xs font-black uppercase tracking-wider text-[var(--text-secondary)] text-center">Baseline</span>
              <span className="text-xs font-black uppercase tracking-wider text-[var(--text-secondary)] text-center">After UX Pass</span>
            </div>
            {[
              { metric: "Time to Scan & Pay", before: "78 sec", after: "8 sec" },
              { metric: "Feature Discovery Rate", before: "34%", after: "84%" },
              { metric: "Return-Action Rate", before: "Baseline", after: "↓ 30%" },
              { metric: "Onboarding Completion", before: "52%", after: "76%" },
              { metric: "App Store Rating", before: "3.9 ★", after: "4.6 ★" },
              { metric: "Accessibility Score", before: "Fail", after: "WCAG AA ✓" },
            ].map(({ metric, before, after }) => (
              <div key={metric} className="grid grid-cols-3 px-6 py-4.5 bg-white dark:bg-[#111] border-b border-[var(--border)] last:border-0 items-center text-left">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{metric}</span>
                <span className="text-sm text-[var(--text-secondary)] text-center font-medium">{before}</span>
                <span className="text-sm font-black text-center text-[#6C47FF] bg-purple-50 dark:bg-purple-950/20 px-3 py-1 rounded-full w-fit mx-auto">
                  {after}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        <Divider />

        {/* ── Key Learnings ── */}
        <motion.section variants={up} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading num="09" title="Key Takeaways" />
          <div className="space-y-5">
            {[
              "Research-driven design reduces visual iterations: structuring the floating Scan action early focused development priorities.",
              "Accessibility boosts performance parameters for everyone: increasing click target sizes optimized action speed for all users.",
              "Progressive disclosure builds high-level focus: keeping primary views clean helps drive the core transaction loop.",
              "Triangulated telemetry drives solutions: combining raw Hotjar heatmaps with App Store stories yields detailed user contexts.",
              "Fostering engineer-designer alignment prevents developmental discrepancies and layout delays.",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3.5 text-left">
                <span className="w-6 h-6 rounded-full bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-[#6C47FF] shrink-0 mt-0.5">
                  <CheckCircle2 size={13} />
                </span>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">{text}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* ── Next project ─────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-white dark:bg-[#0A0A0A]">
        <div className="container-custom max-w-3xl py-20">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] mb-6 text-center">
            Explore Next Case Study
          </p>
          <Link href={`/work/${nextProject.slug}`} className="block group max-w-md mx-auto">
            <div className="flex items-center justify-between p-6 rounded-3xl border border-[var(--border)] hover:border-purple-500/30 hover:shadow-lg transition-all bg-white dark:bg-[#111]">
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">{nextProject.type}</p>
                <p className="font-inter-tight font-black text-lg text-[var(--text-primary)] tracking-tight">
                  {nextProject.title}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[#6C47FF]
                  group-hover:bg-[#6C47FF] group-hover:text-white group-hover:border-[#6C47FF] transition-all shrink-0 shadow-sm"
              >
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
