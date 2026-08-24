import { mockNotificationLogs } from "@/lib/mock/data";
import type { NotificationLog } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /notification-logs?contact_event_id=
export function listNotificationLogs(params?: { contactEventId?: string }): Promise<NotificationLog[]> {
  let rows = mockNotificationLogs;
  if (params?.contactEventId) rows = rows.filter((n) => n.contactEventId === params.contactEventId);
  return simulate(rows);
}
