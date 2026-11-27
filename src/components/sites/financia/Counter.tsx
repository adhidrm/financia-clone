"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the final number on the server so a no-JS or static snapshot never
 * shows 0. The client resets to 0 and animates only when the block scrolls
 * into view.
 */
export function Counter({
  value,
  suffix,
  duration = 2000,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reduced motion: keep the server-rendered final value, never animate
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round(value * p));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    // only jump back to 0 when the block is not on screen yet
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) setN(0);

    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} data-counter={value} data-counter-suffix={suffix}>
      {n}
      {suffix}
    </span>
  );
}
