import { r as u, j as e, m as N } from "./index--rniiPa8.js";/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g = (...t) => t.filter((s, a, d) => !!s && s.trim() !== "" && d.indexOf(s) === a).join(" ").trim();/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C = t => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L = t => t.replace(/^([A-Z])|[\s-_]+(\w)/g, (s, a, d) => d ? d.toUpperCase() : a.toLowerCase());/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _ = t => { const s = L(t); return s.charAt(0).toUpperCase() + s.slice(1) };/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var j = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $ = t => { for (const s in t) if (s.startsWith("aria-") || s === "role" || s === "title") return !0; return !1 }, E = u.createContext({}), S = () => u.useContext(E), I = u.forwardRef(({ color: t, size: s, strokeWidth: a, absoluteStrokeWidth: d, className: l = "", children: r, iconNode: h, ...o }, c) => { const { size: i = 24, strokeWidth: n = 2, absoluteStrokeWidth: m = !1, color: x = "currentColor", className: p = "" } = S() ?? {}, f = d ?? m ? Number(a ?? n) * 24 / Number(s ?? i) : a ?? n; return u.createElement("svg", { ref: c, ...j, width: s ?? i ?? j.width, height: s ?? i ?? j.height, stroke: t ?? x, strokeWidth: f, className: g("lucide", p, l), ...!r && !$(o) && { "aria-hidden": "true" }, ...o }, [...h.map(([b, y]) => u.createElement(b, y)), ...Array.isArray(r) ? r : [r]]) });/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v = (t, s) => { const a = u.forwardRef(({ className: d, ...l }, r) => u.createElement(I, { ref: r, iconNode: s, className: g(`lucide-${C(_(t))}`, `lucide-${t}`, d), ...l })); return a.displayName = _(t), a };/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], M = v("chevron-up", A);/**
 * @license lucide-react v1.24.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B = [["path", { d: "M3 5h.01", key: "18ugdj" }], ["path", { d: "M3 12h.01", key: "nlz23k" }], ["path", { d: "M3 19h.01", key: "noohij" }], ["path", { d: "M8 5h13", key: "1pao27" }], ["path", { d: "M8 12h13", key: "1za7za" }], ["path", { d: "M8 19h13", key: "m83p4d" }]], W = v("list", B); function k({ headings: t, mobile: s = !1 }) { const [a, d] = u.useState(0), [l, r] = u.useState(!1); u.useEffect(() => { if (!t?.length) return; const o = new Map(t.map((n, m) => [t[m].id, 0])), c = new IntersectionObserver(n => { for (const p of n) o.set(p.target.id, p.intersectionRatio); let m = 0, x = 0; t.forEach((p, f) => { const b = o.get(p.id) ?? 0; b > x && (x = b, m = f) }), x > 0 && d(m) }, { root: null, rootMargin: "-20% 0px -60% 0px", threshold: [0, .1, .25, .5, .75, 1] }), i = t.map(n => document.getElementById(n.id)).filter(Boolean); return i.forEach(n => c.observe(n)), () => i.forEach(n => c.unobserve(n)) }, [t]), u.useEffect(() => { if (!s || !l) return; const o = c => { c.key === "Escape" && r(!1) }; return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o) }, [l, s]); const h = o => { const c = document.getElementById(o); c && (c.scrollIntoView({ behavior: "smooth", block: "start" }), r(!1)) }; if (!t?.length) return null; if (s) { const o = t[a] ?? t[0], c = (a + 1) / t.length * 100, i = e.jsxs("nav", { className: "contents-index-mobile", "aria-label": "Page sections", children: [e.jsxs("div", { id: "mobile-contents-menu", className: `contents-index-mobile__menu${l ? " is-open" : ""}`, "aria-hidden": !l, inert: !l, children: [e.jsx("p", { className: "contents-index-mobile__menu-title", children: "Contents" }), e.jsx("ul", { className: "contents-index-mobile__list", children: t.map(({ id: n, label: m }, x) => e.jsx("li", { children: e.jsxs("button", { type: "button", className: `contents-index-mobile__link${x === a ? " is-active" : ""}`, onClick: () => h(n), tabIndex: l ? 0 : -1, children: [e.jsx("span", { className: "contents-index-mobile__link-number", children: String(x + 1).padStart(2, "0") }), e.jsx("span", { children: m })] }) }, n)) })] }), e.jsxs("button", { type: "button", className: "contents-index-mobile__pill", "aria-label": `Section ${a + 1} of ${t.length}: ${o.label}. Open contents`, "aria-expanded": l, "aria-controls": "mobile-contents-menu", onClick: () => r(n => !n), children: [e.jsxs("span", { className: "contents-index-mobile__ring", "aria-hidden": "true", children: [e.jsxs("svg", { viewBox: "0 0 36 36", children: [e.jsx("circle", { className: "contents-index-mobile__ring-track", cx: "18", cy: "18", r: "15", pathLength: "100" }), e.jsx("circle", { className: "contents-index-mobile__ring-value", cx: "18", cy: "18", r: "15", pathLength: "100", style: { strokeDashoffset: 100 - c } })] }), e.jsx("span", { children: a + 1 })] }), e.jsx("span", { className: "contents-index-mobile__active-label", children: o.label }), e.jsx(M, { "aria-hidden": "true", className: `contents-index-mobile__chevron${l ? " is-open" : ""}` })] })] }); return typeof document > "u" ? i : N.createPortal(i, document.body) } return e.jsxs("nav", { "aria-label": "Contents", children: [e.jsxs("p", { className: "contents-index__heading text-sm text-neutral-100 mb-4", children: [e.jsx(W, { "aria-hidden": "true", className: "contents-index__heading-icon" }), "Contents"] }), e.jsx("ul", { className: "list-none p-0 m-0 flex flex-col gap-1", children: t.map(({ id: o, label: c }, i) => e.jsx("li", { className: "contents-index__item", children: e.jsx("button", { type: "button", className: `contents-index__link ${i === a ? "contents-index__link--active" : ""}`, onClick: () => h(o), children: e.jsx("span", { className: "contents-index__label text-sm", children: c }) }) }, o)) })] }) } function w() { return e.jsxs("section", { className: "curious-cta text-left", children: [e.jsx("div", { className: "curious-cta__separator", "aria-hidden": "true" }), e.jsxs("p", { className: "curious-cta__text", children: ["👀 ", e.jsx("br", {}), "Does this interest you? Let's chat about it and more exciting opportunities."] }), e.jsxs("a", { href: "mailto:ganeshmuniganti27@gmail.com", className: "curious-cta__button", target: "_blank", rel: "noreferrer", children: ["Let's Chat", e.jsx("span", { className: "curious-cta__arrow", "aria-hidden": "true", children: e.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: e.jsx("path", { d: "M10 16L14 12L10 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) })] })] }) } function O(t) { return `work-summary-load work-summary-defer work-summary-load-${Math.min(t + 2, 3)}` } function R({ hero: t, heroInContent: s = !1, sections: a, ariaLabel: d = "Case study", className: l = "", transitionPhase: r }) { const h = !!r, o = !h || r === "open" || r === "closing" || r === "settling", c = a.map(({ id: i, navLabel: n, title: m }) => ({ id: i, label: n ?? m })); u.useEffect(() => { if (!h) { const isDark = typeof document !== "undefined" && (document.documentElement.classList.contains("dark") || document.documentElement.getAttribute("data-sky") === "night" || document.documentElement.getAttribute("data-theme-bg") === "dark" || (function(){ try { const p = localStorage.getItem("theme_preference") || localStorage.getItem("portfolio_theme"); if (p === "dark" || p === "night") return true; if (p === "light" || p === "day") return false; } catch(e){} const h = new Date().getHours() + new Date().getMinutes() / 60; return h < 6 || h >= 18; })()); const prevBg = document.body.style.backgroundColor; const activeBg = isDark ? "#0A0A0A" : "#FFFFFF"; document.body.style.backgroundColor = activeBg; document.documentElement.style.backgroundColor = activeBg; document.documentElement.setAttribute("data-theme-bg", isDark ? "dark" : "light"); if (isDark) { document.documentElement.classList.add("dark"); document.documentElement.setAttribute("data-sky", "night"); document.documentElement.style.setProperty("--port-bg", "#0A0A0A"); document.documentElement.style.setProperty("--port-text", "#F5F5F5"); document.documentElement.style.setProperty("--bg", "#0A0A0A"); } else { document.documentElement.classList.remove("dark"); document.documentElement.setAttribute("data-sky", "day"); document.documentElement.style.setProperty("--port-bg", "#FFFFFF"); document.documentElement.style.setProperty("--port-text", "#0A0A0A"); document.documentElement.style.setProperty("--bg", "#FFFFFF"); } document.documentElement.style.setProperty("--current-bg", activeBg); try { window.scrollTo(0, 0) } catch { } return () => { document.body.style.backgroundColor = prevBg || ""; document.documentElement.style.backgroundColor = prevBg || ""; } } }, [h]); const handleBack = () => { if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) { window.history.back() } else { window.location.href = "/" } }; return e.jsxs("div", { className: `case-study-page-wrapper${!h ? " is-standalone" : ""}`, style: { minHeight: "100vh" }, children: [!h && e.jsx("nav", { className: "case-study-standalone-nav", children: e.jsxs("button", { type: "button", className: "card-expand-back-btn", onClick: handleBack, children: [e.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: e.jsx("path", { d: "M10 3L5 8l5 5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) }), "Back"] }) }), e.jsxs("article", { className: `case-study-page ${l} ${h ? `is-handoff-page is-handoff-${r}` : "is-standalone-case-study"}`.trim(), children: [e.jsx("div", { className: "md:hidden", children: e.jsx(k, { headings: c, mobile: !0 }) }), !s && e.jsx("div", { className: `w-full min-h-[50vh] flex mx-auto items-center justify-center ${h ? "case-study-handoff-hero" : "work-summary-load work-summary-load-0"}`, children: t }), e.jsxs("div", { className: "w-full mx-auto grid grid-cols-12 gap-6 md:gap-8 pb-12", "aria-label": d, children: [e.jsxs("aside", { className: "case-study-toc-sidebar work-summary-load work-summary-load-1 col-span-12 md:col-span-4 hidden md:flex flex-col", style: { position: "sticky", top: "84px", alignSelf: "flex-start", height: "fit-content", zIndex: 20 }, children: [e.jsx(k, { headings: c }), e.jsx("div", { className: "hidden md:block mt-auto pt-8", children: e.jsx(w, {}) })] }), e.jsxs("div", { className: "col-span-12 md:col-span-8 flex flex-col gap-20 md:gap-28 min-w-0", children: [s && e.jsx("div", { className: h ? "case-study-handoff-hero" : "work-summary-load work-summary-load-1", children: t }), o ? a.map(({ id: i, title: n, description: m, content: x, customContent: p }, f) => e.jsx("section", { id: i, className: `${O(f)}${p ? " agentation-pass-through" : ""}`, children: p ?? e.jsxs(e.Fragment, { children: [e.jsx("h2", { className: "font-semibold mb-2", children: n }), e.jsx("p", { className: "text-sm text-neutral-400 w-full md:w-[50%] mb-8", children: m }), x ?? null] }) }, i)) : null, o ? e.jsx("div", { className: "md:hidden pt-4", children: e.jsx(w, {}) }) : null] })] })] })] }) } /* removed duplicate export */
