"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import {
  ActionsRow,
  AgreeBox,
  BackLink,
  ErrorNote,
  ForgotLink,
  InstructCard,
  InstructHero,
  InstructList,
  InstructPage,
  VerifyBlock,
} from "@/features/account/AccountInstruct.styles";

export default function DeactivateAccountPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const deactivateAccount = useAuthStore((state) => state.deactivateAccount);
  const pushToast = useUiStore((state) => state.pushToast);
  const [agreed, setAgreed] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!agreed) {
      setError("Please confirm you understand the instructions.");
      return;
    }
    if (
      confirmEmail.trim().toLowerCase() !== (user?.email ?? "").toLowerCase()
    ) {
      setError("Enter your exact account email to confirm.");
      return;
    }
    if (password.trim().length < 4) {
      setError("Enter your account password to continue.");
      return;
    }
    setBusy(true);
    const res = await deactivateAccount(password);
    setBusy(false);
    if (!res.ok) {
      setError(res.error || "Password is incorrect. Please try again.");
      return;
    }
    pushToast("Account deactivated successfully");
    router.replace("/login");
  }

  return (
    <InstructPage>
      <BackLink href="/account/profile" scroll={false}>
        <ArrowLeft size={14} aria-hidden />
        Back to profile
      </BackLink>

      <InstructHero>
        <h1>Deactivate account</h1>
        <p>
          Pause {user?.email} for up to 6 months. Sign in again anytime to
          reactivate.
        </p>
      </InstructHero>

      <InstructCard>
        <InstructList>
          <li>
            <CheckCircle2 size={16} aria-hidden />
            <span>You will be signed out and the account becomes inactive.</span>
          </li>
          <li>
            <CheckCircle2 size={16} aria-hidden />
            <span>
              Reactivate anytime within <strong>6 months</strong> by signing in.
            </span>
          </li>
          <li>
            <CheckCircle2 size={16} aria-hidden />
            <span>
              After 6 months without reactivation, the account is deleted
              automatically.
            </span>
          </li>
          <li>
            <CheckCircle2 size={16} aria-hidden />
            <span>Order history stays available for support during this period.</span>
          </li>
        </InstructList>
      </InstructCard>

      <form onSubmit={onSubmit}>
        <InstructCard>
          <AgreeBox>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span>
              I understand I can reactivate within 6 months, and after that the
              account may be deleted automatically.
            </span>
          </AgreeBox>

          <VerifyBlock>
            <Input
              label="Confirm email"
              type="email"
              placeholder={user?.email ?? "you@email.com"}
              value={confirmEmail}
              onChange={(event) => setConfirmEmail(event.target.value)}
            />
            <Input
              label="Confirm password"
              type="password"
              autoComplete="current-password"
              placeholder="Rewrite your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <ForgotLink href="/forgot-password">Forgot password?</ForgotLink>
            {error ? <ErrorNote>{error}</ErrorNote> : null}
          </VerifyBlock>

          <ActionsRow>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => router.push("/account/profile")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gold"
              size="sm"
              disabled={busy || !agreed}
            >
              {busy ? "Deactivating..." : "Deactivate account"}
            </Button>
          </ActionsRow>
        </InstructCard>
      </form>
    </InstructPage>
  );
}
