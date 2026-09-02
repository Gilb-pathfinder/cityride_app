"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
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

function NavIcon({
  href,
  active,
  label,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={onClick} className="group relative flex justify-center">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
          active ? "bg-lime text-navy" : "text-text-secondary hover:bg-surface-muted hover:text-navy"
        }`}
      >
        {children}
      </span>
      <span className="pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
}

export function AdminSidebar({
  mobileOpen = false,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const { t } = useI18n();
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/admin/login");
  }

  const content = (
    <>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8Z" fill="#C6FF00" />
          <circle cx="12" cy="10" r="3" fill="#101828" />
        </svg>
      </div>

      <nav className="flex flex-1 flex-col items-center gap-2 py-6">
        {NAV_ITEMS.map(({ href, key, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <NavIcon key={href} href={href} active={active} label={t(`admin.sidebar.${key}`)} onClick={onClose}>
              <Icon />
            </NavIcon>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="group relative flex h-11 w-11 items-center justify-center rounded-2xl text-text-secondary transition-colors hover:bg-error/10 hover:text-error"
      >
        <IconLogout />
        <span className="pointer-events-none absolute left-full top-1/2 z-40 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
          {t("auth.logout")}
        </span>
      </button>
    </>
  );

  return (
    <>
      <aside className="hidden w-20 flex-none flex-col items-center gap-2 rounded-3xl bg-surface p-3 shadow-sm lg:flex">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy/40" onClick={onClose} />
          <aside className="absolute inset-y-3 left-3 flex w-20 flex-col items-center gap-2 rounded-3xl bg-surface p-3 shadow-xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
