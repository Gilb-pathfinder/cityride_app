import { mockRiders } from "@/lib/mock/data";
import type { Rider, VerificationStatus } from "@/lib/types";
import { simulate } from "./client";

const riders: Rider[] = [...mockRiders];

// Maps to GET /admin/riders?verification_status=
export function listRiders(params?: { verificationStatus?: VerificationStatus }): Promise<Rider[]> {
  let rows = riders;
  if (params?.verificationStatus) {
    rows = rows.filter((r) => r.verificationStatus === params.verificationStatus);
  }
  return simulate(rows);
}

// Maps to PATCH /admin/riders/:id/verify
export function verifyRider(
  id: string,
  status: VerificationStatus,
  notes?: string
): Promise<Rider> {
  const rider = riders.find((r) => r.id === id);
  if (!rider) return Promise.reject(new Error("Rider not found"));
  rider.verificationStatus = status;
  rider.verificationNotes = notes;
  return simulate({ ...rider });
}
