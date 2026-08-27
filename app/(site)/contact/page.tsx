"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Form";
import { Reveal } from "@/components/ui/Reveal";
import { cardHoverClass } from "@/components/ui/Card";

export default function ContactPage() {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  return (
    <>
      <PageHero title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              {submitted ? (
                <div className="rounded-xl border border-lime-dark bg-surface-muted p-6 text-base font-medium text-navy">
                  {t("contact.formSuccess")}
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div>
                    <Label htmlFor="name">{t("contact.formName")}</Label>
                    <Input id="name" required placeholder={t("contact.formName")} />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("contact.formEmail")}</Label>
                    <Input id="email" type="email" required placeholder={t("contact.formEmail")} />
                  </div>
                  <div>
                    <Label htmlFor="message">{t("contact.formMessage")}</Label>
                    <Textarea id="message" required rows={5} placeholder={t("contact.formMessage")} />
                  </div>
                  <div>
                    <Button type="submit" disabled={submitting} animated>
                      {submitting ? t("common.loading") : t("contact.formSubmit")}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2">
            <div className={`flex flex-col gap-5 rounded-xl border border-border p-6 ${cardHoverClass}`}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
                  {t("contact.supportEmail")}
                </p>
                <p className="mt-1 text-base font-medium text-navy">support@cityride.rw</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
                  {t("contact.supportPhone")}
                </p>
                <p className="mt-1 text-base font-medium text-navy">+250 788 000 000</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-text-secondary">
                  {t("contact.office")}
                </p>
                <p className="mt-1 text-base font-medium text-navy">Kigali, Rwanda</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