import { r as React, j as jsxRuntime, m as ReactDOM } from "./index--rniiPa8.js";

const { jsx: _jsx, jsxs: _jsxs, Fragment: _Fragment } = jsxRuntime;

export function HighlightPill({ children }) {
  return _jsx("span", {
    className: "cs-highlight-pill",
    children
  });
}

export function ScriptEyebrow({ children }) {
  return _jsx("p", {
    className: "cs-eyebrow font-handwriting",
    children
  });
}

export function StatCallout({ value, label }) {
  return _jsxs("div", {
    className: "flex flex-col gap-1.5",
    children: [
      _jsx("span", {
        className: "text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight font-sans",
        children: value
      }),
      _jsx("span", {
        className: "text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal",
        children: label
      })
    ]
  });
}

export function QuoteBox({ quote }) {
  return _jsx("div", {
    className: "cs-quote-box",
    children: _jsxs("p", {
      children: ["“", quote, "”"]
    })
  });
}

export function RoleCard({ title }) {
  return _jsx("div", {
    className: "p-5 rounded-2xl border-t-2 border-t-[#3D2FFF] border border-neutral-200 bg-white shadow-xs",
    children: _jsx("p", {
      className: "text-base sm:text-lg font-black uppercase text-[#0A0A0A] leading-tight",
      children: title
    })
  });
}

