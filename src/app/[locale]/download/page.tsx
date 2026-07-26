"use client";

import { useTranslation } from "@/components/locale-provider";

export default function DownloadPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#101828]">{t("pages.downloadTitle")}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{t("pages.downloadBody")}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#" className="rounded-full bg-[#101828] px-6 py-3 font-semibold text-white">Google Play</a>
          <a href="#" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700">App Store</a>
        </div>
      </div>
    </div>
  );
}
