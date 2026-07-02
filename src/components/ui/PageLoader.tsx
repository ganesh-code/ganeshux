"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Design process steps shown during load ──────────────────────────────────
const STEPS = [
  { word: "Empathize.",  sub: "Understanding the user's world"      },
  { word: "Define.",     sub: "Framing the right problem"           },
  { word: "Ideate.",     sub: "Exploring possibilities"             },
  { word: "Prototype.",  sub: "Bringing ideas to life"              },
  { word: "Refine.",     sub: "Crafting the details"                },
];

// How long each step is visible (ms)
const STEP_DURATION = 900;

type Phase = "loading" | "exit" | "done";

export default function PageLoader() {
  const [phase, setPhase]       = useState<Phase>("loading");
  const [stepIdx, setStepIdx]   = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef             = useRef(0);
  const rafRef                  = useRef<number | null>(null);

  // ── Smoothly animate progress to a target value ────────────────────────
  const animateTo = (target: number, duration: number): Promise<void> =>
    new Promise((resolve) => {
      const start     = progressRef.current;
      const startTime = performance.now();
      const tick = (now: number) => {
        const t     = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        const val   = start + (target - start) * eased;
        progressRef.current = val;
        setProgress(val);
        if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
        else        { resolve(); }
      };
      rafRef.current = requestAnimationFrame(tick);
    });

  // ── Cycle through design steps ─────────────────────────────────────────
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Main progress sequence ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Race through the first 80% while steps cycle
      await animateTo(80, STEP_DURATION * STEPS.length * 0.9);
      if (cancelled) return;

      // Wait for background video to be ready (or max 3.5 s)
      await new Promise<void>((res) => {
        const video = document.querySelector<HTMLVideoElement>(
          'video[src="/videos/gifVideo.mp4"]'
        );
        if (!video || video.readyState >= 3) { res(); return; }
        const onReady = () => { video.removeEventListener("canplay", onReady); res(); };
        video.addEventListener("canplay", onReady);
        setTimeout(res, 3500);
      });
      if (cancelled) return;

      // Complete to 100%
      await animateTo(100, 400);
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, 250));
      if (cancelled) return;

      setPhase("exit");
      await new Promise((r) => setTimeout(r, 1200));
      if (!cancelled) setPhase("done");
    };

    run();
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  const currentStep = STEPS[stepIdx];

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Loading portfolio"
          aria-live="polite"
        >
          {/* ── Curtain: slides up revealing the page ─── */}
          <motion.div
            className="loader-curtain"
            animate={phase === "exit" ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* ── Centre content ─────────────────────────── */}
          <motion.div
            className="loader-body"
            animate={phase === "exit" ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeIn" }}
          >
            {/* Step label — tiny uppercase tag */}
            <motion.p
              className="loader-step-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Design Process
            </motion.p>

            {/* The cycling word — big, bold, animated */}
            <div className="loader-word-wrap" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentStep.word}
                  className="loader-word"
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                  exit={{    opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {currentStep.word}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Sub-text — fades with the word */}
            <div className="loader-sub-wrap">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep.sub}
                  className="loader-sub"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{    opacity: 0, y: -6 }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                >
                  {currentStep.sub}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Progress line — bottom of screen ──────── */}
          <div className="loader-progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
