import corridor from "@/assets/corridor.jpg";
import { Petals, Embers, Fog } from "./Particles";
import { Reveal } from "./Reveal";

export function ThankYou() {
  return (
    <section className="relative min-h-[76svh] overflow-hidden vignette md:min-h-[680px]">
      <div className="absolute inset-0 scale-110">
        <img
          src={corridor}
          alt="Royal palace corridor at night with floating candles"
          loading="lazy"
          className="h-full w-full object-cover animate-breath"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>
      <Embers count={30} />
      <Petals count={15} />
      <Fog />

      <div className="relative z-10 mx-auto flex min-h-[76svh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center md:min-h-[680px]">
        <Reveal>
          <p className="font-script text-4xl md:text-5xl text-gold/90">With love</p>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="mt-6 font-display text-7xl md:text-9xl text-shimmer">Thank You</h2>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="ornament mt-7 max-w-xl text-base md:text-lg text-foreground/75">
            For being part of our beautiful beginning
          </p>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mt-10 font-display text-2xl text-gold">Abhi Ki Aditi</div>
          <p className="mt-3 text-xs uppercase tracking-[0.5em] text-foreground/50">
            12 December 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
