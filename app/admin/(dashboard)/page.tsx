"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { getDashboardMetrics, getRidersOnlineTrend, getWeeklyTripVolume } from "@/lib/api/dashboard";
import { listRiders } from "@/lib/api/riders";
import { listTripRequests } from "@/lib/api/tripRequests";
import { useFetch } from "@/lib/hooks/useFetch";
import { LoadingState, ErrorState } from "@/components/ui/States";
import { StatusBadge } from "@/components/ui/StatusBadge";
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

export default function AdminDashboardPage() {
  const { t } = useI18n();
  const metrics = useFetch(getDashboardMetrics, []);
  const volume = useFetch(getWeeklyTripVolume, []);
  const trend = useFetch(getRidersOnlineTrend, []);
  const pendingRiders = useFetch(() => listRiders({ verificationStatus: "pending" }), []);
  const recentTrips = useFetch(() => listTripRequests(), []);

  function refreshAll() {
    metrics.refetch();
    volume.refetch();
    trend.refetch();
    pendingRiders.refetch();
    recentTrips.refetch();
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
              <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-3 py-1.5 text-xs font-semibold text-lime">
                {metrics.data.completedTripsToday} {t("admin.dashboard.completedToday").toLowerCase()}
              </div>
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

          {/* Middle column */}
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <h3 className="mb-6 text-sm font-bold text-navy">{t("admin.dashboard.volumeTitle")}</h3>
            {volume.status === "success" && volume.data && (
              <BarChart labels={volume.data.labels} values={volume.data.values} activeIndex={volume.data.values.length - 1} />
            )}
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

            <div className="flex-1 rounded-3xl border border-border bg-surface p-6 shadow-sm">
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
          </div>
        </div>
      )}
    </div>
  );
}
