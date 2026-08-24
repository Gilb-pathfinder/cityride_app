import { AdminAuthProvider } from "@/lib/auth/admin-auth-context";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
