"use client";

import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";

export default function HowItWorksPage() {
  const { t, dict } = useI18n();

  return (
    <>
      <PageHero title={t("howItWorks.title")} subtitle={t("howItWorks.subtitle")} />

      <Section>
        <h2 className="text-xl font-bold tracking-tight text-navy">{t("howItWorks.clientFlowTitle")}</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.howItWorks.clientFlowSteps.map((step, i) => (
            <li key={step} className="rounded-xl border border-border p-5">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-lime">
                {i + 1}
              </span>
              <p className="text-sm font-medium text-text-primary">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section bleed className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-4xl rounded-xl border border-lime-dark bg-white p-8">
          <h3 className="text-lg font-bold text-navy">{t("howItWorks.contactEventTitle")}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{t("howItWorks.contactEventBody")}</p>
        </div>
      </Section>

      <Section>
        <h2 className="text-xl font-bold tracking-tight text-navy">{t("howItWorks.tripLifecycleTitle")}</h2>
        <div className="mt-6 flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
          {dict.howItWorks.tripLifecycleSteps.map((step, i) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex w-full flex-col items-center rounded-xl border border-border p-5 text-center sm:min-h-[110px]">
                <span className="text-xs font-semibold text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-semibold text-navy">{step}</p>
              </div>
              {i < dict.howItWorks.tripLifecycleSteps.length - 1 && (
                <span className="hidden px-2 text-text-secondary sm:block">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-secondary">{t("howItWorks.note")}</p>
      </Section>
    </>
  );
}