export function CuriousCta() {
  return _jsxs("section", {
    className: "curious-cta text-left mt-8",
    children: [
      _jsx("div", { className: "curious-cta__separator", "aria-hidden": "true" }),
      _jsxs("p", {
        className: "curious-cta__text",
        children: [
          "👀 ",
          _jsx("br", {}),
          "Does this interest you? Let's chat about it and more exciting opportunities."
        ]
      }),
      _jsxs("a", {
        href: "mailto:ganeshmuniganti27@gmail.com",
        className: "curious-cta__button",
        target: "_blank",
        rel: "noreferrer",
        children: [
          "Let's Chat",
          _jsx("span", {
            className: "curious-cta__arrow",
            "aria-hidden": "true",
            children: _jsx("svg", {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: _jsx("path", { d: "M10 16L14 12L10 8" })
            })
          })
        ]
      })
    ]
  });
}

export function CaseStudyPage({
  eyebrow = "Case Study",
  title = "",
  highlightedText = "",
  subheadline = "",
  role = "",
  platforms = "App & Website",
  scope = "End-to-End System",
  timeline = "",
  heroMedia,
  sections = [],
  children,
  // legacy & handoff props
  hero,
  heroInContent = false,
  ariaLabel = "Case study",
  className = "",
  transitionPhase
}) {
  const isHandoff = !!transitionPhase;
  const isReady = !isHandoff || transitionPhase === "open" || transitionPhase === "closing" || transitionPhase === "settling";

  const [activeSection, setActiveSection] = React.useState(sections[0]?.id || "");
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch { }
  }, []);

  React.useEffect(() => {
    if (!sections || !sections.length) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      setShowBackToTop(window.scrollY > 400);

      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i].id;
        const el = document.getElementById(secId);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  const effectiveHero = heroMedia || hero;

  return _jsxs("div", {
    className: `case-study-page-wrapper${!isHandoff ? " is-standalone" : ""}`,
    children: [
      /* ── Sticky Top Bar with Back to Work Button ── */
      _jsxs("header", {
        className: "case-study-sticky-header sticky top-0 z-50 w-full px-4 sm:px-6 md:px-12 py-3.5 flex items-center justify-between",
        children: [
          _jsxs("button", {
            type: "button",
            onClick: handleBack,
            className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-xs font-semibold text-neutral-700 hover:text-black transition-all cursor-pointer",
            children: [
              _jsx("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: _jsx("path", { d: "m15 18-6-6 6-6" })
              }),
              _jsx("span", { children: "Back to Work" })
            ]
          }),
          _jsx("span", {
            className: "font-handwriting text-lg text-neutral-400 hidden sm:inline-block",
            children: "Ganesh Muniganti — Case Study"
          })
        ]
      }),

      /* ── Hero & Metadata Container (Image 1 & 2 Layout) ── */
      (title || effectiveHero) &&
      _jsxs("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-6 text-center",
        children: [
          eyebrow &&
          _jsx("p", {
            className: "font-handwriting text-2xl sm:text-3xl font-bold text-[#3D2FFF] mb-3 -rotate-1",
            children: eyebrow
          }),
          title &&
          _jsxs("h1", {
            className: "case-study-main-title font-black uppercase text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-5 max-w-4xl mx-auto",
            children: [
              title,
              " ",
              highlightedText &&
              _jsx("span", {
                className: "bg-[#3D2FFF] text-white px-3 py-0.5 rounded-xl inline-block shadow-sm",
                children: highlightedText
              })
            ]
          }),
          subheadline &&
          _jsx("p", {
            className: "case-study-subheadline text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8",
            children: subheadline
          }),
          role &&
          _jsxs("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-y border-neutral-200 max-w-3xl mx-auto mb-10 text-left",
            children: [
              _jsxs("div", {
                className: "md:border-r md:border-neutral-200 md:pr-4",
                children: [
                  _jsx("p", {
                    className: "text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-1",
                    children: "MY ROLE"
                  }),
                  _jsx("p", {
                    className: "font-bold text-sm sm:text-base text-[#3D2FFF]",
                    children: role
                  })
                ]
              }),
              _jsxs("div", {
                className: "md:border-r md:border-neutral-200 md:pr-4",
                children: [
                  _jsx("p", {
                    className: "text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-1",
                    children: "PLATFORMS"
                  }),
                  _jsx("p", {
                    className: "font-bold text-sm sm:text-base text-[#3D2FFF]",
                    children: platforms
                  })
                ]
              }),
              _jsxs("div", {
                className: "md:border-r md:border-neutral-200 md:pr-4",
                children: [
                  _jsx("p", {
                    className: "text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-1",
                    children: "SCOPE"
                  }),
                  _jsx("p", {
                    className: "font-bold text-sm sm:text-base text-[#3D2FFF]",
                    children: scope
                  })
                ]
              }),
              _jsxs("div", {
                children: [
                  _jsx("p", {
                    className: "text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 mb-1",
                    children: "YEAR"
                  }),
                  _jsx("p", {
                    className: "font-bold text-sm sm:text-base text-[#3D2FFF]",
                    children: timeline
                  })
                ]
              })
            ]
          }),
          effectiveHero &&
          _jsx("div", {
            className: "rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 mb-14 bg-neutral-950",
            children: effectiveHero
          })
        ]
      }),

      /* ── Two-Column Main Content Section ── */
      _jsxs("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-16 flex flex-col md:flex-row gap-8 lg:gap-16",
        children: [
          /* Sticky TOC (Left Column) */
          sections && sections.length > 0
            ? _jsxs("aside", {
              className: "case-study-toc-sidebar w-full md:w-48 lg:w-56 shrink-0 py-2 flex flex-col justify-between",
              style: { position: "sticky", top: "84px", alignSelf: "flex-start", height: "fit-content", zIndex: 20 },
              children: [
                _jsx("nav", {
                  className: "flex flex-col space-y-3",
                  "aria-label": "Table of contents",
                  children: sections.map(({ id, label, navLabel, title: sTitle }) => {
                    const displayLabel = label || navLabel || sTitle || id;
                    const isActive = activeSection === id;
                    return _jsxs("button", {
                      type: "button",
                      onClick: () => scrollToSection(id),
                      className: `text-left text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${isActive
                        ? "text-[#3D2FFF] font-bold"
                        : "text-neutral-400 hover:text-neutral-700 font-medium"
                        }`,
                      children: [
                        isActive && _jsx("span", { className: "font-black text-[#3D2FFF]", children: "—" }),
                        _jsx("span", { children: displayLabel })
                      ]
                    }, id);
                  })
                }),
                _jsx("div", {
                  className: "hidden md:block mt-8",
                  children: _jsx(CuriousCta, {})
                })
              ]
            })
            : null,

          /* Main Article Stream (Right Column) */
          _jsxs("main", {
            className: "flex-1 min-w-0 max-w-3xl space-y-20",
            children: [
              children
                ? children
                : isReady
                  ? sections.map(({ id, title: sTitle, description, content, customContent }) =>
                    _jsx("section", {
                      id,
                      className: "scroll-mt-28 space-y-4",
                      children:
                        customContent ||
                        _jsxs(_Fragment, {
                          children: [
                            sTitle && _jsx("h2", { className: "font-black text-2xl uppercase", children: sTitle }),
                            description && _jsx("p", { className: "text-sm text-neutral-600", children: description }),
                            content || null
                          ]
                        })
                    }, id)
                  )
                  : null,
              _jsx("div", {
                className: "md:hidden pt-4",
                children: _jsx(CuriousCta, {})
              })
            ]
          })
        ]
      }),

      /* ── Floating Blue Back-to-Top Button ── */
      showBackToTop &&
      _jsx("button", {
        type: "button",
        onClick: scrollToTop,
        "aria-label": "Back to top",
        className: "fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#3D2FFF] hover:bg-[#2A1FCC] text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer",
        children: _jsx("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: _jsx("path", { d: "m18 15-6-6-6 6" })
        })
      })
    ]
  });
}

// For compatibility with imports
export { CaseStudyPage as C, CaseStudyPage as default };
