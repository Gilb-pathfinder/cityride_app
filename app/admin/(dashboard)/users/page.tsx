"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { listUsers } from "@/lib/api/users";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Form";
import type { User } from "@/lib/types";

export default function UsersPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const { status, data, refetch } = useFetch(() => listUsers(), []);

  const rows = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [data, search]);

  const columns: Column<User>[] = [
    { key: "fullName", header: t("fields.fullName"), render: (u) => <span className="font-medium">{u.fullName}</span> },
    { key: "email", header: t("fields.email"), render: (u) => u.email },
    { key: "phone", header: t("fields.phone"), render: (u) => u.phone },
    {
      key: "role",
      header: t("fields.role"),
      render: (u) => <Badge tone={u.role === "rider" ? "info" : "neutral"}>{t(`fields.${u.role}`)}</Badge>,
    },
    {
      key: "active",
      header: t("common.status"),
      render: (u) => (
        <Badge tone={u.active ? "success" : "error"}>{t(u.active ? "fields.active" : "fields.inactive")}</Badge>
      ),
    },
    {
      key: "lastSeen",
      header: t("fields.lastSeen"),
      render: (u) => new Date(u.lastSeenAt).toLocaleString(),
    },
  ];

  return (
    <div>
      <AdminPageHeader title={t("admin.users.title")} subtitle={t("admin.users.subtitle")} />

      <div className="mb-4 max-w-xs">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("admin.users.searchPlaceholder")}
        />
      </div>

      <DataTable columns={columns} rows={rows} rowKey={(u) => u.id} status={status} onRetry={refetch} />
    </div>
  );
}
