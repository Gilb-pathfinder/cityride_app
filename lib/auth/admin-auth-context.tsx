"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loginAdmin } from "@/lib/api/auth";
import type { AdminUser } from "@/lib/types";

const STORAGE_KEY = "cityride.admin.session";

interface Session {
  admin: AdminUser;
  token: string;
}

interface AdminAuthContextValue {
  admin: AdminUser | null;
  status: "checking" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateAdmin: (admin: AdminUser) => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time session restore from localStorage after mount
        setSession(JSON.parse(raw));
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    } catch {
      setStatus("unauthenticated");
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginAdmin(email, password);
    const next: Session = { admin: result.admin, token: result.token };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSession(null);
    setStatus("unauthenticated");
  }, []);

  const updateAdmin = useCallback((admin: AdminUser) => {
    setSession((prev) => {
      if (!prev) return prev;
      const next: Session = { ...prev, admin };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ admin: session?.admin ?? null, status, login, logout, updateAdmin }),
    [session, status, login, logout, updateAdmin]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
