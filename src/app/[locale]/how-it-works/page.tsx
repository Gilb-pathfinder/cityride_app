"use client";

import { useTranslation } from "@/components/locale-provider";

export default function HowItWorksPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C6FF00]">CityRide</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#101828]">{t("pages.howItWorksTitle")}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{t("pages.howItWorksBody")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="text-xl font-semibold">Client flow</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Open the app, discover nearby riders, view details, and tap Call to create a Contact Event.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="text-xl font-semibold">Trip request lifecycle</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">The lifecycle continues through requested, accepted or rejected, in progress, and completed or cancelled.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
