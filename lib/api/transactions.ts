import { mockTransactions } from "@/lib/mock/data";
import type { Transaction } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /transactions?payment_id=
export function listTransactions(params?: { paymentId?: string }): Promise<Transaction[]> {
  let rows = mockTransactions;
  if (params?.paymentId) rows = rows.filter((t) => t.paymentId === params.paymentId);
  return simulate(rows);
}
