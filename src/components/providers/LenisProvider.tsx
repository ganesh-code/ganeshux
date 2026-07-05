"use client";

/**
 * LenisProvider — disabled.
 *
 * Lenis smooth-scroll was removed because it fundamentally conflicts with
 * CSS `position: sticky` used in the Hero→Work slide-over transition.
 *
 * Lenis maintains a *virtual* scroll position and applies CSS transforms,
 * while `position: sticky` reads the *real* window.scrollY. During the
 * Hero↔Work boundary these diverge, producing the "rubbery / laggy"
 * feel on scroll up and down.
 *
 * Modern browsers (Chrome 114+, Safari 16+, Firefox 120+) provide
 * GPU-composited native scroll that is indistinguishable from Lenis
 * for standard page layouts. The sticky-based architecture benefits
 * from native scroll, not virtual scroll.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
