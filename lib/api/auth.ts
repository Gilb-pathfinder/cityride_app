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

// Maps to PATCH /admin/profile (the authenticated admin updating their own profile)
export function updateAdminProfile(
  adminId: string,
  changes: Partial<Pick<AdminUser, "fullName" | "email">>
): Promise<AdminUser> {
  const admin = mockAdminUsers.find((a) => a.id === adminId);
  if (!admin) return Promise.reject(new Error("admin_not_found"));
  Object.assign(admin, changes);
  return simulate({ ...admin }, 600);
}
