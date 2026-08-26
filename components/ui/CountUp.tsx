"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks/useInView";

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

// Counts up from 0 to `end` every time it scrolls into view, and resets so
// it replays the next time it comes back into view.
export function CountUp({ end, prefix = "", suffix = "", duration = 2400 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset so the count replays next time it scrolls into view
      setValue(0);
      return;
    }

    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(end * easeOutExpo(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
