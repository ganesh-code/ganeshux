(() => {
"use strict";
const $ = s => document.querySelector(s);
const root = document.documentElement;
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
// phones: the scene answers only two things, dragging the sun or moon and tapping the windmill; desktop and tablet keep everything
const PHONE = matchMedia("(max-width: 640px)");
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rand = (a, b) => a + Math.random() * (b - a);
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const TAU = Math.PI * 2;
const HZ = .618; // horizon, as a fraction of the scene height from the top

/* ---------- the work box ---------- */
const CATS = [["best", "Case study"], ["motion", "Motion"], ["visual", "Visual"], ["ai", "AI exploration"]];
const CATLABEL = Object.fromEntries(CATS);
const tabs = $("#tabs"), works = $("#works");
if (tabs && works) {
ALLCARDS = [...document.querySelectorAll("#grid .card")], SPANS = new Map(ALLCARDS.map(c => [c, [...c.classList].find(k => /^s\d+$/.test(k))]));
let curCat = "best", curList = ALLCARDS, curIdx = 0;
CATS.forEach(([key, lab], i) => {
  const n = key === "all" ? ALLCARDS.length : ALLCARDS.filter(c => c.dataset.cats.split(" ").includes(key)).length;
  const b = document.createElement("button");
  b.type = "button"; b.role = "tab"; b.id = "tab" + i; b.innerHTML = `${lab} <small>${n}</small>`; b.setAttribute("aria-selected", i ? "false" : "true");
  b.addEventListener("click", () => { [...tabs.children].forEach(x => x.setAttribute("aria-selected", String(x === b))); filterCards(key); });
  tabs.appendChild(b);
});
function filterCards(key) {
  curCat = key;
  const vis = ALLCARDS.filter(c => key === "all" || c.dataset.cats.split(" ").includes(key));
  // the Motion tab has its own running order (data-mrank); everywhere else the page order holds
  if (key === "motion") vis.sort((a, b) => (+a.dataset.mrank || 99) - (+b.dataset.mrank || 99));
  ALLCARDS.forEach(c => c.style.order = ""); vis.forEach((c, k) => c.style.order = k);
  ALLCARDS.forEach(c => { c.classList.toggle("gone", !vis.includes(c)); c.classList.remove("s12", "s7", "s6", "s5", "s4"); });
  // filtered views: a featured card spans the row (bento ones pair up); the rest pair up, and an odd one out spans the row
  // motion reels stay small (three a row)
  const rest = vis.filter(c => !c.classList.contains("feat") && !c.classList.contains("reel"));
  vis.forEach(c => c.classList.add(key === "all" ? SPANS.get(c) : c.classList.contains("reel") ? "s4" : c.classList.contains("bento") ? "s6" : c.classList.contains("feat") || (c === rest[rest.length - 1] && rest.length % 2) ? "s12" : "s6"));
  curList = vis; curIdx = 0; buildThumbs(); show(0);
  window.dispatchEvent(new Event("cardsmoved"));
}
// one at a time: the selected project fills the stage; details on the right
const shot = $("#shot"), shotVis = $("#shotVis"), info = $("#info"), strip = $("#tstrip");
const ARW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const EXT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 11l6-6M6 5h5v5"/></svg>';
function show(i, anim) {
  if (!curList.length) { shotVis.innerHTML = ""; info.innerHTML = '<p class="empty">New work for this category is on its way.</p>'; return; }
  curIdx = (i + curList.length) % curList.length;
  const c = curList[curIdx], q = s => c.querySelector(s);
  shot.dataset.glyph = c.dataset.glyph;
  shotVis.innerHTML = q(".vis").innerHTML;
  if (anim) { shot.classList.remove("swap"); void shot.offsetWidth; shot.classList.add("swap"); }
  const link = c.dataset.link, chips = c.dataset.cats.split(" ").map(k => `<span>${CATLABEL[k]}</span>`).join("");
  info.innerHTML = `<p class="meta">${q(".meta").textContent}</p><h3>${q("h3").textContent}</h3><p class="desc">${q(".desc").textContent}</p>
    <div class="facts"><div>Domain <span class="chipset">${chips}</span></div><div>Type <b>${c.dataset.type || "Project"}</b></div>${q(".tags") ? `<div>Made with <span class="chipset">${[...q(".tags").children].map(tag => `<span>${tag.textContent}</span>`).join("")}</span></div>` : ""}<div>Project <b>${curIdx + 1} of ${curList.length}</b></div></div>
    <div class="ctas">${link ? `<a class="pri" href="${link}" ${link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${c.dataset.type.includes("Case study") ? "Read case study" : "Open project"} ${EXT}</a>` : `<a class="pri" href="#work">Read case study ${ARW}</a>`}<a href="#work" data-act="grid">See all in grid</a></div>`;
  [...strip.children].forEach((t, k) => t.setAttribute("aria-current", String(k === curIdx)));
  const t = strip.children[curIdx]; if (t) { const l = t.offsetLeft, r = l + t.offsetWidth; if (l < strip.scrollLeft) strip.scrollTo({ left: l - 6, behavior: "smooth" }); else if (r > strip.scrollLeft + strip.clientWidth) strip.scrollTo({ left: r - strip.clientWidth + 6, behavior: "smooth" }); }
}
function buildThumbs() {
  strip.innerHTML = "";
  curList.forEach((c, k) => { const b = document.createElement("button"); b.type = "button"; b.className = "thumb"; b.setAttribute("aria-label", c.querySelector("h3").textContent);
    b.innerHTML = `<div class="mini">${c.querySelector(".vis").innerHTML}</div>`; b.addEventListener("click", () => show(k, true)); strip.appendChild(b); });
}
$("#prev").addEventListener("click", () => show(curIdx - 1, true));
$("#next").addEventListener("click", () => show(curIdx + 1, true));
works.addEventListener("keydown", e => { if (works.dataset.view !== "one") return; if (e.key === "ArrowRight") show(curIdx + 1, true); if (e.key === "ArrowLeft") show(curIdx - 1, true); });
function setView(v) {
  works.dataset.view = v; store.set("fold.view", v);
  works.querySelectorAll(".views button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
  window.dispatchEvent(new Event("cardsmoved"));
}
works.querySelectorAll(".views button").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
info.addEventListener("click", e => { if (e.target.closest("[data-act=grid]")) { e.preventDefault(); setView("grid"); } });
setView("grid");
filterCards("best");
}

/* ---------- time + theme ---------- */
const now = new Date(), HR = now.getHours() + now.getMinutes() / 60;
const moonPhase = (() => { const jd = now.getTime() / 864e5 + 2440587.5; const P = 29.530588853; return (((jd - 2451550.1) % P) + P) % P / P; })();
/* the sky follows the viewer's own clock until they drag it; the time pill brings it back */
const realSky = () => {
  const d = new Date(), h = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
  let day = h >= 6 && h < 18;
  try {
    const pref = localStorage.getItem("theme_preference") || localStorage.getItem("portfolio_theme");
    if (pref === "dark" || pref === "night") day = false;
    else if (pref === "light" || pref === "day") day = true;
  } catch(e) {}
  return { mode: day ? "day" : "night", s: clamp(day ? (h - 6) / 12 : ((h - 18 + 24) % 24) / 12, .02, .98), h };
};
const R0 = realSky();
const S = {
  mode: R0.mode, live: true, dragged: false,
  night: 0, t: 0, cloud: 0, sail: 0, windIn: 0, gust: 0,
  s: { day: R0.mode === "day" ? R0.s : .62, night: R0.mode === "night" ? R0.s : .38 }
};
S.night = S.mode === "night" ? 1 : 0;
const dn = $("#dn");
const ic = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  clear: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  monsoon: ic('<path d="M7 15a4 4 0 01-.5-8A5.5 5.5 0 0117 8a3.5 3.5 0 01.5 7z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>'),
  autumn: ic('<path d="M5 19C5 11 10 5 19 5c0 9-6 14-14 14z"/><path d="M5 19l8-8"/>'),
  winter: ic('<path d="M12 2v20M4 7l16 10M4 17L20 7M9 4l3 3 3-3M9 20l3-3 3 3"/>'),
  spring: ic('<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C10 6 12 3 12 3s2 3 0 6.8zM14.2 12c3.8-2 6.8 0 6.8 0s-3 2-6.8 0zM12 14.2c2 3.8 0 6.8 0 6.8s-2-3 0-6.8zM9.8 12C6 14 3 12 3 12s3-2 6.8 0z"/>'),
  starry: ic('<path d="M12 3l2.2 5.6L20 9.3l-4.5 3.8L17 19l-5-3.2L7 19l1.5-5.9L4 9.3l5.8-.7z"/>'),
  storm: ic('<path d="M7 14a4 4 0 01-.5-8A5.5 5.5 0 0117 7a3.5 3.5 0 01.5 7"/><path d="M13 11l-3 5h4l-3 5"/>'),
  snow: ic('<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/><path d="M17 3v4M15 5h4"/>'),
  kundali: ic('<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 3l18 18M21 3L3 21M12 3l9 9-9 9-9-9z"/>')
};
const SEASONS = {
  day: [
    { id: "clear", label: "Clear", note: "Full sun, drifting cumulus, gulls and the odd contrail." },
    { id: "monsoon", label: "Monsoon", note: "Grey cloud, rain on the sea and a rainbow behind it." },
    { id: "autumn", label: "Autumn", note: "Golden light, rust-coloured trees and leaves on the wind." },
    { id: "winter", label: "Winter", note: "Pale sun, snow on the cliff and light snowfall." },
    { id: "spring", label: "Spring", note: "Trees in blossom and petals drifting past." }
  ],
  night: [
    { id: "starry", label: "Starry", note: "Tonight's moon at its real phase, stars and fireflies." },
    { id: "storm", label: "Storm", note: "Heavy rain and lightning over the sea." },
    { id: "snow", label: "Snowfall", note: "Quiet snow by moonlight." },
    { id: "kundali", label: "Astro", note: "All twelve rashi constellations across the night sky; hover one to see its sign. Moon and Sun signs are sidereal and approximate." }
  ]
};
const modeOf = id => SEASONS.day.some(x => x.id === id) ? "day" : "night";
const FXT = s => ({
  over: ({ monsoon: .85, storm: 1, winter: .2, snow: .55 })[s] || 0,
  warm: s === "autumn" ? 1 : 0, cold: s === "winter" || s === "snow" ? 1 : 0,
  rain: s === "monsoon" ? .7 : s === "storm" ? 1 : 0,
  snow: s === "winter" ? .55 : s === "snow" ? 1 : 0,
  leaves: s === "autumn" ? 1 : 0, petals: s === "spring" ? 1 : 0,
  rainbow: s === "monsoon" ? 1 : 0, lightning: s === "storm" ? 1 : 0,
  kundali: s === "kundali" ? 1 : 0, fireflies: s === "starry" ? 1 : 0,
  birds: ({ clear: 1, spring: 1, autumn: .8, winter: .35, monsoon: .25 })[s] || 0,
  planes: s === "storm" ? 0 : 1
});
const landKey = s => s === "autumn" ? "autumn" : s === "spring" ? "spring" : (s === "winter" || s === "snow") ? "winter" : "clear";
// every visit opens on a clear day or a starry night; a season picked here is remembered only until the page is left
const lastSeason = { day: "clear", night: "starry" };
S.season = lastSeason[S.mode];
S.amt = FXT(S.season); S.amtT = FXT(S.season);
const seasonBtn = $("#seasonBtn"), pop = $("#pop");
function apply(m, season, save) {
  const modeChanged = m !== S.mode;
  S.mode = m; S.season = season; lastSeason[m] = season; S.amtT = FXT(season);
  root.setAttribute("data-sky", m);
  if (dn) {
    dn.setAttribute("aria-checked", String(m === "day"));
    dn.setAttribute("aria-label", m === "day" ? "Day. Switch to night" : "Night. Switch to day");
  }
  const meta = SEASONS[m] && SEASONS[m].find(x => x.id === season);
  if (meta) {
    const sIcon = $("#seasonIcon"); if (sIcon) sIcon.innerHTML = ICON[season];
    const sLabel = $("#seasonLabel"); if (sLabel) sLabel.textContent = meta.label;
    if (seasonBtn) seasonBtn.setAttribute("aria-label", `Season: ${meta.label}. Change season`);
    const wIcon = $("#whenIcon"); if (wIcon) wIcon.innerHTML = ICON[season];
    const pNote = $("#popNote"); if (pNote) pNote.textContent = meta.note;
  }
  document.querySelectorAll(".chips[data-mode] .chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.id === season)));
  if (typeof setLand === "function") setLand(landKey(season));
  label = "";
  if (typeof window.setPortfolioTheme === "function") {
    window.setPortfolioTheme(m, season);
  }
  return modeChanged;
}
for (const m of ["day", "night"]) {
  const box = document.querySelector(`.chips[data-mode="${m}"]`);
  if (box) SEASONS[m].forEach(x => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.dataset.id = x.id; b.setAttribute("aria-pressed", "false");
    b.innerHTML = ICON[x.id] + `<span>${x.label}</span>`;
    b.addEventListener("click", () => { const changed = m !== S.mode; apply(m, x.id, true); if (changed) syncLive(); window.found && found("season"); });
    box.appendChild(b);
  });
}
function togglePop(open) {
  if (pop) pop.hidden = !open;
  if (seasonBtn) seasonBtn.setAttribute("aria-expanded", String(open));
  if (open && pop) { const pr = pop.querySelector('.chip[aria-pressed="true"]') || pop.querySelector(".chip"); pr && pr.focus(); }
}
if (seasonBtn) seasonBtn.addEventListener("click", e => { e.stopPropagation(); if (pop) togglePop(pop.hidden); });
if (pop) pop.addEventListener("click", e => e.stopPropagation());
document.addEventListener("click", () => { if (pop && !pop.hidden) togglePop(false); });
/* a soft blur band behind the category tabs while they are pinned */
(() => {
  const bar = document.querySelector(".wbar"), work = document.getElementById("works"); if (!bar || !work) return;
  const veil = document.createElement("div"); veil.className = "tabveil"; veil.setAttribute("aria-hidden", "true"); bar.parentNode.insertBefore(veil, bar);
  const upd = () => { const t = parseFloat(getComputedStyle(bar).top), r = bar.getBoundingClientRect(), w = work.getBoundingClientRect();
    veil.classList.toggle("on", r.top <= t + 1 && w.bottom > r.bottom + 40); };
  addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
})();
/* the dock: hides while you scroll down, comes back when you scroll up or stop scrolling */
(() => {
  const root = document.documentElement; let lastY = scrollY, acc = 0, idle;
  const show = () => root.classList.remove("navhid");
  addEventListener("scroll", () => {
    const y = scrollY, d = y - lastY; lastY = y;
    acc = Math.sign(d) === Math.sign(acc) ? acc + d : d;
    if (acc > 12 && y > 80 && !root.classList.contains("navhid")) { root.classList.add("navhid"); if (!pop.hidden) togglePop(false); }
    else if (acc < -12 || y < 40) show();
    clearTimeout(idle); idle = setTimeout(show, 260);
  }, { passive: true });
})();
document.addEventListener("keydown", e => { if (e.key === "Escape" && !pop.hidden) { togglePop(false); seasonBtn.focus(); } });
if (dn) dn.addEventListener("click", () => {
  window.__lastDnHandled = Date.now();
  window.found && found("daynight");
  const m = S.mode === "day" ? "night" : "day";
  try {
    localStorage.setItem("theme_preference", m === "night" ? "dark" : "light");
    localStorage.setItem("portfolio_theme", m === "night" ? "dark" : "light");
  } catch (e) {}
  apply(m, lastSeason[m], false);
  syncLive();
});
const whenBtn = $("#when");
function setLive(on) {
  S.live = on; if (whenBtn) whenBtn.dataset.live = String(on); label = "";
  if (on) { const r = realSky(); S.s[r.mode] = r.s; if (r.mode !== S.mode) apply(r.mode, lastSeason[r.mode], false); }
}
if (whenBtn) whenBtn.addEventListener("click", () => { S.dragged = false; setLive(true); });
/* switching day/night or season keeps "drag the sun"; only a drag earns "back to now" */
function syncLive() { const r = realSky(); if (!S.dragged && r.mode === S.mode) setLive(true); else { S.live = false; if (whenBtn) whenBtn.dataset.live = "false"; label = ""; } }
/* sidereal Sun and Moon signs for the Kundali sky (approximate) */
const RASHI = ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena"];
const ZG = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map(g => g + "︎");
const AST = (() => {
  const D2R = Math.PI / 180, jd = now.getTime() / 864e5 + 2440587.5, n = jd - 2451545;
  const nm = x => ((x % 360) + 360) % 360;
  const Ls = nm(280.46 + .9856474 * n), g = nm(357.528 + .9856003 * n);
  const sun = nm(Ls + 1.915 * Math.sin(g * D2R) + .02 * Math.sin(2 * g * D2R));
  const Lm = nm(218.316 + 13.176396 * n), Mm = nm(134.963 + 13.064993 * n), Dm = nm(297.85 + 12.190749 * n);
  const moon = nm(Lm + 6.289 * Math.sin(Mm * D2R) + 1.274 * Math.sin((2 * Dm - Mm) * D2R) + .658 * Math.sin(2 * Dm * D2R) - .186 * Math.sin(g * D2R) + .214 * Math.sin(2 * Mm * D2R));
  const ay = 23.853 + (now.getUTCFullYear() + now.getUTCMonth() / 12 - 2000) * .013966;
  return { sunS: Math.floor(nm(sun - ay) / 30), moonS: Math.floor(nm(moon - ay) / 30) };
})();
let label = "";
const fmt = h => { h = ((h % 24) + 24) % 24; let H = Math.floor(h), M = Math.floor((h - H) * 60); const ap = H >= 12 ? "pm" : "am"; H = H % 12 || 12; return `${H}:${String(M).padStart(2, "0")} ${ap}`; };
const hourOf = () => S.live ? realSky().h : S.mode === "day" ? 6 + 12 * S.s.day : 18 + 12 * S.s.night;
const range = $("#timeRange") || $("#timeSlider");
if (range) range.addEventListener("input", () => { S.dragged = true; setLive(false); S.s[S.mode] = range.value / 100; });

/* ---------- canvases ---------- */
const scene = $("#scene"), glc = $("#gl"), fx = $("#fx"), c2 = fx.getContext("2d");
let landC = document.createElement("canvas");
let W = 0, H = 0, DPR = 1, hzY = 0, L = 1, U = 1, mobile = false, H_elem = 320;

/* ================= WebGL: sky, clouds, sun, moon, sea ================= */
const VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
const FS = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;uniform float uT,uHz,uNight,uGold,uCloud,uShore,uOver,uWarm,uCold,uFlash;uniform vec3 uSun;uniform vec4 uMoon;uniform vec2 uPar;
float h21(vec2 p){p=fract(p*vec2(233.34,851.73));p+=dot(p,p+23.45);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h21(i),h21(i+vec2(1.,0.)),f.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),f.x),f.y);}
const mat2 R=mat2(1.6,1.2,-1.2,1.6);
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*vn(p);p=R*p+vec2(3.1,1.7);a*=.5;}return v;}
float fb3(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*vn(p);p=R*p+vec2(3.1,1.7);a*=.5;}return v;}
float cTop(float x,float base,float amp,float fq,float sd,float bias){
 float cov=smoothstep(.46,.68,vn(vec2(x*fq*.62+sd*7.3,sd))+bias);
 if(cov<=0.)return base;
 float b=fb3(vec2(x*fq,sd*3.1));
 float puff=vn(vec2(x*fq*4.,sd))*.6+vn(vec2(x*fq*9.,sd+2.))*.4;
 return base+amp*cov*(.12+b*b*1.5+puff*.4);
}
// x: light, y: rim, z: density
vec3 cumulus(vec2 p,float hy,float base,float amp,float fq,float sd,float drift,float bias,vec2 sp){
 float x=p.x+drift;
 float t0=cTop(x,base,amp,fq,sd,bias);
 if(t0<=base+.003)return vec3(0.);
 float ero=fbm(vec2(x*fq*3.4,hy*fq*5.5)+sd)-.5;
 float top=t0+ero*amp*.3;
 float bot=base+(fb3(vec2(x*fq*1.8,sd*5.))-.5)*amp*.14;
 float dens=smoothstep(0.,.005+amp*.035,top-hy)*smoothstep(-.003,.014,hy-bot);
 if(dens<=0.)return vec3(0.);
 float e=.03/fq;
 float slope=(cTop(x+e,base,amp,fq,sd,bias)-cTop(x-e,base,amp,fq,sd,bias))/(2.*e);
 float side=clamp(-slope*clamp((sp.x-p.x)*3.,-1.,1.)*.35,-.5,.6);
 float v=clamp((hy-bot)/(top-bot+1e-4),0.,1.);
 float tex=fbm(vec2(x*fq*6.,hy*fq*8.)+sd*2.);
 float light=.2+.8*pow(v,.75)+.3*side+.5*(tex-.5);
 float edge=1.-smoothstep(0.,.025,top-hy);
 return vec3(light,edge,dens);
}
vec3 cloudCol(vec3 c,vec2 p,vec2 sp,vec2 mp,vec3 sunC){
 vec3 lit=mix(vec3(1.,.985,.95),vec3(1.,.8,.62),uGold);
 vec3 sh=mix(vec3(.6,.7,.85),vec3(.6,.48,.6),uGold);
 lit=mix(lit,vec3(.26,.31,.44),uNight);sh=mix(sh,vec3(.06,.08,.15),uNight);
 lit=mix(lit,mix(vec3(.8,.82,.86),vec3(.15,.17,.22),uNight),uOver*.65);sh=mix(sh,mix(vec3(.36,.4,.48),vec3(.03,.035,.05),uNight),uOver*.8);
 vec3 col=mix(sh,lit,clamp(c.x,0.,1.))+max(c.x-1.,0.)*.25;
 col+=c.y*exp(-length(p-sp)*5.)*1.1*uSun.z*sunC;
 col+=c.y*exp(-length(p-mp)*6.)*.7*uMoon.z*vec3(.8,.86,1.);
 return col;
}
void main(){
 vec2 uv=gl_FragCoord.xy/uRes;float a=uRes.x/uRes.y;
 vec2 p=vec2(uv.x*a,uv.y);
 vec2 sp=vec2(uSun.x*a,uSun.y),mp=vec2(uMoon.x*a,uMoon.y);
 float day=1.-uNight,hz=uHz;
 vec3 Z=mix(mix(vec3(.10,.45,.86),vec3(.22,.36,.66),uGold),vec3(.008,.02,.06),uNight);
 vec3 Hc=mix(mix(vec3(.78,.90,.97),vec3(1.,.70,.46),uGold),vec3(.06,.10,.21),uNight);
 Z=mix(Z,mix(vec3(.44,.5,.58),vec3(.025,.03,.045),uNight),uOver*.85);Hc=mix(Hc,mix(vec3(.73,.76,.8),vec3(.06,.07,.1),uNight),uOver*.85);
 Z=mix(Z,vec3(.4,.62,.88),uCold*.45*day);Hc=mix(Hc,vec3(.9,.94,.98),uCold*.5*day);
 Hc=mix(Hc,vec3(1.,.84,.64),uWarm*.35*day);Z=mix(Z,vec3(.16,.44,.8),uWarm*.3*day);
 vec3 sunC=mix(vec3(1.,.96,.84),vec3(1.,.6,.3),uGold);
 sunC=mix(sunC,vec3(1.,.8,.55),uWarm*.4);
 vec3 col;
 if(uv.y>=hz){
  float hy=(uv.y-hz)/(1.-hz);
  col=mix(Hc,Z,pow(hy,.5));
  col+=sunC*exp(-abs(p.x-sp.x)*2.2)*exp(-hy*4.)*.22*uSun.z;
  if(uNight>.01){
   vec2 g=p*70.;vec2 id=floor(g);float r=h21(id);
   if(r>.962){vec2 f=fract(g)-.5-(vec2(h21(id+3.1),h21(id+7.7))-.5)*.6;float s=(r-.962)*30.;
    float tw=.6+.4*sin(uT*(1.+r*4.)+r*40.);
    col+=vec3(.9,.93,1.)*smoothstep(.08*s+.04,0.,length(f))*tw*1.4*uNight*smoothstep(0.,.25,hy);}
   float mw=exp(-pow((uv.y-.3-uv.x*.5)*3.,2.));
   col+=vec3(.32,.38,.6)*mw*fbm(p*5.+3.)*.2*uNight;
  }
  float ds=length(p-sp);
  col=mix(col,vec3(1.,.99,.95)*(1.-uGold*.08)+sunC*.08,smoothstep(.029,.025,ds)*uSun.z);
  col+=sunC*(exp(-ds*14.)*.6+exp(-ds*4.5)*.26+exp(-ds*1.4)*.12)*uSun.z;
  float ang=atan(p.y-sp.y,p.x-sp.x);
  col+=sunC*pow(abs(sin(ang*9.+uT*.05)),24.)*exp(-ds*3.5)*.1*uSun.z;
  if(uMoon.z>.01){
   float dm=length(p-mp),mr=.027;vec2 l=(p-mp)/mr;
   if(dot(l,l)<1.){
    float sq=sqrt(1.-l.y*l.y),ph=uMoon.w;float xx=ph<.5?l.x:-l.x;
    float lit=smoothstep(-.08,.08,xx-cos(ph*6.2831853)*sq);
    vec3 mc=vec3(.94,.95,.9)*(.74+.34*fbm(l*2.4+4.));
    vec3 mcol=mix(Hc*.6+vec3(.03,.035,.05),mc,lit);
    col=mix(col,mcol,smoothstep(1.,.92,length(l))*uMoon.z);
   }
   col+=vec3(.75,.82,1.)*(exp(-dm*12.)*.3+exp(-dm*3.5)*.13)*uMoon.z;
  }
  if(uOver>.01){float s2=fbm(vec2(p.x*1.6+uCloud*.8,hy*3.)+3.);
   vec3 shc=mix(mix(vec3(.6,.64,.7),vec3(.83,.85,.89),s2),mix(vec3(.04,.045,.06),vec3(.1,.11,.15),s2),uNight);
   col=mix(col,shc,uOver*smoothstep(.03,.4,hy)*(.5+.4*s2));}
  float px=uPar.x;
  // far cumulus band on the horizon
  vec3 c1=cumulus(p,hy,0.,.052,7.5,1.,uCloud*.35+px*.006,-.1+.2*smoothstep(.5,.95,uv.x)+uOver*.22,sp);
  if(c1.z>0.)col=mix(col,mix(cloudCol(c1,p,sp,mp,sunC),Hc,.3),c1.z*.9);
  // big cumulus, heaped up near the sun side and behind the windmill
  vec3 c2=cumulus(p,hy,.02,.16,3.6,7.,uCloud*.6+px*.014,-.14+.34*exp(-pow((uv.x-.84)/.17,2.))+.16*exp(-pow((uv.x-.06)/.1,2.))+.06*exp(-pow((uv.x-.5)/.12,2.))+uOver*.42,sp);
  if(c2.z>0.)col=mix(col,cloudCol(c2,p,sp,mp,sunC),c2.z);
  // high flecks
  vec2 hp=vec2(p.x+uCloud*1.1+px*.022,hy);
  float fl=fbm(vec2(hp.x*4.5,hp.y*9.5)+fb3(hp*vec2(7.,11.))*.8);
  float fd=smoothstep(.60,.75,fl)*smoothstep(.35,.55,hy)*(1.-smoothstep(.93,1.,hy))*.7;
  if(fd>0.)col=mix(col,cloudCol(vec3(.62+(fl-.6)*3.,1.-smoothstep(.60,.68,fl),fd),p,sp,mp,sunC),fd);
  // distant headlands on the right
  float h1=max(0.,uv.x-.7)*.4*(.6+.8*fb3(vec2(uv.x*16.,1.3)));
  float h2=max(0.,uv.x-.85)*.78*(.7+.6*fb3(vec2(uv.x*22.,4.2)));
  vec3 hc1=mix(mix(Hc,vec3(.55,.66,.8),.42),vec3(.05,.08,.15),uNight);
  vec3 hc2=mix(mix(Hc,vec3(.40,.55,.62),.62),vec3(.035,.06,.11),uNight);
  col=mix(col,hc1,smoothstep(h1,h1-.004,hy)*step(.0005,h1));
  col=mix(col,hc2*(.92+.12*smoothstep(0.,h2+.001,hy)),smoothstep(h2,h2-.004,hy)*step(.0005,h2));
  col+=exp(-hy*30.)*.06*day;
 }else{
  float d=(hz-uv.y)/hz;
  float pz=1./(d+.04);
  vec2 w=vec2((p.x-.5*a)*pz*.55,pz*1.6);
  float det=smoothstep(0.,.12,d);
  float n=fb3(w*vec2(1.,2.6)+vec2(uT*.04,uT*.18));
  vec3 sc=mix(mix(Hc,vec3(.40,.64,.84),.55),vec3(.07,.40,.72),smoothstep(0.,.16,d));
  sc=mix(sc,vec3(.10,.55,.76),smoothstep(.2,.6,d));
  sc=mix(sc,vec3(.38,.78,.82),smoothstep(.55,1.,d)*.7);
  float shore=exp(-pow((uv.x-uShore)/.15,2.))*smoothstep(.1,.5,d);
  sc=mix(sc,vec3(.36,.8,.8),shore*.55);
  sc=mix(sc,sc*vec3(1.05,.8,.68)+vec3(.12,.05,0.),uGold*.8);
  sc=mix(sc,mix(vec3(.30,.40,.48),vec3(.03,.045,.07),uNight)*(.9+.2*n),uOver*.62);
  sc=mix(sc,vec3(.33,.5,.63),uCold*.35*day);
  sc=mix(sc,mix(vec3(.05,.09,.18),vec3(.02,.05,.11),smoothstep(0.,.5,d)),uNight);
  sc*=.86+.28*n*det+(1.-det)*.14;
  float cr=vn(w*vec2(1.3,5.)+vec2(uT*.06,uT*.35))*vn(w*vec2(.45,1.8)+vec2(3.,uT*.1));
  sc=mix(sc,vec3(mix(1.,.4,uNight)),smoothstep(.4,.56,cr)*smoothstep(.05,.3,d)*(.25+.75*d)*.5);
  sc=mix(sc,Hc*1.05,exp(-d*28.)*.55);
  float dx=(uv.x-uSun.x)*a,wd=.015+d*.24;
  float path=exp(-dx*dx/(wd*wd));
  float gl=smoothstep(.55,.85,vn(w*vec2(9.,11.)+vec2(uT*.5,-uT*1.6))*vn(w*vec2(5.,6.)-uT*.3)*1.6);
  float up=uSun.z*smoothstep(-.02,.08,uSun.y-hz);
  sc+=sunC*(path*(.16+gl*1.3)*(1.-d*.4)+exp(-dx*dx*30.)*exp(-d*14.)*.35)*up;
  float mx=(uv.x-uMoon.x)*a,mw2=.015+d*.25;
  sc+=vec3(.8,.85,1.)*exp(-mx*mx/(mw2*mw2))*(.06+gl*.9)*uMoon.z*smoothstep(-.02,.08,uMoon.y-hz);
  col=sc;
 }
 col+=exp(-abs(uv.y-hz)*220.)*.07*day;
 col+=vec3(.72,.78,1.)*uFlash*(uv.y>=hz?.45:.18);
 col+=(h21(gl_FragCoord.xy+fract(uT)*91.)-.5)/200.;
 gl_FragColor=vec4(col,1.);
}`;
let gl = null, GU = {}, glScale = 1;
try { gl = glc.getContext("webgl", { antialias: false, alpha: false, depth: false, powerPreference: "low-power" }); } catch (e) { gl = null; }
if (gl) {
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(o)); return null; } return o; };
  const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, FS);
  const pr = v && f && gl.createProgram();
  if (pr) { gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr); }
  if (!pr || !gl.getProgramParameter(pr, gl.LINK_STATUS)) gl = null;
  else {
    gl.useProgram(pr);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ["uRes", "uT", "uHz", "uNight", "uGold", "uCloud", "uShore", "uSun", "uMoon", "uPar", "uOver", "uWarm", "uCold", "uFlash"].forEach(n => GU[n] = gl.getUniformLocation(pr, n));
    glc.addEventListener("webglcontextlost", e => { e.preventDefault(); scene.classList.add("nogl"); gl = null; });
  }
}
if (!gl) scene.classList.add("nogl");
function sizeGL() {
  if (!gl) return;
  let k = Math.min(DPR, 1.5) * glScale;
  const cap = 1.5e6; if (W * H * k * k > cap) k = Math.sqrt(cap / (W * H));
  glc.width = Math.max(2, Math.round(W * k)); glc.height = Math.max(2, Math.round(H * k));
  gl.viewport(0, 0, glc.width, glc.height);
}

/* painted variant: the cliff, mill tower, trees and rocks as an oil painting made with claude-paint.
   It is painted in the scene's own units: 1.2H wide (at L*W = 2.3H), from 0.38H above the horizon to the bottom. */
const PAINTED = false; // off: the land is drawn in code, not the oil painting
const landImg = new Image(); let landReady = false; window.landImg = landImg;
landImg.onload = () => { landReady = true; if (W) setLand(landNow, true); };
if (PAINTED) landImg.src = "images/embedded/9c95d36c46.webp";
/* ================= The cliff (drawn once per resize) ================= */
const CLIFF = [[-.02, -.1], [.045, -.083], [.1, -.062], [.15, -.05], [.2, -.032], [.25, -.008], [.29, .026], [.318, .058], [.334, .092], [.346, .13], [.366, .2], [.4, .3], [.45, .45], [.5, .62]];
const ROCKS = [[.352, .118, .034], [.378, .078, .02], [.405, .063, .013], [.437, .072, .01], [.392, .158, .028], [.428, .12, .017], [.468, .09, .011], [.505, .07, .007], [.368, .222, .042], [.45, .175, .02]];
let poly = [], mill = {}, rocks = [];
function buildCliff() {
  const P = CLIFF.map(([x, y]) => [x * L * W, hzY + y * H_elem]);
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  poly = [P[0]];
  for (let i = 1; i < P.length - 1; i++) {
    const p0 = i === 1 ? P[0] : mid(P[i - 1], P[i]), p1 = P[i], p2 = mid(P[i], P[i + 1]);
    for (let s = 1; s <= 12; s++) { const t = s / 12, u = 1 - t; poly.push([u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]]); }
  }
  poly.push(P[P.length - 1]);
}
function cliffY(x) {
  if (x <= poly[0][0]) return poly[0][1];
  for (let i = 1; i < poly.length; i++) if (poly[i][0] >= x) { const a = poly[i - 1], b = poly[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0] || 1); }
  return poly[poly.length - 1][1];
}
let seed = 1;
const R = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const pick = a => a[Math.floor(R() * a.length)];
const LP_CLEAR = {
  g: ["#b8d36c", "#93c157", "#64a046", "#3c7a3a"], mott: ["#a9cf63", "#78ad4b", "#4e8c3f", "#c6dc7a", "#3b7337", "#8fbf55"],
  blade: ["#bcd47c", "#94bd60", "#6b9f4c", "#4f863f", "#a3c86d"], bladeA: 1, rim: "#d6ea8f",
  fol: { D: ["#2a5f31", "#2f6b35"], M: ["#4a8a3c", "#3f7d38", "#56933f"], L: ["#86b64f", "#9cc45a", "#73a947"] },
  flowers: ["#f3b2cf", "#ffffff", "#d6c4f3", "#f4a6c6"], fCount: 1, path: ["#c4ab7c", "#e6d3a3"],
  rock: ["#e9b9a0", "#a8705f", "#5a3c37"], face: ["#dcae94", "#a8786a", "#5b4441"], blossom: null, snow: false
};
const LANDPAL = {
  clear: LP_CLEAR,
  spring: Object.assign({}, LP_CLEAR, {
    g: ["#c4de78", "#a0cc60", "#6aa84a", "#40803c"], flowers: ["#f7a8cb", "#ffc1dc", "#ffffff", "#f48fb8", "#e9c9f7"], fCount: 2.2,
    blossom: ["#ffc6dd", "#ffb0d0", "#fff0f6", "#f79cc2"]
  }),
  autumn: Object.assign({}, LP_CLEAR, {
    g: ["#d8c66c", "#bba84e", "#8d8b3f", "#5f6a32"], mott: ["#dcb75c", "#bb8d3e", "#90793a", "#cda24f", "#76703a"],
    blade: ["#e3c975", "#c6a253", "#9c8a45", "#b98c48"], rim: "#f2de92",
    fol: { D: ["#7e3219", "#6c2a16"], M: ["#c25a27", "#b2471f", "#d67a2c"], L: ["#f0ae48", "#f6c55c", "#e79639"] },
    flowers: ["#e98a3a", "#f3c25b", "#c9532a"], fCount: 1.1
  }),
  winter: Object.assign({}, LP_CLEAR, {
    g: ["#fbfdfe", "#eaf1f6", "#d6e2ea", "#bccbd6"], mott: ["#ffffff", "#e2eaf0", "#ccd9e2", "#9fb4a2", "#b7c7cf"],
    blade: ["#7f937f", "#9aab9a", "#b9c6c2"], bladeA: .45, rim: "#ffffff",
    fol: { D: ["#24443a", "#2a4b3f"], M: ["#365a4a", "#3f6352"], L: ["#ffffff", "#f1f6fa", "#e3edf3"] },
    flowers: [], fCount: 0, path: ["#c9d5df", "#eef3f7"],
    rock: ["#ffffff", "#b3a19b", "#5b4743"], face: ["#f4f7fa", "#a99790", "#594742"], snow: true
  })
};
function foliage(c, x, y, r, n, F, blossom) {
  for (let i = 0; i < n; i++) { const a = R() * TAU, d = R() * r * .55; c.fillStyle = pick(F.D); c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * .7, r * (.45 + R() * .3), 0, TAU); c.fill(); }
  for (let i = 0; i < n; i++) { const a = R() * TAU, d = R() * r * .45; c.fillStyle = pick(F.M); c.beginPath(); c.arc(x + Math.cos(a) * d + r * .08, y + Math.sin(a) * d * .6 - r * .12, r * (.3 + R() * .22), 0, TAU); c.fill(); }
  for (let i = 0; i < n * .8; i++) { const a = -R() * Math.PI * .9, d = r * (.25 + R() * .4); c.fillStyle = pick(F.L); c.globalAlpha = .85; c.beginPath(); c.arc(x + Math.cos(a) * d + r * .15, y + Math.sin(a) * d * .8 - r * .1, r * (.1 + R() * .14), 0, TAU); c.fill(); }
  if (blossom) for (let i = 0; i < n * 2.2; i++) { const a = R() * TAU, d = R() * r * .75; c.fillStyle = pick(blossom); c.globalAlpha = .9; c.beginPath(); c.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * .7 - r * .05, r * (.05 + R() * .07), 0, TAU); c.fill(); }
  c.globalAlpha = 1;
}

/* green hills on the far right, sitting on the horizon behind the sea */
function drawHills(c, P) {
  const span = Math.max(.24 * W, .62 * H_elem), x0 = W - span, base = hzY + 1;
  const ridge = (x, k, amp, ph) => { const t = (x - x0) / span; return base - H_elem * amp * Math.pow(Math.sin(Math.PI * clamp(t * k + ph, 0, 1)), 1.3) * (.82 + .18 * Math.sin(t * 13 + ph * 7)); };
  const layer = (k, amp, ph, col, shade) => {
    const path = new Path2D(); path.moveTo(x0 - 4, base);
    for (let x = x0; x <= W + 6; x += 3) path.lineTo(x, ridge(x, k, amp, ph));
    path.lineTo(W + 6, base); path.closePath();
    const g = c.createLinearGradient(0, base - H_elem * amp, 0, base); g.addColorStop(0, col[0]); g.addColorStop(1, col[1]);
    c.fillStyle = g; c.fill(path);
    if (shade) { c.save(); c.clip(path); seed = 61 + Math.round(ph * 100);
      for (let i = 0, n = Math.round(span / 6); i < n; i++) { const x = x0 + R() * span, top = ridge(x, k, amp, ph), y = top + R() * (base - top);
        c.globalAlpha = .18 + R() * .22; c.fillStyle = R() < .55 ? shade[0] : shade[1];
        c.beginPath(); c.ellipse(x, y, (3 + R() * 7) * U, (1.5 + R() * 3) * U, -.2, 0, TAU); c.fill(); }
      c.globalAlpha = 1; c.restore(); }
    if (P.snow) { c.save(); c.clip(path); c.fillStyle = "rgba(250,252,255,.92)";
      for (let x = x0; x <= W; x += 2) { const y = ridge(x, k, amp, ph); if (base - y > H_elem * amp * .72) c.fillRect(x, y, 2.4, (base - y) * .14); }
      c.restore(); }
  };
  const far = P.snow ? ["#c9d6df", "#aebfca"] : ["#6f9488", "#89a99b"];
  const mid = P.snow ? ["#e8eef2", "#b9c9cf"] : [P.g[2], P.g[1]];
  const near = P.snow ? ["#f6f9fb", "#cdd9df"] : [P.g[3], P.g[2]];
  layer(1.05, .19, -.02, far, null);
  layer(1.5, .13, -.18, mid, P.snow ? null : [P.g[0], P.g[3]]);
  layer(2.2, .075, -.55, near, P.snow ? null : [P.g[1], "#2f5f2f"]);
  const m = c.createLinearGradient(0, base - H_elem * .05, 0, base); m.addColorStop(0, "rgba(235,242,248,0)"); m.addColorStop(1, "rgba(235,242,248,.35)");
  c.fillStyle = m; c.fillRect(x0, base - H_elem * .05, span + 6, H_elem * .05);
}
function renderLand(cv, key) {
  const P = LANDPAL[key];
  cv.width = fx.width; cv.height = fx.height;
  const c = cv.getContext("2d"); c.setTransform(DPR, 0, 0, DPR, 0, 0); c.clearRect(0, 0, W, H);
  seed = 7;
  const last = poly[poly.length - 1];
  const land = new Path2D(); land.moveTo(-30, poly[0][1]);
  poly.forEach(p => land.lineTo(p[0], p[1])); land.lineTo(last[0], H + 30); land.lineTo(-30, H + 30); land.closePath();
  const top = hzY - .11 * H_elem, maxX = last[0];
  const g = c.createLinearGradient(0, top, 0, H);
  g.addColorStop(0, P.g[0]); g.addColorStop(.18, P.g[1]); g.addColorStop(.45, P.g[2]); g.addColorStop(1, P.g[3]);
  c.fillStyle = g; c.fill(land);
  c.save(); c.clip(land);
  const A = W * H;
  for (let i = 0, n = Math.round(A / 5200 * L); i < n; i++) {
    const x = R() * maxX, y0 = cliffY(x), y = y0 + R() * (H - y0);
    c.globalAlpha = .16 + R() * .2; c.fillStyle = pick(P.mott);
    c.beginPath(); c.ellipse(x, y, (8 + R() * 26) * U, (4 + R() * 10) * U, 0, 0, TAU); c.fill();
  }
  c.lineCap = "round";
  for (let i = 0, n = Math.round(A / 380 * L); i < n; i++) {
    const x = R() * maxX, y0 = cliffY(x), y = y0 + Math.pow(R(), 1.4) * (H - y0) + 2;
    const near = clamp((y - hzY) / (H_elem * .4), 0, 1), h = (3 + R() * 6) * U * (1 + near * 1.6), lean = (R() - .4) * h * .6;
    c.globalAlpha = (.3 + R() * .35) * P.bladeA; c.strokeStyle = pick(P.blade);
    c.lineWidth = (.7 + R() * .8) * U * (1 + near);
    c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + lean * .4, y - h * .6, x + lean, y - h); c.stroke();
  }
  c.globalAlpha = .9; c.strokeStyle = P.rim; c.lineWidth = (P.snow ? 3 : 1.6) * U;
  c.beginPath(); poly.forEach((p, i) => { if (p[0] > .33 * L * W) return; i ? c.lineTo(p[0], p[1] + 1) : c.moveTo(p[0], p[1] + 1); }); c.stroke();
  seed = 17;
  for (let k = 0, nc = Math.round(9 * L * P.fCount); k < nc; k++) {
    const cx0 = R() * maxX * .75, cy0 = Math.max(cliffY(cx0) + 14 * U, hzY + .07 * H_elem + R() * H_elem * .4), col = pick(P.flowers);
    for (let i = 0; i < 22; i++) {
      const x = cx0 + (R() - .5) * 90 * U, y = cy0 + (R() - .5) * 34 * U;
      if (y < cliffY(x) + 6) continue;
      const near = clamp((y - hzY) / (H_elem * .4), 0, 1);
      c.globalAlpha = .55 + R() * .3; c.fillStyle = R() < .8 ? col : "#fff7d6";
      c.beginPath(); c.arc(x, y, (.7 + R() * .9) * U * (1 + near * .9), 0, TAU); c.fill();
    }
  }
  seed = 23; c.globalAlpha = 1;
  for (let i = 0; i < 5; i++) {
    const fx0 = .295 + i * .011 + R() * .005, x = fx0 * L * W, y = cliffY(x) - 2 * U;
    const w = (22 + R() * 16) * U, h = (34 + R() * 34) * U;
    const rg = c.createLinearGradient(x, y, x + w * .5, y + h);
    rg.addColorStop(0, P.face[0]); rg.addColorStop(.35, P.face[1]); rg.addColorStop(1, P.face[2]);
    c.fillStyle = rg; c.beginPath();
    c.moveTo(x - w * .2, y); c.lineTo(x + w * .45, y - 2 * U); c.lineTo(x + w * .8, y + h * .45); c.lineTo(x + w * .6, y + h); c.lineTo(x - w * .1, y + h * .9); c.closePath(); c.fill();
  }
  c.restore();
  const wx = .1 * L * W, wy = cliffY(wx) + 2 * U;
  const pathPts = []; for (let i = 0; i <= 30; i++) { const x = wx + 6 * U + i / 30 * (.295 * L * W - wx); const k = i / 30; pathPts.push([x, cliffY(x) + (4 + k * 16) * U]); }
  c.lineCap = "round"; c.lineJoin = "round";
  for (const [col, wAdd] of [[P.path[0], 3], [P.path[1], 0]]) {
    for (let i = 1; i < pathPts.length; i++) {
      const k = i / pathPts.length; c.strokeStyle = col; c.lineWidth = (4 + k * 9 + wAdd) * U;
      c.beginPath(); c.moveTo(pathPts[i - 1][0], pathPts[i - 1][1]); c.lineTo(pathPts[i][0], pathPts[i][1]); c.stroke();
    }
  }
  const fence = pts => {
    c.strokeStyle = "#7d5f43"; c.lineWidth = 1.3 * U;
    for (const h of [.45, .8]) { c.beginPath(); pts.forEach(([x, y, ph], i) => { const yy = y - ph * h; i ? c.lineTo(x, yy) : c.moveTo(x, yy); }); c.stroke(); }
    pts.forEach(([x, y, ph]) => { c.strokeStyle = "#6b4f37"; c.lineWidth = 1.8 * U; c.beginPath(); c.moveTo(x, y); c.lineTo(x, y - ph); c.stroke(); c.fillStyle = P.snow ? "#ffffff" : "#c4a681"; c.fillRect(x - (P.snow ? 1.5 : .9) * U, y - ph - (P.snow ? 2 : 1), (P.snow ? 3 : 1.8) * U, (P.snow ? 2.2 : 1.4) * U); });
  };
  const fp = []; for (let i = 0; i < pathPts.length; i += 2) { const k = i / pathPts.length; fp.push([pathPts[i][0], pathPts[i][1] - (3 + k * 7) * U, (8 + k * 9) * U]); }
  const fl = []; for (let x = .015 * L * W; x < wx - 18 * U; x += 13 * U) fl.push([x, cliffY(x) + 3 * U, 8 * U]);
  seed = 31;
  for (const [fxp, fh] of [[-.004, .15], [.02, .18], [.043, .11]]) {
    const x = fxp * L * W, y = cliffY(Math.max(0, x)) + 4 * U, h = fh * H_elem;
    c.fillStyle = "#4e3a2a"; c.fillRect(x - 2 * U, y - h * .45, 4 * U, h * .45);
    foliage(c, x, y - h * .62, h * .36, 14, P.fol, P.blossom);
  }
  fence(fl);
  const Hw = (mobile ? .165 : .2) * H_elem, wB = .44 * Hw, wT = .34 * Hw;
  mill = { x: wx, y: wy, Hw, wB, wT, hub: { x: wx + wT * .26, y: wy - Hw * 1.04 }, snow: P.snow };
  bakedTower = false;
  fence(fp);
  seed = 53;
  for (const [fxp, fr] of [[.072, .024], [.135, .02], [.162, .016], [.195, .022], [.232, .018], [.268, .02], [.3, .014]]) {
    const x = fxp * L * W; foliage(c, x, cliffY(x) + fr * H_elem * .35, fr * H_elem, 9, P.fol, P.blossom);
  }
  seed = 99;
  rocks = ROCKS.map(([fxp, fy, fr]) => {
    const x = fxp * L * W, y = hzY + fy * H_elem, r = fr * H_elem, pts = [];
    for (let k = 0; k < 9; k++) { const a = Math.PI + k / 8 * Math.PI; pts.push([x + Math.cos(a) * r * (.8 + R() * .3), y + Math.sin(a) * r * .9 * (.75 + R() * .35)]); }
    return { x, y, r, pts, ph: R() * TAU };
  });
  if (PAINTED && landReady) {
    c.clearRect(-50, -50, W + 100, H + 100);
    const sx = L * W / (2.3 * H_elem);
    drawHills(c, P);
    c.drawImage(landImg, 0, hzY - .38 * H_elem, 1.2 * H_elem * sx, .762 * H_elem);
    mill.Hw = .2 * H_elem; mill.wB = .44 * mill.Hw; mill.wT = .34 * mill.Hw;
    return;
  }
  drawHills(c, P);
  for (const k of rocks) {
    const rg = c.createLinearGradient(k.x, k.y - k.r * .6, k.x + k.r * .3, k.y + k.r * .1);
    rg.addColorStop(0, P.rock[0]); rg.addColorStop(P.snow ? .3 : .45, P.rock[1]); rg.addColorStop(1, P.rock[2]);
    c.fillStyle = rg; c.beginPath(); k.pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.lineTo(k.x + k.r * .9, k.y + k.r * .12); c.lineTo(k.x - k.r * .9, k.y + k.r * .12); c.closePath(); c.fill();
  }
}
/* the land crossfades when the season changes */
let landPrev = document.createElement("canvas"), landFade = 1, landNow = "clear";
function setLand(key, force) {
  if (!W) { landNow = key; return; }
  if (key === landNow && !force) return;
  if (!force) { const t = landPrev; landPrev = landC; landC = t; landFade = 0; } else landFade = 1;
  landNow = key; renderLand(landC, key); markLand(landC);
}
/* The land and tower are painted once into landC. Browsers (often Chrome on Windows, after sleep, a GPU switch or a
   driver reset) can silently wipe offscreen canvases, which left only the sky, sails and birds. Mark one corner pixel
   (almost transparent, so it never shows) and repaint whenever the mark is gone. */
function markLand(cv) { const c = cv.getContext("2d"); c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = "rgba(0,0,0,.012)"; c.fillRect(0, 0, 1, 1); c.restore(); }
function landLost() { try { return W > 1 && landC.getContext("2d").getImageData(0, 0, 1, 1).data[3] === 0; } catch (e) { return false; } }
function healLand() { if (!document.hidden && landLost()) resize(); }
/* ================= Windmill variations, drawn live every frame ================= */
let bakedTower = false;
const MILLS = [
  { id: "classic", label: "Classic" }, { id: "dutch", label: "Dutch" }, { id: "greek", label: "Greek island" },
  { id: "post", label: "Post mill" }, { id: "turbine", label: "Turbine" }, { id: "toy", label: "Storybook" }];
const millStyle = "classic";   // one windmill design; the old style picker is gone
// each design in its own units: base at (0,0), y up negative; hub = where the sails turn; tall = total height
const MD = {
  dutch: { hub: [10, -264], tall: 500, win: [[4, -150, 16, 24]] },
  greek: { hub: [6, -194], tall: 370, win: [[-6, -130, 16, 20]] },
  post: { hub: [54, -210], tall: 400, win: [[8, -180, 16, 22]] },
  turbine: { hub: [26, -333], tall: 500, win: [] },
  toy: { hub: [0, -216], tall: 390, win: [[0, -140, 26, 26]] }
};
function drawMillVariant(c, ang, lx) {
  const d = MD[millStyle], sc = mill.Hw * 1.8 / d.tall, X = mill.x, B = mill.y;
  mill.hub = { x: X + d.hub[0] * sc, y: B + d.hub[1] * sc };
  mill.win = d.win.map(([x, y, w, h]) => [X + x * sc, B + y * sc, w * sc, h * sc]);
  const lin = (x0, y0, x1, y1, st) => { const g = c.createLinearGradient(x0, y0, x1, y1); st.forEach(([o, col]) => g.addColorStop(o, col)); return g; };
  const cyl = (x, w, st) => lin(x - w / 2, 0, x + w / 2, 0, st);
  const WHITE = [[0, "#a9b3c4"], [.18, "#cdd4de"], [.45, "#eef0ee"], [.7, "#fffdf8"], [.88, "#f6efe2"], [1, "#d9cfbf"]];
  const hubDot = (x, y, r) => { const g = c.createRadialGradient(x - r * .3, y - r * .3, 0, x, y, r); g.addColorStop(0, "#e2c49a"); g.addColorStop(1, "#5a3e27"); c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); };
  const sail = (hx, hy, a, L, w, cloth, k = .86) => {
    c.save(); c.translate(hx, hy); c.transform(k, .05, 0, 1, 0, 0); c.rotate(a); const r0 = L * .16;
    if (cloth) { c.fillStyle = lin(0, 0, 0, w, [[0, "rgba(255,251,240,.95)"], [1, "rgba(226,214,190,.95)"]]); c.fillRect(r0, 2, L - r0, w); }
    c.strokeStyle = "#5c4129"; c.lineWidth = 1.4 / sc * .35; c.strokeRect(r0, 2, L - r0, w);
    c.beginPath(); for (let j = 1; j < 9; j++) { const x = r0 + (L - r0) * j / 9; c.moveTo(x, 2); c.lineTo(x, w + 2); } c.moveTo(r0, w / 2 + 2); c.lineTo(L, w / 2 + 2); c.lineWidth = .9 / sc * .3; c.stroke();
    c.strokeStyle = "#6b4f33"; c.lineWidth = 4.5; c.lineCap = "round"; c.beginPath(); c.moveTo(0, 0); c.lineTo(L * 1.03, 0); c.stroke();
    c.restore();
  };
  const archWin = (x, y, w, h, frame = "#e9e2d6") => {
    const arch = (p, fill) => { c.fillStyle = fill; c.beginPath(); c.moveTo(x - w / 2 - p, y + h / 2 + p); c.lineTo(x - w / 2 - p, y - h / 2 + w / 2); c.arc(x, y - h / 2 + w / 2, w / 2 + p, Math.PI, 0); c.lineTo(x + w / 2 + p, y + h / 2 + p); c.closePath(); c.fill(); };
    arch(2.5, frame); arch(0, lin(0, y - h / 2, 0, y + h / 2, [[0, "#2c374a"], [1, "#5a7395"]]));
  };
  const door = (x, base, w, h, wood = ["#4a2d1e", "#7a4c32", "#603b27"]) => {
    c.fillStyle = cyl(x, w, [[0, wood[0]], [.55, wood[1]], [1, wood[2]]]); c.beginPath(); c.moveTo(x - w / 2, base); c.lineTo(x - w / 2, base - h + w / 2); c.arc(x, base - h + w / 2, w / 2, Math.PI, 0); c.lineTo(x + w / 2, base); c.fill();
  };
  c.save(); c.translate(X, B); c.scale(sc, sc);
  // the lit side follows the sun: mirror the shading when the light is on the left
  const flip = lx < X; const shade = st => flip ? st.map(([o, col]) => [1 - o, col]).reverse() : st;
  { c.save(); c.translate(flip ? 40 : -40, 0); c.scale(1, .16); const g = c.createRadialGradient(0, 0, 0, 0, 0, 160); g.addColorStop(0, "rgba(30,60,40,.35)"); g.addColorStop(1, "rgba(30,60,40,0)"); c.fillStyle = g; c.fillRect(-160, -160, 320, 320); c.restore(); }
  if (millStyle === "dutch") {
    const H = 250, wB = 150, wT = 92, top = -H;
    c.fillStyle = cyl(0, 170, shade([[0, "#6a3b2c"], [.5, "#a85a3e"], [.8, "#cf805c"], [1, "#8e4b36"]])); c.fillRect(-85, -60, 170, 60);
    c.fillStyle = cyl(0, wB, shade([[0, "#4f5a3c"], [.25, "#6f7a4c"], [.5, "#8f8a55"], [.75, "#b3a36a"], [1, "#7d7448"]]));
    c.beginPath(); c.moveTo(-wB / 2, -58); c.lineTo(-wT / 2, top); c.lineTo(wT / 2, top); c.lineTo(wB / 2, -58); c.fill();
    c.strokeStyle = "rgba(50,40,20,.35)"; c.lineWidth = 1.5; c.beginPath(); for (let i = 0; i < 22; i++) { const y = top + 8 + i * 8.6, f = (y - top) / (-58 - top), hw = wT / 2 + (wB - wT) / 2 * f; c.moveTo(-hw, y); c.lineTo(hw, y + 1); } c.stroke();
    c.fillStyle = "#f4f1ea"; c.fillRect(-112, -66, 224, 9); c.strokeStyle = "#e9e4d8"; c.lineWidth = 3; c.beginPath(); for (let i = 0; i <= 16; i++) { const xx = -110 + i * 13.75; c.moveTo(xx, -66); c.lineTo(xx, -86); } c.moveTo(-112, -86); c.lineTo(112, -86); c.stroke();
    door(4, 0, 30, 46, ["#244b39", "#3c7a5c", "#2d5c46"]); archWin(4, -150, 16, 24, "#f4f1ea");
    c.fillStyle = cyl(0, wT * 1.3, [[0, "#1f2a2a"], [.6, "#3a4a48"], [1, "#2a3534"]]); c.beginPath(); c.moveTo(-wT * .62, top + 4); c.quadraticCurveTo(-wT * .3, top - 52, 0, top - 54); c.quadraticCurveTo(wT * .3, top - 52, wT * .62, top + 4); c.fill();
    c.fillStyle = "#f4f1ea"; c.fillRect(-wT * .64, top, wT * 1.28, 5);
    for (let k = 0; k < 4; k++) sail(10, top - 14, ang + k * Math.PI / 2, 230, 48, k % 2 === 1, .8);
    hubDot(10, top - 14, 11);
  } else if (millStyle === "greek") {
    const H = 190, w = 136, top = -H;
    c.fillStyle = cyl(0, w, shade(WHITE)); c.beginPath(); c.moveTo(-w / 2, 0); c.lineTo(-w * .46, top); c.lineTo(w * .46, top); c.lineTo(w / 2, 0); c.fill();
    door(8, 0, 30, 58, ["#1f4f86", "#3a7cc0", "#2a62a0"]);
    c.fillStyle = "#2f6fae"; c.fillRect(-14, top + 50, 16, 20); c.fillStyle = "#e9e2d6"; c.fillRect(-17, top + 70, 22, 3);
    c.fillStyle = cyl(0, w, shade([[0, "#6e5428"], [.4, "#a8853f"], [.75, "#d8b765"], [1, "#a07c3a"]])); c.beginPath(); c.moveTo(-w * .5, top + 4); c.lineTo(0, top - 70); c.lineTo(w * .5, top + 4); c.ellipse(0, top + 4, w * .5, 7, 0, 0, Math.PI); c.fill();
    c.strokeStyle = "rgba(80,55,20,.35)"; c.lineWidth = 1.5; c.beginPath(); for (let i = -6; i <= 6; i++) { c.moveTo(0, top - 70); c.lineTo(i * w * .08, top + 6); } c.stroke();
    const hx = 6, hy = top - 4, L = 170;
    c.strokeStyle = "#6b4f33"; c.lineWidth = 4; c.beginPath(); c.moveTo(hx, hy); c.lineTo(hx + 70, hy + 4); c.stroke();
    for (let k = 0; k < 8; k++) {
      const a = ang + k * TAU / 8, ex = hx + Math.cos(a) * L * .86, ey = hy + Math.sin(a) * L, nx = hx + Math.cos(a + .32) * L * .62, ny = hy + Math.sin(a + .32) * L * .72;
      c.fillStyle = "rgba(250,244,230,.96)"; c.beginPath(); c.moveTo(hx + Math.cos(a) * 20, hy + Math.sin(a) * 22); c.lineTo(ex, ey); c.lineTo(nx, ny); c.closePath(); c.fill();
      c.strokeStyle = "#6b4f33"; c.lineWidth = 3.4; c.beginPath(); c.moveTo(hx, hy); c.lineTo(ex, ey); c.stroke();
      c.strokeStyle = "rgba(90,70,50,.6)"; c.lineWidth = 1.2; c.beginPath(); c.moveTo(ex, ey); c.lineTo(hx + 70, hy + 4); c.stroke();
    }
    hubDot(hx, hy, 9);
  } else if (millStyle === "post") {
    const bw = 100, bh = 130, by = -110, x = 0;
    c.strokeStyle = "#5a4030"; c.lineWidth = 7; c.beginPath(); c.moveTo(-60, 0); c.lineTo(0, by + 4); c.lineTo(60, 0); c.moveTo(0, 0); c.lineTo(0, by); c.stroke();
    c.fillStyle = "#cfc6b4"; c.fillRect(-70, -8, 140, 10);
    c.fillStyle = cyl(0, bw, shade([[0, "#6a4a32"], [.35, "#8c6644"], [.75, "#b98e5e"], [1, "#94704a"]])); c.fillRect(-bw / 2, by - bh, bw, bh);
    c.strokeStyle = "rgba(40,25,15,.4)"; c.lineWidth = 1.5; c.beginPath(); for (let i = 1; i < 13; i++) { const y = by - bh + i * 10; c.moveTo(-bw / 2, y); c.lineTo(bw / 2, y); } c.stroke();
    c.fillStyle = cyl(0, bw + 16, [[0, "#3c2a1e"], [.6, "#6a4a32"], [1, "#4d3626"]]); c.beginPath(); c.moveTo(-bw / 2 - 8, by - bh + 2); c.quadraticCurveTo(0, by - bh - 44, bw / 2 + 8, by - bh + 2); c.fill();
    archWin(8, by - 70, 16, 22, "#d8c7a2");
    c.strokeStyle = "#7a5a3a"; c.lineWidth = 4; c.beginPath(); c.moveTo(-50, by - 10); c.lineTo(-130, 0); c.moveTo(-40, by - 10); c.lineTo(-116, 0); c.stroke();
    c.lineWidth = 2.5; c.beginPath(); for (let i = 1; i < 8; i++) { const t = i / 8; c.moveTo(-50 - 80 * t, by - 10 + (10 - by) * t); c.lineTo(-40 - 76 * t, by - 10 + (10 - by) * t); } c.stroke();
    for (let k = 0; k < 4; k++) sail(54, by - bh + 30, ang + k * Math.PI / 2, 190, 42, true, .9);
    hubDot(54, by - bh + 30, 10);
  } else if (millStyle === "turbine") {
    const top = -330;
    c.fillStyle = lin(-12, 0, 12, 0, shade([[0, "#b8c1cf"], [.55, "#ffffff"], [1, "#d8dde5"]])); c.beginPath(); c.moveTo(-12, 0); c.lineTo(-5, top); c.lineTo(5, top); c.lineTo(12, 0); c.fill();
    c.fillStyle = lin(0, top - 14, 0, top + 10, [[0, "#ffffff"], [1, "#c9d1dc"]]); c.beginPath(); c.roundRect(-26, top - 14, 50, 22, 9); c.fill();
    const hx = 26, hy = top - 3;
    for (let k = 0; k < 3; k++) { c.save(); c.translate(hx, hy); c.rotate(ang * 1.4 + k * TAU / 3);
      c.fillStyle = lin(0, -7, 0, 7, [[0, "#ffffff"], [1, "#c8cfda"]]); c.beginPath(); c.moveTo(0, -5); c.quadraticCurveTo(40, -10, 168, -1.5); c.lineTo(168, 1.5); c.quadraticCurveTo(50, 5, 0, 5); c.fill();
      c.fillStyle = "#e5484d"; c.fillRect(158, -1.6, 10, 3.2); c.restore(); }
    c.fillStyle = lin(hx - 8, hy - 8, hx + 8, hy + 8, [[0, "#ffffff"], [1, "#b8c1cf"]]); c.beginPath(); c.ellipse(hx + 3, hy, 11, 8, 0, 0, TAU); c.fill();
    if (S.night > .05 && (S.t % 1.6) < .8) { c.fillStyle = "#ff3b3b"; c.shadowColor = "#ff3b3b"; c.shadowBlur = 30; c.beginPath(); c.arc(0, top - 16, 4, 0, TAU); c.fill(); c.shadowBlur = 0; }
  } else if (millStyle === "toy") {
    const w = 140, H = 210, top = -H;
    c.lineWidth = 4; c.strokeStyle = "#3a3048"; c.lineJoin = "round";
    c.fillStyle = cyl(0, w, [[0, "#f0d9c4"], [.5, "#fff3e6"], [1, "#f4dfcb"]]); c.beginPath(); c.roundRect(-w / 2, top, w, H, [40, 40, 10, 10]); c.fill(); c.stroke();
    c.fillStyle = "#ff9fb2"; c.beginPath(); c.roundRect(-16, -62, 32, 62, [16, 16, 0, 0]); c.fill(); c.stroke();
    c.fillStyle = "#8fd3ff"; c.beginPath(); c.arc(0, top + 70, 18, 0, TAU); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-18, top + 70); c.lineTo(18, top + 70); c.moveTo(0, top + 52); c.lineTo(0, top + 88); c.stroke();
    c.fillStyle = "#ff7a6b"; c.beginPath(); c.moveTo(-w / 2 - 14, top + 26); c.quadraticCurveTo(0, top - 120, w / 2 + 14, top + 26); c.closePath(); c.fill(); c.stroke();
    for (let k = 0; k < 4; k++) { c.save(); c.translate(0, top - 6); c.rotate(ang + k * Math.PI / 2); c.fillStyle = k % 2 ? "#fff6d6" : "#ffe08a"; c.beginPath(); c.roundRect(24, 2, 140, 44, 14); c.fill(); c.stroke(); c.beginPath(); c.moveTo(0, 0); c.lineTo(166, 0); c.lineWidth = 6; c.stroke(); c.lineWidth = 4; c.restore(); }
    c.fillStyle = "#ffd36b"; c.beginPath(); c.arc(0, top - 6, 12, 0, TAU); c.fill(); c.stroke();
  }
  c.restore();
}
function drawMill(c, ang, lx) {
  if (millStyle === "classic") { const { x, y, Hw, wB, wT } = mill; mill.hub = { x: x + wT * .26, y: y - Hw * 1.04 };
    if (PAINTED && landReady) mill.win = [[x + wB * .02, y - Hw * .58, wB * .12, Hw * .11], [x - wB * .02, y - Hw * .84, wB * .09, Hw * .08]];
    else drawTower(c);
    drawSails(c, ang); }
  else drawMillVariant(c, ang, lx);
}
function drawTower(c) {
  const { x, y, Hw, wB, wT } = mill;
  c.fillStyle = "rgba(30,60,30,.22)"; c.beginPath(); c.ellipse(x - wB * .35, y + 1, wB * .95, 4 * U, 0, 0, TAU); c.fill();
  const body = new Path2D();
  body.moveTo(x - wB / 2, y); body.quadraticCurveTo(x - wB * .47, y - Hw * .5, x - wT / 2, y - Hw);
  body.lineTo(x + wT / 2, y - Hw); body.quadraticCurveTo(x + wB * .47, y - Hw * .5, x + wB / 2, y); body.closePath();
  const g = c.createLinearGradient(x - wB / 2, 0, x + wB / 2, 0);
  g.addColorStop(0, "#b9b2a8"); g.addColorStop(.35, "#e3dccf"); g.addColorStop(.72, "#fbf8f1"); g.addColorStop(1, "#ece4d6");
  c.fillStyle = g; c.fill(body);
  c.save(); c.clip(body);
  c.fillStyle = "rgba(150,135,115,.35)"; c.fillRect(x - wB, y - Hw * .09, wB * 2, Hw * .09);
  c.strokeStyle = "rgba(160,150,135,.18)"; c.lineWidth = 1;
  for (let i = 0; i < 6; i++) { const yy = y - Hw * (.15 + i * .14); c.beginPath(); c.moveTo(x - wB, yy); c.lineTo(x + wB, yy + 1); c.stroke(); }
  c.restore();
  // door and windows
  const dw = wB * .24, dh = Hw * .3;
  c.fillStyle = "#5d3f2b"; c.beginPath(); c.moveTo(x - dw / 2, y); c.lineTo(x - dw / 2, y - dh + dw / 2); c.arc(x, y - dh + dw / 2, dw / 2, Math.PI, 0); c.lineTo(x + dw / 2, y); c.closePath(); c.fill();
  c.strokeStyle = "#3e2a1d"; c.lineWidth = 1; c.stroke();
  mill.win = [[x + wB * .02, y - Hw * .58, wB * .12, Hw * .11], [x - wB * .02, y - Hw * .84, wB * .09, Hw * .08]];
  c.fillStyle = "#4a3a30"; mill.win.forEach(([wx, wy, w, h]) => c.fillRect(wx - w / 2, wy - h / 2, w, h));
  // terracotta cap
  const rw = wT * 1.2, ry = y - Hw, apex = ry - Hw * .36;
  const rg = c.createLinearGradient(x - rw / 2, 0, x + rw / 2, 0);
  rg.addColorStop(0, "#8e3b2b"); rg.addColorStop(.45, "#c45c41"); rg.addColorStop(.8, "#e5835c"); rg.addColorStop(1, "#cf6a4c");
  c.fillStyle = rg; c.beginPath(); c.moveTo(x - rw / 2, ry + 2 * U);
  c.bezierCurveTo(x - rw * .5, ry - Hw * .18, x - rw * .16, apex, x, apex); c.bezierCurveTo(x + rw * .16, apex, x + rw * .5, ry - Hw * .18, x + rw / 2, ry + 2 * U); c.closePath(); c.fill();
  c.strokeStyle = "rgba(110,40,28,.45)"; c.lineWidth = 1;
  for (let i = 1; i <= 3; i++) { const yy = ry - Hw * .085 * i, hw = rw / 2 * (1 - i * .2); c.beginPath(); c.moveTo(x - hw, yy + 2); c.quadraticCurveTo(x, yy + 5 * U, x + hw, yy + 2); c.stroke(); }
  c.fillStyle = "rgba(60,30,20,.25)"; c.fillRect(x - wT / 2, ry + 1, wT, 2.5 * U);
  if (mill.snow) {
    c.fillStyle = "#f7fbff"; c.beginPath(); c.moveTo(x, apex - 1);
    c.bezierCurveTo(x + rw * .14, apex, x + rw * .36, ry - Hw * .2, x + rw * .42, ry - Hw * .06);
    for (let i = 0; i <= 6; i++) { const t = i / 6, xx = x + rw * .42 - t * rw * .84; c.quadraticCurveTo(xx + rw * .07, ry - Hw * .03 + (i % 2 ? 3 : -1) * U, xx, ry - Hw * .06); }
    c.bezierCurveTo(x - rw * .36, ry - Hw * .2, x - rw * .14, apex, x, apex - 1); c.fill();
    c.fillStyle = "rgba(255,255,255,.9)"; c.fillRect(x - wB / 2 - 1, y - 3 * U, wB + 2, 3 * U);
  }
}
function drawSails(c, ang) {
  const { hub, Hw } = mill, Ls = .64 * Hw, r1 = .2 * Ls, ws = .23 * Ls;
  c.save(); c.translate(hub.x, hub.y); c.transform(.84, .05, 0, 1, 0, 0);
  for (let k = 0; k < 4; k++) {
    c.save(); c.rotate(ang + k * TAU / 4);
    c.fillStyle = "rgba(246,239,226,.16)"; c.fillRect(r1, 1, Ls - r1, ws);
    c.strokeStyle = "rgba(112,90,66,.92)"; c.lineWidth = Math.max(.8, .9 * U);
    c.strokeRect(r1, 1, Ls - r1, ws);
    c.beginPath();
    for (let j = 1; j < 8; j++) { const x = r1 + (Ls - r1) * j / 8; c.moveTo(x, 1); c.lineTo(x, ws + 1); }
    c.moveTo(r1, ws * .5 + 1); c.lineTo(Ls, ws * .5 + 1); c.stroke();
    c.strokeStyle = "#d9c9aa"; c.lineWidth = Math.max(1.4, 2.2 * U); c.beginPath(); c.moveTo(0, 0); c.lineTo(Ls * 1.02, 0); c.stroke();
    c.strokeStyle = "rgba(90,70,50,.5)"; c.lineWidth = .8; c.beginPath(); c.moveTo(0, 1.2 * U); c.lineTo(Ls, 1.2 * U); c.stroke();
    c.restore();
  }
  c.fillStyle = "#6b4a33"; c.beginPath(); c.arc(0, 0, 3.4 * U, 0, TAU); c.fill();
  c.fillStyle = "#a07a58"; c.beginPath(); c.arc(-.8 * U, -.8 * U, 1.3 * U, 0, TAU); c.fill();
  c.restore();
}


/* ================= The orchard: apples you can knock down, and two bees ================= */
let APPLES = [], BEES = [], orchT = 0;
function buildOrchard() {
  seed = 211; APPLES = [];
  const TREES = [[-.004, .15, 3], [.02, .18, 4], [.043, .11, 2]];
  for (const [fxp, fh, n] of TREES) {
    const x = fxp * L * W, y = cliffY(Math.max(0, x)) + 4 * U, h = fh * H_elem, cx = x, cy = y - h * .62, r = h * .36;
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + R() * .9, d = r * (.35 + R() * .4);
      const hx = cx + Math.cos(a) * d, hy = cy + Math.sin(a) * d * .8 + r * .12;
      APPLES.push({ hx: Math.max(4, hx), hy, x: hx, y: hy, vx: 0, vy: 0, st: "tree", t: 0, s: 1, al: 1, ph: R() * TAU, rot: 0 }); }
  }
  BEES = [0, 1].map(i => ({ x: mill.x + (i ? 40 : -20) * U, y: mill.y - 10 * U, tx: 0, ty: 0, wait: 0, ph: R() * 10, face: 1 }));
  BEES.forEach(newTarget);
}
function newTarget(b) {
  const x = mill.x + rand(-.06, .14) * L * W; b.tx = clamp(x, 8, W * .45); b.ty = cliffY(b.tx) + rand(4, 26) * U; b.wait = 0;
}
function appleAt(x, y) {
  const hr = Math.max(14, 10 * U);
  for (const a of APPLES) if (a.st === "tree" && Math.hypot(x - a.x, y - a.y) < hr) return a;
  return null;
}
function dropApple(a) { window.found && found("apple"); a.st = "fall"; a.vx = rand(-18, 18); a.vy = -rand(10, 40); a.t = 0; }
function drawOrchard(c, dt, e) {
  if (!APPLES.length || landNow === "winter") return;
  orchT += dt; const ar = Math.max(3.1, 3.3 * U);
  for (const a of APPLES) {
    if (a.st === "tree") { a.x = a.hx + Math.sin(orchT * 1.4 + a.ph) * .7 * (1 + S.gust); a.y = a.hy + Math.cos(orchT * 1.1 + a.ph) * .3; }
    else if (a.st === "fall") {
      a.vy += 980 * dt; a.x += a.vx * dt; a.y += a.vy * dt; a.rot += a.vx * dt * .08;
      const g = cliffY(Math.max(0, a.x)) + 6 * U + (a.ph % 1) * 8 * U;
      if (a.y >= g) { a.y = g; if (a.vy > 140) { a.vy *= -.32; a.vx *= .7; } else { a.st = "ground"; a.t = 0; a.vy = 0; } }
    } else if (a.st === "ground") {
      a.t += dt; a.x += a.vx * dt; a.vx *= Math.pow(.2, dt); a.rot += a.vx * dt * .1;
      a.al = a.t < 2.6 ? 1 : Math.max(0, 1 - (a.t - 2.6) / .8);
      if (a.al <= 0) { a.st = "grow"; a.s = 0; a.al = 1; a.x = a.hx; a.y = a.hy; a.rot = 0; }
    } else if (a.st === "grow") { a.s = Math.min(1, a.s + dt / 1.8); a.x = a.hx; a.y = a.hy; if (a.s >= 1) a.st = "tree"; }
    const r = ar * (a.st === "grow" ? .25 + .75 * a.s : 1);
    c.save(); c.globalAlpha = a.al * (a.st === "grow" ? Math.min(1, a.s * 2) : 1); c.translate(a.x, a.y); c.rotate(a.rot);
    if (a.st !== "tree" && a.st !== "grow") { c.fillStyle = "rgba(30,50,20,.25)"; c.beginPath(); c.ellipse(0, r * .9, r * 1.1, r * .3, 0, 0, TAU); c.fill(); }
    const ag = c.createRadialGradient(-r * .35, -r * .35, r * .1, 0, 0, r * 1.05);
    ag.addColorStop(0, "#ff7a6a"); ag.addColorStop(.45, "#e0322a"); ag.addColorStop(1, "#8e1414");
    c.fillStyle = ag; c.beginPath(); c.moveTo(0, -r * .72);
    c.bezierCurveTo(r * .55, -r * 1.15, r * 1.25, -r * .45, r * .95, r * .35); c.bezierCurveTo(r * .75, r * 1.05, r * .2, r * 1.05, 0, r * .85);
    c.bezierCurveTo(-r * .2, r * 1.05, -r * .75, r * 1.05, -r * .95, r * .35); c.bezierCurveTo(-r * 1.25, -r * .45, -r * .55, -r * 1.15, 0, -r * .72); c.fill();
    c.fillStyle = "rgba(255,255,255,.55)"; c.beginPath(); c.ellipse(-r * .38, -r * .32, r * .16, r * .26, -.5, 0, TAU); c.fill();
    c.strokeStyle = "#4a2e17"; c.lineWidth = Math.max(.8, r * .16); c.beginPath(); c.moveTo(0, -r * .7); c.quadraticCurveTo(r * .1, -r * 1.1, r * .25, -r * 1.25); c.stroke();
    c.fillStyle = "#4f9a3a"; c.beginPath(); c.ellipse(r * .55, -r * 1.1, r * .42, r * .18, -.5, 0, TAU); c.fill();
    c.restore();
  }
  // bees: they work the flowers by day and sleep at night
  const ba = (1 - e) * (S.season === "monsoon" ? .4 : 1); if (ba < .05) return;
  const k = Math.max(1, U) * 1.15;
  for (const b of BEES) {
    b.ph += dt;
    if (b.wait > 0) { b.wait -= dt; if (b.wait <= 0) newTarget(b); }
    else { const dx = b.tx - b.x, dy = b.ty - b.y, d = Math.hypot(dx, dy), sp = 46 * k;
      if (d < 3) b.wait = rand(.7, 1.8); else { b.x += dx / d * Math.min(d, sp * dt) + Math.sin(b.ph * 7) * .5; b.y += dy / d * Math.min(d, sp * dt) + Math.cos(b.ph * 9) * .6; b.face = dx >= 0 ? 1 : -1; } }
    const hov = b.wait > 0 ? Math.sin(b.ph * 10) * 1.2 : 0;
    c.save(); c.globalAlpha = ba; c.translate(b.x, b.y + hov); c.scale(k * b.face, k);
    const fl = Math.abs(Math.sin(b.ph * 70));
    c.fillStyle = "rgba(235,245,255,.75)"; c.beginPath(); c.ellipse(-.6, -2.2, 1.9, 1.1 + fl * .5, -.5, 0, TAU); c.ellipse(.8, -2.3, 1.7, 1 + fl * .5, .4, 0, TAU); c.fill();
    c.fillStyle = "#f2b81e"; c.beginPath(); c.ellipse(0, 0, 3, 2, 0, 0, TAU); c.fill();
    c.fillStyle = "#2a1d10"; c.fillRect(-1.3, -2, .9, 4); c.fillRect(.6, -1.9, .8, 3.8); c.beginPath(); c.arc(2.6, 0, 1.15, 0, TAU); c.fill();
    c.beginPath(); c.moveTo(-3, 0); c.lineTo(-4, .3); c.lineTo(-3, .6); c.fill();
    c.restore();
  }
}
/* ================= Living things ================= */
let birds = [], gulls = [], planes = [], nextPlane = 3;
function buildBirds() {
  const n = mobile ? 7 : 11;
  birds = Array.from({ length: n }, () => ({ x: W * (.5 + rand(-.08, .08)), y: hzY * rand(.35, .6), vx: rand(20, 40), vy: rand(-5, 5), ph: rand(0, TAU), z: rand(.75, 1.1) }));
  gulls = [0, 1].map(i => ({ a: rand(0, TAU), sp: i ? -.17 : .13, rx: W * .07 * L * (i ? 1.25 : 1), ry: H_elem * .035, cx: mill.x + W * .08 * L * (i ? 1.4 : 1), cy: mill.y - mill.Hw * (i ? 1.95 : 1.55), ph: rand(0, TAU) }));
}
const ptr = { x: -1e4, y: -1e4, in: false };
let scare = null;
function stepBirds(dt) {
  const tx = W * (.5 + .3 * Math.sin(S.t * .045)), ty = hzY * (.42 + .14 * Math.sin(S.t * .09 + 1));
  let cx = 0, cy = 0, ax0 = 0, ay0 = 0;
  for (const b of birds) { cx += b.x; cy += b.y; ax0 += b.vx; ay0 += b.vy; }
  const n = birds.length; cx /= n; cy /= n; ax0 /= n; ay0 /= n;
  const sp = U * (mobile ? .8 : 1);
  for (const b of birds) {
    let ax = (tx - b.x) * .05 + (cx - b.x) * .22 + (ax0 - b.vx) * .7 + S.gust * 50;
    let ay = (ty - b.y) * .05 + (cy - b.y) * .22 + (ay0 - b.vy) * .7;
    for (const o of birds) { if (o === b) continue; const dx = b.x - o.x, dy = b.y - o.y, d2 = dx * dx + dy * dy, m = 26 * sp; if (d2 < m * m && d2 > .01) { const d = Math.sqrt(d2); ax += dx / d * 120; ay += dy / d * 120; } }
    let fear = 0;
    const flee = (fx0, fy0, rad, k) => { const dx = b.x - fx0, dy = b.y - fy0, d = Math.hypot(dx, dy); if (d < rad && d > .1) { const f = (1 - d / rad) * k; ax += dx / d * f; ay += dy / d * f; fear = Math.max(fear, 1 - d / rad); } };
    if (ptr.in) { flee(ptr.x, ptr.y, 150, 1400); if (fear > .55) { window.found && found("birds"); typeof advanceTip === "function" && advanceTip("birds"); } }
    if (scare && scare.k > 0) flee(scare.x, scare.y, 260, 2400 * scare.k);
    if (b.y < H * .07) ay += 200; if (b.y > hzY - H * .05) ay -= 260;
    b.vx += ax * dt; b.vy += ay * dt;
    const v = Math.hypot(b.vx, b.vy), lo = 24 * sp, hi = (90 + fear * 140) * sp;
    if (v > hi) { b.vx *= hi / v; b.vy *= hi / v; } else if (v < lo) { b.vx *= lo / (v || 1); b.vy *= lo / (v || 1); }
    b.x += b.vx * dt; b.y += b.vy * dt;
    if (b.x < -60) b.x = W + 50; if (b.x > W + 60) b.x = -50;
    b.ph += dt * (6 + v * .03 / sp + fear * 10);
  }
  if (scare) { scare.k -= dt * .8; if (scare.k <= 0) scare = null; }
  for (const g of gulls) { g.a += g.sp * dt; g.ph += dt * 2.2; }
}
function gull(c, x, y, s, f, a) {
  if (a <= .01) return;
  const up = f * s * .5;
  c.globalAlpha = a; c.lineCap = "round"; c.lineJoin = "round";
  const path = dy => { c.beginPath(); c.moveTo(x - s, y - up + dy); c.quadraticCurveTo(x - s * .45, y - s * .32 - up * .2 + dy, x, y + dy); c.quadraticCurveTo(x + s * .45, y - s * .32 - up * .2 + dy, x + s, y - up + dy); };
  c.strokeStyle = "rgba(40,58,86,.4)"; c.lineWidth = Math.max(1.2, s * .2); path(.9); c.stroke();
  c.strokeStyle = "#ffffff"; c.lineWidth = Math.max(1, s * .15); path(0); c.stroke();
  c.globalAlpha = 1;
}
function spawnPlane() {
  // mostly the white jet; about one in three is the little red plane, lower and slower.
  // far planes are small and high, near ones bigger and lower: size sets height and speed
  const red = Math.random() < .34, dir = Math.random() < .5 ? 1 : -1, z = rand(0, 1);
  const s = (red ? .55 + z * .4 : .6 + z * .65) * U * (mobile ? .8 : 1);
  planes.push({ red, x: dir > 0 ? -60 : W + 60, y: H * (red ? rand(.16, .3) : .07 + (1 - z) * .06 + rand(0, .1)), vx: dir * (red ? rand(26, 36) : 30 + z * 26) * Math.max(.7, W / 1440), vy: rand(-2.5, 2.5), s, dir, trail: [], acc: 0 });
}
/* ================= Night extras: planets, satellites, shooting stars ================= */
const PLANETS = [{ fx: .3, fy: .22, r: 4.2, col: ["#f6e2b8", "#c8a06a"], ring: 1 }, { fx: .62, fy: .14, r: 3.4, col: ["#ffb08a", "#c4532e"] }, { fx: .9, fy: .3, r: 5.2, col: ["#f2d7b0", "#b98a5a"], bands: 1 }];
let SATS = [], satT = 2, METEORS = [], metT = 3;
/* a satellite: a gold-foil body, two blue solar wings, a small dish, a blinking light and a glint off the panels */
function drawSat(c, s, a) {
  const k = Math.max(.75, U) * 1.15; s.rot += s.spin * .016;
  c.save(); c.translate(s.x, s.y); c.rotate(s.rot); c.scale(k, k); c.globalAlpha = a;
  const glint = Math.max(0, Math.sin(s.ph * .9)) ** 18;
  for (const sd of [-1, 1]) {
    c.fillStyle = "#9aa7b6"; c.fillRect(sd > 0 ? 2.6 : -4.4, -.35, 1.8, .7);
    const px = sd > 0 ? 4.4 : -12.4, g = c.createLinearGradient(px, -2.6, px + 8, 2.6);
    g.addColorStop(0, "#2c4f8f"); g.addColorStop(.5, glint > .2 ? "#cfe3ff" : "#3f6db8"); g.addColorStop(1, "#22406f");
    c.fillStyle = g; c.fillRect(px, -2.6, 8, 5.2);
    c.strokeStyle = "rgba(190,210,240,.55)"; c.lineWidth = .3; c.beginPath();
    for (let i = 1; i < 4; i++) { c.moveTo(px + i * 2, -2.6); c.lineTo(px + i * 2, 2.6); } c.moveTo(px, 0); c.lineTo(px + 8, 0); c.stroke();
  }
  const b = c.createLinearGradient(-2.6, -2.2, 2.6, 2.2); b.addColorStop(0, "#f3d488"); b.addColorStop(.5, "#c99a3c"); b.addColorStop(1, "#8a6420");
  c.fillStyle = b; c.fillRect(-2.6, -2.2, 5.2, 4.4);
  c.strokeStyle = "rgba(255,240,200,.5)"; c.lineWidth = .25; c.strokeRect(-2.6, -2.2, 5.2, 4.4);
  c.strokeStyle = "#cfd6df"; c.lineWidth = .35; c.beginPath(); c.moveTo(0, -2.2); c.lineTo(0, -3.6); c.stroke();
  c.fillStyle = "#e6ebf1"; c.beginPath(); c.ellipse(0, -4.1, 1.5, .7, 0, 0, TAU); c.fill();
  const on = (s.ph % 1.8) < .14;
  if (on) { c.fillStyle = "rgba(255,90,80,1)"; c.beginPath(); c.arc(2.6, 2.2, .7, 0, TAU); c.fill();
    const h = c.createRadialGradient(2.6, 2.2, 0, 2.6, 2.2, 3); h.addColorStop(0, "rgba(255,90,80,.5)"); h.addColorStop(1, "rgba(255,90,80,0)"); c.fillStyle = h; c.fillRect(-.4, -.8, 6, 6); }
  if (glint > .05) { const gl = c.createRadialGradient(0, 0, 0, 0, 0, 9); gl.addColorStop(0, `rgba(230,240,255,${.55 * glint})`); gl.addColorStop(1, "rgba(230,240,255,0)"); c.fillStyle = gl; c.fillRect(-9, -9, 18, 18); }
  c.restore();
}

function drawNightSky(c, dt, a) {
  c.save(); c.beginPath(); c.rect(0, 0, W, hzY - 2); c.clip();
  // planets: steady, a soft halo, lit from the sun's side below the horizon
  for (const p of PLANETS) {
    const x = p.fx * W, y = p.fy * hzY + 20 * U, r = p.r * Math.max(.8, U);
    const g = c.createRadialGradient(x, y, 0, x, y, r * 5); g.addColorStop(0, `rgba(255,236,200,${.22 * a})`); g.addColorStop(1, "rgba(255,236,200,0)"); c.fillStyle = g; c.fillRect(x - r * 5, y - r * 5, r * 10, r * 10);
    const b = c.createRadialGradient(x - r * .35, y - r * .35, 0, x, y, r); b.addColorStop(0, p.col[0]); b.addColorStop(1, p.col[1]);
    c.globalAlpha = a; c.fillStyle = b; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    if (p.bands) { c.strokeStyle = "rgba(120,80,50,.45)"; c.lineWidth = Math.max(.5, r * .16); for (const k of [-.35, .2]) { c.beginPath(); c.moveTo(x - r * .92, y + k * r); c.lineTo(x + r * .92, y + k * r); c.stroke(); } }
    if (p.ring) { c.strokeStyle = "rgba(240,220,180,.85)"; c.lineWidth = Math.max(.7, r * .22); c.beginPath(); c.ellipse(x, y, r * 2.1, r * .55, -.35, 0, TAU); c.stroke(); }
    c.globalAlpha = 1;
  }
  // satellites: slow steady points crossing the sky, a faint blink
  satT -= dt;
  if (satT < 0 && SATS.length < 2) { const dir = Math.random() < .5 ? 1 : -1; SATS.push({ x: dir > 0 ? -30 : W + 30, y: rand(.1, .6) * hzY, vx: dir * rand(12, 20) * Math.max(.7, W / 1440), vy: rand(-2, 2), ph: rand(0, 3), rot: rand(-.5, .5), spin: rand(-.05, .05) }); satT = rand(7, 15); }
  for (const s of SATS) { if (!s.held) { s.x += s.vx * dt; s.y += s.vy * dt; } s.ph += dt; drawSat(c, s, a); }
  SATS = SATS.filter(s => s.held || (s.x > -40 && s.x < W + 40));
  // shooting stars: a quick streak every few seconds
  metT -= dt;
  if (metT < 0) { const dir = Math.random() < .5 ? 1 : -1, sp = rand(500, 800); METEORS.push({ x: rand(.1, .9) * W, y: rand(.05, .4) * hzY, vx: dir * sp * .85, vy: sp * .5, life: rand(.5, .9), age: 0 }); metT = rand(3, 8); }
  for (const m of METEORS) { m.age += dt; m.x += m.vx * dt; m.y += m.vy * dt;
    const f = 1 - m.age / m.life, tl = .12, g = c.createLinearGradient(m.x, m.y, m.x - m.vx * tl, m.y - m.vy * tl);
    g.addColorStop(0, `rgba(255,255,255,${f * a})`); g.addColorStop(1, "rgba(255,255,255,0)");
    c.strokeStyle = g; c.lineWidth = 1.6 * Math.max(.8, U); c.lineCap = "round"; c.beginPath(); c.moveTo(m.x, m.y); c.lineTo(m.x - m.vx * tl, m.y - m.vy * tl); c.stroke(); }
  METEORS = METEORS.filter(m => m.age < m.life);
  c.restore();
}
/* ================= Sailboats: drift across the sea behind the cliff, sails filling with the wind ================= */
let boats = [], nextBoat = 1;
const BOATCOL = ["#e8553a", "#f4efe2", "#2f6fae", "#f2b33d", "#f4efe2"];
function spawnBoat(init) {
  const z = rand(0, 1), dir = Math.random() < .55 ? 1 : -1, y = hzY + H_elem * (.035 + z * z * .3), s = (.45 + z * 1.1) * U;
  boats.push({ x: init ? rand(.45, 1) * W : dir > 0 ? .3 * L * W : W + 60, y, s, dir, z, v: (6 + z * 10) * Math.max(.7, W / 1440), ph: rand(0, TAU), sail: rpick(BOATCOL), jib: Math.random() < .6, life: 0 });
}
function stepBoats(dt, wind) {
  if (!boats.length && W) for (let i = 0; i < (mobile ? 2 : 3); i++) spawnBoat(true);
  nextBoat -= dt;
  if (nextBoat <= 0) { if (boats.length < (mobile ? 3 : 5) && S.amt.planes > .5) spawnBoat(false); nextBoat = rand(10, 22); }
  for (const b of boats) { if (!b.held) b.x += b.dir * b.v * (1 + wind * 1.5) * dt; b.life += dt; }
  boats = boats.filter(b => b.held || (b.x > -80 && b.x < W + 80 && b.x > .25 * L * W - 40));
  boats.sort((a, b) => a.y - b.y);
}
function drawBoats(c, e) {
  const t = S.t, storm = S.amt.lightning;
  for (const b of boats) {
    const s = b.s, bob = Math.sin(t * 1.6 + b.ph) * 1.2 * s, roll = Math.sin(t * 1.1 + b.ph) * .05 * (1 + storm * 2);
    const fade = Math.min(1, b.life / 1.5);
    c.save(); c.globalAlpha = fade; c.translate(b.x, b.y + bob); c.rotate(roll); c.scale(b.dir, 1);
    // wake
    c.strokeStyle = `rgba(255,255,255,${.35 * (1 - .5 * e)})`; c.lineWidth = Math.max(.6, .9 * s); c.lineCap = "round";
    c.beginPath(); c.moveTo(-14 * s, 1.5 * s); c.quadraticCurveTo(-26 * s, 2.6 * s, -40 * s, 2 * s); c.stroke();
    // reflection
    c.fillStyle = `rgba(255,255,255,${.08 * (1 - e)})`; c.fillRect(-10 * s, 2 * s, 20 * s, 6 * s);
    // hull
    c.fillStyle = e > .5 ? "#141a28" : "#3a2a24"; c.beginPath(); c.moveTo(-15 * s, -2 * s); c.lineTo(16 * s, -2 * s); c.quadraticCurveTo(13 * s, 3 * s, 9 * s, 3 * s); c.lineTo(-11 * s, 3 * s); c.closePath(); c.fill();
    c.fillStyle = "#f4efe2"; c.fillRect(-15 * s, -2.6 * s, 31 * s, 1 * s);
    // mast and sails, bellied a little with the wind
    const belly = 3 * s * (1 + Math.min(1, S.windIn + S.gust)), mx = 1 * s;
    c.strokeStyle = "#5a4636"; c.lineWidth = Math.max(.6, .8 * s); c.beginPath(); c.moveTo(mx, -2 * s); c.lineTo(mx, -30 * s); c.stroke();
    const sail = (pts, col) => { c.fillStyle = col; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); c.quadraticCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1]); c.lineTo(pts[3][0], pts[3][1]); c.closePath(); c.fill(); };
    sail([[mx + .6 * s, -29 * s], [mx + 9 * s + belly, -17 * s], [mx + 13 * s, -4 * s], [mx + .6 * s, -4 * s]], b.sail);
    c.fillStyle = "rgba(0,0,0,.12)"; c.beginPath(); c.moveTo(mx + .6 * s, -29 * s); c.lineTo(mx + 3 * s, -4 * s); c.lineTo(mx + .6 * s, -4 * s); c.fill();
    if (b.jib) sail([[mx - .6 * s, -26 * s], [mx - 6 * s - belly * .6, -15 * s], [mx - 12 * s, -4 * s], [mx - .6 * s, -4 * s]], "#f4efe2");
    if (e > .3) { c.globalAlpha = fade * e; c.fillStyle = "#ffd27a"; c.shadowColor = "#ffb84a"; c.shadowBlur = 8; c.beginPath(); c.arc(mx, -31 * s, 1.1 * s + .6, 0, TAU); c.fill(); c.shadowBlur = 0; }
    c.restore();
  }
}
function stepPlanes(dt) {
  nextPlane -= dt;
  if (nextPlane <= 0 && planes.length < 2) { if (S.amt.planes > .5) spawnPlane(); nextPlane = rand(9, 17); }
  for (const p of planes) {
    if (!p.held) { p.x += p.vx * dt; p.y += p.vy * dt; } p.acc += dt;
    if (p.acc > .07 && p.x > -30 && p.x < W + 30) { p.acc = 0; p.trail.push({ x: p.x - p.dir * 25 * p.s, y: p.y + 2 * p.s, age: 0 }); }
    for (const q of p.trail) q.age += dt;
    while (p.trail.length && p.trail[0].age > 7) p.trail.shift();
  }
  planes = planes.filter(p => p.held || (p.x > -80 && p.x < W + 80) || p.trail.length);
}
function drawPlanes(c, e) {
  for (const p of planes) {
    const s = p.s, tr = p.trail;
    c.lineCap = "round";
    for (const off of [-1.6, 1.6]) {
      for (let i = 1; i < tr.length; i++) {
        const q = tr[i], q0 = tr[i - 1];
        const a = Math.pow(1 - q.age / 7, 1.5) * Math.min(1, q.age / .35) * .55 * (1 - .82 * e);
        if (a < .01) continue;
        c.strokeStyle = `rgba(255,255,255,${a})`; c.lineWidth = (1 + q.age * 1.2) * s;
        const o = off * s * Math.max(0, 1 - q.age * .25);
        c.beginPath(); c.moveTo(q0.x, q0.y + o); c.lineTo(q.x, q.y + o); c.stroke();
      }
    }
    if (p.x < -70 || p.x > W + 70) continue;
    if (p.red) {
      // the red prop plane: a gentle bob, its own sprite, a wing light at night
      const rw = 72 * s, rh = rw * 220 / 400, bob = Math.sin(S.t * 2.2 + p.s * 9) * 1.5 * s;
      c.save(); c.translate(p.x, p.y + bob); c.scale(p.dir, 1); c.rotate(Math.sin(S.t * 1.6 + p.s * 5) * .05);
      if (REDP.ready) {
        if (e < .99) { c.globalAlpha = 1 - e; c.drawImage(REDP.day, -rw / 2, -rh / 2, rw, rh); }
        if (e > .01) { c.globalAlpha = e; c.drawImage(REDP.night, -rw / 2, -rh / 2, rw, rh); }
        c.globalAlpha = 1;
      }
      if (e > .05) { const on = (S.t * 1.3 + p.s * 3) % 1 < .5; c.globalAlpha = e; c.shadowBlur = 6; c.fillStyle = c.shadowColor = "#4bff8a"; c.beginPath(); c.arc(-rw * .02, rh * .28, 1.2 * s, 0, TAU); c.fill(); if (on) { c.fillStyle = c.shadowColor = "#ff4b4b"; c.beginPath(); c.arc(-rw * .38, -rh * .3, 1.3 * s, 0, TAU); c.fill(); } c.shadowBlur = 0; c.globalAlpha = 1; }
      c.restore(); continue;
    }
    const pw = 80 * s, ph = pw * 136 / 244, k = pw / 244;
    c.save(); c.translate(p.x, p.y); c.scale(p.dir, 1); c.rotate(Math.atan2(p.vy, Math.abs(p.vx)) * p.dir);
    if (PLANE.ready) {
      if (e < .99) { c.globalAlpha = 1 - e; c.drawImage(PLANE.day, -pw / 2, -ph / 2, pw, ph); }
      if (e > .01) { c.globalAlpha = e; c.drawImage(PLANE.night, -pw / 2, -ph / 2, pw, ph); }
      c.globalAlpha = 1;
    }
    if (e > .05) {
      // navigation lights on the artwork: green wingtip, red beacon, white tail strobe
      const L = (x, y, col, r, a) => { c.globalAlpha = a; c.fillStyle = col; c.shadowColor = col; c.shadowBlur = 6; c.beginPath(); c.arc((x - 122) * k, (y - 120) * k, r * s, 0, TAU); c.fill(); };
      const tt = S.t * 1.1 + p.s * 7;
      L(96, 182, "#4bff8a", 1.1, e);
      L(176, 72, "#ff4b4b", 1.2, e * (tt % 1 < .5 ? 1 : .25));
      if (tt % 1.2 < .08) L(6, 90, "#ffffff", 1.5, e);
      c.shadowBlur = 0; c.globalAlpha = 1;
    }
    c.restore();
  }
}
/* the red plane: drawn diagonally in the artwork, so turn it level once, nose forward */
const REDP = { ready: false, img: new Image(), day: null, night: null };
REDP.img.onload = () => {
  const mk = night => { const cv = document.createElement("canvas"); cv.width = 400; cv.height = 220; const x = cv.getContext("2d");
    x.translate(200, 110); x.rotate(-27 * Math.PI / 180); x.scale(-1, 1); x.drawImage(REDP.img, -159 * 1.15, -159 * 1.15, 318 * 1.15, 318 * 1.15);
    if (night) { x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = "source-atop"; x.fillStyle = "rgba(14,20,42,.66)"; x.fillRect(0, 0, 400, 220); } return cv; };
  REDP.day = mk(false); REDP.night = mk(true); REDP.ready = true;
};
REDP.img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg width="159" height="159" viewBox="0 0 159 159" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M61.7988 82.7421C60.1449 85.7513 58.0656 88.5063 55.6252 90.9219C49.644 96.9651 41.6506 101.39 36.6228 98.7352C35.9645 97.8471 6.18922 65.0223 5.40975 54.9047C5.18615 51.9979 8.90029 50.3148 14.5554 52.6842C28.3312 58.4635 54.0352 77.2982 61.7988 82.7421Z" fill="#EF062D"/><path d="M61.7988 82.7422C60.1449 85.7514 58.0656 88.5064 55.6252 90.922C45.7839 82.7701 14.1982 56.5196 12.9436 54.5538C11.4561 52.2465 14.5429 52.6906 14.5429 52.6906C28.3312 58.4636 54.0352 77.2983 61.7988 82.7422Z" fill="#931632"/><path d="M121.362 55.3985C121.189 55.7261 120.999 56.0443 120.793 56.3519C118.561 59.7307 113.961 63.1342 111.353 61.7554C111.092 61.4045 99.2415 48.3522 98.9465 44.3306C98.8564 43.1816 100.332 42.5108 102.567 43.4487C108.07 45.7467 118.275 53.234 121.362 55.3985Z" fill="#EF062D"/><path d="M121.362 55.3985C121.189 55.7261 120.999 56.0443 120.793 56.3519L117.772 59.6686C117.772 59.6686 103.338 47.5572 101.772 45.2343C100.266 43.017 102.394 43.4145 102.567 43.4487C108.07 45.7468 118.275 53.234 121.362 55.3985Z" fill="#931632"/><path d="M139.203 55.0507C132.513 66.2552 111.875 83.1614 91.7852 97.1204L90.0803 98.3005C88.4241 99.4371 86.7813 100.55 85.152 101.639C76.4567 107.434 68.1713 112.48 61.5193 116.033C59.6561 117.026 57.9449 117.896 56.3736 118.644C55.1811 119.21 53.9575 119.775 52.7184 120.331C31.536 129.871 3.75141 138.237 0.658365 128.976C0.261847 127.814 0.0399792 126.599 6.04521e-06 125.371C-0.121107 121.309 1.92229 118.082 3.87874 115.943C5.0951 114.62 6.20904 113.207 7.2109 111.716C7.93448 110.65 8.59301 109.542 9.18288 108.396C9.60936 107.568 10.0804 106.754 10.5959 105.952C24.7009 83.8818 70.4941 71.05 111.604 56.858L113.213 56.3053C121.424 53.2215 144.013 46.9982 139.203 55.0507Z" fill="#DAE3EF"/><path d="M139.203 55.0506C132.321 66.5718 110.704 84.124 90.0803 98.3004C79.618 105.49 69.4196 111.809 61.51 116.033C59.6467 117.026 57.9356 117.896 56.3643 118.644C55.1718 119.21 53.9482 119.775 52.7091 120.331C31.536 129.871 3.75141 138.237 0.658359 128.976C0.261841 127.814 0.0399731 126.599 0 125.371C4.7141 131.361 16.7385 127.138 40.1599 121.197C43.5759 120.334 47.613 118.762 52.0725 116.685C64.3546 110.958 79.6615 101.412 92.5895 92.4621C107.263 82.2979 118.868 72.8977 119.505 70.7239C120.908 65.9383 124.219 61.4882 124.219 61.4882C124.219 61.4882 127.945 57.7865 120.182 60.0938C112.418 62.4012 109.955 61.5782 110.17 59.5162C110.384 57.4542 111.623 56.8704 111.623 56.8704L113.232 56.3176C121.424 53.2214 144.013 46.9981 139.203 55.0506Z" fill="#9FBCCE"/><path d="M152.392 71.4629C145.985 71.1524 122.579 67.1929 122.579 67.1929C122.418 65.6402 124.104 63.1403 126.52 61.0907C128.163 59.7025 130.135 58.51 132.11 57.951C132.11 57.951 156.954 65.6619 158.475 67.3078C159.997 68.9537 158.379 71.7579 152.392 71.4629ZM134.513 51.1252C134.513 51.1252 126.657 55.4729 120.408 57.7554C115.514 59.5472 111.607 60.0814 113.222 56.2958C113.222 56.2958 122.39 32.1197 131.051 26.9274C134.333 24.9585 135.78 26.3063 136.252 29.3621C137.029 34.3743 135.187 43.9888 134.513 51.1252Z" fill="#EF062D"/><path d="M92.5896 92.4561L90.7667 96.7044L90.0804 98.3006C79.618 105.49 69.4197 111.809 61.51 116.033C59.6468 117.027 57.9356 117.896 56.3643 118.644C55.1718 119.21 53.9482 119.775 52.7091 120.331L52.0632 116.685C52.0632 116.685 60.6871 103.387 74.7518 96.1267C88.8164 88.8662 92.5896 92.4561 92.5896 92.4561Z" fill="#9FBCCE"/><path d="M132.386 132.172C122.887 130.93 98.5955 125.184 80.4441 120.737C72.2394 118.731 65.2863 116.983 61.5225 116.033L58.507 115.266C58.4201 110.331 65.8328 102.384 74.7642 97.6172C77.7511 95.9766 80.962 94.7818 84.2949 94.0708C84.2949 94.0708 86.7792 95.0739 90.7635 96.7073L91.7821 97.1235C108.111 103.834 145.709 119.539 148.448 123.017C151.954 127.47 147.358 134.156 132.386 132.172Z" fill="#EF062D"/><path d="M148.441 123.014C148.441 123.014 145.395 125.455 126.756 117.964C108.117 110.474 74.7518 97.6172 74.7518 97.6172C77.7387 95.9766 80.9496 94.7818 84.2824 94.0708C84.2824 94.0708 144.948 118.561 148.441 123.014Z" fill="#931632"/><path d="M28.5703 112.707C25.455 113.98 22.2149 114.924 18.903 115.523C16.9711 115.877 14.998 115.946 13.0461 115.728C11.1114 115.458 9.41891 114.76 8.24504 113.402C7.81379 112.899 7.46668 112.33 7.21713 111.716C7.94071 110.65 8.59923 109.542 9.18911 108.396C9.61559 107.568 10.0866 106.754 10.6021 105.952C10.7636 106.924 11.4064 107.713 12.4281 108.303C13.5833 108.971 15.223 109.387 17.195 109.545C18.831 109.65 20.473 109.608 22.1016 109.421C23.7431 109.24 25.3715 108.956 26.9772 108.57C27.4053 108.468 27.8561 108.527 28.2435 108.736C28.6308 108.945 28.9274 109.29 29.0765 109.704L29.4461 110.75C29.5795 111.127 29.563 111.54 29.4 111.904C29.2369 112.268 28.9398 112.556 28.5703 112.707Z" fill="black"/><path d="M43.6256 107.778C44.605 107.778 45.3989 106.554 45.3989 105.043C45.3989 103.532 44.605 102.307 43.6256 102.307C42.6463 102.307 41.8524 103.532 41.8524 105.043C41.8524 106.554 42.6463 107.778 43.6256 107.778Z" fill="black"/><path d="M53.7277 103.459C54.6745 103.459 55.442 102.277 55.442 100.819C55.442 99.3613 54.6745 98.1794 53.7277 98.1794C52.781 98.1794 52.0135 99.3613 52.0135 100.819C52.0135 102.277 52.781 103.459 53.7277 103.459Z" fill="black"/><path d="M63.9696 98.8128C64.8854 98.8128 65.6279 97.6741 65.6279 96.2695C65.6279 94.8648 64.8854 93.7261 63.9696 93.7261C63.0537 93.7261 62.3112 94.8648 62.3112 96.2695C62.3112 97.6741 63.0537 98.8128 63.9696 98.8128Z" fill="black"/><path d="M74.2021 93.8628C75.0854 93.8628 75.8014 92.7658 75.8014 91.4126C75.8014 90.0594 75.0854 88.9624 74.2021 88.9624C73.3188 88.9624 72.6028 90.0594 72.6028 91.4126C72.6028 92.7658 73.3188 93.8628 74.2021 93.8628Z" fill="black"/><path d="M84.2762 88.6331C85.1286 88.6331 85.8197 87.5806 85.8197 86.2822C85.8197 84.9839 85.1286 83.9314 84.2762 83.9314C83.4238 83.9314 82.7328 84.9839 82.7328 86.2822C82.7328 87.5806 83.4238 88.6331 84.2762 88.6331Z" fill="black"/><path d="M94.0491 83.1582C94.8724 83.1582 95.5398 82.1474 95.5398 80.9005C95.5398 79.6536 94.8724 78.6428 94.0491 78.6428C93.2259 78.6428 92.5585 79.6536 92.5585 80.9005C92.5585 82.1474 93.2259 83.1582 94.0491 83.1582Z" fill="black"/><path d="M103.369 77.4566C104.159 77.4566 104.8 76.4889 104.8 75.2952C104.8 74.1015 104.159 73.1338 103.369 73.1338C102.578 73.1338 101.937 74.1015 101.937 75.2952C101.937 76.4889 102.578 77.4566 103.369 77.4566Z" fill="black"/><path d="M158.453 67.308C158.453 67.308 156.745 69.4818 148 67.1341C139.255 64.7864 126.507 61.0909 126.507 61.0909C128.15 59.7027 130.122 58.5102 132.097 57.9512C132.088 57.9512 156.919 65.6621 158.453 67.308ZM134.513 51.1254C134.513 51.1254 126.657 55.4731 120.408 57.7556C120.408 57.7556 129.951 38.2253 132.153 33.2752C133.961 29.207 135.697 29.2381 136.252 29.3623C137.029 34.3745 135.187 43.9891 134.513 51.1254Z" fill="#931632"/><path d="M12.4219 108.303L8.24504 113.402C7.81379 112.899 7.46668 112.33 7.21713 111.716C7.94071 110.65 8.59923 109.542 9.18911 108.396C9.61559 107.568 10.0866 106.754 10.6021 105.952C10.7636 106.924 11.4064 107.713 12.4219 108.303ZM22.1016 109.412L18.903 115.523C16.9711 115.877 14.998 115.946 13.0461 115.728L17.195 109.536C18.831 109.64 20.473 109.599 22.1016 109.412Z" fill="#7ED0FF"/></svg>`);
/* the airplane artwork, drawn as a sprite with a night version */
const PLANE = { ready: false, img: new Image(), day: null, night: null };
PLANE.img.onload = () => {
  const mk = night => { const cv = document.createElement("canvas"); cv.width = 488; cv.height = 272; const x = cv.getContext("2d"); x.drawImage(PLANE.img, 0, 0, 488, 272);
    if (night) { x.globalCompositeOperation = "source-atop"; x.fillStyle = "rgba(14,20,42,.72)"; x.fillRect(0, 0, 488, 272); } return cv; };
  PLANE.day = mk(false); PLANE.night = mk(true); PLANE.ready = true;
};
PLANE.img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg width="244" height="136" viewBox="0 52 244 136" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M126.577 102.99L62.2733 65.8657C60.3487 64.754 60.9045 61.8387 63.1014 61.5097L87.0859 57.9326C97.322 56.4069 107.775 58.3051 116.822 63.3323L168.129 91.8542L126.577 102.99Z" fill="#E9E9E9"/><path d="M142.451 98.7474L126.577 103.001L62.2772 65.8429C60.3336 64.7577 60.9122 61.8348 63.1015 61.4907L76.9862 59.4224C76.9106 60.2202 77.2887 61.0899 78.1509 61.589L142.451 98.7474Z" fill="black" fill-opacity="0.0352941"/><path d="M241.72 90.6102C243.369 96.7623 237.22 106.227 219.834 110.889L130.812 134.741C70.5543 150.887 43.11 145.234 27.5842 126.059C18.4679 114.815 9.43806 103.502 0.495299 92.1189C0.25927 91.8197 0.101596 91.4664 0.0365515 91.0909C-0.0284928 90.7154 0.0011468 90.3296 0.122787 89.9684C0.244427 89.6072 0.454226 89.2821 0.73319 89.0225C1.01215 88.7628 1.35147 88.5768 1.72042 88.4814L18.5356 83.9741C19.685 83.6653 20.8939 83.6531 22.0493 83.9388C23.2046 84.2245 24.2686 84.7987 25.1415 85.6076L48.8461 107.554L187.837 70.3125C205.469 65.5897 217.18 76.1167 222.708 78.6085C230.044 79.5728 239.875 83.7057 241.72 90.6102Z" fill="#F9F9F9"/><path d="M241.72 90.6217C243.365 96.7548 237.202 106.223 219.849 110.87L130.805 134.73C70.5581 150.872 43.1138 145.238 27.5955 126.071C18.4704 114.832 9.43916 103.517 0.502879 92.1266C0.264467 91.8266 0.104812 91.4718 0.0384276 91.0944C-0.0279566 90.7171 0.0010359 90.3291 0.122769 89.9658C0.244503 89.6024 0.455116 89.2753 0.735462 89.0141C1.01581 88.7529 1.35699 88.5659 1.728 88.4701L18.5205 83.9704C19.6705 83.6578 20.8813 83.644 22.038 83.9306C23.1948 84.2171 24.2591 84.7944 25.1302 85.6077L48.8462 107.55L187.815 70.3126C199.82 67.0947 209.069 70.9516 215.516 74.5135C218.522 76.1546 220.923 77.7957 222.704 78.6011C230.055 79.5577 239.867 83.702 241.72 90.6217Z" fill="#F4F4F4"/><path d="M241.732 90.5762L241.743 90.6215C243.384 96.7434 237.221 106.219 219.804 110.885L130.786 134.737C93.3288 144.773 68.5352 146.41 51.4439 141.563L241.732 90.5762Z" fill="#379ADD"/><path d="M173.223 85.8495C172.485 86.0592 171.858 86.5481 171.475 87.2123C171.092 87.8766 170.982 88.664 171.17 89.4077C171.376 90.154 171.871 90.7881 172.544 91.1708C173.217 91.5535 174.015 91.6537 174.762 91.4495C175.503 91.2449 176.133 90.757 176.518 90.0912C176.902 89.4254 177.009 88.6353 176.815 87.8914C176.603 87.1483 176.108 86.5181 175.436 86.1363C174.765 85.7544 173.97 85.6515 173.223 85.8495Z" fill="black"/><path d="M156.994 96.108C158.598 96.108 159.898 94.8079 159.898 93.204C159.898 91.6002 158.598 90.3 156.994 90.3C155.39 90.3 154.09 91.6002 154.09 93.204C154.09 94.8079 155.39 96.108 156.994 96.108Z" fill="black"/><path d="M140.016 100.657C141.62 100.657 142.92 99.3567 142.92 97.7529C142.92 96.149 141.62 94.8489 140.016 94.8489C138.412 94.8489 137.112 96.149 137.112 97.7529C137.112 99.3567 138.412 100.657 140.016 100.657Z" fill="black"/><path d="M123.038 105.206C124.642 105.206 125.942 103.906 125.942 102.302C125.942 100.698 124.642 99.3977 123.038 99.3977C121.434 99.3977 120.134 100.698 120.134 102.302C120.134 103.906 121.434 105.206 123.038 105.206Z" fill="black"/><path d="M106.023 109.766C107.626 109.766 108.927 108.466 108.927 106.862C108.927 105.258 107.626 103.958 106.023 103.958C104.419 103.958 103.119 105.258 103.119 106.862C103.119 108.466 104.419 109.766 106.023 109.766Z" fill="black"/><path d="M89.0447 114.315C90.6485 114.315 91.9487 113.015 91.9487 111.411C91.9487 109.807 90.6485 108.507 89.0447 108.507C87.4408 108.507 86.1407 109.807 86.1407 111.411C86.1407 113.015 87.4408 114.315 89.0447 114.315Z" fill="black"/><path d="M215.52 74.5134L198.168 79.1644C197.43 79.3741 196.803 79.8629 196.42 80.5272C196.037 81.1915 195.927 81.9789 196.115 82.7225C196.213 83.0913 196.383 83.437 196.615 83.74C196.847 84.0429 197.137 84.297 197.467 84.4877C197.798 84.6785 198.163 84.8021 198.541 84.8515C198.92 84.9009 199.304 84.8752 199.673 84.7757L222.708 78.6047C220.927 77.7956 218.522 76.1545 215.52 74.5134Z" fill="black"/><path d="M241.902 93.4916C241.304 99.4358 234.702 106.892 219.827 110.878L130.805 134.73C70.5354 150.88 43.1176 145.249 27.5804 126.082C18.4764 114.823 9.44907 103.501 0.499117 92.119C0.265731 91.8201 0.110071 91.4679 0.0460537 91.0941C-0.0179635 90.7203 0.011658 90.3364 0.13227 89.9768C0.252882 89.6172 0.460724 89.2931 0.737214 89.0335C1.0137 88.7739 1.35022 88.5868 1.71668 88.4891L8.6099 86.6438C16.6235 96.8107 24.6979 106.929 32.8326 117C48.3697 136.167 75.833 141.786 136.057 125.647L225.079 101.795C232.823 99.7118 238.332 96.6792 241.902 93.4916Z" fill="black" fill-opacity="0.0352941"/><path d="M38.9733 125.178L48.0823 122.74C48.5309 122.618 49.0055 122.633 49.4457 122.782C49.886 122.931 50.272 123.207 50.5549 123.576C50.8377 123.945 51.0046 124.389 51.0343 124.853C51.064 125.317 50.9552 125.779 50.7217 126.181L36.8104 150.278C34.9412 153.513 31.8651 155.874 28.2572 156.843L21.5985 158.627C21.1823 158.74 20.7433 158.735 20.3297 158.614C19.9161 158.493 19.5438 158.26 19.2539 157.941C18.9639 157.622 18.7675 157.23 18.6861 156.806C18.6048 156.383 18.6417 155.946 18.7928 155.542C22.2236 146.303 25.657 137.067 29.0929 127.833C32.3826 126.946 35.6761 126.061 38.9733 125.178Z" fill="#4190EF"/><path d="M29.8567 156.336C29.3273 156.525 28.7904 156.718 28.2497 156.862L21.6287 158.635C19.7721 159.134 18.1197 157.338 18.8117 155.549L29.0702 127.818L38.0469 125.413L27.7392 153.156C27.6058 153.505 27.5578 153.881 27.5993 154.253C27.6408 154.624 27.7706 154.981 27.9778 155.292C28.1851 155.603 28.4637 155.86 28.7906 156.042C29.1174 156.224 29.483 156.324 29.8567 156.336Z" fill="black" fill-opacity="0.0352941"/><path d="M130.264 116.746L93.1397 181.05C92.8936 181.472 92.7854 181.96 92.8302 182.446C92.875 182.933 93.0705 183.393 93.3895 183.763C93.7085 184.133 94.135 184.393 94.6095 184.509C95.084 184.625 95.5828 184.589 96.0362 184.408L118.595 175.511C128.225 171.718 136.33 164.846 141.646 155.965L171.82 105.61" fill="#F4F4F4"/><path d="M109.021 176.777C108.791 177.149 108.676 177.581 108.69 178.018C108.703 178.455 108.845 178.878 109.097 179.235L96.04 184.385C93.9792 185.228 92.0167 182.982 93.1473 181.027L130.264 116.742L146.138 112.489L109.021 176.777Z" fill="black" fill-opacity="0.0352941"/></svg>`);
function drawFoam(c, e) {
  const t = S.t, a0 = 1 - .7 * e;
  c.lineCap = "round";
  for (const k of rocks) {
    const p = .5 + .5 * Math.sin(t * 1.3 + k.ph);
    c.strokeStyle = `rgba(255,255,255,${(.3 + .35 * p) * a0})`; c.lineWidth = Math.max(1, 1.3 * U);
    c.beginPath(); c.ellipse(k.x, k.y + k.r * .1, k.r * (1.05 + .18 * p), k.r * (.16 + .06 * p), 0, 0, TAU); c.stroke();
    c.strokeStyle = `rgba(255,255,255,${.22 * (1 - p) * a0})`;
    c.beginPath(); c.ellipse(k.x, k.y + k.r * .14, k.r * (1.35 + .3 * (1 - p)), k.r * (.24 + .08 * (1 - p)), 0, 0, Math.PI); c.stroke();
  }
  // surf washing along the foot of the cliff
  const start = poly.findIndex(p => p[1] > hzY + .08 * H_elem);
  if (start > 0) {
    for (let j = 0; j < 3; j++) {
      const ph = (t * .35 + j / 3) % 1, off = (6 + ph * 16) * U;
      c.strokeStyle = `rgba(255,255,255,${Math.sin(ph * Math.PI) * .4 * a0})`; c.lineWidth = (1.2 + (1 - ph) * 1.6) * U;
      for (let i = start + 4; i < poly.length; i += 9) {
        const p = poly[i], x = p[0] + off * .8, w = (12 + (p[1] - hzY) / H_elem * 50) * U;
        c.beginPath(); c.ellipse(x, p[1], w, w * .12, 0, Math.PI * 1.1, Math.PI * 1.9, false); c.stroke();
      }
    }
  }
}
function drawWindows(c, e) {
  c.save(); c.globalCompositeOperation = "lighter";
  for (const [x, y, w, h] of mill.win) {
    c.globalAlpha = e; c.fillStyle = "#ffcf73"; c.fillRect(x - w / 2, y - h / 2, w, h);
    const g = c.createRadialGradient(x, y, 0, x, y, mill.Hw * .35);
    g.addColorStop(0, "rgba(255,190,90,.45)"); g.addColorStop(1, "rgba(255,190,90,0)");
    c.fillStyle = g; c.fillRect(x - mill.Hw * .35, y - mill.Hw * .35, mill.Hw * .7, mill.Hw * .7);
  }
  c.restore();
}

