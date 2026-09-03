"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import {
  getDashboardMetrics,
  getNotificationBreakdown,
  getPaymentMethodBreakdown,
  getRidersOnlineTrend,
  getWeeklyContactEventVolume,
  getWeeklyTripVolume,
} from "@/lib/api/dashboard";
import { listRiders } from "@/lib/api/riders";
import { listTripRequests } from "@/lib/api/tripRequests";
import { listPayments } from "@/lib/api/payments";
import { getConfig } from "@/lib/api/config";
import { useFetch } from "@/lib/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/ui/States";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { BarChart } from "@/components/admin/BarChart";
import { Sparkline } from "@/components/admin/Sparkline";
import { IconArrowUpRight, IconCard } from "@/components/admin/icons";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function KpiTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">{label}</p>
      <p className="mt-1.5 text-xl font-bold text-navy">{value}</p>
    </div>
  );
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  mobile_money: "Mobile Money",
  cash: "Cash",
  card: "Card",
};

export default function AdminDashboardPage() {
  const { t } = useI18n();
  const [chartMode, setChartMode] = useState<"trips" | "contacts">("trips");

  const metrics = useFetch(getDashboardMetrics, []);
  const tripVolume = useFetch(getWeeklyTripVolume, []);
  const contactVolume = useFetch(getWeeklyContactEventVolume, []);
  const trend = useFetch(getRidersOnlineTrend, []);
  const pendingRiders = useFetch(() => listRiders({ verificationStatus: "pending" }), []);
  const recentTrips = useFetch(() => listTripRequests(), []);
  const recentPayments = useFetch(() => listPayments(), []);
  const paymentMethods = useFetch(getPaymentMethodBreakdown, []);
  const notifications = useFetch(getNotificationBreakdown, []);
  const config = useFetch(getConfig, []);

  const volume = chartMode === "trips" ? tripVolume : contactVolume;

  function refreshAll() {
    metrics.refetch();
    tripVolume.refetch();
    contactVolume.refetch();
    trend.refetch();
    pendingRiders.refetch();
    recentTrips.refetch();
    recentPayments.refetch();
    paymentMethods.refetch();
    notifications.refetch();
    config.refetch();
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
            {t("admin.dashboard.welcomeBack")}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{t("admin.dashboard.subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={refreshAll}
          className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-surface-muted"
        >
          {t("admin.dashboard.refresh")}
        </button>
      </div>

      {metrics.status === "loading" && <LoadingState />}
      {metrics.status === "error" && <ErrorState onRetry={metrics.refetch} />}

      {metrics.status === "success" && metrics.data && (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <KpiTile label={t("admin.dashboard.totalUsers")} value={metrics.data.totalUsers} />
            <KpiTile label={t("admin.dashboard.totalRiders")} value={metrics.data.totalRiders} />
            <KpiTile label={t("admin.dashboard.totalClients")} value={metrics.data.totalClients} />
            <KpiTile label={t("admin.dashboard.ridersOnline")} value={metrics.data.activeRidersOnline} />
            <KpiTile label={t("admin.dashboard.contactEventsToday")} value={metrics.data.contactEventsToday} />
            <KpiTile
              label={t("admin.dashboard.notificationDelivery")}
              value={notifications.data ? `${notifications.data.deliveryRate}%` : "—"}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Left column */}
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl bg-navy p-6 text-white shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/50">
                  <span>{t("admin.dashboard.paymentsToday")}</span>
                  <span className="text-lime">
                    <IconCard />
                  </span>
                </div>
                <p className="mt-6 text-3xl font-bold">
                  {metrics.data.paymentsTotalToday.toLocaleString()}{" "}
                  <span className="text-base font-medium text-white/50">RWF</span>
                </p>
                <p className="mt-2 text-xs text-white/50">{t("admin.dashboard.paymentsCardNote")}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-3 py-1.5 text-xs font-semibold text-lime">
                  {metrics.data.completedTripsToday} {t("admin.dashboard.completedToday").toLowerCase()}
                </div>

                {paymentMethods.status === "success" && paymentMethods.data && (
                  <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4">
                    {paymentMethods.data.map((row) => (
                      <div key={row.method} className="flex items-center gap-3">
                        <span className="w-24 flex-none text-xs text-white/60">
                          {PAYMENT_METHOD_LABELS[row.method]}
                        </span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-lime" style={{ width: `${row.percent}%` }} />
                        </div>
                        <span className="w-9 flex-none text-right text-xs font-semibold text-white/70">
                          {row.percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 rounded-3xl border border-border bg-surface p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-navy">{t("admin.dashboard.recentPayments")}</h3>
                  <Link
                    href="/admin/payments"
                    className="flex items-center gap-1 text-xs font-semibold text-navy transition-colors hover:text-lime"
                  >
                    {t("common.viewAll")}
                    <IconArrowUpRight />
                  </Link>
                </div>
                {recentPayments.status === "success" && recentPayments.data && (
                  <div className="flex flex-col divide-y divide-border">
                    {recentPayments.data.slice(0, 4).map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-navy">{p.clientName}</p>
                          <p className="truncate text-xs text-text-secondary">
                            {p.amount.toLocaleString()} {p.currency}
                          </p>
                        </div>
                        <StatusBadge status={p.status} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Middle column */}
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-navy">{t("admin.dashboard.volumeTitle")}</h3>
                  <div className="flex items-center gap-1 rounded-full border border-border p-1">
                    <button
                      type="button"
                      onClick={() => setChartMode("trips")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        chartMode === "trips" ? "bg-lime text-navy" : "text-text-secondary"
                      }`}
                    >
                      {t("admin.sidebar.tripRequests")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartMode("contacts")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        chartMode === "contacts" ? "bg-lime text-navy" : "text-text-secondary"
                      }`}
                    >
                      {t("admin.sidebar.contactEvents")}
                    </button>
                  </div>
                </div>
                {volume.status === "success" && volume.data && (
                  <BarChart labels={volume.data.labels} values={volume.data.values} activeIndex={volume.data.values.length - 1} />
                )}
              </div>

              <div className="flex-1 rounded-3xl border border-border bg-surface p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-navy">{t("admin.dashboard.recentTrips")}</h3>
                  <Link
                    href="/admin/trip-requests"
                    className="flex items-center gap-1 text-xs font-semibold text-navy transition-colors hover:text-lime"
                  >
                    {t("common.viewAll")}
                    <IconArrowUpRight />
                  </Link>
                </div>
                {recentTrips.status === "success" && recentTrips.data && (
                  <div className="flex flex-col divide-y divide-border">
                    {recentTrips.data.slice(0, 4).map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between gap-3 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-navy">{trip.clientName}</p>
                          <p className="truncate text-xs text-text-secondary">
                            {trip.originLabel} → {trip.destinationLabel}
                          </p>
                        </div>
                        <StatusBadge status={trip.status} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {t("admin.dashboard.ridersOnline")}
                </p>
                <p className="mt-2 text-3xl font-bold text-navy">{metrics.data.activeRidersOnline}</p>
                <div className="mt-4">
                  {trend.status === "success" && trend.data && <Sparkline values={trend.data} />}
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href="/admin/riders"
                    className="flex-1 rounded-full bg-lime px-3 py-2 text-center text-xs font-semibold text-navy transition-colors hover:bg-lime-dark"
                  >
                    {t("admin.riders.title")}
                  </Link>
                  <Link
                    href="/admin/users"
                    className="flex-1 rounded-full border border-border px-3 py-2 text-center text-xs font-semibold text-navy transition-colors hover:bg-surface-muted"
                  >
                    {t("admin.users.title")}
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  {t("admin.dashboard.pendingVerification")}
                </p>
                <p className="mt-2 text-3xl font-bold text-navy">{metrics.data.ridersPendingVerification}</p>

                {pendingRiders.status === "success" && pendingRiders.data && pendingRiders.data.length > 0 && (
                  <div className="mt-4 flex items-center">
                    {pendingRiders.data.slice(0, 4).map((rider, i) => (
                      <span
                        key={rider.id}
                        style={{ zIndex: 4 - i }}
                        className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-navy text-xs font-bold text-lime first:ml-0"
                      >
                        {initials(rider.fullName)}
                      </span>
                    ))}
                    {pendingRiders.data.length > 4 && (
                      <span className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-lime text-xs font-bold text-navy">
                        +{pendingRiders.data.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <Link
                  href="/admin/riders/verification"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy transition-colors hover:text-lime"
                >
                  {t("admin.dashboard.reviewNow")}
                  <IconArrowUpRight />
                </Link>
              </div>

              <div className="flex-1 rounded-3xl border border-border bg-surface p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-navy">{t("admin.dashboard.systemStatus")}</h3>
                  {config.status === "success" && config.data && (
                    <Badge tone={config.data.maintenanceMode ? "warning" : "success"}>
                      {config.data.maintenanceMode
                        ? t("admin.dashboard.underMaintenance")
                        : t("admin.dashboard.operational")}
                    </Badge>
                  )}
                </div>
                {config.status === "success" && config.data && (
                  <dl className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-text-secondary">{t("admin.config.minAppVersion")}</dt>
                      <dd className="font-medium text-navy">{config.data.minAppVersion}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-text-secondary">{t("admin.config.defaultSearchRadius")}</dt>
                      <dd className="font-medium text-navy">{config.data.defaultSearchRadiusKm} km</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
