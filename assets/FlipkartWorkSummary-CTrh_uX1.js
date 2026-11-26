import { r as React, j as jsxRuntime } from "./index--rniiPa8.js";
import {
  C as CaseStudyPage,
  HighlightPill,
  ScriptEyebrow,
  StatCallout,
  QuoteBox,
  RoleCard
} from "./CaseStudyPage-9gYWHVeG.js";

const { jsx: _jsx, jsxs: _jsxs, Fragment: _Fragment } = jsxRuntime;

const ACCENT = "#0EA5E9";
const ACCENT2 = "#7C3AED";
const EMERALD = "#10B981";
const AMBER = "#F59E0B";
const RED = "#EF4444";

const TOC_SECTIONS = [
  { id: "hc-impact", label: "Impact" },
  { id: "hc-context", label: "My role" },
  { id: "hc-opportunity", label: "The Opportunity" },
  { id: "hc-foundation", label: "Design System" },
  { id: "hc-ai", label: "Where AI Belongs" },
  { id: "hc-platform", label: "6 Products Architecture" },
  { id: "hc-figma", label: "Shipping the Product" },
  { id: "hc-reflection", label: "Reflections" },
  { id: "hc-up-next", label: "Up Next" }
];

function Tag({ text, color }) {
  return _jsx("span", {
    className: "text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full border",
    style: { background: `${color}12`, borderColor: `${color}35`, color },
    children: text
  });
}

function CheckIcon({ color = "#10B981", size = 14 }) {
  return _jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "shrink-0",
    children: _jsx("path", { d: "M20 6 9 17l-5-5" })
  });
}

function CrossIcon({ color = "#EF4444", size = 14 }) {
  return _jsxs("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "shrink-0",
    children: [
      _jsx("circle", { cx: "12", cy: "12", r: "10" }),
      _jsx("path", { d: "m15 9-6 6" }),
      _jsx("path", { d: "m9 9 6 6" })
    ]
  });
}

function ArrowRightIcon({ size = 13 }) {
  return _jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: _jsx("path", { d: "M5 12h14m-7-7 7 7-7 7" })
  });
}

function ChevronDownIcon({ size = 14 }) {
  return _jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "text-neutral-400",
    children: _jsx("path", { d: "m6 9 6 6 6-6" })
  });
}

