"use client";

import { useEffect, useRef, useState } from "react";

// Toggles true/false every time the element crosses the viewport threshold,
// so callers can replay their animation on every pass, not just the first.
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- observe once on mount; options is not expected to change identity across renders
  }, []);

  return { ref, inView };
}
