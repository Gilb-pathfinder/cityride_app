"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n/context";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
import { updateAdminProfile } from "@/lib/api/auth";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Form";
import { Badge } from "@/components/ui/Badge";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AdminProfilePage() {
  const { t } = useI18n();
  const { admin, updateAdmin } = useAdminAuth();

  const [fullName, setFullName] = useState(admin?.fullName ?? "");
  const [email, setEmail] = useState(admin?.email ?? "");
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountSaved, setAccountSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  if (!admin) return null;

  async function handleAccountSubmit(e: FormEvent) {
    e.preventDefault();
    setSavingAccount(true);
    setAccountSaved(false);
    try {
      const updated = await updateAdminProfile(admin!.id, { fullName, email });
      updateAdmin({ ...admin!, ...updated });
      setAccountSaved(true);
    } finally {
      setSavingAccount(false);
    }
  }

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordSaved(false);
    setPasswordError(null);

    if (newPassword.length > 0 && newPassword !== confirmPassword) {
      setPasswordError(t("admin.profile.passwordMismatch"));
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      setPasswordSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 500);
  }

  return (
    <div>
      <AdminPageHeader title={t("admin.profile.title")} subtitle={t("admin.profile.subtitle")} />

      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-bold text-lime">
          {initials(admin.fullName)}
        </span>
        <div>
          <p className="text-lg font-bold text-navy">{admin.fullName}</p>
          <p className="text-sm text-text-secondary">{admin.email}</p>
          <div className="mt-1.5">
            <Badge tone="lime">{admin.roleName}</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={handleAccountSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
        >
          <h2 className="text-sm font-bold text-navy">{t("admin.profile.accountSection")}</h2>
          <div>
            <Label htmlFor="fullName">{t("fields.fullName")}</Label>
            <Input id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">{t("fields.email")}</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="role">{t("fields.role")}</Label>
            <Input id="role" value={admin.roleName} disabled />
          </div>
          <div className="mt-2 flex items-center gap-4">
            <Button type="submit" disabled={savingAccount}>
              {savingAccount ? t("common.loading") : t("common.saveChanges")}
            </Button>
            {accountSaved && <span className="text-sm text-success">{t("common.changesSaved")}</span>}
          </div>
        </form>

        <form
          onSubmit={handlePasswordSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm"
        >
          <h2 className="text-sm font-bold text-navy">{t("admin.profile.securitySection")}</h2>
          <div>
            <Label htmlFor="currentPassword">{t("admin.profile.currentPassword")}</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="newPassword">{t("admin.profile.newPassword")}</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t("admin.profile.confirmPassword")}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {passwordError && <p className="text-sm text-error">{passwordError}</p>}

          <div className="mt-2 flex items-center gap-4">
            <Button type="submit" disabled={savingPassword}>
              {savingPassword ? t("common.loading") : t("common.saveChanges")}
            </Button>
            {passwordSaved && <span className="text-sm text-success">{t("admin.profile.passwordUpdated")}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
