"use client";

import { useTranslation } from "@/components/locale-provider";

export default function TrustAndVerificationPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#101828]">{t("pages.trustTitle")}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{t("pages.trustBody")}</p>
        <div className="mt-10 rounded-3xl bg-slate-50 p-8">
          <h2 className="text-xl font-semibold">Verification flow</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Pending submissions move to verified or rejected after admin review.</p>
        </div>
      </div>
    </div>
  );
}
