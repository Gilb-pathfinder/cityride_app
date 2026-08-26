"use client";

import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export default function FaqPage() {
  const { t, dict } = useI18n();

  return (
    <>
      <PageHero title={t("faq.title")} subtitle={t("faq.subtitle")} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="mb-5 text-lg font-bold text-navy">{t("faq.clientsTitle")}</h2>
            <Accordion items={dict.faq.clientItems} />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mb-5 text-lg font-bold text-navy">{t("faq.ridersTitle")}</h2>
            <Accordion items={dict.faq.riderItems} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
