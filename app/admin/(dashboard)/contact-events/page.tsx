"use client";

import { useI18n } from "@/lib/i18n/context";
import { listContactEvents } from "@/lib/api/contactEvents";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import type { ContactEvent } from "@/lib/types";

export default function ContactEventsPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(() => listContactEvents(), []);

  const columns: Column<ContactEvent>[] = [
    { key: "clientName", header: t("fields.client"), render: (c) => <span className="font-medium">{c.clientName}</span> },
    { key: "riderName", header: t("fields.rider"), render: (c) => c.riderName },
    { key: "distance", header: t("fields.distance"), render: (c) => `${c.distanceKm} km` },
    {
      key: "contactMethod",
      header: t("fields.contactMethod"),
      render: (c) => <Badge tone="neutral">{c.contactMethod === "call" ? "Call" : "In-app"}</Badge>,
    },
    { key: "status", header: t("common.status"), render: (c) => <StatusBadge status={c.status} /> },
    { key: "createdAt", header: t("common.createdAt"), render: (c) => new Date(c.createdAt).toLocaleString() },
  ];

  return (
    <div>
      <AdminPageHeader title={t("admin.contactEvents.title")} subtitle={t("admin.contactEvents.subtitle")} />
      <DataTable columns={columns} rows={data ?? []} rowKey={(c) => c.id} status={status} onRetry={refetch} />
    </div>
  );
}
