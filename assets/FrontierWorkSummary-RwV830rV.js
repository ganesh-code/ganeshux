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

const ACCENT = "#3D2FFF";

const TOC_SECTIONS = [
  { id: "phonepe-impact", label: "Impact" },
  { id: "phonepe-context", label: "My role" },
  { id: "phonepe-problem", label: "The Problem" },
  { id: "phonepe-research", label: "Research" },
  { id: "phonepe-findings", label: "Key Findings" },
  { id: "phonepe-solutions", label: "Design Solutions" },
  { id: "phonepe-testing", label: "Usability Testing" },
  { id: "phonepe-outcomes", label: "Outcomes" },
  { id: "phonepe-up-next", label: "Up Next" }
];

function CheckIcon({ color = "#059669", size = 13 }) {
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

function CrossIcon({ color = "#DC2626", size = 13 }) {
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

function ChevronRightIcon({ color = "#3D2FFF", size = 14 }) {
  return _jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "shrink-0 mt-0.5",
    children: _jsx("path", { d: "m9 18 6-6-6-6" })
  });
}

function InsightCard({ n, title, body }) {
  return _jsxs("div", {
    className: "p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs flex flex-col gap-3",
    children: [
      _jsx("span", {
        className: "text-xs font-mono font-bold tracking-[0.16em] text-neutral-500",
        children: n
      }),
      _jsx("p", { className: "font-bold text-[#0A0A0A] leading-snug", children: title }),
      _jsx("p", { className: "text-sm text-neutral-600 leading-relaxed", children: body })
    ]
  });
}

function FindingCard({ title, items, color }) {
  return _jsxs("div", {
    className: "p-6 rounded-2xl border flex flex-col gap-4 shadow-xs",
    style: { borderColor: `${color}40`, background: `${color}0A` },
    children: [
      _jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          _jsx("div", {
            className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs",
            style: { background: `${color}20`, color },
            children: title.slice(0, 2).toUpperCase()
          }),
          _jsx("p", { className: "font-bold text-[#0A0A0A] text-sm", children: title })
        ]
      }),
      _jsx("ul", {
        className: "space-y-2",
        children: items.map((item, i) =>
          _jsxs("li", {
            className: "flex items-start gap-2 text-sm text-neutral-700",
            children: [
              _jsx(ChevronRightIcon, { color, size: 14 }),
              _jsx("span", { children: item })
            ]
          }, i)
        )
      })
    ]
  });
}

