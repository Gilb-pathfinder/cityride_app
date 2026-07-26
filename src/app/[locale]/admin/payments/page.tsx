"use client";

import { useTranslation } from "@/components/locale-provider";
import { payments } from "@/lib/mock-data";

export default function AdminPaymentsPage() {
  const { t } = useTranslation();

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-[#101828]">{t("admin.paymentsTitle")}</h1>
      <div className="mt-8 space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="font-semibold">{payment.client} → {payment.rider}</p>
            <p className="mt-2 text-sm text-slate-600">{payment.amount} {payment.currency} • {payment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
