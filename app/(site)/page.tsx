"use client";

import { useI18n } from "@/lib/i18n/context";
import { Button } from "@/components/ui/Button";
import { DownloadAppButton } from "@/components/site/DownloadAppButton";
import { Section } from "@/components/site/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { cardHoverClass } from "@/components/ui/Card";

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
      <section className="relative flex min-h-dvh items-end overflow-hidden bg-navy text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/motor.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/20" />

        <Reveal className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-14 sm:pb-16" duration={900}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-lime backdrop-blur">
            {t("home.heroEyebrow")}
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">{heroLead}</span>{" "}
            {heroTail && <span className="font-medium text-white/45">{heroTail}</span>}
          </h1>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-white/70">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <DownloadAppButton size="lg">{t("home.ctaDownload")}</DownloadAppButton>
            <Button
              href="/how-it-works"
              variant="outline"
              size="lg"
              animated
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t("home.ctaHowItWorks")}
            </Button>
          </div>
        </Reveal>

        <div className="absolute bottom-6 right-5 z-10 hidden w-72 rounded-xl border border-white/15 bg-navy/70 p-4 backdrop-blur-md sm:right-8 sm:block lg:bottom-10 lg:right-12">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-white/50">
            <span>{t("home.sectionDiscoveryTitle")}</span>
            <span className="flex items-center gap-1.5 text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Live
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { name: "Jean Bosco N.", dist: "0.8 km", rating: "4.9" },
              { name: "Claudine M.", dist: "1.2 km", rating: "4.7" },
              { name: "Emmanuel N.", dist: "1.6 km", rating: "4.8" },
            ].map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 transition-colors duration-300 hover:border-lime/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-navy">
                    <PinIcon />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-white/50">
                      {r.dist} away · {r.rating}★
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-lime px-2.5 py-1 text-xs font-semibold text-navy">Call</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {t("home.sectionWhatTitle")}
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-text-secondary">
              {t("home.sectionWhatBody")}
            </p>
          </Reveal>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t("home.statsRiders"), value: 500, suffix: "+" },
              { label: t("home.statsClients"), value: 12, suffix: "k+" },
              { label: t("home.statsCities"), value: 6, suffix: "" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className={`rounded-xl border border-border p-5 text-center ${cardHoverClass}`}>
                  <p className="text-3xl font-bold text-navy">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-sm text-text-secondary">{stat.label}</p>
                </div>
              </Reveal>
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
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <div className={`rounded-xl border border-border bg-surface p-6 ${cardHoverClass}`}>
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-navy text-lime">
                  {card.icon}
                </span>
                <h3 className="text-xl font-semibold text-navy">{card.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-text-secondary">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Reveal className="flex flex-col items-center gap-5 rounded-xl border border-border bg-navy px-6 py-14 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("home.downloadTitle")}</h2>
          <p className="max-w-lg text-base text-white/70">{t("home.downloadBody")}</p>
          <DownloadAppButton size="lg">{t("home.ctaDownload")}</DownloadAppButton>
        </Reveal>
      </Section>
    </>
  );
}
