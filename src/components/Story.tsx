import couple from "@/assets/couple.webp";
import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section id="story" className="wedding-content-section relative overflow-hidden bg-night py-16 sm:py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-9 px-5 sm:px-6 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 shadow-[0_30px_80px_-30px_oklch(0.82_0.14_82/0.4)]">
            <img
              src={couple}
              alt="Abhishek and Aditi"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="text-center md:text-left">
            <p className="font-script text-3xl md:text-4xl text-gold/90">
              With hearts full of love and joy
            </p>
            <h2 className="mt-5 font-display text-3xl leading-tight text-shimmer md:text-5xl">
              We invite you to celebrate the wedding ceremony of
            </h2>
            <div className="my-8 gold-divider mx-auto w-40 md:mx-0" />
            <p className="font-display text-4xl text-gold md:text-5xl">Abhishek</p>
            <p className="mt-3 inline-block rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-sm font-semibold leading-relaxed text-foreground sm:text-base">
              Son of Mrs. Bhawana Sharma &amp; Mr. Brijesh Sharma
            </p>
            <p className="my-5 font-script text-3xl text-gold/80">With</p>
            <p className="font-display text-4xl text-gold md:text-5xl">Aditi</p>
            <p className="mt-3 inline-block rounded-full border border-gold/25 bg-gold/5 px-4 py-2 text-sm font-semibold leading-relaxed text-foreground sm:text-base">
              Daughter of Mrs. Kiran Sharma &amp; Mr. Gopal Lal Sharma
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
