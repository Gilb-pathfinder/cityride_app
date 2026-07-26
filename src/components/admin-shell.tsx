"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/locale-provider";

const adminLinks = [
  { href: "/admin/dashboard", key: "admin.dashboard" },
  { href: "/admin/users", key: "admin.users" },
  { href: "/admin/riders", key: "admin.riders" },
  { href: "/admin/contact-events", key: "admin.contactEvents" },
  { href: "/admin/trip-requests", key: "admin.tripRequests" },
  { href: "/admin/notifications", key: "admin.notificationLogs" },
  { href: "/admin/payments", key: "admin.payments" },
  { href: "/admin/transactions", key: "admin.transactions" },
  { href: "/admin/roles", key: "admin.roles" },
  { href: "/admin/config", key: "admin.appConfig" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("cityride-admin-auth");
    setIsAuthenticated(Boolean(stored));
  }, []);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (email && password) {
      window.localStorage.setItem("cityride-admin-auth", "true");
      setIsAuthenticated(true);
      setError("");
      router.push(`/${locale}/admin/dashboard`);
    } else {
      setError(t("admin.loginError") as string);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("cityride-admin-auth");
    setIsAuthenticated(false);
    router.push(`/${locale}/admin/login`);
  };

  if (pathname?.endsWith("/admin/login")) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C6FF00]">CityRide Admin</p>
          <h1 className="mt-3 text-3xl font-semibold">{t("admin.loginTitle")}</h1>
          <p className="mt-2 text-sm text-slate-600">{t("admin.loginDescription")}</p>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-medium">{t("admin.email")}</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">{t("admin.password")}</label>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" className="w-full bg-[#101828] text-white hover:bg-[#1f2937]">{t("admin.login")}</Button>
          </form>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold">{t("admin.unauthorized")}</h1>
          <p className="mt-3 text-slate-600">{t("admin.unauthorizedDescription")}</p>
          <Link href={`/${locale}/admin/login`} className="mt-6 inline-flex rounded-full bg-[#C6FF00] px-4 py-2 font-medium text-[#101828]">
            {t("admin.login")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-[#101828] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C6FF00]">Admin</p>
            <h1 className="text-xl font-semibold">CityRide Control Center</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {adminLinks.map((link) => (
              <Link key={link.key} href={`/${locale}${link.href}`} className="rounded-full border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">
                {t(link.key)}
              </Link>
            ))}
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800">
            {t("admin.logout")}
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