export default function HealthcareCaseStudy(props) {
  return _jsx(CaseStudyPage, {
    eyebrow: "Case Study",
    title: "UNIFYING CLINICAL HEALTHCARE SCALED RETENTION",
    highlightedText: "TO 80%",
    subheadline: "How I evolved a single-clinic booking application into a 0→1 multi-clinic platform across 6 connected products, integrating AI without disrupting familiar healthcare workflows.",
    role: "Lead Product Designer",
    platforms: "Mobile & Web Portals",
    scope: "6 Products · Design System",
    timeline: "2024–25",
    sections: TOC_SECTIONS,
    transitionPhase: props?.transitionPhase,
    heroMedia: _jsxs("div", {
      className: "cs-hero-banner cs-hero-banner-hc",
      children: [
        _jsxs("div", {
          className: "cs-hero-banner-text",
          children: [
            _jsx("span", {
              className: "cs-hero-banner-cat",
              children: "TAMIRA HEALTH ECOSYSTEM"
            }),
            _jsx("h2", {
              className: "cs-hero-banner-title",
              children: "0→1 CLINICAL PLATFORM ARCHITECTURE"
            }),
            _jsx("p", {
              className: "cs-hero-banner-script",
              children: "5 connected products · 1 unified data layer ↗"
            })
          ]
        }),
        _jsx("div", {
          className: "cs-hero-banner-mockup",
          children: _jsx("img", {
            src: "/Healthcare Project/bannerHealthcareproject.jpg",
            alt: "Tamira Health Platform",
            className: "w-full h-auto object-cover block"
          })
        }),
        _jsx("span", {
          className: "cs-hero-banner-watermark",
          children: "TAMIRA"
        })
      ]
    }),
    children: _jsxs(_Fragment, {
      children: [
        /* ── 01. IMPACT ── */
        _jsxs("section", {
          id: "hc-impact",
          className: "cs-section",
          children: [
            _jsx(ScriptEyebrow, { children: "Impact" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "WHAT IT SET OUT TO MOVE ",
                _jsx(HighlightPill, { children: "NUMBERS" })
              ]
            }),
            _jsxs("div", {
              className: "cs-stat-grid",
              children: [
                _jsx(StatCallout, {
                  value: "80% Repeat Consults",
                  label: "patient retention achieved through connected consultation pipelines and unified electronic health records."
                }),
                _jsx(StatCallout, {
                  value: "300+ Screens",
                  label: "shipped across 5 integrated portals without design debt, powered by an atomic design system built upfront."
                })
              ]
            })
          ]
        }),

        /* ── 02. CONTEXT & MY ROLE ── */
        _jsxs("section", {
          id: "hc-context",
          className: "cs-section",
          children: [
            _jsx(ScriptEyebrow, { children: "Context" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "WHAT ",
                _jsx(HighlightPill, { children: "THE PROJECT" }),
                " WAS, AND WHERE I SAT IN IT."
              ]
            }),
            _jsxs("div", {
              className: "space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed mb-8",
              children: [
                _jsx("p", {
                  children: "Tamira Aesthetic Clinic initially approached us to build a patient booking mobile application. As we explored the clinical and operational workflows, we realized the core problem extended far beyond appointment scheduling. Instead of solving it for a single clinic, the product evolved into a platform supporting multiple clinics under one connected ecosystem."
                }),
                _jsx("p", {
                  children: "I led the product and UX architecture across the ecosystem, working closely with clinical doctors, clinic admins, pharmacy leads, and an engineering team of frontend, backend, and QA specialists."
                })
              ]
            }),
            _jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12",
              children: [
                _jsx(RoleCard, { title: "I audited clinical doctor workflows" }),
                _jsx(RoleCard, { title: "I built the shared design system in 2 weeks" }),
                _jsx(RoleCard, { title: "I architected the 6 connected portals" })
              ]
            })
          ]
        }),

        /* ── 03. THE BUSINESS OPPORTUNITY ── */
        _jsxs("section", {
          id: "hc-opportunity",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "The Opportunity" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "IT STARTED AS A BOOKING APP. ",
                _jsx(HighlightPill, { children: "IT BECAME A PLATFORM." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Tamira Aesthetic Clinic initially approached us to build a patient booking application. As we explored the business and operational workflows, we realized the problem extended far beyond appointment scheduling. Instead of solving it for a single clinic, the product evolved into a platform that could support multiple aesthetic clinics under one connected ecosystem."
            }),
            _jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10",
              children: [
                _jsxs("div", {
                  className: "p-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 shadow-xs",
                  children: [
                    _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-3 text-red-600", children: "ORIGINAL REQUEST" }),
                    _jsx("p", { className: "text-lg font-bold text-[#0A0A0A] mb-2", children: "“Build a patient booking app for our clinic.”" }),
                    _jsx("p", { className: "text-sm text-neutral-600 leading-relaxed", children: "Designed for one clinic, one patient journey, and one operational workflow." })
                  ]
                }),
                _jsxs("div", {
                  className: "p-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 shadow-xs",
                  children: [
                    _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-3 text-emerald-700", children: "WHAT WE ACTUALLY BUILT" }),
                    _jsx("p", { className: "text-lg font-bold text-[#0A0A0A] mb-2", children: "A connected platform for aesthetic clinics with shared patient data, clinic operations, pharmacy management, and AI-assisted healthcare workflows." }),
                    _jsx("p", { className: "text-sm text-neutral-700 leading-relaxed", children: "Multi-clinic scaling. Five integrated user portals. One unified data layer." })
                  ]
                })
              ]
            }),
            _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-2 text-neutral-500 uppercase", children: "THE FIVE PRODUCTS" }),
            _jsx("p", { className: "text-base font-bold text-[#0A0A0A] mb-4", children: "One platform. Five products. One shared source of truth." }),
            _jsx("div", {
              className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10",
              children: [
                { label: "Patient App", sub: "Mobile", color: ACCENT },
                { label: "Doctor Portal", sub: "Web", color: ACCENT2 },
                { label: "Clinic Portal", sub: "Web", color: EMERALD },
                { label: "Pharmacy", sub: "Web", color: AMBER },
                { label: "Admin Panel", sub: "Web", color: RED }
              ].map(({ label, sub, color }) =>
                _jsxs("div", {
                  className: "flex flex-col items-center gap-2 p-4 rounded-2xl border border-neutral-200 bg-white shadow-xs text-center",
                  children: [
                    _jsx("div", {
                      className: "w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs",
                      style: { background: `${color}15`, color },
                      children: label.slice(0, 2).toUpperCase()
                    }),
                    _jsx("p", { className: "text-xs font-bold text-[#0A0A0A]", children: label }),
                    _jsx("span", {
                      className: "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                      style: { background: `${color}10`, borderColor: `${color}30`, color },
                      children: sub
                    })
                  ]
                }, label)
              )
            })
          ]
        }),

        /* ── 04. DESIGN SYSTEM FOUNDATION ── */
        _jsxs("section", {
          id: "hc-foundation",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Foundation" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "BUILDING THE DESIGN SYSTEM ",
                _jsx(HighlightPill, { children: "BEFORE TOUCHING FEATURES." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Before designing screens across five products, I paused feature design to build a unified design system. Jumping straight into mockups would create immediate fragmentation across web and mobile. Taking two weeks upfront to build foundational tokens and reusable components ensured consistency across 300+ screens."
            }),
            _jsxs("div", {
              className: "rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 mb-8 shadow-xs",
              children: [
                _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-4 text-neutral-500 uppercase", children: "PRODUCT DECISION" }),
                _jsx("div", {
                  className: "space-y-3",
                  children: [
                    { label: "The ask", text: "PMs wanted to continue designing new screens immediately." },
                    { label: "My call", text: "I recommended pausing feature work for two weeks to build a shared design foundation first." },
                    { label: "The reason", text: "Without shared tokens and components, every new sprint would multiply inconsistency across five connected products." },
                    { label: "The outcome", text: "The short-term delay prevented long-term design debt across 300+ screens." }
                  ].map(({ label, text }) =>
                    _jsxs("div", {
                      className: "flex gap-4",
                      children: [
                        _jsx("span", { className: "text-[10px] font-mono font-bold tracking-widest text-neutral-500 shrink-0 pt-0.5 w-24 uppercase", children: label }),
                        _jsx("p", { className: "text-sm text-neutral-700 leading-relaxed", children: text })
                      ]
                    }, label)
                  )
                })
              ]
            }),
            _jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-8",
              children: [
                _jsxs("div", {
                  className: "p-6 rounded-2xl border border-red-200 bg-red-50/40 shadow-xs",
                  children: [
                    _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-4 text-red-700 uppercase", children: "WHEN I JOINED" }),
                    _jsxs("div", {
                      className: "space-y-4",
                      children: [
                        { category: "Design", items: ["No design system", "No reusable components", "No interaction patterns"] },
                        { category: "Engineering", items: ["No design tokens", "No handoff documentation"] },
                        { category: "Product", items: ["Screens evolved independently"] }
                      ].map(({ category, items }) =>
                        _jsxs("div", {
                          children: [
                            _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest text-neutral-500 mb-1.5 uppercase", children: category }),
                            _jsx("div", {
                              className: "space-y-1.5",
                              children: items.map((item) =>
                                _jsxs("div", {
                                  className: "flex items-center gap-2.5",
                                  children: [
                                    _jsx(CrossIcon, {}),
                                    _jsx("p", { className: "text-sm text-neutral-700", children: item })
                                  ]
                                }, item)
                              )
                            })
                          ]
                        }, category)
                      )
                    })
                  ]
                }),
                _jsxs("div", {
                  className: "p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-xs",
                  children: [
                    _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-4 text-emerald-700 uppercase", children: "WHAT I BUILT IN 2 WEEKS" }),
                    _jsx("div", {
                      className: "space-y-2.5",
                      children: [
                        "Design tokens — color, spacing, radius, type",
                        "Typography scale across all breakpoints",
                        "Color system — semantic · brand · status",
                        "Spacing & grid — responsive layout rules",
                        "Component library — buttons, inputs, cards, modals",
                        "Interaction patterns — documented for devs",
                        "Developer documentation & handoff guide"
                      ].map((item) =>
                        _jsxs("div", {
                          className: "flex items-center gap-2.5",
                          children: [
                            _jsx(CheckIcon, {}),
                            _jsx("p", { className: "text-sm text-neutral-700 font-medium", children: item })
                          ]
                        }, item)
                      )
                    })
                  ]
                })
              ]
            }),
            _jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8",
              children: [
                {
                  title: "One change updated five products",
                  body: "Design tokens meant a single update propagated across every product. No more manually fixing the same issue in five separate files.",
                  color: ACCENT
                },
                {
                  title: "Developers stopped rebuilding UI",
                  body: "Developers referenced components rather than re-inspecting designs screen by screen. Handoff moved from 'what does this look like?' to 'which component is this?'",
                  color: ACCENT2
                },
                {
                  title: "We prevented inconsistency before it existed",
                  body: "Building the system first avoided the most common 0→1 mistake: shipping fast, then spending months undoing the inconsistency that speed created.",
                  color: EMERALD
                }
              ].map(({ title, body, color }) =>
                _jsxs("div", {
                  className: "p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs",
                  children: [
                    _jsx("div", { className: "w-3 h-3 rounded-full mb-3", style: { background: color } }),
                    _jsx("p", { className: "text-sm font-bold text-[#0A0A0A] mb-2", children: title }),
                    _jsx("p", { className: "text-xs text-neutral-600 leading-relaxed", children: body })
                  ]
                }, title)
              )
            }),
            _jsxs("div", {
              className: "p-5 rounded-2xl border border-sky-200 bg-sky-50/50 mb-12",
              children: [
                _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-1 text-sky-700 uppercase", children: "CALLOUT" }),
                _jsxs("p", {
                  className: "text-sm text-neutral-700 leading-relaxed",
                  children: [
                    _jsx("span", { className: "font-bold text-[#0A0A0A]", children: "A design system isn't a UI library — it's product infrastructure." }),
                    " Investing two weeks upfront saved months of inconsistency across five connected products."
                  ]
                })
              ]
            })
          ]
        }),

        /* ── 05. WHERE AI BELONGS ── */
        _jsxs("section", {
          id: "hc-ai",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Decision Story #1" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "WE ALMOST MADE AI ",
                _jsx(HighlightPill, { children: "THE ENTIRE PRODUCT." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "The client wanted AI to differentiate the product, but they also wanted users to recognize it as a familiar healthcare app. Our first concept made AI the primary entry point. Users would open directly into an AI conversation before browsing doctors or services. Although innovative, the client felt it disrupted expectations. That feedback changed how we approached AI across the entire platform."
            }),
            _jsxs("div", {
              className: "rounded-2xl border border-neutral-200 bg-neutral-50/70 p-6 mb-8 shadow-xs",
              children: [
                _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-4 text-neutral-500 uppercase", children: "THE REFRAME THAT CHANGED EVERYTHING" }),
                _jsxs("div", {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
                  children: [
                    _jsxs("div", {
                      className: "p-4 rounded-xl border border-red-200 bg-red-50/50",
                      children: [
                        _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-1 text-red-700 uppercase", children: "WRONG QUESTION" }),
                        _jsx("p", { className: "text-base font-bold text-red-950", children: "“How do we add AI to the product?”" })
                      ]
                    }),
                    _jsxs("div", {
                      className: "p-4 rounded-xl border border-emerald-200 bg-emerald-50/50",
                      children: [
                        _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-1 text-emerald-700 uppercase", children: "RIGHT QUESTION" }),
                        _jsx("p", { className: "text-base font-bold text-emerald-950", children: "“Where does AI genuinely reduce user effort?”" })
                      ]
                    })
                  ]
                })
              ]
            }),
            _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-4 text-neutral-500 uppercase", children: "WHERE AI ACTUALLY LANDED — 6 INTENTIONAL TOUCHPOINTS" }),
            _jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8",
              children: [
                {
                  label: "AI Assistant in Navigation",
                  user: "All Users",
                  reasoning: "Instead of replacing the home screen, AI remained available throughout the application via persistent navigation. Patients could ask questions whenever they needed help without interrupting the primary healthcare journey.",
                  color: ACCENT
                },
                {
                  label: "EMR Summarization",
                  user: "Doctor",
                  reasoning: "Doctors review patient history before every consultation. Medical records are dense. AI condenses critical information before the appointment starts — reducing cognitive load at the highest-stakes moment.",
                  color: ACCENT2
                },
                {
                  label: "Pre-consultation Briefing",
                  user: "Doctor",
                  reasoning: "Previous diagnoses, prescribed medications, treatment history — surfaced automatically before the doctor enters the room. AI reducing friction in an existing workflow, not replacing it.",
                  color: EMERALD
                },
                {
                  label: "Service & Treatment Recommendations",
                  user: "Patient",
                  reasoning: "After a patient books a service, AI suggests complementary treatments based on their profile. Contextual, non-intrusive, and genuinely useful — not a chatbot at the entry point.",
                  color: AMBER
                },
                {
                  label: "Follow-up Reminders",
                  user: "Patient",
                  reasoning: "Aesthetic treatments require follow-up care. AI triggers personalized reminders post-appointment. Invisible to the user as 'AI' — just a service that remembers what their treatment required.",
                  color: RED
                },
                {
                  label: "In-app Patient Q&A",
                  user: "Patient",
                  reasoning: "Patients have questions between appointments. Rather than calling the clinic, they get contextual answers inside the app. Available when needed, absent when not.",
                  color: ACCENT
                }
              ].map(({ label, user, reasoning, color }) =>
                _jsxs("div", {
                  className: "p-5 rounded-2xl border border-neutral-200 bg-white shadow-xs",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center justify-between mb-2.5",
                      children: [
                        _jsx("p", { className: "text-xs font-bold text-[#0A0A0A]", children: label }),
                        _jsx(Tag, { text: user, color })
                      ]
                    }),
                    _jsx("p", { className: "text-xs text-neutral-600 leading-relaxed", children: reasoning })
                  ]
                }, label)
              )
            }),
            _jsxs("div", {
              className: "p-8 rounded-2xl border border-sky-200 bg-sky-50/50 text-center mb-12",
              children: [
                _jsx("p", {
                  className: "text-lg sm:text-xl font-bold text-[#0A0A0A] leading-snug mb-3 max-w-xl mx-auto",
                  children: "“The rejection didn't kill the AI strategy. It improved it.”"
                }),
                _jsx("p", {
                  className: "text-sm text-neutral-700 max-w-lg mx-auto leading-relaxed",
                  children: "Instead of asking how AI could replace the experience, we asked where it could reduce effort. That single question changed the product direction."
                })
              ]
            })
          ]
        }),

        /* ── 06. 6 PRODUCTS ARCHITECTURE ── */
        _jsxs("section", {
          id: "hc-platform",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Decision Story #2" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "CONNECTING 5 PRODUCTS INTO ",
                _jsx(HighlightPill, { children: "ONE UNIFIED ECOSYSTEM" })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Building a platform wasn't about designing five products independently. Every workflow shared the same patient data, meaning decisions in one product affected every other. The challenge was creating one system that felt consistent while serving completely different users."
            }),
            _jsxs("div", {
              className: "mb-10",
              children: [
                _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-4 text-neutral-500 uppercase", children: "THE PATIENT APP AS THE CENTER OF THE ECOSYSTEM" }),
                _jsxs("div", {
                  className: "p-6 sm:p-8 rounded-2xl border border-neutral-200 bg-white shadow-xs",
                  children: [
                    _jsx("p", {
                      className: "text-sm text-neutral-700 leading-relaxed mb-6 max-w-xl",
                      children: "During product discussions we aligned on treating the Patient App as the centre of the ecosystem. Every other product would read from and contribute to the same patient record. This meant a doctor's prescription, a pharmacy order, an invoice, and a delivery all traced back to one appointment — eliminating duplicate state and conflicting records."
                    }),
                    _jsxs("div", {
                      className: "flex flex-col items-center gap-2 text-center",
                      children: [
                        _jsx("div", {
                          className: "px-5 py-2.5 rounded-xl font-bold text-sm bg-sky-50 text-sky-800 border border-sky-200",
                          children: "Appointment Confirmed"
                        }),
                        [
                          { label: "Doctor Reviews + Prescribes", color: ACCENT2 },
                          { label: "EMR Updated Automatically", color: ACCENT2 },
                          { label: "Prescription Sent to Pharmacy", color: EMERALD },
                          { label: "Invoice Generated", color: AMBER },
                          { label: "Delivery Tracked", color: EMERALD }
                        ].map(({ label, color }) =>
                          _jsxs("div", {
                            className: "flex flex-col items-center gap-1",
                            children: [
                              _jsx(ChevronDownIcon, {}),
                              _jsx("div", {
                                className: "px-5 py-2 rounded-xl text-xs font-semibold border",
                                style: { background: `${color}10`, borderColor: `${color}30`, color },
                                children: label
                              })
                            ]
                          }, label)
                        )
                      ]
                    })
                  ]
                })
              ]
            }),
            _jsxs("div", {
              className: "rounded-2xl border border-neutral-200 bg-white shadow-xs p-6 mb-12",
              children: [
                _jsx("p", { className: "text-[10px] font-mono font-bold tracking-widest mb-3 text-neutral-500 uppercase", children: "BEYOND DESIGNING SCREENS" }),
                _jsx("p", {
                  className: "text-sm text-neutral-700 leading-relaxed mb-4",
                  children: "Both decisions above were identified before development began. That only happens when a designer is embedded in the product process, not just the design process."
                }),
                _jsx("div", {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                  children: [
                    "Explained interaction logic to frontend and backend teams",
                    "Reviewed implementations before QA handoff",
                    "Identified product logic issues during feature reviews",
                    "Worked sprint-by-sprint alongside PM and engineering"
                  ].map((item) =>
                    _jsxs("div", {
                      className: "flex items-start gap-2.5",
                      children: [
                        _jsx(CheckIcon, { color: "#0EA5E9" }),
                        _jsx("p", { className: "text-xs text-neutral-700 leading-relaxed font-medium", children: item })
                      ]
                    }, item)
                  )
                })
              ]
            })
          ]
        }),

        /* ── 07. SHIPPING THE PRODUCT ── */
        _jsxs("section", {
          id: "hc-figma",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Shipping the Product" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "I DIDN'T HAND OFF SCREENS. ",
                _jsx(HighlightPill, { children: "I HANDED OFF DECISIONS." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Designing the interface was only one part of my role. Every sprint I worked with PMs, frontend and backend engineers to explain interaction logic, review implementations, validate product behavior, and ensure features matched both design intent and business requirements before QA."
            }),
            _jsxs("div", {
              className: "border-l-4 border-amber-500 bg-amber-50/50 p-6 rounded-r-2xl mb-12",
              children: [
                _jsx("p", {
                  className: "text-base font-bold text-[#0A0A0A] italic mb-2",
                  children: "“Design doesn't end in Figma. It ends when the product behaves the way users expect.”"
                }),
                _jsx("p", {
                  className: "text-sm text-neutral-700 leading-relaxed",
                  children: "Working closely with engineering throughout every sprint helped surface product and implementation issues before they reached QA. Staying involved after handoff ensured the experience matched the intended design — not just the mockups."
                })
              ]
            })
          ]
        }),

        /* ── 08. REFLECTIONS ── */
        _jsxs("section", {
          id: "hc-reflection",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "What I Learned" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "WHAT THIS PROJECT CHANGED ",
                _jsx(HighlightPill, { children: "ABOUT HOW I DESIGN." })
              ]
            }),
            _jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8",
              children: [
                {
                  n: "01",
                  insight: "Product decisions matter more than interface decisions.",
                  body: "The most important work happened before Figma: deciding the scope, defining the architecture, and understanding how data connects between products.",
                  color: ACCENT
                },
                {
                  n: "02",
                  insight: "Systems scale teams, not just designs.",
                  body: "Building a design system upfront wasn't about clean components — it was about helping five developers ship faster with fewer bugs across 300+ screens.",
                  color: ACCENT2
                },
                {
                  n: "03",
                  insight: "Designing without edge cases isn't design — it's illustration.",
                  body: "Happy paths are easy. The real work is thinking through split orders, doctor schedule conflicts, and pharmacy compliance rules.",
                  color: EMERALD
                },
                {
                  n: "04",
                  insight: "AI should support existing workflows — not replace familiar behavior.",
                  body: "Users trust systems before they trust new patterns. The right question isn't how to add AI — it's where AI genuinely reduces effort for the user.",
                  color: AMBER
                }
              ].map(({ n, insight, body, color }) =>
                _jsxs("div", {
                  className: "cs-decision-card",
                  children: [
                    _jsx("p", { className: "font-mono text-xs font-bold tracking-widest mb-2", style: { color }, children: n }),
                    _jsx("p", { className: "text-sm sm:text-base font-bold text-[#0A0A0A] leading-snug mb-2", children: insight }),
                    _jsx("p", { className: "text-xs sm:text-sm text-neutral-600 leading-relaxed", children: body })
                  ]
                }, n)
              )
            }),
            _jsxs("div", {
              className: "cs-quote-box text-center mb-12 shadow-xs",
              children: [
                _jsx("p", {
                  className: "text-lg font-bold text-[#0A0A0A] leading-snug mb-3 max-w-2xl mx-auto not-italic",
                  children: "The most valuable work in this project happened before the first high-fidelity screen."
                }),
                _jsx("p", {
                  className: "text-sm text-neutral-700 max-w-xl mx-auto leading-relaxed not-italic",
                  children: "Aligning business goals, user expectations and technical constraints created a product that felt familiar while solving a much larger problem. I joined expecting to design a healthcare application. I left understanding that great products are shaped by decisions long before pixels."
                })
              ]
            })
          ]
        }),

        /* ── 09. UP NEXT ── */
        _jsxs("section", {
          id: "hc-up-next",
          className: "cs-section pt-12 border-t border-neutral-200 mb-6",
          children: [
            _jsx(ScriptEyebrow, { children: "Up Next" }),
            _jsxs("h2", {
              className: "cs-section-title mb-8",
              children: [
                "YOU MIGHT ALSO LIKE SOME OF ",
                _jsx(HighlightPill, { children: "MY OTHER WORK" })
              ]
            }),
            _jsxs("div", {
              className: "cs-upnext-grid",
              children: [
                _jsx("a", {
                  href: "/dimension-leap",
                  className: "cs-upnext-cover-card group",
                  children: _jsx("div", {
                    className: "cs-upnext-cover-media",
                    children: _jsx("img", {
                      src: "/assets/coverimages/Filmpreproduction-cover.png",
                      alt: "Dimension Leap Pre-Production",
                      className: "cs-upnext-img",
                      loading: "lazy"
                    })
                  })
                }),
                _jsx("a", {
                  href: "/phonepe",
                  className: "cs-upnext-cover-card group",
                  children: _jsx("div", {
                    className: "cs-upnext-cover-media",
                    children: _jsx("img", {
                      src: "/assets/coverimages/PhonePe-cover.png",
                      alt: "PhonePe SmartPOS Redesign",
                      className: "cs-upnext-img",
                      loading: "lazy"
                    })
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  });
}