import { mockUsers } from "@/lib/mock/data";
import type { User } from "@/lib/types";
import { simulate } from "./client";

// Maps to GET /admin/users
export function listUsers(params?: { search?: string }): Promise<User[]> {
  let rows = mockUsers;
  if (params?.search) {
    const q = params.search.toLowerCase();
    rows = rows.filter(
      (u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }
  return simulate(rows);
}
