import { mockAdminUsers } from "@/lib/mock/data";
import type { AdminUser } from "@/lib/types";
import { simulate } from "./client";

const DEMO_PASSWORD = "admin123";

export interface LoginResult {
  admin: AdminUser;
  token: string;
}

// Maps to POST /admin/login
export function loginAdmin(email: string, password: string): Promise<LoginResult> {
  const admin = mockAdminUsers.find((a) => a.email.toLowerCase() === email.toLowerCase());
  if (!admin || password !== DEMO_PASSWORD) {
    return Promise.reject(new Error("invalid_credentials"));
  }
  return simulate({ admin, token: `mock-token-${admin.id}` }, 700);
}
