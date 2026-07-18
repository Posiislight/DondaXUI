import { useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated stat number, ported from the mockups' count-up script:
 * eases 0 → value (cubic ease-out) the first time it scrolls into view.
 */
export default function CountUp({
  to,
  from = 0,
  prefix = '',
  suffix = '',
  duration = 1500,
  className,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf: number | null = null;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.round(from + eased * (to - from)) + suffix;
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, from, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix + to + suffix}
    </span>
  );
}
