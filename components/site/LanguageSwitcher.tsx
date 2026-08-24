"use client";

import { useI18n } from "@/lib/i18n/context";
import type { Locale } from "@/lib/types";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "rw", label: "RW" },
  { code: "fr", label: "FR" },
];

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={`inline-flex items-center rounded-md border p-0.5 text-xs font-semibold ${
        dark ? "border-white/20" : "border-border"
      }`}
    >
      {LOCALES.map(({ code, label }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`rounded px-2.5 py-1.5 transition-colors ${
              active
                ? "bg-lime text-navy"
                : dark
                  ? "text-white/70 hover:text-white"
                  : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
