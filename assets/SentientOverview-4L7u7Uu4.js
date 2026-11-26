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

const TOC_SECTIONS = [
  { id: "impact", label: "Impact" },
  { id: "context", label: "My role" },
  { id: "the-problem", label: "The Problem" },
  { id: "constraints", label: "Constraints" },
  { id: "five-decisions", label: "Five Decisions" },
  { id: "workspaces", label: "Role Workspaces" },
  { id: "up-next", label: "Up Next" }
];

const roleContent = {
  writer: {
    label: "Writer",
    color: "#3D2FFF",
    tasks: ["AI-assisted script drafting", "Scene breakdown & shot ideas", "Character arc tracking", "Export to FDX & PDF"],
    challenge: "Writing happened in isolation. Handing off to the director was a manual dump of raw documents with no structure.",
    design: "Dual-pane studio canvas: distraction-free script editor on the left, docked AI suggestion rail on the right."
  },
  director: {
    label: "Director",
    color: "#0EA5E9",
    tasks: ["Shot lists from script scenes", "Visual reference boards", "Actor & location scheduling", "Daily camera notes"],
    challenge: "Directors received scripts too late and had zero visibility into location conflicts until the morning of the shoot.",
    design: "Visual storyboard workspace where AI analyses script scenes and suggests camera angles, shot types, and blocking."
  },
  producer: {
    label: "Producer",
    color: "#10B981",
    tasks: ["Call sheet generation", "Production timeline", "Crew & budget breakdowns", "Schedule export"],
    challenge: "Producers managed several spreadsheets for scheduling, budget, and cast — all constantly going out of sync.",
    design: "Unified dashboard with Gantt-style timeline, AI-generated call sheets from the approved schedule, and exportable logs."
  },
  agency: {
    label: "Agency",
    color: "#F59E0B",
    tasks: ["Client project overview", "Approval & revision workflows", "Milestone tracking", "Role-based access"],
    challenge: "Agencies received status updates via email. Client approvals had no version control, causing costly delays.",
    design: "Lightweight client-facing view with approval cards, comment threads, and milestone checklists. Zero training needed."
  }
};

function CheckIcon() {
  return _jsx("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#3D2FFF",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "shrink-0",
    children: _jsx("path", { d: "M20 6 9 17l-5-5" })
  });
}

function RedCrossIcon() {
  return _jsx("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#EF4444",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "shrink-0",
    children: _jsxs(_Fragment, {
      children: [
        _jsx("circle", { cx: "12", cy: "12", r: "10" }),
        _jsx("path", { d: "m15 9-6 6" }),
        _jsx("path", { d: "m9 9 6 6" })
      ]
    })
  });
}

function ArrowRightIcon() {
  return _jsx("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: _jsx("path", { d: "M5 12h14m-7-7 7 7-7 7" })
  });
}

