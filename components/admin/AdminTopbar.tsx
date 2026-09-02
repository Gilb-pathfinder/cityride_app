"use client";

import { useI18n } from "@/lib/i18n/context";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { IconBell, IconSearch } from "./icons";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { t } = useI18n();
  const { admin } = useAdminAuth();

  return (
    <header className="flex h-16 flex-none items-center justify-between gap-4 rounded-3xl bg-surface px-5 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border lg:hidden"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <p className="hidden text-sm font-semibold text-navy sm:block">
          {t("admin.dashboard.welcomeBack")}
          {admin ? `, ${admin.fullName.split(" ")[0]}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden h-9 w-9 items-center justify-center rounded-xl bg-surface-muted text-text-secondary sm:flex">
          <IconSearch />
        </span>
        <span className="hidden h-9 w-9 items-center justify-center rounded-xl bg-surface-muted text-text-secondary sm:flex">
          <IconBell />
        </span>
        <LanguageSwitcher />
        {admin && (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-lime">
            {initials(admin.fullName)}
          </span>
        )}
      </div>
    </header>
  );
}
