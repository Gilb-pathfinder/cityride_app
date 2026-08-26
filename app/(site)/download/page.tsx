"use client";

import { useI18n } from "@/lib/i18n/context";
import { PageHero, Section } from "@/components/site/PageHero";
import { APP_STORE_LINKS } from "@/lib/config/appLinks";

function StoreButton({ href, label, sub }: { href: string; label: string; sub: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center gap-3 rounded-md border border-border bg-surface-muted px-5 py-3.5 transition-colors hover:bg-surface sm:w-64"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-navy">
        <rect x="6" y="2.5" width="12" height="19" rx="2" />
        <path d="M10 18.5h4" />
      </svg>
      <div className="text-left">
        <p className="text-[11px] uppercase tracking-wide text-text-secondary">{sub}</p>
        <p className="text-sm font-bold text-navy">{label}</p>
      </div>
    </a>
  );
}

function QrPlaceholder() {
  const cells = Array.from({ length: 49 });
  return (
    <div className="grid grid-cols-7 gap-1 rounded-lg border border-border bg-white p-3">
      {cells.map((_, i) => (
        <span
          key={i}
          className={`h-3 w-3 rounded-sm ${
            (i * 7 + Math.floor(i / 7)) % 3 === 0 ? "bg-navy" : "bg-surface-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function DownloadPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero title={t("download.title")} subtitle={t("download.subtitle")} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="max-w-md text-sm leading-relaxed text-text-secondary">{t("download.body")}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <StoreButton href={APP_STORE_LINKS.playStore} label={t("download.googlePlay")} sub="Get it on" />
              <StoreButton href={APP_STORE_LINKS.appStore} label={t("download.appStore")} sub="Download on the" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-xl border border-border p-8 text-center">
            <h3 className="text-sm font-bold text-navy">{t("download.qrTitle")}</h3>
            <QrPlaceholder />
            <p className="max-w-xs text-xs text-text-secondary">{t("download.qrBody")}</p>
          </div>
        </div>
      </Section>

      <Section bleed className="border-t border-border bg-surface-muted">
        <div>
          <h2 className="text-center text-xl font-bold text-navy">{t("download.screensTitle")}</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="mx-auto flex aspect-[9/19] w-full max-w-[160px] flex-col items-center justify-center rounded-2xl border-4 border-navy bg-white p-3"
              >
                <div className="flex h-full w-full flex-col justify-between rounded-lg border border-border bg-surface-muted p-3">
                  <div className="h-2 w-10 rounded-full bg-border" />
                  <div className="flex flex-1 items-center justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-navy">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                        <circle cx="12" cy="9.5" r="2.5" />
                      </svg>
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
