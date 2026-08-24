"use client";

import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ForClientsPage() {
  const { t, dict } = useI18n();

  return (
    <>
      <PageHero title={t("forClients.title")} subtitle={t("forClients.subtitle")} />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {dict.forClients.capabilities.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-border p-5">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-lime text-navy">
                <CheckIcon />
              </span>
              <p className="text-sm font-medium text-text-primary">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-surface-muted p-6">
          <p className="text-sm text-text-secondary">{t("forClients.note")}</p>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/download" size="lg">
            {t("home.ctaDownload")}
          </Button>
        </div>
      </Section>
    </>
  );
}
