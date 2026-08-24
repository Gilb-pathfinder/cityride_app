"use client";

import { useTranslation } from "@/components/locale-provider";
import { dashboardMetrics } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#101828]">{t("admin.dashboardTitle")}</h1>
        <p className="mt-3 text-slate-600">{t("admin.dashboardSubtitle")}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {dashboardMetrics.map((metric) => (
          <div key={metric.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-[#101828]">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500">{metric.hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
