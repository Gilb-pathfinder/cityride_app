"use client";

import { useI18n } from "@/lib/i18n/context";
import { Badge } from "./Badge";

const toneMap: Record<string, "neutral" | "success" | "warning" | "error" | "info"> = {
  pending: "warning",
  verified: "success",
  rejected: "error",
  requested: "info",
  accepted: "info",
  in_progress: "warning",
  completed: "success",
  cancelled: "error",
  initiated: "info",
  connected: "success",
  missed: "warning",
  failed: "error",
  sent: "info",
  delivered: "success",
  success: "success",
  refunded: "neutral",
};

export function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  const tone = toneMap[status] ?? "neutral";
  return <Badge tone={tone}>{t(`status.${status}`)}</Badge>;
}
