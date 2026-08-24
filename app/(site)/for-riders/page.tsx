"use client";

import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";

export default function ForRidersPage() {
  const { t, dict } = useI18n();

  return (
    <>
      <PageHero title={t("forRiders.title")} subtitle={t("forRiders.subtitle")} />

      <Section>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.forRiders.steps.map((step, i) => (
            <li key={step} className="rounded-xl border border-border p-5">
              <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-lime">
                {i + 1}
              </span>
              <p className="text-sm font-medium text-text-primary">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-xl border border-lime-dark bg-surface-muted p-6">
          <p className="text-sm text-text-secondary">{t("forRiders.verificationNote")}</p>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/download" size="lg">
            {t("forRiders.cta")}
          </Button>
        </div>
      </Section>
    </>
  );
}
