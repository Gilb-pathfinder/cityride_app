import type { ReactNode } from "react";

// Shared hover treatment for card-like elements on the public site: a subtle
// lift, a deeper shadow, and the border warming toward lime. No gradients.
export const cardHoverClass =
  "transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:shadow-xl hover:shadow-black/30";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-surface ${cardHoverClass} ${className}`}>
      {children}
    </div>
  );
}
