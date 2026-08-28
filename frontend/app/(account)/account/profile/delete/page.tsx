"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
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

export default function DeleteAccountPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const deleteAccount = useAuthStore((state) => state.deleteAccount);
  const pushToast = useUiStore((state) => state.pushToast);
  const [agreed, setAgreed] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!agreed) {
      setError("Please confirm you understand permanent deletion.");
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
    const ok = deleteAccount(password);
    setBusy(false);
    if (!ok) {
      setError("Password is incorrect. Please try again.");
      return;
    }
    pushToast("Account scheduled for permanent deletion");
    router.replace("/");
  }

  return (
    <InstructPage>
      <BackLink href="/account/profile" scroll={false}>
        <ArrowLeft size={14} aria-hidden />
        Back to profile
      </BackLink>

      <InstructHero>
        <h1>Delete account</h1>
        <p>
          Permanently remove {user?.email}. This cannot be undone and you will
          not be able to activate this account again.
        </p>
      </InstructHero>

      <InstructCard $danger>
        <InstructList>
          <li>
            <AlertTriangle size={16} aria-hidden />
            <span>
              Your profile details, saved addresses, and account access will be
              marked for permanent deletion.
            </span>
          </li>
          <li>
            <AlertTriangle size={16} aria-hidden />
            <span>
              After <strong>24 hours</strong>, the account is deleted
              automatically and cannot be recovered.
            </span>
          </li>
          <li>
            <AlertTriangle size={16} aria-hidden />
            <span>
              You will not be able to sign in or reactivate this account during
              or after the 24-hour deletion window.
            </span>
          </li>
          <li>
            <AlertTriangle size={16} aria-hidden />
            <span>
              Phone number, alternate contacts, and delivery addresses linked to
              this profile will be removed with the account.
            </span>
          </li>
          <li>
            <AlertTriangle size={16} aria-hidden />
            <span>
              Past orders may remain in store records for legal/fulfillment
              needs, but they will no longer be tied to a live account login.
            </span>
          </li>
        </InstructList>
      </InstructCard>

      <form onSubmit={onSubmit}>
        <InstructCard $danger>
          <AgreeBox>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span>
              I understand my data will be permanently deleted after 24 hours
              and I will not be able to activate this account again.
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
              variant="primary"
              size="sm"
              disabled={busy || !agreed}
            >
              {busy ? "Deleting..." : "Delete account permanently"}
            </Button>
          </ActionsRow>
        </InstructCard>
      </form>
    </InstructPage>
  );
}
