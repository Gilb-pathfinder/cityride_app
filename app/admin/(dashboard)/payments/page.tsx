"use client";

import { useI18n } from "@/lib/i18n/context";
import { listPayments } from "@/lib/api/payments";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import type { Payment } from "@/lib/types";

export default function PaymentsPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(() => listPayments(), []);

  const columns: Column<Payment>[] = [
    { key: "tripRequestId", header: t("fields.tripRequest"), render: (p) => <span className="font-mono text-xs">{p.tripRequestId}</span> },
    { key: "clientName", header: t("fields.client"), render: (p) => p.clientName },
    { key: "riderName", header: t("fields.rider"), render: (p) => p.riderName },
    { key: "amount", header: t("fields.amount"), render: (p) => `${p.amount.toLocaleString()} ${p.currency}` },
    { key: "paymentMethod", header: t("fields.paymentMethod"), render: (p) => <Badge tone="neutral">{p.paymentMethod.replace("_", " ")}</Badge> },
    { key: "status", header: t("fields.paymentStatus"), render: (p) => <StatusBadge status={p.status} /> },
    { key: "createdAt", header: t("common.createdAt"), render: (p) => new Date(p.createdAt).toLocaleDateString() },
  ];

  return (
    <div>
      <AdminPageHeader title={t("admin.payments.title")} subtitle={t("admin.payments.subtitle")} />
      <DataTable columns={columns} rows={data ?? []} rowKey={(p) => p.id} status={status} onRetry={refetch} />
    </div>
  );
}
