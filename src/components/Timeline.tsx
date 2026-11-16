import { motion } from "framer-motion";
import {
  Drum,
  Flame,
  Flower2,
  Heart,
  Music2,
  Sparkles,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";

const events: {
  name: string;
  date: string;
  time?: string;
  venue: string;
  url?: string;
  target: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Mehndi",
    date: "9 December 2026",
    venue: "Home",
    url: "https://www.google.com/maps/place/ss+home+care/@26.8935201,75.7222387,21z/data=!4m6!3m5!1s0x396db500622868e7:0xd3e383741af612ef!8m2!3d26.8931031!4d75.7222034!16s%2Fg%2F11xtns7bst?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    target: "mehndi-card",
    icon: Flower2,
  },
  {
    name: "Haldi",
    date: "10 December 2026",
    venue: "Shagun Banquet",
    url: "https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    target: "haldi",
    icon: Sparkles,
  },
  {
    name: "Engagement",
    date: "10 December 2026",
    venue: "Shagun Banquet",
    url: "https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    target: "engagement",
    icon: Heart,
  },
  {
    name: "Sangeet",
    date: "10 December 2026",
    venue: "Shagun Banquet",
    url: "https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    target: "sangeet",
    icon: Music2,
  },
  {
    name: "Lagan",
    date: "11 December 2026",
    venue: "Geetanjali Banquet",
    url: "https://www.google.com/maps/place/Geetanjali+Banquet+%7C+A+Multipurpose+Event+Venue/@26.8858086,75.7293834,18.63z/data=!4m6!3m5!1s0x396db5534eea08b5:0xc861918af3e93d10!8m2!3d26.8851119!4d75.7301887!16s%2Fg%2F11h5qnqyv_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
    target: "lagan",
    icon: Flame,
  },
  {
    name: "Baraat",
    date: "12 December 2026",
    time: "6:30 PM",
    venue: "Ranbanka Marriage Garden, Vaishali Nagar",
    url: "https://www.google.com/maps/place/Ranbanka+Marriage+Garden/@26.9220277,75.7327245,17z/data=!3m1!4b1!4m6!3m5!1s0x396db35da02a132f:0xc5c982156c4dcd0b!8m2!3d26.9220277!4d75.7352994!16s%2Fg%2F1hjh7hcwl?entry=ttu",
    target: "baraat",
    icon: Drum,
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="wedding-content-section relative overflow-hidden bg-night py-16 sm:py-20 md:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="font-script text-3xl md:text-4xl text-gold/90">The Ceremonies</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl text-shimmer">
            Wedding Celebrations
          </h2>
          <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <Reveal key={e.name} delay={i * 0.06}>
                <motion.div
                  id={e.target === "mehndi-card" ? "mehndi-card" : undefined}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-[oklch(0.20_0.05_275/0.96)] via-[oklch(0.15_0.04_275/0.98)] to-[oklch(0.10_0.03_270/0.99)] p-5 text-center shadow-[0_18px_45px_-24px_oklch(0_0_0/0.9)] transition-colors active:border-gold/60 sm:p-6"
                >
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent text-gold sm:h-14 sm:w-14">
                    <Icon
                      aria-hidden="true"
                      className="text-[var(--gold)]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-gold sm:mt-5 sm:text-3xl">
                    <a
                      href={`#${e.target}`}
                      className="rounded-sm transition-colors hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {e.name}
                    </a>
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-foreground/90 sm:tracking-[0.18em]">
                    {e.date}{e.time && " | " + e.time}
                  </p>
                  {e.url ? (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center justify-center gap-1.5 px-2 text-base font-medium text-gold-soft underline decoration-gold/50 underline-offset-4 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                    >
                      {e.venue}
                      <ExternalLink aria-hidden="true" size={13} />
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-foreground/85">{e.venue}</p>
                  )}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/0 via-gold/5 to-accent/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
