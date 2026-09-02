import { mockDashboardMetrics, mockRidersOnlineTrend, mockWeeklyTripVolume } from "@/lib/mock/data";
import type { DashboardMetrics } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /admin/dashboard/metrics
export function getDashboardMetrics(): Promise<DashboardMetrics> {
  return simulate(mockDashboardMetrics);
}

// Presentational-only chart series (not part of the approved DashboardMetrics
// schema). Backed by mock data until the backend exposes real time-series.
export function getWeeklyTripVolume() {
  return simulate(mockWeeklyTripVolume);
}

export function getRidersOnlineTrend() {
  return simulate(mockRidersOnlineTrend);
}
