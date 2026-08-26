"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Logo } from "./Logo";

export function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const productLinks = [
    { href: "/how-it-works", key: "nav.howItWorks" },
    { href: "/about", key: "nav.about" },
    { href: "/download", key: "nav.download" },
  ];

  const resourceLinks = [
    { href: "/faq", key: "nav.faq" },
    { href: "/contact", key: "nav.contact" },
  ];

  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm text-white/70">{t("footer.tagline")}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">{t("footer.product")}</h3>
          <ul className="flex flex-col gap-2.5">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-lime">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">{t("footer.resources")}</h3>
          <ul className="flex flex-col gap-2.5">
            {resourceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-lime">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} CityRide. {t("footer.rights")}
          </p>
          <div className="flex gap-5">
            <span className="cursor-default">{t("footer.privacy")}</span>
            <span className="cursor-default">{t("footer.terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
