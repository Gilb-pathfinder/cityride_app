"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AdminShell } from "@/components/admin-shell";

export function LocaleShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const isAdminRoute = pathname.includes("/admin");

  if (isAdminRoute) {
    return <AdminShell>{children}</AdminShell>;
  }

  return <AppShell>{children}</AppShell>;
}
