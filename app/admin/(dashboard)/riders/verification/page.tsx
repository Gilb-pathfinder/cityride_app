"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { listRiders, verifyRider } from "@/lib/api/riders";
import { useFetch } from "@/lib/hooks/useFetch";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Form";
import { Badge } from "@/components/ui/Badge";

export default function RiderVerificationPage() {
  const { t } = useI18n();
  const { status, data, refetch } = useFetch(() => listRiders({ verificationStatus: "pending" }), []);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  async function handleDecision(id: string, decision: "verified" | "rejected") {
    setSavingId(id);
    try {
      await verifyRider(id, decision, notes[id]);
      refetch();
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <AdminPageHeader title={t("admin.riders.verificationTitle")} subtitle={t("admin.riders.verificationSubtitle")} />

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState onRetry={refetch} />}
      {status === "success" && data && data.length === 0 && <EmptyState />}

      {status === "success" && data && data.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-2">
          {data.map((rider) => (
            <div key={rider.id} className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-navy">{rider.fullName}</h3>
                  <p className="text-sm text-text-secondary">{rider.phone} · {rider.email}</p>
                </div>
                <Badge tone="warning">{t("status.pending")}</Badge>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-text-secondary">{t("fields.vehicleType")}</dt>
                  <dd className="font-medium text-text-primary">{rider.vehicleType}</dd>
                </div>
                <div>
                  <dt className="text-xs text-text-secondary">{t("fields.plateNumber")}</dt>
                  <dd className="font-medium text-text-primary">{rider.plateNumber}</dd>
                </div>
              </dl>

              <div className="mt-4 flex gap-3">
                <a
                  href={rider.idDocumentUrl}
                  className="flex-1 rounded-md border border-border px-3 py-2 text-center text-xs font-semibold text-navy hover:bg-surface-muted"
                >
                  {t("fields.idDocument")}
                </a>
                <a
                  href={rider.licenseDocumentUrl}
                  className="flex-1 rounded-md border border-border px-3 py-2 text-center text-xs font-semibold text-navy hover:bg-surface-muted"
                >
                  {t("fields.licenseDocument")}
                </a>
              </div>

              <div className="mt-4">
                <Textarea
                  rows={2}
                  placeholder={t("admin.riders.reviewNotesPlaceholder")}
                  value={notes[rider.id] ?? ""}
                  onChange={(e) => setNotes((prev) => ({ ...prev, [rider.id]: e.target.value }))}
                />
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  size="sm"
                  disabled={savingId === rider.id}
                  onClick={() => handleDecision(rider.id, "verified")}
                >
                  {t("admin.riders.approve")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={savingId === rider.id}
                  onClick={() => handleDecision(rider.id, "rejected")}
                  className="border-error text-error hover:bg-[#fdedee]"
                >
                  {t("admin.riders.reject")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
