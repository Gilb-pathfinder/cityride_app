import type { Metadata } from "next";
import { LocaleProvider } from "@/components/locale-provider";
import { LocaleShell } from "@/components/locale-shell";
import { getDictionary, normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolvedLocale = normalizeLocale(locale);
  const dictionary = getDictionary(resolvedLocale) as Record<string, unknown>;
  const meta = (dictionary.meta ?? {}) as { title?: string; description?: string };

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = normalizeLocale(locale);

  return (
    <LocaleProvider initialLocale={resolvedLocale}>
      <LocaleShell>{children}</LocaleShell>
    </LocaleProvider>
  );
}
