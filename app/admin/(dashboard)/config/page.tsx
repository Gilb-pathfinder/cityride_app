"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n/context";
import { getConfig, updateConfig } from "@/lib/api/config";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { LoadingState, ErrorState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Form";
import type { AppConfig } from "@/lib/types";

export default function AppConfigPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(() => getConfig(), []);
  const [form, setForm] = useState<AppConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- seed the editable form once the fetched config arrives
    if (data) setForm(data);
  }, [data]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setSaved(false);
    try {
      const updated = await updateConfig(form);
      setForm(updated);
      setSaved(true);
      refetch();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader title={t("admin.config.title")} subtitle={t("admin.config.subtitle")} />

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState onRetry={refetch} />}

      {status === "success" && form && (
        <form onSubmit={handleSubmit} className="max-w-2xl rounded-2xl border border-border bg-surface shadow-sm p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label>{t("admin.config.launchAreaCenter")}</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="any"
                  value={form.launchAreaCenter.lat}
                  onChange={(e) =>
                    setForm({ ...form, launchAreaCenter: { ...form.launchAreaCenter, lat: Number(e.target.value) } })
                  }
                />
                <Input
                  type="number"
                  step="any"
                  value={form.launchAreaCenter.lng}
                  onChange={(e) =>
                    setForm({ ...form, launchAreaCenter: { ...form.launchAreaCenter, lng: Number(e.target.value) } })
                  }
                />
              </div>
            </div>

            <div>
              <Label>{t("admin.config.launchAreaRadius")}</Label>
              <Input
                type="number"
                value={form.launchAreaRadiusKm}
                onChange={(e) => setForm({ ...form, launchAreaRadiusKm: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label>{t("admin.config.defaultSearchRadius")}</Label>
              <Input
                type="number"
                value={form.defaultSearchRadiusKm}
                onChange={(e) => setForm({ ...form, defaultSearchRadiusKm: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label>{t("admin.config.maxSearchRadius")}</Label>
              <Input
                type="number"
                value={form.maxSearchRadiusKm}
                onChange={(e) => setForm({ ...form, maxSearchRadiusKm: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label>{t("admin.config.locationUpdateInterval")}</Label>
              <Input
                type="number"
                value={form.locationUpdateIntervalSec}
                onChange={(e) => setForm({ ...form, locationUpdateIntervalSec: Number(e.target.value) })}
              />
            </div>

            <div>
              <Label>{t("admin.config.minAppVersion")}</Label>
              <Input
                value={form.minAppVersion}
                onChange={(e) => setForm({ ...form, minAppVersion: e.target.value })}
              />
            </div>
          </div>

          <label className="mt-5 flex items-center gap-3 rounded-md border border-border px-4 py-3">
            <input
              type="checkbox"
              checked={form.maintenanceMode}
              onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
              className="h-4 w-4 accent-navy"
            />
            <span className="text-sm font-medium text-text-primary">{t("admin.config.maintenanceMode")}</span>
          </label>

          <div className="mt-6 flex items-center gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? t("common.loading") : t("common.saveChanges")}
            </Button>
            {saved && <span className="text-sm text-success">{t("common.changesSaved")}</span>}
          </div>
        </form>
      )}
    </div>
  );
}
