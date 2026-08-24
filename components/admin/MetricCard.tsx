import type { ReactNode } from "react";

export function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{label}</p>
        {icon && <span className="text-navy/40">{icon}</span>}
      </div>
      <p className="mt-3 text-2xl font-bold text-navy">{value}</p>
    </div>
  );
}
