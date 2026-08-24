"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { listRiders } from "@/lib/api/riders";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import type { Rider, VerificationStatus } from "@/lib/types";

export default function RidersPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<VerificationStatus | "">("");
  const { status, data, refetch } = useFetch(
    () => listRiders(filter ? { verificationStatus: filter } : undefined),
    [filter]
  );

  const columns: Column<Rider>[] = [
    { key: "fullName", header: t("fields.fullName"), render: (r) => <span className="font-medium">{r.fullName}</span> },
    { key: "phone", header: t("fields.phone"), render: (r) => r.phone },
    { key: "vehicleType", header: t("fields.vehicleType"), render: (r) => r.vehicleType },
    { key: "plateNumber", header: t("fields.plateNumber"), render: (r) => r.plateNumber },
    {
      key: "online",
      header: t("fields.online"),
      render: (r) => <Badge tone={r.online ? "success" : "neutral"}>{t(r.online ? "fields.online" : "fields.offline")}</Badge>,
    },
    { key: "rating", header: t("fields.rating"), render: (r) => (r.rating ? `${r.rating} ★` : "—") },
    { key: "verificationStatus", header: t("fields.verificationStatus"), render: (r) => <StatusBadge status={r.verificationStatus} /> },
  ];

  return (
    <div>
      <AdminPageHeader
        title={t("admin.riders.title")}
        subtitle={t("admin.riders.subtitle")}
        action={
          <Button href="/admin/riders/verification" variant="secondary" size="sm">
            {t("admin.sidebar.riderVerification")}
          </Button>
        }
      />

      <div className="mb-4 max-w-xs">
        <Select value={filter} onChange={(e) => setFilter(e.target.value as VerificationStatus | "")}>
          <option value="">{t("common.filterAll")}</option>
          <option value="pending">{t("status.pending")}</option>
          <option value="verified">{t("status.verified")}</option>
          <option value="rejected">{t("status.rejected")}</option>
        </Select>
      </div>

      <DataTable columns={columns} rows={data ?? []} rowKey={(r) => r.id} status={status} onRetry={refetch} />

      <p className="mt-3 text-xs text-text-secondary">
        <Link href="/admin/riders/verification" className="underline hover:text-navy">
          {t("admin.riders.verificationTitle")}
        </Link>
      </p>
    </div>
  );
}
