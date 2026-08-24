"use client";

import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";

export default function TrustVerificationPage() {
  const { t, dict } = useI18n();

  return (
    <>
      <PageHero title={t("trust.title")} subtitle={t("trust.subtitle")} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-navy">{t("trust.infoTitle")}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {dict.trust.infoItems.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-navy" />
                  <span className="text-sm font-medium text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-navy">{t("trust.processTitle")}</h2>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">{t("trust.processBody")}</p>

            <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-surface-muted p-4">
              <span className="rounded-md bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">
                {t("status.pending")}
              </span>
              <span className="text-text-secondary">→</span>
              <span className="rounded-md bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
                {t("status.verified")}
              </span>
              <span className="text-text-secondary">/</span>
              <span className="rounded-md bg-error/10 px-3 py-1.5 text-xs font-semibold text-error">
                {t("status.rejected")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-border bg-navy p-6 text-white">
          <h3 className="text-sm font-bold uppercase tracking-wide text-lime">{t("trust.disclaimerTitle")}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{t("trust.disclaimer")}</p>
        </div>
      </Section>
    </>
  );
}
