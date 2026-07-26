"use client";

import { useTranslation } from "@/components/locale-provider";

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#101828]">{t("pages.faqTitle")}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{t("pages.faqBody")}</p>
        <div className="mt-10 space-y-4">
          {[
            "What is CityRide?",
            "How do I find nearby riders?",
            "What happens when I tap Call?",
            "How does rider verification work?",
          ].map((question) => (
            <div key={question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-semibold">{question}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
