"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AdminShell } from "@/features/admin/AdminShell";
import {
  AlignEnd,
  CardActions,
  CardHint,
  CardHintOnDark,
  CardTitle,
  CardTitleOnDark,
  FieldGrid,
  MetaLabel,
  MetaRow,
  MetaValue,
  PageGrid,
  PageIntro,
  SmartCard,
  SmartCardDark,
  SmartCardWide,
} from "@/features/admin/AdminLayout.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { useUiStore } from "@/hooks/stores/uiStore";

export default function AdminProfilePage() {
  const admin = useAdminAuthStore((state) => state.admin);
  const updateProfile = useAdminAuthStore((state) => state.updateProfile);
  const resetPassword = useAdminAuthStore((state) => state.resetPassword);
  const pushToast = useUiStore((state) => state.pushToast);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!admin) return null;

  return (
    <AdminShell title="Profile">
      <PageIntro>
        Update your admin profile and reset your password when needed.
      </PageIntro>

      <PageGrid $cols={2}>
        <SmartCard>
          <CardTitle>Profile details</CardTitle>
          <CardHint>Name and email for this signed-in admin account.</CardHint>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              updateProfile({
                name: String(data.get("name") ?? ""),
                email: String(data.get("email") ?? ""),
              });
              pushToast("Admin profile updated");
            }}
          >
            <FieldGrid $cols={2}>
              <Input label="Name" name="name" defaultValue={admin.name} required />
              <Input
                label="Email"
                name="email"
                type="email"
                defaultValue={admin.email}
                required
              />
              <Input label="Role" name="role" defaultValue={admin.role} readOnly />
              <AlignEnd>
                <Button type="submit" style={{ width: "100%" }}>
                  Update profile
                </Button>
              </AlignEnd>
            </FieldGrid>
          </form>
        </SmartCard>

        <SmartCardDark>
          <CardTitleOnDark>Session</CardTitleOnDark>
          <CardHintOnDark>
            Quick view of the account currently signed in.
          </CardHintOnDark>
          <MetaRow>
            <MetaLabel>Name</MetaLabel>
            <MetaValue>{admin.name}</MetaValue>
          </MetaRow>
          <MetaRow>
            <MetaLabel>Email</MetaLabel>
            <MetaValue>{admin.email}</MetaValue>
          </MetaRow>
          <MetaRow>
            <MetaLabel>Role</MetaLabel>
            <MetaValue>{admin.role}</MetaValue>
          </MetaRow>
          <CardHintOnDark style={{ marginTop: "auto" }}>
            Role changes are managed from Team Management.
          </CardHintOnDark>
        </SmartCardDark>

        <SmartCardWide>
          <CardTitle>Reset password</CardTitle>
          <CardHint>Set a new password for this account.</CardHint>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const nextPassword = String(data.get("resetPassword") ?? "");
              const confirmPassword = String(
                data.get("confirmResetPassword") ?? "",
              );
              if (nextPassword !== confirmPassword) {
                pushToast("Passwords do not match", "error");
                return;
              }
              const result = await resetPassword(nextPassword);
              if (!result.ok) {
                pushToast(result.error, "error");
                return;
              }
              event.currentTarget.reset();
              setShowNewPassword(false);
              setShowConfirmPassword(false);
              pushToast("Password reset successfully");
            }}
          >
            <FieldGrid $cols={2}>
              <Input
                name="resetPassword"
                placeholder="New password"
                aria-label="New password"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={4}
                endAdornment={
                  <IconButton
                    plain
                    label={showNewPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowNewPassword((open) => !open)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                }
              />
              <Input
                name="confirmResetPassword"
                placeholder="Confirm password"
                aria-label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={4}
                endAdornment={
                  <IconButton
                    plain
                    label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowConfirmPassword((open) => !open)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </IconButton>
                }
              />
            </FieldGrid>
            <CardActions>
              <Button type="submit">Reset password</Button>
            </CardActions>
          </form>
        </SmartCardWide>
      </PageGrid>
    </AdminShell>
  );
}
