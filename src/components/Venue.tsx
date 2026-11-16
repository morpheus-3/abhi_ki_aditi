import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";
import venue from "@/assets/venue.jpg";
import { Reveal } from "./Reveal";
import { Fog } from "./Particles";

const venues = [
  {
    event: "Mehndi",
    place: "Home",
    url: "https://www.google.com/maps/place/ss+home+care/@26.8935201,75.7222387,21z/data=!4m6!3m5!1s0x396db500622868e7:0xd3e383741af612ef!8m2!3d26.8931031!4d75.7222034!16s%2Fg%2F11xtns7bst?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    event: "Haldi",
    place: "Shagun Banquet",
    url: "https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    event: "Engagement",
    place: "Shagun Banquet",
    url: "https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    event: "Sangeet",
    place: "Shagun Banquet",
    url: "https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    event: "Lagan",
    place: "Geetanjali Banquet",
    url: "https://www.google.com/maps/place/Geetanjali+Banquet+%7C+A+Multipurpose+Event+Venue/@26.8858086,75.7293834,18.63z/data=!4m6!3m5!1s0x396db5534eea08b5:0xc861918af3e93d10!8m2!3d26.8851119!4d75.7301887!16s%2Fg%2F11h5qnqyv_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    event: "Baraat",
    place: "Ranbanka Marriage Garden, Vaishali Nagar",
    url: "https://www.google.com/maps/place/Ranbanka+Marriage+Garden/@26.9220277,75.7327245,17z/data=!3m1!4b1!4m6!3m5!1s0x396db35da02a132f:0xc5c982156c4dcd0b!8m2!3d26.9220277!4d75.7352994!16s%2Fg%2F1hjh7hcwl?entry=ttu",
  },
];

export function Venue() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="venue" ref={ref} className="relative min-h-[78svh] overflow-hidden vignette md:min-h-[700px]">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src={venue}
          alt="A palace illuminated for the wedding celebrations"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/85" />
      </motion.div>
      <Fog />
      <div className="relative z-10 mx-auto grid min-h-[78svh] max-w-7xl items-center gap-7 px-5 py-16 sm:px-6 sm:py-20 md:min-h-[700px] md:grid-cols-2 md:gap-12 md:py-24">
        <Reveal>
          <div className="max-w-xl rounded-3xl border border-gold/20 bg-background/65 p-5 shadow-[0_20px_70px_-35px_oklch(0_0_0/0.9)] backdrop-blur-sm sm:p-7">
            <p className="font-script text-3xl text-gold/90">The Venues</p>
            <h2 className="mt-3 font-display text-5xl leading-[0.95] text-shimmer sm:text-6xl md:text-8xl">
              A family celebration
            </h2>
            <div className="my-5 gold-divider w-40" />
            <p className="max-w-md text-sm leading-relaxed text-foreground/85 sm:text-base md:text-lg">
              Join Abhishek and Aditi as their families celebrate together at these special venues.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="rounded-3xl border border-gold/35 bg-[oklch(0.09_0.03_270/0.88)] p-5 shadow-[0_24px_80px_-28px_oklch(0_0_0/0.95)] backdrop-blur-xl sm:p-6 md:p-8">
            <ul className="space-y-2">
              {venues.map(({ event, place, url }) => (
                <li key={event} className="border-b border-gold/15 py-3 last:border-0 last:pb-0">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-gold/75 sm:text-xs sm:tracking-[0.25em]">
                    {event}
                  </span>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex min-h-11 items-center gap-2 font-display text-lg text-foreground underline decoration-gold/45 underline-offset-4 transition hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:text-xl md:text-2xl"
                    >
                      {place}
                      <ExternalLink aria-hidden="true" size={14} className="shrink-0" />
                    </a>
                  ) : (
                    <span className="mt-1 block font-display text-lg text-foreground sm:text-xl md:text-2xl">
                      {place}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
