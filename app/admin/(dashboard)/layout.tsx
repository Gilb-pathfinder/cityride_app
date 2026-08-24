"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { LoadingState } from "@/components/ui/States";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { status } = useAdminAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-muted">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
