"use client";

import { useI18n } from "@/lib/i18n/context";

export function AdminFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-between gap-2 px-2 py-4 text-xs text-text-secondary sm:flex-row">
      <p>
        © {year} CityRide. {t("footer.rights")}
      </p>
      <p>{t("admin.footer.tagline")}</p>
    </footer>
  );
}