export default function DimensionLeapCaseStudy(props) {
  const [activeRole, setActiveRole] = React.useState("writer");
  const current = roleContent[activeRole];

  return _jsx(CaseStudyPage, {
    eyebrow: "Case Study",
    title: "UNIFYING FILM PRE-PRODUCTION CUT MANUAL EFFORT",
    highlightedText: "BY 35%",
    subheadline: "How I architected an end-to-end studio toolchain at Dimension Leap, turning raw screenplays into structured breakdowns, costume logs, and 3D visual frames across four production roles without breaking creative flow.",
    role: "Lead UX Architect",
    platforms: "Web App & Studio Suite",
    scope: "6+ AI Workflows · 4 User Roles",
    timeline: "2024–25",
    sections: TOC_SECTIONS,
    transitionPhase: props?.transitionPhase,
    heroMedia: _jsxs("div", {
      className: "cs-hero-banner cs-hero-banner-dl",
      children: [
        _jsxs("div", {
          className: "cs-hero-banner-text",
          children: [
            _jsx("span", {
              className: "cs-hero-banner-cat",
              children: "STUDIO SUITE"
            }),
            _jsx("h2", {
              className: "cs-hero-banner-title",
              children: "PRE-PRODUCTION WORKFLOW REVAMP"
            }),
            _jsx("p", {
              className: "cs-hero-banner-script",
              children: "one unified toolchain for 4 production roles ↗"
            })
          ]
        }),
        _jsx("div", {
          className: "cs-hero-banner-mockup",
          children: _jsx("img", {
            src: "/pre-production.jpg",
            alt: "Dimension Leap Pre-Production Interface",
            className: "w-full h-auto object-cover block"
          })
        }),
        _jsx("span", {
          className: "cs-hero-banner-watermark",
          children: "PRE"
        })
      ]
    }),
    children: _jsxs(_Fragment, {
      children: [
        /* ── 01. IMPACT ── */
        _jsxs("section", {
          id: "impact",
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
                  value: "35% Reduction",
                  label: "in manual pre-production hours: automated script breakdowns and call sheets tested on live film production crews."
                }),
                _jsx(StatCallout, {
                  value: "124 Scenes",
                  label: "auto-synchronized simultaneously across director shot lists, location logs, and actor schedule sheets."
                })
              ]
            })
          ]
        }),

        /* ── 02. CONTEXT & MY ROLE ── */
        _jsxs("section", {
          id: "context",
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
                  children: "Film productions in India historically ran on disparate WhatsApp groups and dozens of uncoordinated spreadsheets. Directors received scripts too late, producers juggled out-of-sync schedules, and writers watched their scenes get misinterpreted during shooting."
                }),
                _jsx("p", {
                  children: "Dimension Leap was commissioned to build an AI-native studio toolchain. The goal wasn't just to add AI — it was designing a spatial production surface that seasoned film directors and screenwriters would actually trust on set."
                }),
                _jsx("p", {
                  children: "I was the lead UX architect on the project, leading the end-to-end user research, data modeling, role-adaptive workspace design, and Figma-to-code component specifications for our engineering team."
                })
              ]
            }),
            _jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12",
              children: [
                _jsx(RoleCard, { title: "I audited the existing 4-role workflows" }),
                _jsx(RoleCard, { title: "I defined the shared production schema" }),
                _jsx(RoleCard, { title: "I designed the studio toolchain" })
              ]
            })
          ]
        }),

        /* ── 03. THE PROBLEM ── */
        _jsxs("section", {
          id: "the-problem",
          className: "cs-section",
          children: [
            _jsx(ScriptEyebrow, { children: "The Problem" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                _jsx(HighlightPill, { children: "FOUR DISCONNECTED ROLES" }),
                " EACH RECORDING A DIFFERENT VERSION OF THE SAME SCRIPT."
              ]
            }),
            _jsxs("div", {
              className: "space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed mb-6",
              children: [
                _jsx("p", {
                  children: "Every production team suffered from the exact same crisis: the screenplay lived in Google Docs, the schedule was copied from last year's Excel templates, call sheets were assembled manually at 2 AM, and client approvals were buried across unindexed email threads."
                }),
                _jsx("p", {
                  children: "When a single scene had to be cut or rescheduled due to rain, four different people spent hours manually reconciling their files. One minor script edit often broke call times for sixty crew members."
                })
              ]
            }),
            _jsxs("div", {
              className: "rounded-2xl border border-neutral-200 bg-neutral-50/70 overflow-hidden mb-6",
              children: [
                _jsxs("div", {
                  className: "px-5 py-3 border-b border-neutral-200 bg-neutral-100/70 flex items-center justify-between",
                  children: [
                    _jsx("span", {
                      className: "text-xs font-mono font-bold text-neutral-600 uppercase tracking-wider",
                      children: "HISTORICAL WORKFLOW FRAGMENTATION"
                    }),
                    _jsx("span", {
                      className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold",
                      children: "PRE-REDESIGN"
                    })
                  ]
                }),
                _jsx("div", {
                  className: "p-5 space-y-2.5",
                  children: [
                    { role: "Screenplay", tool: "Google Docs (unstructured, raw text files)" },
                    { role: "Schedule", tool: "Broken Excel sheets with corrupt macros" },
                    { role: "Call Sheet", tool: "Manual copy-paste the night before each shoot" },
                    { role: "Status Updates", tool: "Chaotic WhatsApp groups & voice notes" },
                    { role: "Client Approvals", tool: "Unversioned email attachments" }
                  ].map(({ role, tool }) =>
                    _jsxs("div", {
                      className: "flex items-center justify-between py-2 border-b border-neutral-200/60 last:border-0 text-xs sm:text-sm",
                      children: [
                        _jsx("span", { className: "font-bold text-[#0A0A0A] w-28 shrink-0", children: role }),
                        _jsx("span", { className: "text-neutral-600 flex-1", children: tool }),
                        _jsx(RedCrossIcon, {})
                      ]
                    }, role)
                  )
                })
              ]
            }),
            _jsx(QuoteBox, {
              quote: "The hardest part isn't shooting on camera — it's the chaotic weeks before filming where we spend more time coordinating spreadsheets than creating."
            })
          ]
        }),

        /* ── 04. CONSTRAINTS ── */
        _jsxs("section", {
          id: "constraints",
          className: "cs-section",
          children: [
            _jsx(ScriptEyebrow, { children: "Constraints" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "REAL-WORLD BOUNDARIES ",
                _jsx(HighlightPill, { children: "THAT FRAMED" }),
                " EVERY DESIGN DECISION."
              ]
            }),
            _jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12",
              children: [
                {
                  title: "Non-Technical User Base",
                  desc: "Film veterans with decades of on-set habits. The interface had to feel immediately natural within 60 seconds."
                },
                {
                  title: "Zero Hallucination Tolerance",
                  desc: "If AI hallucinates an extra actor or an incorrect call time, production loses tens of thousands of dollars per delay hour."
                },
                {
                  title: "Shared Data, Divergent Views",
                  desc: "A writer wants prose, a director wants shot angles, a producer wants timelines. One database, 4 completely different mental models."
                },
                {
                  title: "Strict 8-Week Delivery",
                  desc: "Delivering an enterprise suite with 4 full role workflows required a modular design system from day one."
                }
              ].map(({ title, desc }) =>
                _jsxs("div", {
                  className: "cs-constraint-card",
                  children: [
                    _jsx("h4", { className: "cs-constraint-title", children: title }),
                    _jsx("p", { className: "cs-constraint-desc", children: desc })
                  ]
                }, title)
              )
            })
          ]
        }),

        /* ── 05. FIVE DECISIONS ── */
        _jsxs("section", {
          id: "five-decisions",
          className: "cs-section",
          children: [
            _jsx(ScriptEyebrow, { children: "The Decisions" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                _jsx(HighlightPill, { children: "FIVE DECISIONS" }),
                " THAT SHAPED THE FLOW."
              ]
            }),
            _jsxs("div", {
              className: "space-y-6 mb-10",
              children: [
                /* Decision 01 */
                _jsxs("div", {
                  className: "cs-decision-card",
                  children: [
                    _jsx("span", {
                      className: "cs-decision-tag",
                      children: "DECISION 01 — STRATEGY · DECIDED BY TESTING"
                    }),
                    _jsx("h3", {
                      className: "cs-decision-title",
                      children: "Testing our assumption instead of chatbot conversations"
                    }),
                    _jsxs("div", {
                      className: "space-y-2 text-sm text-neutral-700 leading-relaxed",
                      children: [
                        _jsxs("p", {
                          children: [
                            _jsx("strong", { className: "text-[#0A0A0A]", children: "The problem : " }),
                            "The initial hypothesis was that a conversational chatbot like ChatGPT was what creators wanted. But writers hated having a chat window hovering over their manuscript — it pulled them completely out of their writing rhythm."
                          ]
                        }),
                        _jsxs("p", {
                          children: [
                            _jsx("strong", { className: "text-[#0A0A0A]", children: "What I did : " }),
                            "Replaced the floating chat modal with a docked contextual suggestion rail. As the writer drafts a scene, AI parses characters, locations, and shot setups silently in the side rail, ready to accept with one keystroke without interrupting narrative flow."
                          ]
                        })
                      ]
                    })
                  ]
                }),

                /* Decision 02 */
                _jsxs("div", {
                  className: "cs-decision-card",
                  children: [
                    _jsx("span", {
                      className: "cs-decision-tag",
                      children: "DECISION 02 — ARCHITECTURE · SINGLE DATA LAYER"
                    }),
                    _jsx("h3", {
                      className: "cs-decision-title",
                      children: "One single source of truth for all four roles"
                    }),
                    _jsxs("div", {
                      className: "space-y-2 text-sm text-neutral-700 leading-relaxed",
                      children: [
                        _jsxs("p", {
                          children: [
                            _jsx("strong", { className: "text-[#0A0A0A]", children: "The problem : " }),
                            "Each role needed completely different interfaces. If built independently, each tool would store data separately, recreating the exact same synchronization nightmare."
                          ]
                        }),
                        _jsxs("p", {
                          children: [
                            _jsx("strong", { className: "text-[#0A0A0A]", children: "What I did : " }),
                            "Architected a single unified production schema. When a writer edits a character name in Scene 4, it instantly updates the director's shot list, the producer's casting schedule, and the agency's approval deck in real time."
                          ]
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            _jsx(QuoteBox, {
              quote: "Where AI sits in the creative process matters infinitely more than how powerful the underlying model is."
            })
          ]
        }),

        /* ── 06. ROLE WORKSPACES ── */
        _jsxs("section", {
          id: "workspaces",
          className: "cs-section",
          children: [
            _jsx(ScriptEyebrow, { children: "Step by step" }),
            _jsxs("h2", {
              className: "cs-section-title",
              children: [
                "THE STEPS BEHIND THE ",
                _jsx(HighlightPill, { children: "35% RESULT." })
              ]
            }),
            _jsx("p", {
              className: "text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed",
              children: "Each production role operates in a dedicated workspace designed specifically around their mental model:"
            }),

            /* Role Tab Selector */
            _jsx("div", {
              className: "flex flex-wrap gap-2 mb-6",
              children: ["writer", "director", "producer", "agency"].map((r) => {
                const isSelected = activeRole === r;
                return _jsxs("button", {
                  type: "button",
                  onClick: () => setActiveRole(r),
                  className: `px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#3D2FFF] text-white shadow-md"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200"
                  }`,
                  children: [roleContent[r].label, " Workspace"]
                }, r);
              })
            }),

            /* Role Card Display */
            _jsxs("div", {
              className: "rounded-3xl p-6 sm:p-8 border border-neutral-200 bg-neutral-50/70 relative overflow-hidden mb-8",
              children: [
                _jsxs("div", {
                  className: "flex flex-col sm:flex-row justify-between items-start gap-4 mb-6",
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsx("span", {
                          className: "text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1",
                          children: "Active Role"
                        }),
                        _jsxs("h3", {
                          className: "text-xl sm:text-2xl font-black text-[#0A0A0A]",
                          children: [current.label, " Toolchain"]
                        })
                      ]
                    }),
                    _jsxs("span", {
                      className: "text-xs font-bold px-3 py-1 rounded-full bg-[#3D2FFF]/10 text-[#3D2FFF] border border-[#3D2FFF]/20",
                      children: [current.label, " Mode"]
                    })
                  ]
                }),
                _jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",
                  children: [
                    _jsxs("div", {
                      className: "p-4 rounded-xl bg-white border border-neutral-200 shadow-xs",
                      children: [
                        _jsx("span", {
                          className: "text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1",
                          children: "Role Challenge"
                        }),
                        _jsx("p", {
                          className: "text-xs sm:text-sm text-neutral-700 leading-relaxed",
                          children: current.challenge
                        })
                      ]
                    }),
                    _jsxs("div", {
                      className: "p-4 rounded-xl bg-white border border-neutral-200 shadow-xs",
                      children: [
                        _jsx("span", {
                          className: "text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1",
                          children: "UX Solution"
                        }),
                        _jsx("p", {
                          className: "text-xs sm:text-sm text-neutral-700 leading-relaxed",
                          children: current.design
                        })
                      ]
                    })
                  ]
                }),
                _jsxs("div", {
                  className: "p-4 rounded-xl bg-white border border-neutral-200 shadow-xs",
                  children: [
                    _jsx("span", {
                      className: "text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-2",
                      children: "Automated Studio Capabilities"
                    }),
                    _jsx("div", {
                      className: "flex flex-wrap gap-2",
                      children: current.tasks.map((task) =>
                        _jsxs("span", {
                          className: "text-xs px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 font-medium flex items-center gap-1.5",
                          children: [
                            _jsx(CheckIcon, {}),
                            task
                          ]
                        }, task)
                      )
                    })
                  ]
                })
              ]
            })
          ]
        }),

        /* ── 07. UP NEXT ── */
        _jsxs("section", {
          id: "up-next",
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