"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { listTripRequests } from "@/lib/api/tripRequests";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Select } from "@/components/ui/Form";
import type { TripRequest, TripRequestStatus } from "@/lib/types";

const STATUSES: TripRequestStatus[] = [
  "requested",
  "accepted",
  "rejected",
  "in_progress",
  "completed",
  "cancelled",
];

export default function TripRequestsPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<TripRequestStatus | "">("");
  const { status, data, refetch } = useFetch(
    () => listTripRequests(filter ? { status: filter } : undefined),
    [filter]
  );

  const columns: Column<TripRequest>[] = [
    { key: "id", header: t("fields.id"), render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: "clientName", header: t("fields.client"), render: (r) => r.clientName },
    { key: "riderName", header: t("fields.rider"), render: (r) => r.riderName },
    { key: "origin", header: t("fields.origin"), render: (r) => r.originLabel },
    { key: "destination", header: t("fields.destination"), render: (r) => r.destinationLabel },
    { key: "status", header: t("common.status"), render: (r) => <StatusBadge status={r.status} /> },
    { key: "updatedAt", header: t("common.updatedAt"), render: (r) => new Date(r.updatedAt).toLocaleString() },
  ];

  return (
    <div>
      <AdminPageHeader title={t("admin.tripRequests.title")} subtitle={t("admin.tripRequests.subtitle")} />

      <div className="mb-4 max-w-xs">
        <Select value={filter} onChange={(e) => setFilter(e.target.value as TripRequestStatus | "")}>
          <option value="">{t("common.filterAll")}</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {t(`status.${s}`)}
            </option>
          ))}
        </Select>
      </div>

      <DataTable columns={columns} rows={data ?? []} rowKey={(r) => r.id} status={status} onRetry={refetch} />
    </div>
  );
}
