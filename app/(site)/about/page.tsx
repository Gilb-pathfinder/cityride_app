"use client";

import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";
import { DownloadAppButton } from "@/components/site/DownloadAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { cardHoverClass } from "@/components/ui/Card";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function AboutPage() {
  const { t, dict } = useI18n();

  return (
    <>
      <PageHero title={t("about.title")} subtitle={t("about.subtitle")} />

      <Section id="clients">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-navy">{t("forClients.title")}</h2>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">{t("forClients.subtitle")}</p>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {dict.forClients.capabilities.map((item, i) => (
            <Reveal key={item} delay={i * 60}>
              <div className={`flex items-start gap-3 rounded-xl border border-border p-5 ${cardHoverClass}`}>
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-lime text-navy">
                  <CheckIcon />
                </span>
                <p className="text-base font-medium text-text-primary">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 rounded-xl border border-border bg-surface-muted p-6">
          <p className="text-base text-text-secondary">{t("forClients.note")}</p>
        </Reveal>
      </Section>

      <Section id="riders" bleed className="border-t border-border bg-surface-muted">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-navy">{t("forRiders.title")}</h2>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">{t("forRiders.subtitle")}</p>
        </Reveal>

        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.forRiders.steps.map((step, i) => (
            <Reveal as="li" key={step} delay={i * 60} className={`rounded-xl border border-border bg-surface p-5 ${cardHoverClass}`}>
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-lime">
                {i + 1}
              </span>
              <p className="text-base font-medium text-text-primary">{step}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-6 rounded-xl border border-lime-dark bg-surface p-6">
          <p className="text-base text-text-secondary">{t("forRiders.verificationNote")}</p>
        </Reveal>

        <div className="mt-8 flex justify-center">
          <DownloadAppButton size="lg">{t("forRiders.cta")}</DownloadAppButton>
        </div>
      </Section>

      <Section id="trust">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-navy">{t("trust.title")}</h2>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">{t("trust.subtitle")}</p>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="text-base font-bold uppercase tracking-wide text-text-secondary">{t("trust.infoTitle")}</h3>
            </Reveal>
            <ul className="mt-4 flex flex-col gap-3">
              {dict.trust.infoItems.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={i * 50}
                  className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors duration-300 hover:border-lime/40"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-lime" />
                  <span className="text-base font-medium text-text-primary">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={100}>
            <h3 className="text-base font-bold uppercase tracking-wide text-text-secondary">{t("trust.processTitle")}</h3>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">{t("trust.processBody")}</p>

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
          </Reveal>
        </div>

        <Reveal className="mt-10 rounded-xl border border-border bg-navy p-6 text-white">
          <h3 className="text-base font-bold uppercase tracking-wide text-lime">{t("trust.disclaimerTitle")}</h3>
          <p className="mt-3 text-base leading-relaxed text-white/75">{t("trust.disclaimer")}</p>
        </Reveal>
      </Section>
    </>
  );
}
