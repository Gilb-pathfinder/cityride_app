import { mockRoles } from "@/lib/mock/data";
import type { Role } from "@/lib/types";
import { simulate } from "./client";

const roles: Role[] = [...mockRoles];

// Maps to GET /admin/roles
export function listRoles(): Promise<Role[]> {
  return simulate(roles);
}

// Maps to POST /admin/roles
export function createRole(name: string, permissions: string[]): Promise<Role> {
  const role: Role = {
    id: `role-${roles.length + 1}`,
    name,
    permissions,
    createdAt: new Date().toISOString(),
  };
  roles.push(role);
  return simulate(role);
}

// Maps to PATCH /admin/roles/:id
export function updateRole(id: string, changes: Partial<Pick<Role, "name" | "permissions">>): Promise<Role> {
  const role = roles.find((r) => r.id === id);
  if (!role) return Promise.reject(new Error("Role not found"));
  Object.assign(role, changes);
  return simulate({ ...role });
}
