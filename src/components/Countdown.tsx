import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-12T00:00:00+05:30").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: [string, number][] = [
    ["Days", t.d],
    ["Hours", t.h],
    ["Minutes", t.m],
    ["Seconds", t.s],
  ];

  return (
    <div className="grid w-full max-w-[360px] grid-cols-4 gap-1.5 sm:w-auto sm:max-w-none sm:flex sm:flex-wrap sm:justify-center sm:gap-3 md:gap-5">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="glass-royal relative min-w-0 rounded-xl px-0.5 py-2.5 sm:min-w-[78px] sm:rounded-2xl sm:px-4 sm:py-4 md:min-w-[110px] md:px-7 md:py-5"
        >
          <div className="font-display text-xl leading-none text-shimmer tabular-nums sm:text-3xl md:text-5xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 whitespace-nowrap text-[7px] uppercase tracking-[0.04em] text-gold-soft sm:text-[10px] sm:tracking-[0.25em] md:text-xs md:tracking-[0.35em]">
            {label}
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/20" />
        </div>
      ))}
    </div>
  );
}
