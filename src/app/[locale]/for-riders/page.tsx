"use client";

import { useTranslation } from "@/components/locale-provider";

export default function ForRidersPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#101828]">{t("pages.ridersTitle")}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{t("pages.ridersBody")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            "Create an account",
            "Complete rider onboarding",
            "Submit identity and license documents",
            "Go online and share location",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-semibold">{item}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
