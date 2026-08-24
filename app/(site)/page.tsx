"use client";

import { useI18n } from "@/lib/i18n/context";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/site/PageHero";

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="6" y="2.5" width="12" height="19" rx="2" />
      <path d="M10 18.5h4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <section className="border-b border-border bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-lime">
              {t("home.heroEyebrow")}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/download" size="lg">
                {t("home.ctaDownload")}
              </Button>
              <Button href="/how-it-works" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                {t("home.ctaHowItWorks")}
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-white/15 bg-navy-light p-6">
            <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/50">
              <span>{t("home.sectionDiscoveryTitle")}</span>
              <span className="flex items-center gap-1.5 text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Live
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { name: "Jean Bosco N.", dist: "0.8 km", rating: "4.9" },
                { name: "Claudine M.", dist: "1.2 km", rating: "4.7" },
                { name: "Emmanuel N.", dist: "1.6 km", rating: "4.8" },
              ].map((r) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-navy px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-navy">
                      <PinIcon />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{r.name}</p>
                      <p className="text-xs text-white/50">{r.dist} away · {r.rating}★</p>
                    </div>
                  </div>
                  <span className="rounded-md bg-lime px-3 py-1.5 text-xs font-semibold text-navy">Call</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {t("home.sectionWhatTitle")}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">
              {t("home.sectionWhatBody")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t("home.statsRiders"), value: "500+" },
              { label: t("home.statsClients"), value: "12k+" },
              { label: t("home.statsCities"), value: "6" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border p-5 text-center">
                <p className="text-2xl font-bold text-navy">{stat.value}</p>
                <p className="mt-1.5 text-xs text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section bleed className="border-t border-border bg-surface-muted">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <PinIcon />, title: t("home.sectionDiscoveryTitle"), body: t("home.sectionDiscoveryBody") },
            { icon: <PhoneIcon />, title: t("home.forClientsTitle"), body: t("home.forClientsBody") },
            { icon: <ShieldIcon />, title: t("home.forRidersTitle"), body: t("home.forRidersBody") },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-border bg-surface p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-navy text-lime">
                {card.icon}
              </span>
              <h3 className="text-lg font-semibold text-navy">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="flex flex-col items-center gap-5 rounded-xl border border-border bg-navy px-6 py-14 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("home.downloadTitle")}</h2>
          <p className="max-w-lg text-sm text-white/70">{t("home.downloadBody")}</p>
          <Button href="/download" size="lg">
            {t("home.ctaDownload")}
          </Button>
        </div>
      </Section>
    </>
  );
}
