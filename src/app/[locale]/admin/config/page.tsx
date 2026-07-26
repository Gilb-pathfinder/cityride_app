"use client";

import { useTranslation } from "@/components/locale-provider";
import { appConfig } from "@/lib/mock-data";

export default function AdminConfigPage() {
  const { t } = useTranslation();

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-[#101828]">{t("admin.configTitle")}</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {Object.entries(appConfig).map(([key, value]) => (
          <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{key}</p>
            <p className="mt-2 text-lg text-slate-800">{String(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
