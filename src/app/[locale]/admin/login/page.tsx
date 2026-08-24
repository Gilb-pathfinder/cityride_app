"use client";

import { useTranslation } from "@/components/locale-provider";

export default function AdminLoginPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#101828]">{t("admin.loginTitle")}</h1>
        <p className="mt-4 text-slate-600">{t("admin.loginDescription")}</p>
      </div>
    </div>
  );
}