/* ================= Weather ================= */
const PT = { rain: [], snow: [], leaves: [], petals: [], ff: [], rings: [] };
let ringT = 0, bolt = null, boltT = 2, flash = 0;
const rpick = a => a[Math.floor(Math.random() * a.length)];
const newFall = (kind, init) => ({
  x: init ? rand(-20, W) : rand(-W * .3, W * .7), y: init ? rand(-20, H * .9) : rand(-40, -10),
  vx: rand(18, 42), vy: kind === "leaf" ? rand(26, 44) : rand(16, 30), rot: rand(0, TAU), vr: rand(-2.5, 2.5), ph: rand(0, TAU),
  s: kind === "leaf" ? rand(4, 7) : rand(2.6, 4.2),
  col: kind === "leaf" ? rpick(["#e07a2c", "#c9532a", "#f0b04a", "#b8401f", "#e9a13b"]) : rpick(["#ffc6dd", "#ffb0d0", "#fff0f6", "#f79cc2"])
});
function buildParticles() {
  const area = W * H / 1e6;
  PT.rain = Array.from({ length: Math.round(300 * area + 60) }, () => ({ x: rand(0, W * 1.3), y: rand(-H, H), l: rand(10, 22), v: rand(560, 820) }));
  PT.snow = Array.from({ length: Math.round(220 * area + 50) }, () => ({ x: rand(0, W), y: rand(0, H), r: rand(.7, 2.6), v: rand(16, 50), ph: rand(0, TAU) }));
  PT.leaves = Array.from({ length: mobile ? 16 : 26 }, () => newFall("leaf", true));
  PT.petals = Array.from({ length: mobile ? 22 : 36 }, () => newFall("petal", true));
  PT.ff = Array.from({ length: mobile ? 12 : 22 }, () => { const x = rand(4, .3 * L * W); return { x, y: cliffY(x) + rand(12, H * .3), ph: rand(0, TAU), s: rand(.4, 1) }; });
  PT.rings = [];
}
function makeBolt(tx) {
  let x = tx !== undefined ? tx + rand(-40, 40) : rand(W * .45, W * .95), y = 0; const pts = [], end = hzY + rand(-H_elem * .02, H_elem * .04);
  while (y < end) { pts.push([x, y]); x += rand(-26, 26) * U; y += rand(12, 30) * U; }
  pts.push([x, end]);
  const k = Math.floor(pts.length * rand(.3, .6)), br = [pts[k]]; let bx = pts[k][0], by = pts[k][1];
  for (let i = 0; i < 5; i++) { bx += rand(10, 28) * U * (Math.random() < .5 ? -1 : 1); by += rand(10, 22) * U; br.push([bx, by]); }
  return { pts, br, life: .3 };
}
/* a click in the sky sets off the season there */
let BURST = [];
function burst(x, y) {
  window.found && found("sky");
  const sn = S.season, n = mobile ? .7 : 1, add = (k, o) => BURST.push(Object.assign({ k, x, y, vx: 0, vy: 0, life: 1, age: 0, rot: rand(0, TAU), vr: rand(-3, 3), ph: rand(0, TAU), s: 1 }, o));
  if (sn === "autumn") for (let i = 0; i < 16 * n; i++) { const a = rand(-Math.PI, 0), v = rand(40, 150); add("leaf", { vx: Math.cos(a) * v + 40, vy: Math.sin(a) * v * .7, s: rand(4, 7.5), life: rand(5, 8), col: rpick(["#e07a2c", "#c9532a", "#f0b04a", "#b8401f", "#e9a13b", "#a8461e"]) }); }
  else if (sn === "spring") for (let i = 0; i < 22 * n; i++) { const a = rand(0, TAU), v = rand(30, 120); add("petal", { vx: Math.cos(a) * v + 25, vy: Math.sin(a) * v * .6, s: rand(2.6, 4.4), life: rand(5, 8), col: rpick(["#ffc6dd", "#ffb0d0", "#fff0f6", "#f79cc2"]) }); }
  else if (sn === "winter" || sn === "snow") for (let i = 0; i < 70 * n; i++) { const a = rand(0, TAU), v = rand(10, 90); add("snow", { x: x + rand(-30, 30), vx: Math.cos(a) * v, vy: Math.sin(a) * v * .5 - 10, s: rand(.8, 2.8), life: rand(5, 9) }); }
  else if (sn === "monsoon") { add("cloud", { life: 4.5, s: rand(.9, 1.2) }); }
  else if (sn === "storm") { bolt = makeBolt(x); flash = 1; add("cloud", { life: 3.5, s: 1.3, dark: 1 }); }
  else if (sn === "starry") { const a = rand(.25, .55) * (Math.random() < .5 ? 1 : -1); add("star", { vx: Math.cos(a) * 520 * Math.sign(a || 1), vy: Math.abs(Math.sin(a)) * 420, life: 1.1 }); for (let i = 0; i < 12 * n; i++) { const b = rand(0, TAU), v = rand(10, 50); add("spark", { vx: Math.cos(b) * v, vy: Math.sin(b) * v, life: rand(1.5, 3), col: "230,255,140" }); } }
  else if (sn === "kundali") { add("ring", { life: 2.4 }); for (let i = 0; i < 12; i++) { const b = i / 12 * TAU; add("glyph", { vx: Math.cos(b) * 60, vy: Math.sin(b) * 60, life: 2.6, g: ZG[(AST.moonS + i) % 12] }); } }
  else { // clear: a few gulls lift off from the spot and join the flock
    for (let i = 0; i < 4; i++) birds.push({ x: x + rand(-14, 14), y: y + rand(-8, 8), vx: rand(-90, 90), vy: rand(-80, -30), ph: rand(0, TAU), z: rand(.75, 1.1) });
    if (birds.length > 26) birds.splice(0, birds.length - 26);
    for (let i = 0; i < 3; i++) add("feather", { vx: rand(-30, 30), vy: rand(-20, 10), life: rand(2, 3), s: rand(3, 4.5) });
  }
  if (BURST.length > 600) BURST.splice(0, BURST.length - 600);
}
function drawBurst(c, dt, e, wind) {
  for (const b of BURST) {
    b.age += dt; const f = b.age / b.life; if (f >= 1) continue;
    const fade = Math.min(1, (1 - f) * 4) * Math.min(1, b.age * 6);
    if (b.k === "leaf" || b.k === "petal") {
      b.vx += ((b.k === "leaf" ? 70 : 45) + wind * 90 - b.vx) * dt * .8; b.vy += ((b.k === "leaf" ? 38 : 22) - b.vy) * dt * 1.2;
      b.x += (b.vx + Math.sin(S.t * 2 + b.ph) * 22) * dt; b.y += (b.vy + Math.cos(S.t * 1.7 + b.ph) * 18) * dt; b.rot += b.vr * dt;
      const sz = b.s * U; c.save(); c.translate(b.x, b.y); c.rotate(b.rot); c.scale(1, .4 + .6 * Math.abs(Math.sin(S.t * 2.4 + b.ph)));
      c.globalAlpha = fade * (1 - .5 * e); c.fillStyle = b.col; c.beginPath();
      if (b.k === "leaf") { c.moveTo(-sz, 0); c.quadraticCurveTo(0, -sz * .62, sz, 0); c.quadraticCurveTo(0, sz * .62, -sz, 0); c.fill(); c.strokeStyle = "rgba(90,40,15,.5)"; c.lineWidth = .7; c.beginPath(); c.moveTo(-sz * 1.2, 0); c.lineTo(sz, 0); c.stroke(); }
      else { c.ellipse(0, 0, sz, sz * .62, 0, 0, TAU); c.fill(); }
      c.restore();
    } else if (b.k === "snow") {
      b.vx += (-8 - wind * 30 - b.vx) * dt * .9; b.vy += (26 + b.s * 8 - b.vy) * dt * .9;
      b.x += (b.vx + Math.sin(S.t + b.ph) * 12) * dt; b.y += b.vy * dt;
      c.globalAlpha = fade * .95; c.fillStyle = "#fff"; c.beginPath(); c.arc(b.x, b.y, b.s * U, 0, TAU); c.fill();
    } else if (b.k === "cloud") {
      // a little cloud forms at the click and rains on the sea
      const grow = Math.min(1, b.age * 2.5), w = 46 * U * b.s * grow;
      c.globalAlpha = fade * .92; c.fillStyle = b.dark ? (e > .5 ? "#2a3140" : "#7b8494") : (e > .5 ? "#3a4256" : "#c9d0da");
      [[-.6, .1, .45], [-.15, -.25, .6], [.4, -.05, .5], [.75, .15, .35]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(b.x + dx * w, b.y + dy * w, r * w, 0, TAU); c.fill(); });
      c.fillRect(b.x - .9 * w, b.y, 1.8 * w, .35 * w);
      if (b.age > .25 && f < .85 && Math.random() < dt * 60) for (let i = 0; i < 3; i++) BURST.push({ k: "drop", x: b.x + rand(-.85, .85) * w, y: b.y + .3 * w, vx: -20, vy: rand(380, 520), life: 2, age: 0 });
    } else if (b.k === "drop") {
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.y > hzY + H_elem * .04 && !b.hit && b.y > rand(hzY + H_elem * .04, H * .7)) { b.hit = 1; b.age = b.life; PT.rings.push({ x: b.x, y: b.y, a: 0, k: (b.y - hzY) / (H - hzY) }); continue; }
      c.globalAlpha = .6; c.strokeStyle = e > .5 ? "#a8b6d6" : "#dce6f2"; c.lineWidth = Math.max(.8, U); c.beginPath(); c.moveTo(b.x, b.y); c.lineTo(b.x + 2, b.y - 12 * U); c.stroke();
    } else if (b.k === "star") {
      b.x += b.vx * dt; b.y += b.vy * dt;
      const g = c.createLinearGradient(b.x, b.y, b.x - b.vx * .14, b.y - b.vy * .14); g.addColorStop(0, `rgba(255,255,255,${fade})`); g.addColorStop(1, "rgba(255,255,255,0)");
      c.globalAlpha = 1; c.strokeStyle = g; c.lineWidth = 2 * U; c.lineCap = "round"; c.beginPath(); c.moveTo(b.x, b.y); c.lineTo(b.x - b.vx * .14, b.y - b.vy * .14); c.stroke();
    } else if (b.k === "spark") {
      b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= Math.pow(.4, dt); b.vy *= Math.pow(.4, dt);
      const a = fade * (.5 + .5 * Math.sin(b.age * 9 + b.ph)); c.globalAlpha = 1; const g = c.createRadialGradient(b.x, b.y, 0, b.x, b.y, 6 * U); g.addColorStop(0, `rgba(${b.col},${a})`); g.addColorStop(1, `rgba(${b.col},0)`); c.fillStyle = g; c.fillRect(b.x - 6 * U, b.y - 6 * U, 12 * U, 12 * U);
    } else if (b.k === "ring") {
      c.globalAlpha = fade * .7; c.strokeStyle = "#ffe2aa"; c.lineWidth = 1.2; c.beginPath(); c.arc(b.x, b.y, (10 + f * 80) * U, 0, TAU); c.stroke();
    } else if (b.k === "glyph") {
      b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= Math.pow(.3, dt); b.vy *= Math.pow(.3, dt);
      c.globalAlpha = fade; c.fillStyle = "#ffe2aa"; c.font = `${Math.round(12 * U + 3)}px sans-serif`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(b.g, b.x, b.y);
    } else if (b.k === "feather") {
      b.vy += (18 - b.vy) * dt; b.x += (b.vx + Math.sin(S.t * 3 + b.ph) * 20) * dt; b.y += b.vy * dt; b.rot += b.vr * dt * .5;
      c.save(); c.translate(b.x, b.y); c.rotate(b.rot); c.globalAlpha = fade * (1 - e); c.fillStyle = "#fff"; c.beginPath(); c.ellipse(0, 0, b.s * U, b.s * U * .3, 0, 0, TAU); c.fill(); c.restore();
    }
  }
  c.globalAlpha = 1;
  BURST = BURST.filter(b => b.age < b.life && b.y < H + 30 && b.x > -60 && b.x < W + 60);
}
function drawWeather(c, dt, e, wind) {
  const A = S.amt, t = S.t;
  // monsoon rainbow, behind everything in the sky
  if (A.rainbow > .01 && e < .9) {
    const cx = W * .74, cy = hzY + H_elem * .28, Rr = Math.max(W * .3, 300 * U), cols = ["#ff3b3b", "#ff9d2e", "#ffe14a", "#4fd66a", "#3aa8ff", "#5a5cff", "#9b5cff"];
    c.save(); c.beginPath(); c.rect(0, 0, W, hzY); c.clip();
    c.globalCompositeOperation = "screen"; c.globalAlpha = .2 * A.rainbow * (1 - e); c.lineWidth = Math.max(5, Rr * .018);
    cols.forEach((col, i) => { c.strokeStyle = col; c.beginPath(); c.arc(cx, cy, Rr - i * c.lineWidth, Math.PI * 1.06, Math.PI * 1.94); c.stroke(); });
    c.restore();
  }
  // rain + ripples on the sea
  if (A.rain > .01) {
    const n = Math.floor(PT.rain.length * A.rain), sl = .2 + .12 * Math.min(1, wind);
    c.strokeStyle = e > .5 ? "rgba(160,180,215,.4)" : "rgba(220,230,242,.55)"; c.lineWidth = Math.max(.8, U * .9);
    c.beginPath();
    for (let i = 0; i < n; i++) {
      const d = PT.rain[i]; d.y += d.v * dt; d.x -= d.v * sl * dt;
      if (d.y > H) { d.y = rand(-50, -5); d.x = rand(0, W * 1.3); }
      if (d.x < -30) d.x += W + 60;
      c.moveTo(d.x, d.y); c.lineTo(d.x + d.l * sl, d.y - d.l);
    }
    c.stroke();
    ringT -= dt * A.rain * 40;
    while (ringT < 0) { ringT += 1; const y = rand(hzY + H_elem * .03, H * .8), x = rand(.38 * L * W, W); PT.rings.push({ x, y, a: 0, k: (y - hzY) / (H - hzY) }); }
  }
  if (PT.rings.length) {
    c.lineWidth = 1;
    for (const r of PT.rings) {
      r.a += dt * 1.7; const rr = (2 + r.a * 10) * U * (.35 + r.k * 1.2);
      c.strokeStyle = `rgba(255,255,255,${(1 - r.a) * .45 * (1 - .5 * e)})`;
      c.beginPath(); c.ellipse(r.x, r.y, rr, rr * .28, 0, 0, TAU); c.stroke();
    }
    PT.rings = PT.rings.filter(r => r.a < 1);
  }
  // snow
  if (A.snow > .01) {
    const n = Math.floor(PT.snow.length * A.snow);
    c.fillStyle = "#ffffff";
    for (let i = 0; i < n; i++) {
      const f = PT.snow[i]; f.y += f.v * dt * (.6 + f.r * .3); f.x += (Math.sin(t * .8 + f.ph) * 14 - 8 - wind * 30) * dt;
      if (f.y > H) { f.y = -5; f.x = rand(0, W); } if (f.x < -10) f.x += W + 20; if (f.x > W + 10) f.x -= W + 20;
      c.globalAlpha = (.5 + .45 * (f.r / 2.6)) * (1 - .25 * e);
      c.beginPath(); c.arc(f.x, f.y, f.r * U, 0, TAU); c.fill();
    }
    c.globalAlpha = 1;
  }
  // leaves and petals on the wind
  const fall = (arr, amt, kind) => {
    const n = Math.floor(arr.length * amt);
    for (let i = 0; i < n; i++) {
      const f = arr[i];
      f.x += (f.vx + wind * 90) * dt; f.y += (f.vy + Math.sin(t * 1.6 + f.ph) * 14) * dt; f.rot += f.vr * dt;
      if (f.y > H + 20 || f.x > W + 30) Object.assign(f, newFall(kind, false));
      const sz = f.s * U;
      c.save(); c.translate(f.x, f.y); c.rotate(f.rot); c.scale(1, .45 + .55 * Math.abs(Math.sin(t * 2.2 + f.ph)));
      c.globalAlpha = .92 * (1 - .6 * e); c.fillStyle = f.col;
      c.beginPath();
      if (kind === "leaf") { c.moveTo(-sz, 0); c.quadraticCurveTo(0, -sz * .62, sz, 0); c.quadraticCurveTo(0, sz * .62, -sz, 0); c.fill(); c.strokeStyle = "rgba(90,40,15,.45)"; c.lineWidth = .7; c.beginPath(); c.moveTo(-sz, 0); c.lineTo(sz, 0); c.stroke(); }
      else { c.ellipse(0, 0, sz, sz * .62, 0, 0, TAU); c.fill(); }
      c.restore();
    }
  };
  if (A.leaves > .01) fall(PT.leaves, A.leaves, "leaf");
  if (A.petals > .01) fall(PT.petals, A.petals, "petal");
  // fireflies over the cliff on starry nights
  if (A.fireflies > .01 && e > .3) {
    c.save(); c.globalCompositeOperation = "lighter";
    for (const f of PT.ff) {
      const x = f.x + Math.sin(t * .5 * f.s + f.ph) * 18 * U, y = f.y + Math.cos(t * .7 * f.s + f.ph) * 9 * U;
      const a = Math.max(0, Math.sin(t * 1.4 * f.s + f.ph)) * A.fireflies * e;
      if (a < .02) continue;
      const g = c.createRadialGradient(x, y, 0, x, y, 7 * U);
      g.addColorStop(0, `rgba(230,255,140,${a})`); g.addColorStop(1, "rgba(230,255,140,0)");
      c.fillStyle = g; c.fillRect(x - 7 * U, y - 7 * U, 14 * U, 14 * U);
    }
    c.restore();
  }
  // storm lightning
  if (A.lightning > .3) { boltT -= dt; if (boltT < 0) { bolt = makeBolt(); flash = 1; boltT = rand(2.5, 7); } }
  if (bolt) {
    bolt.life -= dt;
    const a = clamp(bolt.life * 4, 0, 1);
    c.save(); c.strokeStyle = `rgba(232,240,255,${a})`; c.shadowColor = "#bcd0ff"; c.shadowBlur = 18; c.lineJoin = "round";
    for (const [pts, w] of [[bolt.pts, 2.2], [bolt.br, 1.2]]) { c.lineWidth = w * U; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); }
    c.restore();
    if (bolt.life <= 0) bolt = null;
  }
  drawBurst(c, dt, e, wind);
  flash *= Math.pow(.015, dt);
}
/* Astro: the twelve rashi constellations, faint across the night sky; hover to read one */
const ENG = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
// simplified star figures in a unit box: [stars, lines]
const CONST = [
  [[[0, .6], [.45, .35], [.75, .3], [1, .45]], [[0, 1], [1, 2], [2, 3]]],
  [[[0, .2], [.3, .45], [.45, .6], [.6, .5], [1, .1], [.55, .75], [.4, .95]], [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6]]],
  [[[.1, 0], [.15, .35], [.2, .7], [.1, 1], [.6, 0], [.62, .35], [.7, .7], [.75, 1]], [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [0, 4], [1, 5]]],
  [[[.5, .45], [.5, 0], [.15, .95], [.85, .95], [.5, .7]], [[0, 1], [0, 4], [4, 2], [4, 3]]],
  [[[.2, .1], [.05, .3], [.15, .5], [.35, .55], [.32, .3], [.75, .45], [1, .7], [.7, .78]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [3, 5], [5, 6], [6, 7], [7, 3]]],
  [[[0, .3], [.25, .35], [.45, .2], [.5, .55], [.75, .5], [1, .72], [.4, .85], [.72, .98]], [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 6], [4, 7]]],
  [[[.5, 0], [.1, .4], [.9, .4], [.2, .95], [.8, .9]], [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4]]],
  [[[.15, 0], [0, .12], [.12, .28], [.22, .46], [.36, .6], [.52, .7], [.68, .72], [.82, .64], [.9, .5], [1, .42]], [[0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]],
  [[[0, .62], [.25, .45], [.25, .82], [.5, .5], [.5, .88], [.68, .28], [.82, .58], [1, .42]], [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 5], [3, 5], [3, 6], [6, 7], [5, 7]]],
  [[[0, .2], [.35, .78], [.6, .88], [1, .25], [.55, .42]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]],
  [[[0, .3], [.25, .18], [.45, .4], [.55, .12], [.7, .5], [.85, .72], [1, .92], [.38, .78]], [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [2, 7]]],
  [[[0, .1], [.1, .32], [.05, .52], [.32, .74], [.58, .94], [.8, .8], [1, .68], [.95, .48], [.82, .6]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 5]]]
];
let ZBOX = [], zHover = -1, zW = 0;
function layoutZodiac() {
  const cols = mobile ? 4 : 6, rows = 12 / cols, top = H * .06, bot = hzY - H * .05, cw = W / cols, rh = (bot - top) / rows, sz = Math.min(cw * .62, rh * .78);
  ZBOX = Array.from({ length: 12 }, (_, i) => {
    const r = Math.floor(i / cols), col = i % cols, jx = Math.sin(i * 7.3) * cw * .1, jy = Math.cos(i * 4.1) * rh * .1;
    const x = col * cw + (cw - sz) / 2 + jx + (r % 2 ? cw * .18 : -cw * .06), y = top + r * rh + (rh - sz * .8) / 2 + jy;
    return { x, y, w: sz, h: sz * .8 };
  });
  zW = W;
}
function drawZodiac(c, a) {
  if (a < .02) { if (zHover >= 0) setZHover(-1); return; }
  if (zW !== W) layoutZodiac();
  c.save(); c.lineCap = "round";
  CONST.forEach(([st, ln], i) => {
    const b = ZBOX[i], hov = i === zHover, mine = i === AST.moonS, P = st.map(([u, v]) => [b.x + u * b.w, b.y + v * b.h]);
    const la = (hov ? .75 : mine ? .3 : .16) * a, sa = (hov ? 1 : mine ? .7 : .45) * a;
    c.strokeStyle = `rgba(255,226,170,${la})`; c.lineWidth = hov ? 1.4 : 1; c.beginPath();
    ln.forEach(([m, n]) => { c.moveTo(P[m][0], P[m][1]); c.lineTo(P[n][0], P[n][1]); }); c.stroke();
    P.forEach(([x, y], k) => { const tw = .7 + .3 * Math.sin(S.t * 1.7 + i * 3 + k), r = (hov ? 2.2 : 1.4) * Math.max(.8, U) * tw;
      if (hov) { const g = c.createRadialGradient(x, y, 0, x, y, r * 5); g.addColorStop(0, `rgba(255,236,190,${.5 * a})`); g.addColorStop(1, "rgba(255,236,190,0)"); c.fillStyle = g; c.fillRect(x - r * 5, y - r * 5, r * 10, r * 10); }
      c.fillStyle = `rgba(255,248,228,${sa * tw})`; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); });
    if (hov) { c.fillStyle = `rgba(255,226,170,${.8 * a})`; c.font = `${Math.round(13 * U + 4)}px sans-serif`; c.textAlign = "center"; c.fillText(ZG[i], b.x + b.w / 2, b.y + b.h + 16 * U); }
  });
  c.restore();
  if (zHover >= 0) placeTip();
}
const tipEl = document.getElementById("astroTip");
let tipPt = [0, 0];
function zodiacAt(x, y) {
  if (!(S.amt.kundali * S.night > .3) || !ZBOX.length) return -1;
  for (let i = 0; i < 12; i++) { const b = ZBOX[i], p = 10 * U; if (x > b.x - p && x < b.x + b.w + p && y > b.y - p && y < b.y + b.h + p) return i; }
  return -1;
}
function setZHover(i) {
  if (i >= 0) window.found && found("stars");
  if (i === zHover) return; zHover = i;
  if (i < 0) { tipEl.classList.remove("on"); return; }
  const virgo = i === 5;
  tipEl.innerHTML = `<b>${ZG[i]} ${RASHI[i]}</b><small>${ENG[i].toUpperCase()}${i === AST.moonS ? " · MOON HERE TONIGHT" : i === AST.sunS ? " · SUN SIGN NOW" : ""}</small>${virgo ? "<em>I'm a Virgo</em>" : ""}`;
  tipEl.classList.add("on");
}
function placeTip() { const r = fx.getBoundingClientRect(), b = ZBOX[zHover], above = r.top + b.y > 90, cx = Math.max(90, Math.min(innerWidth - 90, r.left + b.x + b.w / 2)); tipEl.style.left = cx + "px"; tipEl.style.top = (above ? r.top + b.y : r.top + b.y + b.h + 26 * U) + "px"; tipEl.style.transform = above ? "" : "translate(-50%,0)"; }
/* Kundali: a North Indian rashi chart drawn around the moon */
function drawKundali(c, moon, a) {
  if (a < .01 || moon.vis < .05) return;
  const Rr = 64 * U * (mobile ? .85 : 1), mr = .027 * H_elem, x = moon.x, y = moon.y, t = S.t;
  c.save();
  const clipTop = 54; c.beginPath(); c.rect(0, clipTop, W, hzY - clipTop); c.arc(x, y, mr * 1.9, 0, TAU, true); c.clip("evenodd");
  c.translate(x, y); c.rotate(Math.sin(t * .05) * .08);
  const al = a * moon.vis;
  c.strokeStyle = `rgba(255,226,170,${.55 * al})`; c.lineWidth = 1;
  c.strokeRect(-Rr, -Rr, Rr * 2, Rr * 2);
  c.beginPath(); c.moveTo(-Rr, -Rr); c.lineTo(Rr, Rr); c.moveTo(Rr, -Rr); c.lineTo(-Rr, Rr);
  c.moveTo(0, -Rr); c.lineTo(Rr, 0); c.lineTo(0, Rr); c.lineTo(-Rr, 0); c.closePath(); c.stroke();
  c.restore();
  // houses: 1 at top centre, counter-clockwise, as in the North Indian chart
  const H12 = [[0, -.5], [-.5, -.78], [-.78, -.5], [-.5, 0], [-.78, .5], [-.5, .78], [0, .5], [.5, .78], [.78, .5], [.5, 0], [.78, -.5], [.5, -.78]];
  c.save(); c.font = `${Math.round(12 * U + 2)}px ${getComputedStyle(root).getPropertyValue("--sans")}`; c.textAlign = "center"; c.textBaseline = "middle";
  H12.forEach(([u, v], i) => {
    const sign = (AST.moonS + i) % 12, px = x + u * Rr, py = y + v * Rr;
    if (py > hzY - 4 || py < 60) return;
    const isSun = sign === AST.sunS, isMoon = i === 0;
    c.fillStyle = isMoon ? `rgba(225,232,255,${al})` : isSun ? `rgba(255,205,110,${al})` : `rgba(255,226,170,${.6 * al})`;
    c.fillText(ZG[sign], px, py);
  });
  c.restore();
}

