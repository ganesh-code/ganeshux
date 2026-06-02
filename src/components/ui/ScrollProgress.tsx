"use client";

import { useEffect, useRef } from "react";

// Zero Framer Motion — pure DOM scroll listener on compositor thread
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      // scaleX via transform — GPU composited, no layout
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[99997] origin-left will-change-transform"
      style={{
        background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
        transform: "scaleX(0)",
      }}
    />
  );
}
