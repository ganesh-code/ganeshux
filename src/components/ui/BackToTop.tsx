"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 20, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{  scale: 0.93 }}
          className="fixed bottom-6 right-6 z-[9999]
                     w-11 h-11 rounded-full
                     flex items-center justify-center
                     shadow-lg backdrop-blur-md
                     border border-white/20
                     transition-colors duration-200 group"
          style={{
            background: "rgba(10,10,10,0.75)",
          }}
        >
          <ArrowUp
            size={16}
            strokeWidth={2.2}
            className="text-white transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
