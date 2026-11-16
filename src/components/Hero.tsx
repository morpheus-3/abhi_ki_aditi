import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import palace from "@/assets/hero-palace.jpg";
import couple from "@/assets/couple.webp";
import { Embers, Stars, Fog } from "./Particles";
import { Countdown } from "./Countdown";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const coupleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[680px] h-[100svh] w-full overflow-hidden bg-night md:h-[110vh]"
    >
      <motion.div style={reduceMotion ? undefined : { y: bgY }} className="absolute inset-0 scale-110">
        <img
          src={palace}
          alt="Royal palace courtyard at night"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />
      </motion.div>

      <Stars count={reduceMotion ? 0 : 48} />
      <Embers count={reduceMotion ? 0 : 24} />
      <Fog />

      <motion.div
        style={reduceMotion ? undefined : { y: coupleY }}
        initial={reduceMotion ? false : { opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.08, duration: 0.65, ease: "easeOut" }}
        className="pointer-events-none absolute bottom-0 right-[-2%] z-10 h-[44%] opacity-50 sm:right-0 sm:h-[74%] sm:opacity-85 md:h-[95%] md:opacity-100"
      >
        <div className="relative h-full">
          <div className="absolute inset-0 -inset-x-20 bottom-0 top-1/3 bg-ember opacity-50 blur-2xl" />
          <img
            src={couple}
            alt="The royal couple Abhishek and Aditi"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1024"
            height="1536"
            className="relative h-full w-auto drop-shadow-[0_30px_60px_oklch(0.05_0.05_270/0.8)]"
          />
        </div>
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { y: textY, opacity: fade }}
        className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-20 before:pointer-events-none before:absolute before:inset-y-16 before:left-0 before:right-1/4 before:-z-10 before:bg-gradient-to-r before:from-background/85 before:via-background/55 before:to-transparent before:blur-2xl sm:px-6 md:px-12 md:pb-12"
      >
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="font-script text-2xl md:text-3xl text-gold/80"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55 }}
          className="mt-4 font-display text-[clamp(3.25rem,13vw,5rem)] leading-[0.9] tracking-tight text-shimmer sm:text-7xl md:text-[11rem] md:leading-[0.85]"
        >
          Abhishek
        </motion.h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="my-2 flex items-center gap-4 md:gap-6"
        >
          <span className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="font-script text-5xl md:text-7xl text-gold">&</span>
          <span className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.55 }}
          className="font-display text-[clamp(3.25rem,13vw,5rem)] leading-[0.9] tracking-tight text-shimmer sm:text-7xl md:text-[11rem] md:leading-[0.85]"
        >
          Aditi
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="ornament mt-8 text-xs md:text-sm uppercase tracking-[0.5em] text-gold/70"
        >
          12 December 2026
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mt-10 md:mt-14"
        >
          <Countdown />
        </motion.div>
        <a
          href="/abhishek-aditi-wedding-invitation.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-gold/55 bg-gold px-6 text-xs font-semibold uppercase tracking-[0.18em] text-midnight shadow-[0_10px_36px_-14px_oklch(0.82_0.14_82/0.75)] transition hover:-translate-y-0.5 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View Invitation
        </a>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.45 }}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center"
      >
        <div className="font-script text-gold/70 text-sm">scroll the story</div>
        <div className="mx-auto mt-2 h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}
