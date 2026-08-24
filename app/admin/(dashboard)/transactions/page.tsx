"use client";

import { useI18n } from "@/lib/i18n/context";
import { listTransactions } from "@/lib/api/transactions";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Transaction } from "@/lib/types";

export default function TransactionsPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(() => listTransactions(), []);

  const columns: Column<Transaction>[] = [
    { key: "paymentId", header: t("fields.payment"), render: (tx) => <span className="font-mono text-xs">{tx.paymentId}</span> },
    { key: "provider", header: t("fields.provider"), render: (tx) => tx.provider },
    { key: "providerReference", header: t("fields.providerReference"), render: (tx) => <span className="font-mono text-xs">{tx.providerReference}</span> },
    { key: "amount", header: t("fields.amount"), render: (tx) => tx.amount.toLocaleString() },
    { key: "status", header: t("common.status"), render: (tx) => <StatusBadge status={tx.status} /> },
    { key: "createdAt", header: t("common.createdAt"), render: (tx) => new Date(tx.createdAt).toLocaleString() },
  ];

  return (
    <div>
      <AdminPageHeader title={t("admin.transactions.title")} subtitle={t("admin.transactions.subtitle")} />
      <DataTable columns={columns} rows={data ?? []} rowKey={(tx) => tx.id} status={status} onRetry={refetch} />
    </div>
  );
}
