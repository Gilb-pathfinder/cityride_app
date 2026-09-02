interface BarChartProps {
  labels: string[];
  values: number[];
  activeIndex?: number;
}

export function BarChart({ labels, values, activeIndex }: BarChartProps) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-40 items-end gap-3">
      {values.map((value, i) => {
        const active = i === activeIndex;
        return (
          <div key={labels[i]} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end">
              <div
                className={`w-full rounded-md transition-all duration-500 ${active ? "bg-lime" : "bg-navy/15"}`}
                style={{ height: `${Math.max((value / max) * 100, 6)}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${active ? "text-navy" : "text-text-secondary"}`}>
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