function SolutionCard({ n, name, before, after, metric }) {
  return _jsxs("div", {
    className: "p-6 rounded-2xl border border-neutral-200 bg-white shadow-xs flex flex-col justify-between gap-4",
    children: [
      _jsxs("div", {
        children: [
          _jsxs("div", {
            className: "flex items-center justify-between mb-3",
            children: [
              _jsxs("div", {
                className: "flex items-center gap-2.5",
                children: [
                  _jsx("div", {
                    className: "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-[#3D2FFF]",
                    style: { background: `${ACCENT}15` },
                    children: n
                  }),
                  _jsxs("div", {
                    children: [
                      _jsxs("span", {
                        className: "text-[10px] font-mono text-neutral-500 tracking-wider block",
                        children: ["SOLUTION ", n]
                      }),
                      _jsx("p", { className: "font-bold text-[#0A0A0A] text-sm leading-snug", children: name })
                    ]
                  })
                ]
              }),
              _jsx("span", {
                className: "text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200 bg-purple-50 text-[#3D2FFF]",
                children: metric
              })
            ]
          }),
          _jsxs("div", {
            className: "space-y-2",
            children: [
              _jsxs("div", {
                className: "flex items-start gap-2",
                children: [
                  _jsx(CrossIcon, {}),
                  _jsxs("p", {
                    className: "text-xs text-neutral-600",
                    children: [
                      _jsx("span", { className: "text-neutral-500 font-mono mr-1", children: "BEFORE:" }),
                      before
                    ]
                  })
                ]
              }),
              _jsxs("div", {
                className: "flex items-start gap-2",
                children: [
                  _jsx(CheckIcon, {}),
                  _jsxs("p", {
                    className: "text-xs text-neutral-700 font-medium",
                    children: [
                      _jsx("span", { className: "text-neutral-500 font-mono mr-1", children: "AFTER:" }),
                      after
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

export default function PhonePeCaseStudy(props) {
  return _jsx(CaseStudyPage, {
    eyebrow: "Case Study",
    title: "ENHANCING PHONEPE'S USABILITY RAISED DISCOVERY",
    highlightedText: "BY 40%",
    subheadline: "How I redesigned core payment navigation, scan & pay accessibility, and split-bill workflows at PhonePe, cutting transaction steps from 4 to 1 while meeting WCAG AA standards.",
    role: "UX Researcher & Designer",
    platforms: "Mobile (iOS & Android)",
    scope: "Scan & Pay · Split Bill · Nav",
    timeline: "2024",
    sections: TOC_SECTIONS,
    transitionPhase: props?.transitionPhase,
    heroMedia: _jsxs("div", {
      className: "cs-hero-banner cs-hero-banner-pp",
      children: [
        _jsxs("div", {
          className: "cs-hero-banner-text",
          children: [
            _jsx("span", {
              className: "cs-hero-banner-cat",
              children: "FINTECH / PAYMENTS"
            }),
            _jsx("h2", {
              className: "cs-hero-banner-title",
              children: "PHONEPE USABILITY REVAMP"
            }),
            _jsx("p", {
              className: "cs-hero-banner-script",
              children: "research-driven mobile payments flow ↗"
            })
          ]
        }),
        _jsx("div", {
          className: "cs-hero-banner-mockup",
          children: _jsx("img", {
            src: "/phonepe.png",
            alt: "PhonePe UX Redesign",
            className: "w-full h-auto object-cover block"
          })
        }),
        _jsx("span", {
          className: "cs-hero-banner-watermark",
          children: "PAY"
        })
      ]
    }),
    children: _jsxs(_Fragment, {
      children: [
        /* ── 01. IMPACT ── */
        _jsxs("section", {
          id: "phonepe-impact",
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
                  value: "40% Faster Discovery",
                  label: "average time reduction for users to locate secondary features such as Split Bill and Autopay controls."
                }),
                _jsx(StatCallout, {
                  value: "4 → 1 Tap",
                  label: "quick action bar on the home screen allows users to access Scan & Pay immediately under time pressure."
                })
              ]
            })
          ]
        }),

        /* ── 02. CONTEXT & MY ROLE ── */
        _jsxs("section", {
          id: "phonepe-context",
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
                  children: "PhonePe is one of India's most widely used UPI payment apps, processing billions of transactions monthly. Despite its scale, users frequently struggled to find critical features — resulting in slower transactions, high return-to-home navigation errors, and missed feature adoption."
                }),
                _jsx("p", {
                  children: "This 4-week research sprint focused on improving feature discoverability, navigation efficiency, and accessibility without disrupting users' deeply ingrained mental models."
                }),
                _jsx("p", {
                  children: "I conducted the research independently from discovery interviews to high-fidelity prototyping and moderated usability validation."
                })
              ]
            }),
            _jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12",
              children: [
                _jsx(RoleCard, { title: "I audited existing navigation flows" }),
                _jsx(RoleCard, { title: "I conducted 8 moderated user interviews" }),
                _jsx(RoleCard, { title: "I redesigned the 3 core payment flows" })
              ]
            })
          ]
        }),

        /* ── 03. THE PROBLEM ── */
        _jsxs("section", {
          id: "phonepe-problem",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "The Problem" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "CRITICAL FEATURES WERE ",
                _jsx(HighlightPill, { children: "BURIED IN PLAIN SIGHT." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Through initial audits and user interviews, I identified four critical usability friction points that consistently caused task failure, extended time-on-task, and user frustration across everyday payment tasks."
            }),
            _jsx("div", {
              className: "grid sm:grid-cols-2 gap-4 mb-12",
              children: [
                {
                  n: "PROBLEM 01",
                  title: "Hidden Split Bill Flow",
                  body: "Users struggled to find the Split Bill feature because it was buried inside tertiary menus without clear signposting. Most users reverted to manual calculations or third-party apps, adding unnecessary friction to a social use case."
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
                }
              ].map(({ n, title, body }) =>
                _jsx(InsightCard, { n, title, body }, n)
              )
            })
          ]
        }),

        /* ── 04. RESEARCH METHODOLOGY ── */
        _jsxs("section", {
          id: "phonepe-research",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Research Methodology" }),
            _jsxs("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12",
              children: [
                _jsxs("div", {
                  children: [
                    _jsxs("h2", {
                      className: "cs-section-title",
                      children: [
                        "A MULTI-METHOD ",
                        _jsx(HighlightPill, { children: "RESEARCH APPROACH." })
                      ]
                    }),
                    _jsx("p", {
                      className: "text-sm sm:text-base text-neutral-700 leading-relaxed mb-8",
                      children: "To deeply understand user pain points and behaviour patterns, I combined qualitative and quantitative research methods across a structured 4-week sprint."
                    }),
                    _jsx("div", {
                      className: "space-y-4",
                      children: [
                        { week: "Week 1", title: "Discovery & Research", desc: "User interviews (8 participants), survey via Google Forms, competitive analysis, and heuristic evaluation of the existing app." },
                        { week: "Week 2", title: "Synthesis & Definition", desc: "Affinity mapping, persona development, user journey mapping, and problem statement refinement." },
                        { week: "Week 3", title: "Ideation & Design", desc: "Sketching, wireframing, and high-fidelity prototyping of redesigned flows in Figma." },
                        { week: "Week 4", title: "Testing & Iteration", desc: "Moderated usability testing with 6 participants, iteration on key findings, and final documentation." }
                      ].map(({ week, title, desc }, i) =>
                        _jsxs("div", {
                          className: "flex gap-4 items-start",
                          children: [
                            _jsxs("div", {
                              className: "flex flex-col items-center",
                              children: [
                                _jsx("div", {
                                  className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs text-[#3D2FFF]",
                                  style: { background: `${ACCENT}15` },
                                  children: `W${i + 1}`
                                }),
                                i < 3 && _jsx("div", { className: "w-px h-5 mt-1 bg-neutral-200" })
                              ]
                            }),
                            _jsxs("div", {
                              className: "pb-4",
                              children: [
                                _jsx("span", {
                                  className: "text-[10px] font-mono text-neutral-500 uppercase tracking-widest",
                                  children: week
                                }),
                                _jsx("p", { className: "font-bold text-sm text-[#0A0A0A] mt-0.5", children: title }),
                                _jsx("p", { className: "text-xs text-neutral-600 mt-1 leading-relaxed", children: desc })
                              ]
                            })
                          ]
                        }, week)
                      )
                    })
                  ]
                }),
                _jsx("div", {
                  className: "space-y-4",
                  children: [
                    {
                      title: "User Interviews",
                      items: [
                        "8 participants across age groups and usage patterns",
                        "Semi-structured sessions (45 min each)",
                        "Think-aloud protocol for task walkthroughs",
                        "Recruited from active PhonePe user base"
                      ],
                      color: ACCENT
                    },
                    {
                      title: "Survey Research",
                      items: [
                        "Google Forms questionnaire distributed online",
                        "Quantitative satisfaction scores collected",
                        "Feature usage frequency self-reported",
                        "Navigation pain point severity ratings"
                      ],
                      color: "#0284C7"
                    },
                    {
                      title: "Usability Testing",
                      items: [
                        "Task-based scenarios on interactive prototype",
                        "Time-on-task and error rate measurement",
                        "Heuristic evaluation of existing interface",
                        "6 moderated sessions in final testing round"
                      ],
                      color: "#059669"
                    }
                  ].map(({ title, items, color }) =>
                    _jsx(FindingCard, { title, items, color }, title)
                  )
                })
              ]
            })
          ]
        }),

        /* ── 05. KEY FINDINGS ── */
        _jsxs("section", {
          id: "phonepe-findings",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Key Findings" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "WHAT USERS ",
                _jsx(HighlightPill, { children: "ACTUALLY TOLD US." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Four consistent themes emerged across all research methods, defining the core usability challenges within the PhonePe experience."
            }),
            _jsx("div", {
              className: "grid sm:grid-cols-2 gap-5 mb-10",
              children: [
                {
                  title: "Navigation Inefficiency",
                  items: [
                    "75% of users took 3+ taps to reach Scan & Pay",
                    "Split Bill discovered accidentally by most users",
                    "Return-to-home rate: 62% per session",
                    "Bottom nav labels were ambiguous or missing"
                  ],
                  color: "#DC2626"
                },
                {
                  title: "Discoverability Gaps",
                  items: [
                    "40% of users unaware of Split Bill feature",
                    "Financial Tools section rarely explored",
                    "Search bar usage below 15% despite prominence",
                    "Onboarding skipped feature highlights entirely"
                  ],
                  color: "#D97706"
                },
                {
                  title: "Accessibility Barriers",
                  items: [
                    "Text contrast ratio below WCAG AA in key areas",
                    "Touch targets below 44px minimum on some CTAs",
                    "No alt text for icon-only interactive elements",
                    "Color-only transaction type differentiation"
                  ],
                  color: "#0284C7"
                },
                {
                  title: "Engagement Drop-offs",
                  items: [
                    "High abandonment in multi-step payment flows",
                    "Error states were unclear and unhelpful",
                    "No progress indicators in longer payment flows",
                    "Confirmation screens added unnecessary friction"
                  ],
                  color: "#7C3AED"
                }
              ].map(({ title, items, color }) =>
                _jsx(FindingCard, { title, items, color }, title)
              )
            }),
            _jsx("div", {
              className: "p-6 sm:p-8 rounded-2xl border border-purple-200 bg-purple-50/60 mb-12",
              children: _jsxs("div", {
                className: "flex gap-4 items-start",
                children: [
                  _jsx("div", {
                    className: "w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold bg-purple-100 text-[#3D2FFF]",
                    children: "P4"
                  }),
                  _jsxs("div", {
                    children: [
                      _jsx("p", {
                        className: "text-sm sm:text-base text-neutral-800 leading-relaxed italic mb-2",
                        children: "“I use PhonePe every day for payments, but I still can't find the Split Bill option quickly. I just use WhatsApp to split costs with friends because I can't figure out where it is in the app.”"
                      }),
                      _jsx("p", {
                        className: "text-xs font-mono text-neutral-500",
                        children: "— Participant #4, 27yo · Frequent PhonePe User · User Interview"
                      })
                    ]
                  })
                ]
              })
            })
          ]
        }),

        /* ── 06. DESIGN SOLUTIONS ── */
        _jsxs("section", {
          id: "phonepe-solutions",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Design Solutions" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "TARGETED FIXES FOR ",
                _jsx(HighlightPill, { children: "CORE USER FLOWS." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Based on the research insights, I designed targeted interventions across six key areas of the app, focusing on immediate impact with minimal disruption to familiar patterns."
            }),
            _jsx("div", {
              className: "grid sm:grid-cols-2 gap-5 mb-12",
              children: [
                {
                  n: "01",
                  name: "Quick Action Bar",
                  before: "Scan & Pay required 4+ taps to reach, buried in sub-navigation",
                  after: "Persistent one-tap action bar on home screen — Scan & Pay accessible instantly",
                  metric: "4→1 tap"
                },
                {
                  n: "02",
                  name: "Split Bill Entry Point",
                  before: "Split Bill hidden inside 'More' overflow menu with no contextual trigger",
                  after: "Prominent Split Bill shortcut surfaced post-group transaction with smart prompt",
                  metric: "Discovered by all users"
                },
                {
                  n: "03",
                  name: "Labelled Bottom Navigation",
                  before: "Icon-only bottom nav with no text labels — 62% users navigated to wrong section",
                  after: "Icons with concise text labels, logical grouping reducing navigation errors by 40%",
                  metric: "-40% nav errors"
                },
                {
                  n: "04",
                  name: "Accessibility Fixes",
                  before: "Sub-WCAG contrast ratios, touch targets below 44px, color-only cues",
                  after: "WCAG AA contrast throughout, 44px+ touch targets, text + icon for all interactions",
                  metric: "WCAG AA met"
                },
                {
                  n: "05",
                  name: "Streamlined Payment Flows",
                  before: "Multi-step flows with no progress indication and unclear error messages",
                  after: "Progress indicators added, error states redesigned with actionable recovery messages",
                  metric: "+33% completion"
                },
                {
                  n: "06",
                  name: "Contextual Feature Discovery",
                  before: "No in-app guidance to highlight less-known features after onboarding",
                  after: "Smart contextual cards that surface relevant features based on user behaviour",
                  metric: "40% faster discovery"
                }
              ].map((sol) =>
                _jsx(SolutionCard, { ...sol }, sol.n)
              )
            })
          ]
        }),

        /* ── 07. USABILITY TESTING ── */
        _jsxs("section", {
          id: "phonepe-testing",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Usability Testing" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "VALIDATING THE ",
                _jsx(HighlightPill, { children: "REDESIGNED PROTOTYPE." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl mb-8",
              children: "Moderated usability testing with 6 participants measured task completion rates, time-on-task, and satisfaction scores across the redesigned prototype."
            }),
            _jsx("div", {
              className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10",
              children: [
                { metric: "94%", label: "Task Completion Rate", desc: "vs 61% on original app" },
                { metric: "40%", label: "Faster Feature Discovery", desc: "Average time reduction" },
                { metric: "6/6", label: "Found Split Bill Unaided", desc: "vs 2/6 originally" },
                { metric: "4.4★", label: "User Satisfaction Score", desc: "on redesigned flows" }
              ].map(({ metric, label, desc }) =>
                _jsxs("div", {
                  className: "p-5 rounded-2xl border border-purple-100 bg-purple-50/50 text-center shadow-xs",
                  children: [
                    _jsx("p", { className: "font-black text-3xl mb-1 text-[#3D2FFF]", children: metric }),
                    _jsx("p", { className: "text-xs font-bold text-[#0A0A0A] mb-1", children: label }),
                    _jsx("p", { className: "text-[10px] text-neutral-500", children: desc })
                  ]
                }, metric)
              )
            }),
            _jsxs("div", {
              className: "p-6 sm:p-7 rounded-2xl border border-neutral-200/90 bg-white shadow-xs mb-12",
              children: [
                _jsxs("div", {
                  className: "flex items-center gap-2 mb-5",
                  children: [
                    _jsx("span", { className: "w-2 h-2 rounded-full bg-[#3D2FFF]" }),
                    _jsx("p", {
                      className: "text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest",
                      children: "Test Tasks Given to Participants"
                    })
                  ]
                }),
                _jsx("div", {
                  className: "grid sm:grid-cols-2 gap-3.5",
                  children: [
                    "Initiate a QR code payment to a nearby merchant",
                    "Split a recent bill equally with 3 friends",
                    "Find and enable autopay for a mobile recharge",
                    "Check transaction history for the last month",
                    "Discover and explore the Financial Tools section",
                    "Set a spending limit using in-app controls"
                  ].map((task, i) =>
                    _jsxs("div", {
                      className: "cs-task-card",
                      children: [
                        _jsx("span", {
                          className: "cs-task-badge",
                          children: i + 1
                        }),
                        _jsx("p", { className: "cs-task-text", children: task })
                      ]
                    }, task)
                  )
                })
              ]
            })
          ]
        }),

        /* ── 08. OUTCOMES & REFLECTIONS ── */
        _jsxs("section", {
          id: "phonepe-outcomes",
          className: "cs-section pt-8 border-t border-neutral-200",
          children: [
            _jsx(ScriptEyebrow, { children: "Outcomes & Reflections" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "WHAT THIS PROJECT ",
                _jsx(HighlightPill, { children: "TAUGHT ME." })
              ]
            }),
            _jsxs("div", {
              className: "grid md:grid-cols-2 gap-6 mb-10",
              children: [
                _jsxs("div", {
                  className: "cs-outcome-card space-y-3",
                  children: [
                    _jsxs("span", {
                      className: "cs-outcome-badge bg-emerald-50 text-emerald-700 border border-emerald-200/80",
                      children: [
                        _jsx(CheckIcon, { color: "#059669", size: 13 }),
                        "Key Outcomes"
                      ]
                    }),
                    [
                      "Navigation restructuring had the highest measurable impact on satisfaction",
                      "Contextual discovery outperformed tutorial-style onboarding significantly",
                      "Accessibility improvements benefited all users, not just those with disabilities",
                      "Reduced tap depth directly correlated with task completion improvement"
                    ].map((item) =>
                      _jsxs("div", {
                        className: "cs-outcome-item",
                        children: [
                          _jsx("span", {
                            className: "w-5 h-5 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5",
                            children: _jsx(CheckIcon, { color: "#059669", size: 12 })
                          }),
                          _jsx("p", { className: "text-sm text-neutral-800 leading-relaxed", children: item })
                        ]
                      }, item)
                    )
                  ]
                }),
                _jsxs("div", {
                  className: "cs-outcome-card space-y-3",
                  children: [
                    _jsxs("span", {
                      className: "cs-outcome-badge bg-amber-50 text-amber-700 border border-amber-200/80",
                      children: [
                        _jsx("span", { className: "font-bold text-xs", children: "↻" }),
                        "What I'd Improve"
                      ]
                    }),
                    [
                      "Conduct longitudinal studies to measure long-term behaviour change",
                      "Test with a wider demographic including older and rural users",
                      "Explore A/B testing methodologies for live user validation",
                      "Build a more systematic competitive benchmarking framework"
                    ].map((item) =>
                      _jsxs("div", {
                        className: "cs-outcome-item",
                        children: [
                          _jsx("span", {
                            className: "w-5 h-5 rounded-full bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs",
                            children: "↻"
                          }),
                          _jsx("p", { className: "text-sm text-neutral-800 leading-relaxed", children: item })
                        ]
                      }, item)
                    )
                  ]
                })
              ]
            }),
            _jsxs("div", {
              className: "p-8 rounded-2xl border border-purple-200 bg-purple-50/50 mb-12",
              children: [
                _jsx("p", {
                  className: "text-base text-neutral-800 leading-relaxed italic mb-3",
                  children: "“Great UX isn't about making things look beautiful — it's about removing every unnecessary barrier between a user and their goal. On PhonePe, that meant rethinking navigation from a user's mental model, not the product team's org chart.”"
                }),
                _jsx("p", {
                  className: "text-xs font-mono text-[#3D2FFF]",
                  children: "— Ganesh Muniganti · PhonePe UX Research Project, 2024"
                })
              ]
            })
          ]
        }),

        /* ── 09. UP NEXT ── */
        _jsxs("section", {
          id: "phonepe-up-next",
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
                  href: "/tamira-health",
                  className: "cs-upnext-cover-card group",
                  children: _jsx("div", {
                    className: "cs-upnext-cover-media",
                    children: _jsx("img", {
                      src: "/assets/coverimages/aesthetic-cover.png",
                      alt: "Tamira Health Platform",
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