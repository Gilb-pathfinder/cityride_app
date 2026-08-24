"use client";

import { useTranslation } from "@/components/locale-provider";
import { riders } from "@/lib/mock-data";

export default function AdminRidersPage() {
  const { t } = useTranslation();

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-[#101828]">{t("admin.ridersTitle")}</h1>
      <div className="mt-8 grid gap-4">
        {riders.map((rider) => (
          <div key={rider.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold">{rider.fullName}</h2>
                <p className="text-sm text-slate-600">{rider.vehicleType} • {rider.plateNumber}</p>
              </div>
              <div className="text-sm text-slate-600">{rider.verificationStatus}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