/* ================= Sun and moon on their arcs ================= */
function body(which, lift) {
  const s = S.s[which], x = W * (.06 + .88 * s), el = Math.sin(Math.PI * s), topY = Math.max(H * .12, 54);
  const yUp = hzY - (hzY - topY) * el, yDown = hzY + H_elem * .1;
  const y = yDown + (yUp - yDown) * lift;
  return { x, y, el, vis: clamp((hzY + H_elem * .03 - y) / (H_elem * .08), 0, 1) * clamp(lift * 1.4, 0, 1) };
}

/* ================= Pointer: drag the sun, stir the wind ================= */
let dragging = false, lastPX = null;
const local = e => { const r = fx.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
const curBody = () => body(S.mode, 1);
// where the sun (or moon) sits on screen, for the first-load hint in intro-hint.js
window.sunSpot = () => { const b = curBody(), r = fx.getBoundingClientRect(); return [r.left + b.x, r.top + b.y]; };
const nearBody = (x, y) => { const b = curBody(); return Math.hypot(x - b.x, y - b.y) < 46 + 30 * U; };
const nearMill = (x, y) => mill.hub && Math.hypot(x - mill.hub.x, y - mill.hub.y) < mill.Hw * .7;
/* drag a plane or a boat anywhere; let go and it carries on from there */
let grab = null;
function craftAt(x, y) {
  for (let i = planes.length - 1; i >= 0; i--) { const p = planes[i]; if (Math.abs(x - p.x) < 46 * p.s + 12 && Math.abs(y - p.y) < 16 * p.s + 12) return { kind: "plane", o: p }; }
  if (S.night > .5) for (let i = SATS.length - 1; i >= 0; i--) { const s = SATS[i], k = Math.max(.75, U) * 1.15; if (Math.abs(x - s.x) < 13 * k + 12 && Math.abs(y - s.y) < 5 * k + 12) return { kind: "sat", o: s }; }
  for (let i = boats.length - 1; i >= 0; i--) { const b = boats[i]; if (x > b.x - 17 * b.s - 10 && x < b.x + 17 * b.s + 10 && y > b.y - 33 * b.s - 8 && y < b.y + 5 * b.s + 8) return { kind: "boat", o: b }; }
  return null;
}
function moveGrab(x, y, t) {
  const g = grab, o = g.o, dt = Math.max(.001, (t - g.t) / 1000);
  g.vx = g.vx * .6 + ((x + g.dx) - o.x) / dt * .4; g.t = t;
  if (g.kind !== "boat") { o.x = x + g.dx; o.y = clamp(y + g.dy, 12, hzY - 14); }
  else {
    o.x = clamp(x + g.dx, .3 * L * W, W + 20); o.y = clamp(y + g.dy, hzY + H_elem * .03, hzY + H_elem * .34);
    const z = clamp(Math.sqrt(Math.max(0, (o.y - hzY) / H_elem - .035) / .3), 0, 1);
    o.z = z; o.s = (.45 + z * 1.1) * U; o.v = (6 + z * 10) * Math.max(.7, W / 1440);
  }
}
function releaseGrab() {
  const g = grab; if (!g) return; grab = null; g.o.held = false;
  if (Math.abs(g.vx) > 60) { const d = Math.sign(g.vx);
    g.o.dir = d; if (g.kind !== "boat") g.o.vx = d * Math.abs(g.o.vx); }
  fx.style.cursor = "";
}
window.showHint = () => {};
window.hideHint = () => {};
const nearTree = (x, y) => APPLES.some(a => a.st === "tree" && Math.hypot(x - a.hx, y - a.hy) < 34 * U);
fx.addEventListener("pointermove", e => {
  const [x, y] = local(e);
  if (lastPX !== null) S.windIn = Math.min(1.4, S.windIn + Math.abs(x - lastPX) * .0035);
  lastPX = x; ptr.x = x; ptr.y = y; ptr.in = e.pointerType === "mouse";
  if (grab) { moveGrab(x, y, e.timeStamp); return; }
  if (dragging) { window.found && found("sun"); S.dragged = true; if (S.live) setLive(false); S.s[S.mode] = clamp((x / W - .06) / .88, .02, .98); return; }
  const zi = zodiacAt(x, y); setZHover(zi);
  fx.style.cursor = craftAt(x, y) ? "grab" : landNow !== "winter" && appleAt(x, y) ? "pointer" : nearBody(x, y) ? "grab" : nearMill(x, y) ? "pointer" : zi >= 0 ? "help" : "";
  if (e.pointerType === "mouse") {
    const h = craftAt(x, y) || nearBody(x, y) ? "drag me" : (landNow !== "winter" && (appleAt(x, y) || nearTree(x, y))) || nearMill(x, y) || (y < hzY && zi < 0) ? "click me" : "";
    h ? showHint(h, e.clientX, e.clientY, y < hzY) : hideHint();
  }
});
fx.addEventListener("pointerdown", e => {
  if (e.pointerType === "mouse") e.preventDefault(); // a press anywhere on the scene never selects page text
  const [x, y] = local(e); hideHint();
  if (PHONE.matches) {
    if (nearBody(x, y)) { dragging = true; advanceTip("sun"); fx.setPointerCapture(e.pointerId); e.preventDefault(); return; }
    if (nearMill(x, y)) { S.gust = Math.min(2, S.gust + 1.4); advanceTip("mill"); setTimeout(() => window.openConfig && window.openConfig(), 450); }
    return;
  }
  const ap = landNow !== "winter" && appleAt(x, y); if (ap) { dropApple(ap); advanceTip("tree"); e.preventDefault(); return; }
  const cr = craftAt(x, y);
  if (cr) { window.found && found(cr.kind === "plane" ? "plane" : cr.kind === "boat" ? "boat" : "sat"); advanceTip(cr.kind === "plane" ? "plane" : "boat"); grab = { ...cr, dx: cr.o.x - x, dy: cr.o.y - y, t: e.timeStamp, vx: 0 }; cr.o.held = true; fx.setPointerCapture(e.pointerId); fx.style.cursor = "grabbing"; e.preventDefault(); return; }
  if (nearBody(x, y)) { dragging = true; advanceTip("sun"); fx.setPointerCapture(e.pointerId); fx.style.cursor = "grabbing"; e.preventDefault(); return; }
  S.gust = Math.min(2, S.gust + (nearMill(x, y) ? 1.4 : .6));
  if (nearMill(x, y)) { window.found && found("mill"); advanceTip("mill"); setTimeout(() => window.openConfig && window.openConfig(), 450); }
  scare = { x, y, k: 1 };
  const zi = zodiacAt(x, y);
  if (zi >= 0) { setZHover(zi === zHover && e.pointerType !== "mouse" ? -1 : zi); return; }
  if (y < hzY && !nearMill(x, y)) burst(x, y);
});
const endDrag = () => { releaseGrab(); if (dragging) { dragging = false; fx.style.cursor = "grab"; } };
fx.addEventListener("pointerup", endDrag);
fx.addEventListener("pointercancel", endDrag);
fx.addEventListener("pointerleave", () => { hideHint(); ptr.in = false; lastPX = null; setZHover(-1); });

/* ================= Layout ================= */
function resize() {
  const r = scene.getBoundingClientRect();
  W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
  DPR = Math.min(devicePixelRatio || 1, 1.5); mobile = W < 720;
  H_elem = clamp(Math.round(mobile ? 320 : W * 0.22), 270, 360);
  hzY = Math.round(H - H_elem * (1 - HZ));
  L = clamp(H_elem * 2.3 / W, .45, 1.7); U = clamp(H_elem / 620, .62, 1.15) * (mobile ? .9 : 1);
  fx.width = Math.round(W * DPR); fx.height = Math.round(H * DPR);
  sizeGL(); buildCliff(); setLand(landKey(S.season), true); landPrev.width = landPrev.height = 1; buildBirds(); buildOrchard(); buildParticles(); zW = 0; boats = [];
}
setInterval(healLand, 2000);
document.addEventListener("visibilitychange", healLand);
[fx, landC, landPrev].forEach(cv => cv.addEventListener("contextrestored", () => resize()));
let rzT = 0;
new ResizeObserver(() => { cancelAnimationFrame(rzT); rzT = requestAnimationFrame(resize); }).observe(scene);
resize();
apply(S.mode, S.season, false);
let visible = true;
new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(scene);

const tipEl2 = document.getElementById("millTip");
const TIP_ORDER = ["mill", "sun", "tree", "boat", "plane", "birds"];
let tipIdx = 0;
function tipAvailable(kind, sunObj, moonObj, nightVal) {
  if (kind === "mill") return !!mill.hub;
  if (kind === "sun") { const b = nightVal < .5 ? sunObj : moonObj; return b && b.vis > .2; }
  if (kind === "tree") return landNow !== "winter" && APPLES.some(a => a.st === "tree");
  if (kind === "boat") return boats.some(b => b.x > 40 && b.x < W - 40);
  if (kind === "plane") return planes.some(p => p.x > 60 && p.x < W - 60);
  if (kind === "birds") return nightVal < .5 && birds.some(b => b.x > 40 && b.x < W - 40);
  return false;
}
function advanceTip(hitKind) {
  if (hitKind && TIP_ORDER[tipIdx] !== hitKind) return;
  tipIdx = (tipIdx + 1) % TIP_ORDER.length;
}
/* ================= Frame ================= */
let last = performance.now(), parX = 0, perfN = 0, perfSum = 0, LAST = null;
function frame(nowT) {
  requestAnimationFrame(frame);
  const dt = Math.min(.05, (nowT - last) / 1000); last = nowT;
  if (!visible || document.hidden) return;
  const adt = dt * (RM ? .15 : 1);
  S.t += adt;
  const target = S.mode === "night" ? 1 : 0;
  S.night += clamp(target - S.night, -dt / 1.6, dt / 1.6);
  const e = S.night * S.night * (3 - 2 * S.night);
  // the sky keeps moving: one real second is one minute of sky time
  // live: follow the viewer's clock (checked once a second)
  if (S.live && (S.t % 1) < adt + .001) { const r = realSky(); if (r.mode !== S.mode) apply(r.mode, lastSeason[r.mode], false); S.s[r.mode] = r.s; }
  S.windIn *= Math.exp(-dt * 1.2); S.gust *= Math.exp(-dt * .7);
  const wind = S.windIn + S.gust;
  S.cloud += adt * (.004 + .02 * wind);
  S.sail += adt * (.55 + 3.6 * wind);
  parX += ((ptr.in ? ptr.x / W - .5 : 0) - parX) * Math.min(1, dt * 2);
  { const k = 1 - Math.exp(-dt * 1.6); for (const key in S.amtT) S.amt[key] += (S.amtT[key] - S.amt[key]) * k; }
  const A = S.amt;
  if (landFade < 1) landFade = Math.min(1, landFade + dt / 1.2);
  const sun = body("day", 1 - e), moon = body("night", e);
  sun.vis *= 1 - .82 * A.over; moon.vis *= 1 - .9 * A.over;
  const gold = (1 - sstep(.2, .55, Math.sin(Math.PI * S.s.day))) * (1 - e);
  S.gold = gold; S.sun = [sun.x / W, 1 - sun.y / H, sun.vis]; S.moon = [moon.x / W, 1 - moon.y / H, moon.vis, moonPhase];
  window.__gxSceneState = S;
  if (gl) {
    gl.uniform2f(GU.uRes, glc.width, glc.height); gl.uniform1f(GU.uT, S.t); gl.uniform1f(GU.uHz, (H - hzY) / H);
    gl.uniform1f(GU.uNight, e); gl.uniform1f(GU.uGold, gold); gl.uniform1f(GU.uCloud, S.cloud); gl.uniform1f(GU.uShore, .42 * L);
    gl.uniform3f(GU.uSun, sun.x / W, 1 - sun.y / H, sun.vis);
    gl.uniform4f(GU.uMoon, moon.x / W, 1 - moon.y / H, moon.vis, moonPhase);
    gl.uniform2f(GU.uPar, parX, 0);
    gl.uniform1f(GU.uOver, A.over); gl.uniform1f(GU.uWarm, A.warm); gl.uniform1f(GU.uCold, A.cold); gl.uniform1f(GU.uFlash, flash * A.lightning);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  // land, windmill, surf, birds, planes
  const c = c2;
  c.setTransform(DPR, 0, 0, DPR, 0, 0); c.globalCompositeOperation = "source-over"; c.globalAlpha = 1;
  c.clearRect(0, 0, W, H);
  stepBoats(adt, wind); drawBoats(c, e);
  if (landFade < 1) { c.globalAlpha = 1 - landFade; c.drawImage(landPrev, 0, 0, W, H); c.globalAlpha = landFade; }
  c.drawImage(landC, 0, 0, W, H); c.globalAlpha = 1;
  drawMill(c, S.sail, (e < .5 ? sun : moon).x);
  drawOrchard(c, adt, e);
  if (tipEl2) {
    let safety = 0;
    while (!tipAvailable(TIP_ORDER[tipIdx], sun, moon, e) && safety < TIP_ORDER.length) {
      tipIdx = (tipIdx + 1) % TIP_ORDER.length;
      safety++;
    }
    const kind = TIP_ORDER[tipIdx];
    let tx = null, ty = null, labelTxt = "Click me <i>👆</i>";
    if (kind === "mill" && mill.hub) {
      tx = mill.x + mill.Hw * .25; ty = mill.y - mill.Hw * 1.75; labelTxt = "Click me <i>👆</i>";
    } else if (kind === "sun") {
      const b = e < .5 ? sun : moon;
      tx = clamp(b.x, 60, W - 60); ty = clamp(b.y - 38, 28, hzY - 24);
      labelTxt = e < .5 ? "Drag sun <i>☀️</i>" : "Drag moon <i>🌙</i>";
    } else if (kind === "tree") {
      const ap = APPLES.find(a => a.st === "tree");
      if (ap) { tx = Math.max(54, ap.x + 18); ty = ap.y - 26; labelTxt = "Click apple <i>🍎</i>"; }
    } else if (kind === "boat") {
      const bt = boats.find(b => b.x > 40 && b.x < W - 40);
      if (bt) { tx = clamp(bt.x, 60, W - 60); ty = bt.y - 44 * bt.s; labelTxt = "Drag boat <i>⛵</i>"; }
    } else if (kind === "plane") {
      const pl = planes.find(p => p.x > 60 && p.x < W - 60);
      if (pl) { tx = clamp(pl.x, 60, W - 60); ty = Math.max(28, pl.y - 32); labelTxt = "Drag flight <i>✈️</i>"; }
    } else if (kind === "birds") {
      const bd = birds.find(b => b.x > 40 && b.x < W - 40);
      if (bd) { tx = clamp(bd.x, 60, W - 60); ty = Math.max(28, bd.y - 28); labelTxt = "Hover birds <i>🕊️</i>"; }
    }
    if (tx !== null && ty !== null) {
      if (tipEl2.dataset.kind !== kind) { tipEl2.innerHTML = labelTxt; tipEl2.dataset.kind = kind; }
      tipEl2.style.left = tx + "px";
      tipEl2.style.top = ty + "px";
      tipEl2.classList.add("on");
    } else {
      tipEl2.classList.remove("on");
    }
  }
  c.globalCompositeOperation = "source-atop";
  if (gold > .01) { c.fillStyle = `rgba(255,140,60,${.2 * gold})`; c.fillRect(0, 0, W, H); c.fillStyle = `rgba(70,30,60,${.12 * gold})`; c.fillRect(0, 0, W, H); }
  if (A.over > .01) { c.fillStyle = `rgba(28,38,52,${.3 * A.over})`; c.fillRect(0, 0, W, H); }
  if (A.warm > .01) { c.fillStyle = `rgba(255,170,80,${.08 * A.warm * (1 - e)})`; c.fillRect(0, 0, W, H); }
  if (e > .01) { c.fillStyle = `rgba(5,10,30,${.76 * e})`; c.fillRect(0, 0, W, H); }
  if (flash > .02 && A.lightning > .1) { c.fillStyle = `rgba(200,215,255,${.3 * flash})`; c.fillRect(0, 0, W, H); }
  c.globalCompositeOperation = "source-over";
  if (e > .05) drawNightSky(c, adt, e * (1 - .9 * A.over));
  c.globalCompositeOperation = "source-over";
  drawFoam(c, e);
  if (e > .01) drawWindows(c, e);
  // (the rashi chart round the moon was removed; Astro shows the constellations instead)
  drawZodiac(c, A.kundali * e);
  stepPlanes(adt); drawPlanes(c, e);
  stepBirds(adt);
  const ba = (1 - e) * A.birds;
  for (const b of birds) gull(c, b.x, b.y, 7.5 * U * b.z * (mobile ? .85 : 1), Math.sin(b.ph), ba * .95);
  for (const g of gulls) gull(c, g.cx + Math.cos(g.a) * g.rx, g.cy + Math.sin(g.a) * g.ry, 10.5 * U, Math.sin(g.ph) * .6, ba);
  drawWeather(c, adt, e, wind);
  LAST = { sun, moon, e, A };
  // clock pill + keyboard slider
  const txt = fmt(hourOf()); // the pill shows only the time (the Astro sky's sign names live in its hover tips)
  if (txt !== label) {
    label = txt;
    const whenText = $("#whenText");
    if (whenText) whenText.textContent = txt;
    const thing = S.mode === "day" ? "sun" : "moon";
    const whenHint = $("#whenHint");
    if (whenHint) whenHint.textContent = S.dragged ? "· back to now ↺" : `· drag the ${thing}`;
    if (whenBtn) whenBtn.setAttribute("aria-label", S.dragged ? `Sky set to ${txt}. Return to your local time` : S.live ? `Sky shows your local time, ${txt}. Drag the ${thing} to change it` : `Sky shows ${txt}. Drag the ${thing} to change it`);
    if (range) {
      if (document.activeElement !== range) range.value = Math.round(S.s[S.mode] * 100);
      range.setAttribute("aria-valuetext", txt);
    }
  }
  // keep frames smooth on slower GPUs by drawing the sky at a lower resolution
  if (gl) { perfSum += dt; if (++perfN === 90) { if (perfSum / perfN > .026 && glScale > .5) { glScale -= .15; sizeGL(); } perfN = 0; perfSum = 0; } }
}
requestAnimationFrame(frame);

/* ================= Light leaks: the sun's light, split by a crystal, laid across the page ================= */
const prismEl = $("#prism"), bc = $("#beam"), bctx = bc ? bc.getContext("2d") : null, BK = Math.min(devicePixelRatio || 1, 1.5);
const lc = $("#light"), lctx = lc ? lc.getContext("2d") : null, h1 = $("#hello"), heroEl = $(".hero");
const LK = .25; // drawn small, blurred and grained in CSS
let LG = { top: 0, h: 0, cy: 0, w: 0 };
// streaks placed around the headline: [x from centre (× width), y from headline (× width), length, thickness, phase]
// streaks fan out of the prism: [angle off the light's path, gap from prism, length, thickness, phase] (× width)
const STREAKS = [[-1.25, .1, .3, .05, 0], [-.68, .16, .36, .06, 1.7], [-.1, .27, .28, .05, 3.1], [.5, .14, .38, .06, 4.4], [1.15, .09, .3, .05, 5.6]];
const BLUR_OK = "filter" in CanvasRenderingContext2D.prototype; // canvas blur (Chrome, Firefox, Safari 18+); plain fill elsewhere
const SPEC = ["255,60,40", "255,140,40", "255,214,70", "80,210,110", "50,140,255", "130,80,255"];
function layoutLight() {
  if (!prismEl || !bc || !lc) return;
  const sy = scrollY, hr = (heroEl || scene).getBoundingClientRect(), tr = (h1 || prismEl).getBoundingClientRect();
  const gb = (document.getElementById("work") || scene).getBoundingClientRect();
  LG.top = Math.max(0, hr.top + sy - 420); LG.h = Math.round(Math.max(hr.bottom, gb.bottom) + sy - LG.top + 160); LG.cy = tr.top + sy + tr.height / 2 - LG.top;
  LG.w = document.documentElement.clientWidth;
  lc.style.top = LG.top + "px"; lc.style.height = LG.h + "px";
  lc.width = Math.round(LG.w * LK); lc.height = Math.round(LG.h * LK);
  const pr = prismEl.getBoundingClientRect(), sr = scene.getBoundingClientRect();
  LG.px = pr.left + pr.width / 2; LG.py = pr.top + sy + pr.height / 2; LG.sceneTop = sr.top + sy; LG.bh = Math.round(LG.py + 60);
  bc.style.height = LG.bh + "px"; bc.width = Math.round(LG.w * BK); bc.height = Math.round(LG.bh * BK);
}
new ResizeObserver(layoutLight).observe(document.body);
document.fonts && document.fonts.ready.then(layoutLight);
layoutLight();
function drawBeam(src, amt, e, lean, t) {
  if (!bctx || !prismEl) return;
  const c = bctx, bob = RM ? 0 : Math.sin(t * .8) * 3;
  prismEl.style.transform = `translateY(${bob.toFixed(2)}px) rotate(${(-lean * 14).toFixed(2)}deg)`;
  c.setTransform(BK, 0, 0, BK, 0, 0); c.clearRect(0, 0, LG.w, LG.bh);
  if (amt < .02) return;
  const sx = src.x, sy = LG.sceneTop + src.y, px = LG.px, py = LG.py + bob;
  const ex = px + Math.sign(sx - px || 1) * 9, ey = py - 5, col = e < .5 ? "255,196,92" : "205,220,255";
  c.lineCap = "round";
  for (const [w, a] of [[10, .025], [4, .05], [1.2, .2]]) {
    const g = c.createLinearGradient(sx, sy, ex, ey);
    g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(.3, `rgba(${col},${a * amt})`); g.addColorStop(1, `rgba(${col},${Math.min(1, a * amt * 1.4)})`);
    c.strokeStyle = g; c.lineWidth = w; c.beginPath(); c.moveTo(sx, sy); c.lineTo(ex, ey); c.stroke();
  }
  // the crystal catches the light
  const r = 40 + 6 * Math.sin(t * 1.3), gg = c.createRadialGradient(px, py, 0, px, py, r);
  gg.addColorStop(0, `rgba(255,255,255,${.3 * amt})`); gg.addColorStop(1, "rgba(255,255,255,0)");
  c.fillStyle = gg; c.fillRect(px - r, py - r, r * 2, r * 2);
}
function drawLight(sun, moon, e, A, dt) {
  if (!lctx || !bctx || !prismEl) return;
  const c = lctx, t = LT, Wd = LG.w;
  STR.length = 0;
  c.setTransform(LK, 0, 0, LK, 0, 0); c.clearRect(0, 0, Wd, LG.h);
  const src = e < .5 ? sun : moon;
  const amt = (e < .5 ? sun.vis : moon.vis * .8) * (1 - .75 * A.over);
  // the streaks lean with the light: drag the sun and they swing
  const lean = clamp((src.x / Wd - .5) * .5, -.3, .3);
  h1.style.setProperty("--ab", (lean * 4 * amt).toFixed(2));
  drawBeam(src, amt, e, lean, t);
  if (amt < .02) return;
  // the prism turns the fan (sweep) and flips the colour order on its far face; the shapes are the original soft streaks
  const PY = window.prismYaw || 0, SP = Math.cos(PY) < 0 ? [...SPEC].reverse() : SPEC;
  const scale = Math.max(Wd, 520), alpha = (e < .5 ? 1.15 : 1.1) * .4 * amt * (window.prismLightK == null ? 1 : window.prismLightK), mob = Wd < 640;
  // light continues from the sun/moon through the prism; the streaks fan around that path
  const ox = LG.px, oy = LG.py - LG.top, base = Math.atan2(LG.py - (LG.sceneTop + src.y), LG.px - src.x);
  for (const [off, gap, fl, ft, ph] of (window.prismShape ? STREAKS.flatMap(s => [[s[0] - .12, s[1], s[2] * .9, s[3] * .8, s[4]], [s[0] + .12, s[1] * 1.1, s[2], s[3] * .8, s[4] + 1]]) : STREAKS)) {
    const breathe = .82 + .18 * Math.sin(t * .37 + ph * 2), drift = Math.sin(t * .14 + ph) * .025 * scale;
    // every teardrop carries the whole spectrum along its length; which end is red depends on its side of the fan
    // (red to indigo on one side, indigo to red on the other), so neither end of the spectrum always gets the bright head
    const SQ = off < 0 ? [...SP].reverse() : SP;
    const ang = base + Math.sin(PY) * .6 + off * (mob ? .95 : 1) * 1.22 + Math.sin(t * .06 + ph) * .04;
    if (Math.sin(ang) < 0) continue; // nothing above the prism
    const len = fl * scale * (mob ? 1.5 : 1) * 1.45 * .35, th = ft * scale * (mob ? 1.15 : 1) * breathe * .35, d = gap * scale + len / 2 + drift;
    c.save();
    c.translate(ox + Math.cos(ang) * d, oy + Math.sin(ang) * d); c.rotate(ang);
    const g = c.createLinearGradient(-len / 2, 0, len / 2, 0);
    g.addColorStop(0, `rgba(${SP[0]},0)`);
    SP.forEach((col, i) => g.addColorStop(.12 + i * .15, `rgba(${col},${(alpha * breathe * (i === 5 ? .5 : 1)).toFixed(3)})`));
    g.addColorStop(1, `rgba(${SP[5]},0)`);
    // each streak is a soft teardrop: a round head near the prism, tapering away from it (blurred and grained by the light layer)
    const r = th * 1.2, hx = -len / 2 + r;
    const tear = () => { c.beginPath(); c.arc(hx, 0, r, Math.PI / 2, -Math.PI / 2);
      c.bezierCurveTo(hx + len * .35, -r, len / 2 - len * .1, -r * .2, len / 2, 0); c.bezierCurveTo(len / 2 - len * .1, r * .2, hx + len * .35, r, hx, r); };
    // soft at the head, blurrier the farther it travels: four passes cross-faded along the length, each with more blur
    if (BLUR_OK) for (let k = 0; k < 4; k++) {
      const gk = c.createLinearGradient(-len / 2, 0, len / 2, 0);
      for (let s = 0; s <= 10; s++) { const q = s / 10, w = Math.max(0, 1 - Math.abs(q - (.08 + k * .3)) / .32), col = SQ[Math.max(0, Math.min(5, Math.round((q - .12) / .15)))];
        const edge = Math.min(1, q / .1, (1 - q) / .12); gk.addColorStop(q, `rgba(${col},${(alpha * breathe * w * edge * (1 - .15 * q)).toFixed(3)})`); }
      c.filter = `blur(${[1.5, 4, 8, 13][k]}px)`; c.fillStyle = gk; tear(); c.fill();
    }
    else { const gf = c.createLinearGradient(-len / 2, 0, len / 2, 0); gf.addColorStop(0, `rgba(${SQ[0]},0)`); SQ.forEach((col, i) => gf.addColorStop(.12 + i * .15, `rgba(${col},${(alpha * breathe).toFixed(3)})`)); gf.addColorStop(1, `rgba(${SQ[5]},0)`); c.fillStyle = gf; tear(); c.fill(); }
    c.filter = "none";
    c.restore();
    // no long faint run (it read as lines); its path is still tracked for the card rims and the break
    const L2 = len * 3.2, d2 = gap * scale + L2 / 2 + drift, a2 = alpha * breathe * .48;
    STR.push({ x: ox + Math.cos(ang) * d2, y: oy + Math.sin(ang) * d2 + LG.top, ang, L: L2, th: th * .9 + 40, a: a2 / .42 });
  }
}
/* the light runs on its own clock, so it keeps moving while the sky is scrolled away */
const STR = []; window.prismStreaks = STR;
let LT = 0, lastL = performance.now(), litN = 0;
function lightLoop(now) {
  requestAnimationFrame(lightLoop);
  const dt = Math.min(.05, (now - lastL) / 1000); lastL = now;
  if (document.hidden || !LAST) return;
  LT += dt * (RM ? .15 : 1);
  if (scrollY > LG.top + LG.h) return;
  drawLight(LAST.sun, LAST.moon, LAST.e, LAST.A, dt);
  if (++litN % 3 === 0) lightCards();
}
requestAnimationFrame(lightLoop);

/* ================= Cards: edges lit by the light, a holographic code field on hover ================= */
const CARDS = [...document.querySelectorAll("#grid .card, #shot")].map(el => ({ el, cv: el.querySelector(".holo"), rim: el.querySelector(".rim"), rw: 0, rh: 0, lit: 0, glyph: el.dataset.glyph, hov: 0, hovT: 0, mx: .5, my: .5, rect: null, cells: null, w: 0, h: 0, rest: false }));
function measureCards() { const sy = scrollY; CARDS.forEach(k => { const r = k.el.getBoundingClientRect(); k.rect = { x: r.left, y: r.top + sy, w: r.width, h: r.height }; }); }
const _wEl = document.getElementById("works"); if (_wEl) new ResizeObserver(() => { measureCards(); CARDS.forEach(k => k.cells = null); }).observe(_wEl);
addEventListener("cardsmoved", () => { requestAnimationFrame(() => { measureCards(); layoutLight(); CARDS.forEach(k => k.cells = null); }); });
// points round a rounded rectangle, every ~6px, with the outward normal
function perimeter(w, h, r) {
  const pts = [], step = 6, seg = (x0, y0, x1, y1, nx, ny) => { const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / step)); for (let i = 0; i < n; i++) pts.push([x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, nx, ny]); };
  const arc = (cx, cy, a0) => { const n = Math.max(2, Math.round(r * Math.PI / 2 / step)); for (let i = 0; i < n; i++) { const a = a0 + (Math.PI / 2) * i / n; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, Math.cos(a), Math.sin(a)]); } };
  seg(r, 0, w - r, 0, 0, -1); arc(w - r, r, -Math.PI / 2); seg(w, r, w, h - r, 1, 0); arc(w - r, h - r, 0);
  seg(w - r, h, r, h, 0, 1); arc(r, h - r, Math.PI / 2); seg(0, h - r, 0, r, -1, 0); arc(r, r, Math.PI);
  return pts;
}
// where a streak of light crosses a card, its edge catches it: a thin rim split into the spectrum
// across the streak's width, a brighter core, and a soft spill just inside the card
function lightCards() {
  const night = root.getAttribute("data-sky") === "night", vh = innerHeight, sy = scrollY;
  for (const k of CARDS) {
    if (!k.rect || !k.rect.w || k.el.classList.contains("gone")) continue;
    const { x, y, w, h } = k.rect;
    if (y - sy > vh || y + h - sy < 0) continue;
    const c = k.rim.getContext("2d");
    if (k.rw !== w || k.rh !== h) { k.rw = w; k.rh = h; k.rim.width = Math.round(w * DPR2); k.rim.height = Math.round(h * DPR2); k.pts = perimeter(w, h, parseFloat(getComputedStyle(k.el).borderTopLeftRadius) || 40); }
    c.setTransform(DPR2, 0, 0, DPR2, 0, 0); c.clearRect(0, 0, w, h);
    const P = k.pts, I = new Float32Array(P.length), HU = new Float32Array(P.length); let any = 0;
    for (let i = 0; i < P.length; i++) {
      const px = x + P[i][0], py = y + P[i][1]; let best = 0, hue = 0;
      for (const st of STR) {
        const dx = px - st.x, dy = py - st.y, ca = Math.cos(st.ang), sa = Math.sin(st.ang), u = dx * ca + dy * sa, v = -dx * sa + dy * ca, hl = st.L / 2;
        if (Math.abs(u) > hl || Math.abs(v) > st.th * 1.4) continue;
        const f = (u / hl + 1) / 2, along = (1 - Math.pow(u / hl, 2)) * (f < .08 ? f / .08 : 1), across = Math.exp(-(v * v) / (st.th * st.th * .55));
        const val = st.a * along * across;
        if (val > best) { best = val; hue = clamp((v / (st.th * 1.1) + 1) / 2, 0, 1) * 285; }
      }
      I[i] = clamp(best * 1.6, 0, 1); HU[i] = hue; if (I[i] > .02) any = 1;
    }
    if (!any) continue;
    c.lineCap = "round";
    c.globalCompositeOperation = night ? "lighter" : "source-over";
    if (0) {
    for (let i = 0; i < P.length; i++) { const a = I[i]; if (a < .03) continue;
      const [px, py, nx, ny] = P[i], r = 34 * a + 10, g = c.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, `hsla(${HU[i]},100%,${night ? 60 : 55}%,${(a * (night ? .06 : .045)).toFixed(3)})`); g.addColorStop(1, `hsla(${HU[i]},100%,60%,0)`);
      c.fillStyle = g; c.fillRect(px - r, py - r, r * 2, r * 2); } }
    // the rim itself: colour, then a whiter core where it is brightest
    for (let pass = 0; pass < 1; pass++) {
      for (let i = 0; i < P.length; i++) {
        const j = (i + 1) % P.length, a = (I[i] + I[j]) / 2; if (a < .03) continue;
        const L = night ? 72 : 55, sat = 90, al = a * (night ? .55 : .5);
        c.strokeStyle = `hsla(${HU[i]},${sat}%,${L}%,${al.toFixed(3)})`; c.lineWidth = 1;
        c.beginPath(); c.moveTo(P[i][0] - P[i][2] * .6, P[i][1] - P[i][3] * .6); c.lineTo(P[j][0] - P[j][2] * .6, P[j][1] - P[j][3] * .6); c.stroke();
      }
    }
    c.globalCompositeOperation = "source-over";
  }
}
// the code field: a dithered patch of the card's glyph, densest toward the lower right
const DPR2 = Math.min(devicePixelRatio || 1, 1.5), CELL = 15;
// some cards draw small filled icons (from images/marks) instead of a character: Paytm coins, Footer box, Vudio clapper
const MARK_SRC = { "₹": "images/marks/paytm.png", "▶": "images/marks/footer.png", "v": "images/marks/vudio.png" };
const SPR = {};
function tintMark(img, rgb) { const cv = document.createElement("canvas"); cv.width = cv.height = 128; const x = cv.getContext("2d");
  x.drawImage(img, 0, 0, 128, 128); x.globalCompositeOperation = "source-in"; x.fillStyle = rgb; x.fillRect(0, 0, 128, 128); return cv; }
