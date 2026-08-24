import { mockDashboardMetrics } from "@/lib/mock/data";
import type { DashboardMetrics } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /admin/dashboard/metrics
export function getDashboardMetrics(): Promise<DashboardMetrics> {
  return simulate(mockDashboardMetrics);
}
