import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "./Reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";

const preWeddingPhotos = Object.entries(
  import.meta.glob<string>("../assets/pre-wedding/*.webp", {
    eager: true,
    import: "default",
  }),
)
  .filter(([path]) => !path.endsWith("DSC05869.webp"))
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], index) => ({
    src,
    rot: [-4, 3, -2, 5, -5, 2, -3, 4, -1, 3, -4, 2, -2][index % 13],
    label: "Pre-wedding " + (index + 1),
    alt: "Abhishek and Aditi pre-wedding photograph " + (index + 1),
  }));

const photos = preWeddingPhotos;

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight")
        setActiveIndex((index) => (index === null ? null : (index + 1) % photos.length));
      if (event.key === "ArrowLeft")
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + photos.length) % photos.length,
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section id="gallery" className="wedding-content-section relative overflow-hidden bg-night py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="font-script text-3xl md:text-4xl text-gold/90">Our Journey</p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl text-shimmer">Frozen moments</h2>
        </Reveal>

        <div role="region"
          aria-label="Scrollable wedding photo gallery"
          tabIndex={0}
          className="gallery-strip mt-10 flex snap-x snap-mandatory touch-pan-x gap-6 overflow-x-auto overscroll-x-contain px-3 pb-8 pt-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 sm:mt-14 sm:gap-8">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.025} className="shrink-0 snap-center">
              <motion.button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`View ${p.label} photograph`}
                initial={{ rotate: p.rot }}
                whileHover={{ rotate: 0, scale: 1.06, y: -8 }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className="group relative block w-[min(76vw,17rem)] cursor-zoom-in rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                <div className="rounded-md bg-[oklch(0.96_0.02_85)] p-3 pb-14 shadow-[0_30px_60px_-20px_oklch(0_0_0/0.7)] ring-1 ring-gold/40">
                  <div className="relative overflow-hidden">
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  </div>
                  <p className="mt-3 text-center font-script text-2xl text-[oklch(0.3_0.05_270)]">
                    {p.label}
                  </p>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
        <p className="mt-1 text-center text-[10px] uppercase tracking-[0.18em] text-gold/55 sm:hidden">
          Swipe to explore
        </p>
      </div>
      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent className="max-w-5xl border-gold/35 bg-night/95 p-3 shadow-[0_30px_100px_-20px_oklch(0_0_0/0.9)] sm:p-6">
          {activePhoto && (
            <>
              <DialogTitle className="sr-only">{activePhoto.label} photograph</DialogTitle>
              <DialogDescription className="sr-only">
                Use the arrow keys or navigation buttons to browse the wedding gallery.
              </DialogDescription>
              <div className="flex items-center justify-center gap-2 sm:gap-5">
                <button
                  type="button"
                  aria-label="Previous photograph"
                  onClick={() => setActiveIndex((activeIndex! - 1 + photos.length) % photos.length)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/35 text-gold transition hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <figure className="min-w-0 text-center">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    className="mx-auto max-h-[76svh] max-w-full rounded-sm object-contain"
                  />
                  <figcaption className="mt-3 font-script text-2xl text-gold">
                    {activePhoto.label}
                  </figcaption>
                </figure>
                <button
                  type="button"
                  aria-label="Next photograph"
                  onClick={() => setActiveIndex((activeIndex! + 1) % photos.length)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/35 text-gold transition hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
