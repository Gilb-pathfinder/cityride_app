"use client";

import { useI18n } from "@/lib/i18n/context";
import { listNotificationLogs } from "@/lib/api/notificationLogs";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { NotificationLog } from "@/lib/types";

export default function NotificationLogsPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(() => listNotificationLogs(), []);

  const columns: Column<NotificationLog>[] = [
    { key: "contactEventId", header: t("fields.contactEvent"), render: (n) => <span className="font-mono text-xs">{n.contactEventId}</span> },
    { key: "riderName", header: t("fields.rider"), render: (n) => n.riderName },
    { key: "messageId", header: t("fields.messageId"), render: (n) => <span className="font-mono text-xs">{n.messageId}</span> },
    { key: "status", header: t("fields.notificationStatus"), render: (n) => <StatusBadge status={n.status} /> },
    { key: "errorInfo", header: t("fields.errorInfo"), render: (n) => n.errorInfo ?? "—" },
    { key: "sentAt", header: t("fields.sentTime"), render: (n) => new Date(n.sentAt).toLocaleString() },
  ];

  return (
    <div>
      <AdminPageHeader title={t("admin.notificationLogs.title")} subtitle={t("admin.notificationLogs.subtitle")} />
      <DataTable columns={columns} rows={data ?? []} rowKey={(n) => n.id} status={status} onRetry={refetch} />
    </div>
  );
}
