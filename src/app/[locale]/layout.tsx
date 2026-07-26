import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { LocaleProvider } from "@/components/locale-provider";
import { LocaleShell } from "@/components/locale-shell";
import { normalizeLocale } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CityRide",
  description: "A multilingual public website and admin dashboard for CityRide.",
};

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolvedLocale = normalizeLocale(locale);

  return (
    <html lang={resolvedLocale} className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans">
        <LocaleProvider initialLocale={resolvedLocale}>
          <LocaleShell>{children}</LocaleShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
