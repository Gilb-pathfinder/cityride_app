"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useFetch } from "@/lib/hooks/useFetch";
import { listUsers } from "@/lib/api/users";
import { listNotificationLogs } from "@/lib/api/notificationLogs";
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

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const users = useFetch(() => listUsers(), []);
  const notifications = useFetch(() => listNotificationLogs(), []);

  const results = useMemo(() => {
    if (!query.trim() || !users.data) return [];
    const q = query.trim().toLowerCase();
    return users.data
      .filter((u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query, users.data]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex h-16 flex-none items-center justify-between gap-3 rounded-3xl bg-surface px-5 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-border lg:hidden"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <p className="hidden truncate text-sm font-semibold text-navy sm:block">
          {t("admin.dashboard.welcomeBack")}
          {admin ? `, ${admin.fullName.split(" ")[0]}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div ref={searchRef} className="relative hidden sm:block">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <IconSearch />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            placeholder={t("admin.dashboard.searchPlaceholder")}
            className="w-48 rounded-xl border border-transparent bg-surface-muted py-2 pl-9 pr-3 text-sm text-navy placeholder:text-text-secondary focus:border-lime focus:bg-surface focus:outline-none lg:w-64"
          />
          {searchOpen && query.trim() && (
            <div className="absolute right-0 top-full z-40 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-surface py-1 shadow-lg">
              {results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-text-secondary">{t("admin.dashboard.noResults")}</p>
              ) : (
                results.map((u) => (
                  <Link
                    key={u.id}
                    href={u.role === "rider" ? "/admin/riders" : "/admin/users"}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-surface-muted"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-navy">{u.fullName}</span>
                      <span className="block truncate text-xs text-text-secondary">{u.email}</span>
                    </span>
                    <span className="flex-none text-xs font-semibold uppercase text-text-secondary">{u.role}</span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-muted text-text-secondary transition-colors hover:text-navy"
            aria-label={t("admin.dashboard.notifications")}
          >
            <IconBell />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full z-40 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="text-sm font-bold text-navy">{t("admin.dashboard.notifications")}</p>
                <Link
                  href="/admin/notification-logs"
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-semibold text-navy hover:text-lime"
                >
                  {t("common.viewAll")}
                </Link>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {!notifications.data || notifications.data.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-text-secondary">{t("admin.dashboard.noNotifications")}</p>
                ) : (
                  notifications.data.slice(0, 5).map((n) => (
                    <div key={n.id} className="flex items-start justify-between gap-3 border-b border-border px-4 py-3 last:border-0">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-navy">{n.riderName}</p>
                        <p className="truncate text-xs text-text-secondary">{n.messageId}</p>
                      </div>
                      <StatusBadge status={n.status} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <LanguageSwitcher />

        {admin && (
          <Link
            href="/admin/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-lime transition-transform hover:scale-105"
            aria-label={t("admin.profile.title")}
          >
            {initials(admin.fullName)}
          </Link>
        )}
      </div>
    </header>
  );
}
