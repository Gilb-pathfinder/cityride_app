"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
import { Logo } from "@/components/site/Logo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Form";

export default function AdminLoginPage() {
  const { t } = useI18n();
  const { login } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("admin@cityride.rw");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push("/admin");
    } catch {
      setError(t("auth.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-navy p-12 text-white lg:flex">
        <Logo dark />
        <div>
          <h1 className="max-w-sm text-3xl font-bold leading-tight tracking-tight">
            {t("footer.adminPanel")}
          </h1>
          <p className="mt-4 max-w-sm text-sm text-white/60">{t("home.heroSubtitle")}</p>
        </div>
        <p className="text-xs text-white/40">CityRide © {new Date().getFullYear()}</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-navy">{t("auth.loginTitle")}</h2>
          <p className="mt-2 text-sm text-text-secondary">{t("auth.loginSubtitle")}</p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div>
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="rounded-md border border-[#f8c9cc] bg-[#fdedee] px-3.5 py-2.5 text-sm text-error">
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t("auth.signingIn") : t("auth.loginButton")}
            </Button>

            <p className="text-center text-xs text-text-secondary">{t("auth.demoHint")}</p>
          </form>

          <div className="mt-8 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
