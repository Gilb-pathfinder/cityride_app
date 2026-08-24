import type { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "error" | "info" | "lime";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-muted text-text-secondary border-border",
  success: "bg-[#eafcf1] text-success border-[#bdefd0]",
  warning: "bg-[#fef6e7] text-warning border-[#fbe4b4]",
  error: "bg-[#fdedee] text-error border-[#f8c9cc]",
  info: "bg-[#eef2ff] text-[#4338ca] border-[#dbe1fb]",
  lime: "bg-lime text-navy border-lime-dark",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
