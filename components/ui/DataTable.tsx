"use client";

import type { ReactNode } from "react";
import { EmptyState, ErrorState, LoadingState } from "./States";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  status: "loading" | "error" | "success";
  onRetry?: () => void;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  status,
  onRetry,
  onRowClick,
}: DataTableProps<T>) {
  if (status === "loading") {
    return (
      <div className="rounded-xl border border-border bg-surface">
        <LoadingState />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-border bg-surface">
        <ErrorState onRetry={onRetry} />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-border last:border-0 ${
                onRowClick ? "cursor-pointer hover:bg-surface-muted" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3.5 align-middle text-text-primary ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
