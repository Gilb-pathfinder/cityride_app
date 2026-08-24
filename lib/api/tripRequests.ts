import { mockTripRequests } from "@/lib/mock/data";
import type { TripRequest, TripRequestStatus } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /trip-requests?status=
export function listTripRequests(params?: { status?: TripRequestStatus }): Promise<TripRequest[]> {
  let rows = mockTripRequests;
  if (params?.status) rows = rows.filter((t) => t.status === params.status);
  return simulate(rows);
}
