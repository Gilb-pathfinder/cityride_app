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

  const heroTitle = t("home.heroTitle");
  const [heroLead, ...heroRest] = heroTitle.split(/(?<=\.)\s+/);
  const heroTail = heroRest.join(" ");

  return (
    <>
      <section className="relative flex min-h-[94vh] items-center overflow-hidden bg-navy text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/motor.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/35" />
        <div className="absolute inset-0 bg-navy/25" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-40 sm:pb-28 sm:pt-48">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-lime backdrop-blur">
            {t("home.heroEyebrow")}
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">{heroLead}</span>{" "}
            {heroTail && <span className="font-medium text-white/45">{heroTail}</span>}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/download" size="lg">
              {t("home.ctaDownload")}
            </Button>
            <Button
              href="/how-it-works"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t("home.ctaHowItWorks")}
            </Button>
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