for (const g in MARK_SRC) { const img = new Image(); img.onload = () => { SPR[g] = { dark: tintMark(img, "rgb(20,22,28)"), light: tintMark(img, "rgb(255,255,255)") }; }; img.src = MARK_SRC[g]; }
function drawMark(c, glyph, x, y, light) {
  const S = SPR[glyph]; if (!S) return false;
  const z = 11; c.drawImage(light ? S.light : S.dark, x - z / 2, y - z / 2, z, z); return true;
}
function buildCells(k) {
  const r = k.el.getBoundingClientRect(); k.w = r.width; k.h = r.height;
  k.cv.width = Math.round(k.w * DPR2); k.cv.height = Math.round(k.h * DPR2);
  const cells = [], cols = Math.ceil(k.w / CELL), rows = Math.ceil(k.h / CELL), fx0 = k.w * .78, fy0 = k.h * .82, R = Math.max(k.w * .62, 340);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const x = i * CELL + CELL / 2, y = j * CELL + CELL / 2, d = Math.hypot((x - fx0) / R, (y - fy0) / (R * .8));
    const m = clamp(1.05 - d, 0, 1), hsh = Math.abs(Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) % 1;
    if (m <= 0 || hsh > m * (k.glyph === "v" ? .45 : 1.15)) continue; // Vudio: fewer marks
    cells.push([x, y, m, hsh]);
  }
  k.cells = cells; k.rest = false;
}
function drawHolo(k, t) {
  if (!k.cells) buildCells(k);
  const c = k.cv.getContext("2d"), night = root.getAttribute("data-sky") === "night", H0 = +getComputedStyle(k.el).getPropertyValue("--h") || 0;
  c.setTransform(DPR2, 0, 0, DPR2, 0, 0); c.clearRect(0, 0, k.w, k.h);
  c.font = `500 12px ${getComputedStyle(root).getPropertyValue("--mono")}`; c.textAlign = "center"; c.textBaseline = "middle";
  const mx = k.mx * k.w, my = k.my * k.h, hv = k.hov, R2 = Math.pow(Math.max(170, k.w * .2), 2);
  const restL = night ? 58 : 46, restA = night ? .2 : .2;
  for (const [x, y, m, hsh] of k.cells) {
    const near = hv > 0 ? Math.exp(-((x - mx) ** 2 + (y - my) ** 2) / R2) * hv : 0;
    if (near < .04) { c.fillStyle = night ? `rgba(255,255,255,${(.15 * m).toFixed(3)})` : `rgba(20,22,28,${(.13 * m).toFixed(3)})`; c.globalAlpha = night ? .15 * m : .13 * m; if (!drawMark(c, k.glyph, x, y, night)) c.fillText(k.el.dataset.glyph, x, y); c.globalAlpha = 1; continue; }
    // hover: the glyph pattern lights up near the pointer; night goes white, day only softly darkens
    const a = clamp(.14 * m + near * (.6 + .4 * m), 0, 1) * (night ? 1 : .5);
    c.fillStyle = night ? `rgba(255,255,255,${a.toFixed(3)})` : `rgba(20,22,28,${a.toFixed(3)})`; c.globalAlpha = a;
    if (!drawMark(c, k.glyph, x, y, night)) c.fillText(k.el.dataset.glyph, x, y);
    c.globalAlpha = 1;
  }
  k.rest = hv <= 0;
}
CARDS.forEach(k => {
  k.el.addEventListener("pointermove", e => { const r = k.el.getBoundingClientRect(); k.mx = (e.clientX - r.left) / r.width; k.my = (e.clientY - r.top) / r.height; k.hovT = 1;
    k.el.style.setProperty("--mx", (k.mx * 100).toFixed(1) + "%"); k.el.style.setProperty("--my", (k.my * 100).toFixed(1) + "%"); });
  k.el.addEventListener("pointerenter", () => { k.hovT = 1; k.el.style.setProperty("--hov", 1); });
  k.el.addEventListener("pointerleave", () => { k.hovT = 0; k.el.style.setProperty("--hov", 0); });
});
new MutationObserver(() => CARDS.forEach(k => k.rest = false)).observe(root, { attributes: true, attributeFilter: ["data-sky"] });
let lastC = performance.now();
function cardLoop(now) {
  requestAnimationFrame(cardLoop);
  const dt = Math.min(.05, (now - lastC) / 1000); lastC = now;
  for (const k of CARDS) {
    if (!k.cv || k.el.classList.contains("gone")) continue;
    k.hov += clamp(k.hovT - k.hov, -dt * 3, dt * 3);
    const r = k.el.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
    if (k.hov > 0 || !k.rest || !k.cells) drawHolo(k, now / 1000);
  }
}
// the ASCII hologram field: only on the case-study bento cards (Best work, Mobile, Desktop), not the motion reels
requestAnimationFrame(cardLoop);
measureCards();



