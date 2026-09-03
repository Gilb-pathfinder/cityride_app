import {
  mockContactEvents,
  mockDashboardMetrics,
  mockNotificationLogs,
  mockPayments,
  mockRidersOnlineTrend,
  mockWeeklyTripVolume,
} from "@/lib/mock/data";
import type { DashboardMetrics, PaymentMethod } from "@/lib/types";
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

// Same treatment for Contact Events, kept as a distinct series so the
// dashboard never conflates Contact Events with Trip Requests.
export function getWeeklyContactEventVolume() {
  const values = [5, 8, 6, 10, 13, 15, mockContactEvents.length + 4];
  return simulate({ labels: mockWeeklyTripVolume.labels, values });
}

export function getRidersOnlineTrend() {
  return simulate(mockRidersOnlineTrend);
}

export interface NotificationBreakdown {
  sent: number;
  delivered: number;
  pending: number;
  failed: number;
  deliveryRate: number;
}

// Derived directly from the Notification Log entity — real counts, not fabricated.
export function getNotificationBreakdown(): Promise<NotificationBreakdown> {
  const sent = mockNotificationLogs.filter((n) => n.status === "sent").length;
  const delivered = mockNotificationLogs.filter((n) => n.status === "delivered").length;
  const pending = mockNotificationLogs.filter((n) => n.status === "pending").length;
  const failed = mockNotificationLogs.filter((n) => n.status === "failed").length;
  const total = mockNotificationLogs.length || 1;
  return simulate({
    sent,
    delivered,
    pending,
    failed,
    deliveryRate: Math.round((delivered / total) * 100),
  });
}

export interface PaymentMethodShare {
  method: PaymentMethod;
  count: number;
  percent: number;
}

// Derived directly from the Payments entity.
export function getPaymentMethodBreakdown(): Promise<PaymentMethodShare[]> {
  const total = mockPayments.length || 1;
  const methods: PaymentMethod[] = ["mobile_money", "cash", "card"];
  const rows = methods.map((method) => {
    const count = mockPayments.filter((p) => p.paymentMethod === method).length;
    return { method, count, percent: Math.round((count / total) * 100) };
  });
  return simulate(rows);
}
