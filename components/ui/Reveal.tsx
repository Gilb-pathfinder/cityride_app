"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
  as?: "div" | "li";
}

// Fades and lifts content into place every time it enters the viewport, and
// resets when it leaves, so the animation replays on every scroll pass.
export function Reveal({
  children,
  delay = 0,
  duration = 1000,
  className = "",
  y = 24,
  as = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : `translateY(${y}px)`,
    transitionDelay: inView ? `${delay}ms` : "0ms",
    transitionDuration: `${duration}ms`,
  };

  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={`transition-all ease-out ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
