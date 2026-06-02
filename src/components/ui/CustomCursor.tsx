"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let rafId: number;

    // Use CSS transforms only — no React state, no re-renders
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    };

    const animate = () => {
      // Ring lerps toward mouse
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const setHover = (val: boolean) => {
      isHovering = val;
      ring.style.width = val ? "48px" : "40px";
      ring.style.height = val ? "48px" : "40px";
      ring.style.opacity = val ? "0.6" : "0.4";
      ring.style.background = val ? "rgba(139,92,246,0.1)" : "transparent";
    };

    const onMouseEnter = () => setHover(true);
    const onMouseLeave = () => setHover(false);
    const onDocLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onDocEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = isHovering ? "0.6" : "0.4";
    };

    // Delegate: listen on document, check target tag — avoids querySelectorAll on every re-render
    const onMove = (e: MouseEvent) => {
      onMouseMove(e);
      const target = e.target as Element;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
      if (interactive && !isHovering) setHover(true);
      else if (!interactive && isHovering) setHover(false);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[var(--accent)] z-[99999] pointer-events-none will-change-transform"
        style={{ transition: "opacity 0.3s" }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="custom-cursor fixed top-0 left-0 w-10 h-10 rounded-full border border-[var(--accent)] z-[99998] pointer-events-none will-change-transform"
        style={{
          opacity: 0.4,
          transition: "width 0.25s, height 0.25s, opacity 0.25s, background 0.25s",
        }}
      />
    </>
  );
}
