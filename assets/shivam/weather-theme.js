/**
 * weather-theme.js
 * ─────────────────────────────────────────────────────────────────────────
 * Dynamic Portfolio Theme Engine:
 * - Syncs whole portfolio to time-of-day:
 *     • Morning (6:30 - 11:30)    → Sky Blue fresh theme
 *     • Midday (11:30 - 15:30)    → Pure White crisp theme
 *     • Afternoon (15:30 - 18:30) → Sunset Warm Orange/Amber theme
 *     • Night (18:30 - 6:30)      → Midnight Black / Dark theme
 * - Syncs to real outdoor weather (Rain/Monsoon, Storm, Snow)
 * - Directly listens to manual Day/Night toggle (#dn) via event delegation
 * ─────────────────────────────────────────────────────────────────────────
 */
(() => {
  'use strict';

  const root = document.documentElement;
  let currentWx = 'clear';
  let manualModeOverride = null; // 'day' | 'night' | null
  try {
    localStorage.removeItem('theme_preference');
    localStorage.removeItem('portfolio_theme');
  } catch (e) {}
  let userOverrideUntil = 0;

  /* ═══════════════════════════════════════════════════════════════════
     TIME SLOTS
  ═══════════════════════════════════════════════════════════════════ */
  function getTimeSlot(h) {
    if (h < 6.0 || h >= 18.0) return 'night';
    if (h >= 6.0 && h < 11.5) return 'morning';    // Sky Blue
    if (h >= 11.5 && h < 15.5) return 'midday';    // Clean White
    if (h >= 15.5 && h < 18.0) return 'afternoon'; // Warm Sunset Orange
    return 'night';                                // Midnight Black
  }

  /* ═══════════════════════════════════════════════════════════════════
     THEME PALETTES
  ═══════════════════════════════════════════════════════════════════ */
  const THEMES = {
    // 1. NIGHT (Deep Black theme)
    'night': {
      bg: '#0A0A0A',
      surface: '#141414',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#F5F5F5',
      textDim: 'rgba(255, 255, 255, 0.72)',
      accent: '#6c99f4',
      accentFg: '#FFFFFF',
      navBg: 'rgba(14, 18, 28, 0.88)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(108, 153, 244, 0.25)'
    },
    // 2. DAY (Pure White theme)
    'morning': {
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      border: 'rgba(0, 0, 0, 0.08)',
      text: '#0A0A0A',
      textDim: 'rgba(10, 10, 10, 0.62)',
      accent: '#2563eb',
      accentFg: '#FFFFFF',
      navBg: 'rgba(255, 255, 255, 0.90)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(37, 99, 235, 0.2)'
    },
    'midday': {
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      border: 'rgba(0, 0, 0, 0.08)',
      text: '#0A0A0A',
      textDim: 'rgba(10, 10, 10, 0.62)',
      accent: '#2563eb',
      accentFg: '#FFFFFF',
      navBg: 'rgba(255, 255, 255, 0.90)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(37, 99, 235, 0.2)'
    },
    'afternoon': {
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      border: 'rgba(0, 0, 0, 0.08)',
      text: '#0A0A0A',
      textDim: 'rgba(10, 10, 10, 0.62)',
      accent: '#2563eb',
      accentFg: '#FFFFFF',
      navBg: 'rgba(255, 255, 255, 0.90)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(37, 99, 235, 0.2)'
    },
    'dawn': {
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      border: 'rgba(0, 0, 0, 0.08)',
      text: '#0A0A0A',
      textDim: 'rgba(10, 10, 10, 0.62)',
      accent: '#2563eb',
      accentFg: '#FFFFFF',
      navBg: 'rgba(255, 255, 255, 0.90)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(37, 99, 235, 0.2)'
    },
    'dusk': {
      bg: '#0A0A0A',
      surface: '#141414',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#F5F5F5',
      textDim: 'rgba(255, 255, 255, 0.72)',
      accent: '#6c99f4',
      accentFg: '#FFFFFF',
      navBg: 'rgba(14, 18, 28, 0.88)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(108, 153, 244, 0.25)'
    },
    'rain': {
      bg: '#FFFFFF',
      surface: '#FFFFFF',
      border: 'rgba(0, 0, 0, 0.08)',
      text: '#0A0A0A',
      textDim: 'rgba(10, 10, 10, 0.62)',
      accent: '#2563eb',
      accentFg: '#FFFFFF',
      navBg: 'rgba(255, 255, 255, 0.90)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(37, 99, 235, 0.2)'
    },
    'storm': {
      bg: '#0A0A0A',
      surface: '#141414',
      border: 'rgba(255, 255, 255, 0.1)',
      text: '#F5F5F5',
      textDim: 'rgba(255, 255, 255, 0.72)',
      accent: '#6c99f4',
      accentFg: '#FFFFFF',
      navBg: 'rgba(14, 18, 28, 0.88)',
      gridMajor: 'transparent',
      gridMinor: 'transparent',
      glow: 'rgba(108, 153, 244, 0.25)'
    }
  };

  /* ═══════════════════════════════════════════════════════════════════
     APPLY THEME TO DOM
  ═══════════════════════════════════════════════════════════════════ */
  function applyTheme(themeKey, isNight) {
    const t = THEMES[themeKey] || (isNight ? THEMES['night'] : THEMES['midday']);

    if (isNight) {
      root.classList.add('dark');
      root.setAttribute('data-sky', 'night');
      root.setAttribute('data-theme-bg', 'dark');
      root.setAttribute('data-time-slot', 'night');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-sky', 'day');
      root.removeAttribute('data-theme-bg');
      root.setAttribute('data-time-slot', themeKey);
    }

    // Set core CSS variables
    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--current-bg', t.bg);
    root.style.setProperty('--port-bg', t.bg);
    root.style.setProperty('--surface', t.surface);
    root.style.setProperty('--port-surface', t.surface);
    root.style.setProperty('--border', t.border);
    root.style.setProperty('--port-border', t.border);
    root.style.setProperty('--text-primary', t.text);
    root.style.setProperty('--port-text', t.text);
    root.style.setProperty('--text-secondary', t.textDim);
    root.style.setProperty('--port-text-dim', t.textDim);
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--port-accent', t.accent);
    root.style.setProperty('--port-accent-fg', t.accentFg);
    root.style.setProperty('--port-nav-bg', t.navBg);
    root.style.setProperty('--grid-major', t.gridMajor);
    root.style.setProperty('--grid', t.gridMinor);
    root.style.setProperty('--port-glow', t.glow);

    // Apply to body directly
    if (document.body) {
      document.body.style.backgroundColor = t.bg;
      document.body.style.backgroundImage = '';
      document.body.style.color = t.text;
    }
    root.style.backgroundImage = '';

    // Sync #dn toggle button UI state if it exists
    const dnBtn = document.getElementById('dn');
    if (dnBtn) {
      dnBtn.setAttribute('aria-checked', String(!isNight));
      dnBtn.setAttribute('aria-label', isNight ? 'Night. Switch to day' : 'Day. Switch to night');
    }

    console.log(`[weather-theme] APPLIED: theme=${themeKey} isNight=${isNight} bg=${t.bg}`);
  }

  /* ═══════════════════════════════════════════════════════════════════
     COMPUTE ACTIVE THEME
  ═══════════════════════════════════════════════════════════════════ */
  function computeAndApply(overrideMode, overrideSeason) {
    if (overrideMode) {
      manualModeOverride = overrideMode;
      userOverrideUntil = Date.now() + 24 * 60 * 60 * 1000;
    }

    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    let isNight = (h < 6.0 || h >= 18.0);

    if (manualModeOverride) {
      isNight = (manualModeOverride === 'night');
    }

    try {
      localStorage.setItem('theme_preference', isNight ? 'dark' : 'light');
      localStorage.setItem('portfolio_theme', isNight ? 'dark' : 'light');
    } catch (e) {}

    if (isNight) {
      if (overrideSeason === 'storm') {
        applyTheme('storm', true);
      } else {
        applyTheme('night', true);
      }
      return;
    }

    // Daytime
    if (currentWx === 'rain' || overrideSeason === 'monsoon') {
      applyTheme('rain', false);
    } else {
      const slot = getTimeSlot(h);
      applyTheme(slot, false);
    }
  }

  // Expose bridge so scene.js (and toggle buttons) can call it directly
  window.setPortfolioTheme = function(mode, season) {
    computeAndApply(mode, season);
  };

  /* ═══════════════════════════════════════════════════════════════════
     EVENT DELEGATION: DIRECT #dn CLICK LISTENER
  ═══════════════════════════════════════════════════════════════════ */
  document.addEventListener('click', (e) => {
    const dnBtn = e.target.closest('#dn') || (e.target.classList && e.target.classList.contains('dn') ? e.target : null);
    if (dnBtn) {
      if (window.__lastDnHandled && (Date.now() - window.__lastDnHandled < 300)) {
        return;
      }
      window.__lastDnHandled = Date.now();
      const isCurrentlyNight = root.classList.contains('dark') || root.getAttribute('data-sky') === 'night';
      const nextMode = isCurrentlyNight ? 'day' : 'night';
      computeAndApply(nextMode);
    }
  });

  /* ═══════════════════════════════════════════════════════════════════
     WMO WEATHER CODE PARSER
  ═══════════════════════════════════════════════════════════════════ */
  function wxFromCode(wmo) {
    if (wmo === null || wmo === undefined) return { wx: 'clear', season: null };
    if (wmo <= 2)                                              return { wx: 'clear',  season: null };
    if (wmo === 3)                                             return { wx: 'cloudy', season: null };
    if (wmo <= 49)                                             return { wx: 'fog',    season: null };
    if ((wmo >= 51 && wmo <= 57))                              return { wx: 'clear',  season: null };
    if ((wmo >= 61 && wmo <= 67) || (wmo >= 80 && wmo <= 82))  return { wx: 'rain',   season: 'monsoon' };
    if ((wmo >= 71 && wmo <= 77) || wmo >= 85)                 return { wx: 'snow',   season: 'snow' };
    if (wmo >= 95)                                             return { wx: 'storm',  season: 'storm' };
    return { wx: 'clear', season: null };
  }

  /* ═══════════════════════════════════════════════════════════════════
     PHASE 1: INSTANT RUN
  ═══════════════════════════════════════════════════════════════════ */
  computeAndApply();

  /* ═══════════════════════════════════════════════════════════════════
     PHASE 2: ASYNC REAL WEATHER LOOKUP
  ═══════════════════════════════════════════════════════════════════ */
  async function fetchWeather() {
    try {
      let lat = 17.3850, lon = 78.4867; // Hyderabad fallback
      try {
        const geo = await fetch('https://ipapi.co/json/').then(r => r.ok ? r.json() : null);
        if (geo && geo.latitude && geo.longitude) {
          lat = geo.latitude; lon = geo.longitude;
        } else {
          const geo2 = await fetch('https://ipwho.is/').then(r => r.ok ? r.json() : null);
          if (geo2 && geo2.latitude && geo2.longitude) { lat = geo2.latitude; lon = geo2.longitude; }
        }
      } catch (e) {}

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weathercode,temperature_2m&timezone=auto&forecast_days=1`;
      const data = await fetch(url).then(r => r.json());
      const wmo = data?.current?.weathercode ?? null;
      const { wx, season } = wxFromCode(wmo);
      currentWx = wx;

      if (Date.now() > userOverrideUntil) {
        computeAndApply(null, season);
      }

      const isNight = root.classList.contains('dark') || root.getAttribute('data-sky') === 'night';
      const detail = { wx, isNight, season, wmo };
      window.__latestWx = detail;
      window.dispatchEvent(new CustomEvent('wx:season', { detail }));
      console.log(`[weather-theme] WEATHER SYNC: lat=${lat} lon=${lon} wmo=${wmo} wx=${wx} season=${season}`);
    } catch (e) {
      console.warn('[weather-theme] weather lookup fallback', e);
    }
  }

  setTimeout(fetchWeather, 400);
  setInterval(fetchWeather, 15 * 60 * 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) computeAndApply(); });

  window.__refreshWeatherTheme = fetchWeather;
})();