/* ═══════════════════════════════════════════════════════════════════════
   WEATHER × TIME INTEGRATION
   Listens for wx:season custom event fired by weather-theme.js.
   ═══════════════════════════════════════════════════════════════════════ */
(function setupWeatherBridge() {
  const WX_TO_SEASON = {
    clear:  { day: "clear",   night: "starry"  },
    cloudy: { day: "clear",   night: "starry"  },
    rain:   { day: "monsoon", night: "storm"   },
    storm:  { day: "monsoon", night: "storm"   },
    snow:   { day: "winter",  night: "snow"    },
    fog:    { day: "clear",   night: "starry"  },
  };

  let userOverrideUntil = 0;
  if (typeof seasonBtn !== "undefined" && seasonBtn) {
    seasonBtn.addEventListener("click", () => {
      userOverrideUntil = Date.now() + 30 * 60 * 1000;
    });
  }

  const applyWx = (detail) => {
    if (Date.now() < userOverrideUntil) return;
    const { wx, isNight } = detail || {};
    if (!wx) return;

    const mapping = WX_TO_SEASON[wx] || WX_TO_SEASON.clear;
    const targetMode = isNight ? "night" : "day";
    const targetSeason = mapping[targetMode];

    if (S.mode !== targetMode || S.season !== targetSeason) {
      apply(targetMode, targetSeason, false);
      syncLive();
    }
  };

  window.addEventListener("wx:season", (e) => applyWx(e.detail));
  if (window.__latestWx) applyWx(window.__latestWx);
})();

})();
