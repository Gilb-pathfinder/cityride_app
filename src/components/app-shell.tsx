"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/locale-provider";

const publicLinks = [
  { href: "/", key: "nav.home" },
  { href: "/how-it-works", key: "nav.howItWorks" },
  { href: "/for-clients", key: "nav.forClients" },
  { href: "/for-riders", key: "nav.forRiders" },
  { href: "/trust-and-verification", key: "nav.trust" },
  { href: "/faq", key: "nav.faq" },
  { href: "/download", key: "nav.download" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, t, setLocale } = useTranslation();

  const getHref = (href: string) => {
    const normalized = href === "/" ? "" : href;
    return `/${locale}${normalized}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-[#101828] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="text-xl font-semibold tracking-tight">
            CityRide
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {publicLinks.map((link) => {
              const href = getHref(link.href);
              const isActive = pathname === href;
              return (
                <Link
                  key={link.key}
                  href={href}
                  className={`rounded-full px-3 py-2 transition ${isActive ? "bg-[#C6FF00] text-[#101828]" : "hover:bg-slate-800"}`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            {(["en", "rw", "fr"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLocale(option)}
                className={`rounded-full border px-3 py-1 text-sm ${locale === option ? "border-[#C6FF00] bg-[#C6FF00] text-[#101828]" : "border-slate-700 bg-slate-900"}`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{t("footer.tagline")}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/download`} className="font-medium text-[#101828] hover:text-[#C6FF00]">
              {t("nav.download")}
            </Link>
            <Link href={`/${locale}/admin/login`} className="font-medium text-[#101828] hover:text-[#C6FF00]">
              {t("nav.admin")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
