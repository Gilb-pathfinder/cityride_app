import { mockContactEvents } from "@/lib/mock/data";
import type { ContactEvent } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /contact-events?client_id=&rider_id=
export function listContactEvents(params?: {
  clientId?: string;
  riderId?: string;
}): Promise<ContactEvent[]> {
  let rows = mockContactEvents;
  if (params?.clientId) rows = rows.filter((c) => c.clientId === params.clientId);
  if (params?.riderId) rows = rows.filter((c) => c.riderId === params.riderId);
  return simulate(rows);
}

// Maps to GET /contact-events/:id
export function getContactEvent(id: string): Promise<ContactEvent | undefined> {
  return simulate(mockContactEvents.find((c) => c.id === id));
}
