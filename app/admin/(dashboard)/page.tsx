"use client";

import { useI18n } from "@/lib/i18n/context";
import { getDashboardMetrics } from "@/lib/api/dashboard";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { MetricCard } from "@/components/admin/MetricCard";
import { LoadingState, ErrorState } from "@/components/ui/States";

export default function AdminDashboardPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(getDashboardMetrics, []);

  return (
    <div>
      <AdminPageHeader title={t("admin.dashboard.title")} subtitle={t("admin.dashboard.subtitle")} />

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState onRetry={refetch} />}

      {status === "success" && data && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <MetricCard label={t("admin.dashboard.totalUsers")} value={data.totalUsers} />
          <MetricCard label={t("admin.dashboard.totalClients")} value={data.totalClients} />
          <MetricCard label={t("admin.dashboard.totalRiders")} value={data.totalRiders} />
          <MetricCard label={t("admin.dashboard.pendingVerification")} value={data.ridersPendingVerification} />
          <MetricCard label={t("admin.dashboard.ridersOnline")} value={data.activeRidersOnline} />
          <MetricCard label={t("admin.dashboard.contactEventsToday")} value={data.contactEventsToday} />
          <MetricCard label={t("admin.dashboard.tripRequestsToday")} value={data.tripRequestsToday} />
          <MetricCard label={t("admin.dashboard.tripsInProgress")} value={data.tripRequestsInProgress} />
          <MetricCard label={t("admin.dashboard.completedToday")} value={data.completedTripsToday} />
          <MetricCard
            label={t("admin.dashboard.paymentsToday")}
            value={`${data.paymentsTotalToday.toLocaleString()} RWF`}
          />
        </div>
      )}
    </div>
  );
}
