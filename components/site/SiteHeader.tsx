"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS: { href: string; key: string }[] = [
  { href: "/", key: "home" },
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
];

export function SiteHeader() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Logo dark />

        <nav className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-lime text-navy" : "text-white/75 hover:text-white"
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher dark />
          <Button href="/download" size="sm">
            {t("nav.download")}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="mx-5 rounded-2xl border border-white/15 bg-navy px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  pathname === item.href ? "bg-lime text-navy" : "text-white/75"
                }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <LanguageSwitcher dark />
            <Button href="/download" size="sm">
              {t("nav.download")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
