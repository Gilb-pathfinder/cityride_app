"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
import { Logo } from "@/components/site/Logo";
import {
  IconBell,
  IconBike,
  IconCard,
  IconExchange,
  IconGrid,
  IconKey,
  IconLogout,
  IconPhoneCall,
  IconRoute,
  IconSettings,
  IconUsers,
} from "./icons";

const NAV_ITEMS = [
  { href: "/admin", key: "dashboard", icon: IconGrid, exact: true },
  { href: "/admin/users", key: "users", icon: IconUsers },
  { href: "/admin/riders", key: "riders", icon: IconBike },
  { href: "/admin/contact-events", key: "contactEvents", icon: IconPhoneCall },
  { href: "/admin/trip-requests", key: "tripRequests", icon: IconRoute },
  { href: "/admin/notification-logs", key: "notificationLogs", icon: IconBell },
  { href: "/admin/payments", key: "payments", icon: IconCard },
  { href: "/admin/transactions", key: "transactions", icon: IconExchange },
  { href: "/admin/roles", key: "roles", icon: IconKey },
  { href: "/admin/config", key: "appConfig", icon: IconSettings },
];

export function AdminSidebar({
  mobileOpen = false,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const { t } = useI18n();
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  const content = (
    <>
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
        {NAV_ITEMS.map(({ href, key, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-navy text-lime" : "text-text-secondary hover:bg-surface-muted hover:text-navy"
              }`}
            >
              <Icon />
              {t(`admin.sidebar.${key}`)}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="mb-2 px-3 py-2">
          <p className="truncate text-sm font-semibold text-navy">{admin?.fullName}</p>
          <p className="truncate text-xs text-text-secondary">{admin?.roleName}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-error"
        >
          <IconLogout />
          {t("auth.logout")}
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 flex-none flex-col border-r border-border bg-surface lg:flex">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-surface">{content}</aside>
        </div>
      )}
    </>
  );
}
