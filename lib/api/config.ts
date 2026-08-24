import { mockAppConfig } from "@/lib/mock/data";
import type { AppConfig } from "@/lib/types";
import { simulate } from "./client";

const config: AppConfig = { ...mockAppConfig };

// Maps to GET /config
export function getConfig(): Promise<AppConfig> {
  return simulate({ ...config });
}

// Maps to PATCH /admin/config
export function updateConfig(changes: Partial<AppConfig>): Promise<AppConfig> {
  Object.assign(config, changes);
  return simulate({ ...config });
}
