import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import seal from "../assets/seal.webp";
import { Stars, Embers, Fog } from "./Particles";

const INTRO_SEEN_KEY = "abhi-ki-aditi-intro-seen";

export function Entry({ onEnter }: { onEnter: () => void }) {
  const reduceMotion = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);
  const finishTimer = useRef<number | undefined>(undefined);

  const markSeen = () => {
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // The intro still auto-dismisses when storage is unavailable.
    }
  };

  const enter = () => {
    if (started.current) return;
    started.current = true;
    markSeen();

    if (reduceMotion) {
      completed.current = true;
      onEnter();
      return;
    }

    setOpening(true);
    finishTimer.current = window.setTimeout(() => {
      if (completed.current) return;
      completed.current = true;
      onEnter();
    }, 620);
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      // Continue with the short welcome if session storage is unavailable.
    }
    if (seen || reduceMotion) {
      markSeen();
      onEnter();
      return;
    }

    const autoEnterTimer = window.setTimeout(enter, 820);
    return () => {
      window.clearTimeout(autoEnterTimer);
      if (finishTimer.current !== undefined) window.clearTimeout(finishTimer.current);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      <motion.div
        key="entry"
        className="fixed inset-0 z-[100] overflow-hidden bg-night"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.24, ease: "easeOut" } }}
      >
        <Stars count={70} />
        <Embers count={28} />
        <Fog />

        <div
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at bottom, oklch(0.18 0.05 275) 0%, transparent 70%)",
          }}
        />
        <svg
          viewBox="0 0 1200 300"
          className="absolute inset-x-0 bottom-0 w-full opacity-30"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 300 L0 200 L80 200 L100 160 L120 200 L200 200 L220 140 L240 100 L260 140 L280 200 L400 200 L420 120 L460 60 L500 120 L520 200 L700 200 L720 140 L740 100 L760 140 L780 200 L900 200 L920 160 L940 200 L1000 200 L1020 180 L1100 180 L1200 200 L1200 300 Z"
            fill="oklch(0.10 0.04 275)"
          />
        </svg>

        <AnimatePresence>
          {opening && (
            <>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-100%" }}
                transition={{ duration: 0.62, ease: [0.7, 0, 0.3, 1] }}
                className="absolute inset-y-0 left-0 z-50 w-1/2 origin-left"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.08 0.03 270) 0%, oklch(0.14 0.05 275) 80%, oklch(0.05 0.02 270) 100%)",
                  boxShadow: "20px 0 80px oklch(0.82 0.14 82 / 0.4)",
                }}
              />
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.62, ease: [0.7, 0, 0.3, 1] }}
                className="absolute inset-y-0 right-0 z-50 w-1/2"
                style={{
                  background:
                    "linear-gradient(-90deg, oklch(0.08 0.03 270) 0%, oklch(0.14 0.05 275) 80%, oklch(0.05 0.02 270) 100%)",
                  boxShadow: "-20px 0 80px oklch(0.82 0.14 82 / 0.4)",
                }}
              />
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="font-script text-2xl md:text-3xl text-gold/90 tracking-wide"
          >
            A Royal Invitation
          </motion.p>

          <motion.button
            onClick={enter}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={opening ? { scale: 2.2, opacity: 0, rotate: 12 } : { opacity: 1, scale: 1 }}
            transition={{ duration: opening ? 0.5 : 0.55, ease: "easeOut" }}
            className="relative my-8 cursor-pointer"
            aria-label="Enter the experience"
          >
            <motion.div
              animate={opening || reduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 -m-12 rounded-full bg-ember animate-breath" />
              <img
                src={seal}
                alt="Royal peacock wax seal"
                width="480"
                height="480"
                fetchPriority="high"
                decoding="async"
                className="relative h-56 w-56 md:h-72 md:w-72 drop-shadow-[0_0_60px_oklch(0.82_0.18_60/0.6)]"
              />
              <div className="absolute inset-0 -m-6 rounded-full border border-gold/30 animate-spin-slow" />
              <div
                className="absolute inset-0 -m-12 rounded-full border border-gold/15 animate-spin-slow"
                style={{ animationDirection: "reverse", animationDuration: "30s" }}
              />
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h1 className="font-display text-5xl md:text-7xl tracking-wide text-shimmer">
              Abhi Ki Aditi
            </h1>
            <p className="ornament mt-6 text-xs md:text-sm uppercase tracking-[0.5em] text-gold/80">
              Tap the seal to enter
            </p>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={enter}
          className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-gold/55 bg-night/70 px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-gold shadow-lg backdrop-blur-sm transition hover:bg-gold/15 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          Skip intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
