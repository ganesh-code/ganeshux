"use client";

import { useRef, useEffect, useState } from "react";

/**
 * HeroSticky — pins the Hero section for 200vh of scroll budget.
 *
 * Math: HeroSticky(200vh) + Work(marginTop: -100vh)
 *   → Work document start = 200vh - 100vh = 100vh
 *   → At scroll=0: Work sits at exactly the bottom of viewport (not visible)
 *   → On first scroll: Work begins rising into view ✓
 *   → At scroll=100vh: Work fully covers Hero, Hero unpins
 *
 * On mobile: sticky disabled for better scroll performance.
 */
export default function HeroSticky({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile: no sticky effect, just render hero normally
  if (isMobile) {
    return <div style={{ position: "relative", zIndex: 1 }}>{children}</div>;
  }

  return (
    <div ref={containerRef} style={{ height: "200vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
