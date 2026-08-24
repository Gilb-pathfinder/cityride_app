import en from "@/locales/en.json";
import rw from "@/locales/rw.json";
import fr from "@/locales/fr.json";

export const locales = ["en", "rw", "fr"] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  en,
  rw,
  fr,
} satisfies Record<Locale, Record<string, unknown>>;

export function getDictionary(locale: string) {
  return dictionaries[locale as Locale] ?? dictionaries.en;
}

export function getLocaleLabel(locale: string) {
  switch (locale) {
    case "rw":
      return "Kinyarwanda";
    case "fr":
      return "Français";
    default:
      return "English";
  }
}

export function normalizeLocale(locale?: string | null): Locale {
  if (locale && locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return "en";
}
