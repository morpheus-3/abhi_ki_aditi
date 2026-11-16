import { useMemo } from "react";

export function Embers({ count = 40 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 14,
        dur: 10 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 200,
        hue: 30 + Math.random() * 25,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="animate-ember absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: `oklch(0.82 0.18 ${p.hue})`,
            boxShadow: `0 0 ${p.size * 4}px oklch(0.85 0.18 ${p.hue} / 0.9)`,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as never]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export function Petals({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        delay: Math.random() * 18,
        dur: 14 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 240,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute"
          style={{
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.6,
            background:
              "radial-gradient(ellipse at center, oklch(0.72 0.22 25) 0%, oklch(0.45 0.20 22) 100%)",
            borderRadius: "60% 30% 60% 30%",
            filter: "drop-shadow(0 0 6px oklch(0.5 0.2 22 / 0.5))",
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as never]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export function Stars({ count = 90 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0">
      {items.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 3}px white`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Fog() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 30% 100%, oklch(0.92 0.05 85 / 0.18), transparent 60%), radial-gradient(ellipse at 70% 100%, oklch(0.85 0.08 60 / 0.15), transparent 60%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
