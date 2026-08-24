"use client";

import Link from "next/link";
import { useTranslation } from "@/components/locale-provider";

export default function LocaleHomePage() {
  const { locale, t } = useTranslation();

  return (
    <div className="bg-white">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C6FF00]">CityRide</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#101828] sm:text-5xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">{t("home.heroDescription")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/${locale}/download`} className="rounded-full bg-[#C6FF00] px-6 py-3 font-semibold text-[#101828]">
              {t("home.primaryCta")}
            </Link>
            <Link href={`/${locale}/how-it-works`} className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700">
              {t("home.secondaryCta")}
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-100 p-8 shadow-sm">
          <div className="rounded-[1.5rem] bg-[#101828] p-8 text-white">
            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-[#C6FF00]">Mobile experience</p>
              <h2 className="mt-3 text-2xl font-semibold">Nearby rider discovery</h2>
              <p className="mt-3 text-sm text-slate-300">Clients can explore riders, review details, and move into the approved trip request lifecycle from the app.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C6FF00]">{t("home.sectionTitle")}</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#101828]">{t("home.sectionSubtitle")}</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: t("home.card1Title"), description: t("home.card1Description") },
            { title: t("home.card2Title"), description: t("home.card2Description") },
            { title: t("home.card3Title"), description: t("home.card3Description") },
          ].map((card) => (
            <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-[#101828]">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
