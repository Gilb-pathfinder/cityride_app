"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n/context";
import { createRole, listRoles } from "@/lib/api/roles";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Form";
import type { Role } from "@/lib/types";

export default function RolesPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(() => listRoles(), []);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await createRole(
        name,
        permissions.split(",").map((p) => p.trim()).filter(Boolean)
      );
      setName("");
      setPermissions("");
      setShowForm(false);
      refetch();
    } finally {
      setSaving(false);
    }
  }

  const columns: Column<Role>[] = [
    { key: "name", header: t("admin.roles.roleName"), render: (r) => <span className="font-medium">{r.name}</span> },
    {
      key: "permissions",
      header: t("admin.roles.permissions"),
      render: (r) => (
        <div className="flex flex-wrap gap-1.5">
          {r.permissions.map((p) => (
            <Badge key={p} tone="neutral">
              {p}
            </Badge>
          ))}
        </div>
      ),
    },
    { key: "createdAt", header: t("common.createdAt"), render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ];

  return (
    <div>
      <AdminPageHeader
        title={t("admin.roles.title")}
        subtitle={t("admin.roles.subtitle")}
        action={
          <Button size="sm" onClick={() => setShowForm((v) => !v)}>
            {t("admin.roles.addRole")}
          </Button>
        }
      />

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 grid gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="roleName">{t("admin.roles.roleName")}</Label>
            <Input id="roleName" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="permissions">{t("admin.roles.permissions")}</Label>
            <Input
              id="permissions"
              placeholder="users.view, riders.verify"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={saving} size="sm">
              {t("common.save")}
            </Button>
          </div>
        </form>
      )}

      <DataTable columns={columns} rows={data ?? []} rowKey={(r) => r.id} status={status} onRetry={refetch} />
    </div>
  );
}
