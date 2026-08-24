"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getDictionary, locales, normalizeLocale, type Locale } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: Record<string, unknown>;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("cityride-locale");
    if (storedLocale) {
      setLocaleState(normalizeLocale(storedLocale));
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("cityride-locale", nextLocale);
  };

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(() => ({ locale, setLocale, dictionary }), [locale, dictionary]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return context;
}

export function useTranslation() {
  const { dictionary, locale, setLocale } = useLocale();
  return {
    locale,
    setLocale,
    t: (key: string, fallback?: string) => {
      const parts = key.split(".");
      let value: unknown = dictionary;
      for (const part of parts) {
        if (value && typeof value === "object" && part in value) {
          value = (value as Record<string, unknown>)[part];
        } else {
          return fallback ?? key;
        }
      }
      return typeof value === "string" ? value : fallback ?? key;
    },
  };
}

export { locales };
