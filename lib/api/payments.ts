import { mockPayments } from "@/lib/mock/data";
import type { Payment } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /payments?client_id=&rider_id=
export function listPayments(params?: { clientId?: string; riderId?: string }): Promise<Payment[]> {
  let rows = mockPayments;
  if (params?.clientId) rows = rows.filter((p) => p.clientId === params.clientId);
  if (params?.riderId) rows = rows.filter((p) => p.riderId === params.riderId);
  return simulate(rows);
}
