"use client";

import { useTranslation } from "@/components/locale-provider";
import { notificationLogs } from "@/lib/mock-data";

export default function AdminNotificationsPage() {
  const { t } = useTranslation();

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-[#101828]">{t("admin.notificationsTitle")}</h1>
      <div className="mt-8 space-y-4">
        {notificationLogs.map((log) => (
          <div key={log.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold">{log.rider}</p>
            <p className="mt-2 text-sm text-slate-600">{log.status} • {log.sentAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
