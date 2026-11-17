import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SceneSection({
  id,
  eyebrow,
  title,
  subtitle,
  image,
  alt,
  children,
  posterMode = false,
  imagePosition = "center",
  contentPosition = "center",
  overlay = "from-background/70 via-background/30 to-background",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: ReactNode;
  image: string;
  alt: string;
  children?: ReactNode;
  posterMode?: boolean;
  imagePosition?: string;
  contentPosition?: "center" | "upper" | "event" | "event-bottom-left";
  overlay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.08]);
  const isEventBanner = contentPosition === "event" || contentPosition === "event-bottom-left";
  const isBottomLeftEvent = contentPosition === "event-bottom-left";
  return (
    <section
      id={id}
      ref={ref}
      aria-label={posterMode ? "Engagement ceremony invitation" : undefined}
      className={
        "relative overflow-hidden vignette " +
        (posterMode ? "bg-night py-8 sm:py-12 md:py-16" : "min-h-[78svh] md:min-h-[84svh]")
      }
    >
      {posterMode ? (
        <Reveal className="relative z-10 mx-auto w-[min(88vw,36rem)]">
          <figure className="rounded-[1.6rem] border border-gold/55 bg-background/70 p-1.5 shadow-[0_28px_90px_-28px_oklch(0.82_0.14_82/0.5)] sm:p-2">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="block h-auto w-full rounded-[1.2rem]"
            />
          </figure>
        </Reveal>
      ) : (
        <>
          <motion.div style={{ y, scale }} className="absolute inset-0">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              style={{ objectPosition: imagePosition }}
              className="h-full w-full object-cover"
            />
            <div className={"absolute inset-0 bg-gradient-to-b " + overlay} />
            {isEventBanner && (
              <div
                className={
                  "absolute inset-y-0 left-0 w-full bg-gradient-to-r to-transparent sm:w-[78%] " +
                  (isBottomLeftEvent
                    ? "from-background/85 via-background/45"
                    : "from-background/75 via-background/35")
                }
              />
            )}
          </motion.div>
          {isEventBanner ? (
            <div className={
              "relative z-10 mx-auto flex min-h-[78svh] max-w-6xl px-5 sm:px-6 md:min-h-[84svh] md:px-12 " +
              (isBottomLeftEvent
                ? "items-end justify-start pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-24 sm:pb-12 md:pb-16"
                : "items-start justify-start pb-10 pt-20 sm:pt-24 md:pt-28")
            }>
              <Reveal className={isBottomLeftEvent ? "w-fit max-w-[min(88vw,25rem)]" : "w-fit max-w-[min(90vw,28rem)]"}>
                {eyebrow && (
                  <p className="font-script text-xl leading-tight text-gold/95 sm:text-2xl md:text-3xl">
                    {eyebrow}
                  </p>
                )}
                <h2 className="mt-1 font-display text-4xl leading-[0.95] text-shimmer sm:text-5xl md:text-7xl">
                  {title}
                </h2>
                <div className="my-3 h-px w-16 bg-gradient-to-r from-gold via-gold/70 to-transparent sm:my-4 sm:w-20" />
                {subtitle && (
                  <div className="w-fit max-w-full rounded-xl border border-gold/30 bg-background/75 p-3 text-left shadow-[0_14px_42px_-18px_oklch(0_0_0/0.9)] backdrop-blur-md sm:p-4">
                    {subtitle}
                  </div>
                )}
              </Reveal>
            </div>
          ) : (
            <div
              className={
                "relative z-10 mx-auto flex min-h-[90svh] max-w-6xl flex-col px-5 py-24 text-center sm:px-6 sm:py-32 " +
                (contentPosition === "upper"
                  ? "items-center justify-start pt-28 sm:pt-[16vh]"
                  : "items-center justify-center")
              }
            >
              {eyebrow && (
                <Reveal>
                  <p className="font-script text-2xl text-gold/90 md:text-4xl">{eyebrow}</p>
                </Reveal>
              )}
              <Reveal delay={0.15}>
                <h2 className="mt-4 font-display text-5xl leading-[0.95] text-shimmer sm:text-6xl md:text-8xl lg:text-9xl">
                  {title}
                </h2>
              </Reveal>
              {subtitle && (
                <Reveal delay={0.3}>
                  <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-foreground/90 sm:text-base md:text-lg">
                    {subtitle}
                  </p>
                </Reveal>
              )}
              {children && (
                <Reveal delay={0.45}>
                  <div className="mt-10">{children}</div>
                </Reveal>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
