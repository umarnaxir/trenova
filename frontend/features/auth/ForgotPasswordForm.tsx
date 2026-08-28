"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { AuthCard, AuthLinks } from "@/features/auth/AuthForm.styles";
import {
  GhostButton,
  OtpHidden,
  OtpShell,
  OtpSlots,
  OtpSlot,
  SelectedPhone,
} from "@/features/auth/LoginModal.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";

const forgotPhoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid 10-digit mobile number")
    .transform((val) => val.replace(/\D/g, "").slice(-10))
    .refine((val) => /^[6-9]\d{9}$/.test(val), "Enter a valid 10-digit Indian phone number"),
});

const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PhoneFormValues = z.infer<typeof forgotPhoneSchema>;
type ResetFormValues = z.infer<typeof resetPasswordFormSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const pushToast = useUiStore((state) => state.pushToast);
  const openAuthModal = useUiStore((state) => state.openAuthModal);
  const sendForgotOtp = useAuthStore((state) => state.sendForgotOtp);
  const verifyForgotOtp = useAuthStore((state) => state.verifyForgotOtp);
  const resetPasswordWithOtp = useAuthStore((state) => state.resetPasswordWithOtp);

  const [step, setStep] = useState<"phone" | "otp_and_reset">("phone");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingAndResetting, setVerifyingAndResetting] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [verifiedPhone, setVerifiedPhone] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpInputRef = useRef<HTMLInputElement>(null);

  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(forgotPhoneSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    reset: resetResetForm,
    formState: { errors: resetErrors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (step === "otp_and_reset") {
      otpInputRef.current?.focus();
    }
  }, [step]);

  const onSendOtp = async (values: PhoneFormValues) => {
    setSendingOtp(true);
    setOtpError("");
    try {
      const res = await sendForgotOtp(values.phone);
      if (!res.success) {
        pushToast(res.message, "error");
        return;
      }

      setVerifiedPhone(values.phone);
      setStep("otp_and_reset");
      setResendTimer(60);
      if (res.devOtp) {
        setDevOtpHint(res.devOtp);
      }
      pushToast("OTP sent to your mobile number");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (!verifiedPhone || resendTimer > 0) return;
    setSendingOtp(true);
    setOtpError("");
    try {
      const res = await sendForgotOtp(verifiedPhone);
      if (!res.success) {
        pushToast(res.message, "error");
        return;
      }
      setResendTimer(60);
      if (res.devOtp) {
        setDevOtpHint(res.devOtp);
      }
      pushToast("OTP resent to your mobile number");
    } finally {
      setSendingOtp(false);
    }
  };

  const onPerformReset = async (values: ResetFormValues) => {
    if (otpCode.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setVerifyingAndResetting(true);
    setOtpError("");

    try {
      // 1. Verify OTP with server to get short-lived reset token
      const verifyRes = await verifyForgotOtp(verifiedPhone, otpCode);
      if (!verifyRes.success || !verifyRes.otpToken) {
        setOtpError(verifyRes.message || "Invalid OTP code");
        pushToast(verifyRes.message || "Invalid OTP", "error");
        return;
      }

      // 2. Reset password using the verified token
      const resetRes = await resetPasswordWithOtp(
        verifiedPhone,
        verifyRes.otpToken,
        values.newPassword,
      );

      if (!resetRes.success) {
        pushToast(resetRes.message, "error");
        return;
      }

      pushToast("Password reset successfully! Please sign in.");
      resetResetForm();
      router.push("/login");
    } catch (err: any) {
      pushToast(err.message || "Failed to reset password", "error");
    } finally {
      setVerifyingAndResetting(false);
    }
  };

  return (
    <AuthCard>
      <Text as="h1" variant="h2">
        Reset Password
      </Text>

      {step === "phone" ? (
        <>
          <Text color="gray600">
            Enter your registered mobile number to receive a verification OTP.
          </Text>

          <form
            onSubmit={handlePhoneSubmit(onSendOtp)}
            style={{ display: "grid", gap: "1.25rem", marginTop: "1rem" }}
          >
            <Input
              label="Mobile Number"
              type="tel"
              inputMode="numeric"
              placeholder="10-digit mobile number"
              error={phoneErrors.phone?.message}
              {...registerPhone("phone")}
            />

            <Button type="submit" disabled={sendingOtp} fullWidth size="lg">
              {sendingOtp ? "Sending OTP..." : "Send OTP & Continue"}
            </Button>
          </form>
        </>
      ) : (
        <>
          <Text color="gray600">
            Enter the 6-digit code sent to your phone and choose a new password.
          </Text>

          <SelectedPhone style={{ marginTop: "1rem" }}>
            <span>
              Phone: <strong>+91 {verifiedPhone}</strong>
            </span>
            <GhostButton
              type="button"
              onClick={() => {
                setStep("phone");
                setOtpCode("");
                setOtpError("");
              }}
            >
              Change
            </GhostButton>
          </SelectedPhone>

          <form
            onSubmit={handleResetSubmit(onPerformReset)}
            style={{ display: "grid", gap: "1.25rem", marginTop: "1rem" }}
          >
            <div>
              <Text variant="small" color="gray600" style={{ marginBottom: "8px" }}>
                6-digit OTP Code:
              </Text>
              <OtpShell $error={Boolean(otpError)}>
                <OtpSlots onClick={() => otpInputRef.current?.focus()}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <OtpSlot key={index} $filled={Boolean(otpCode[index])}>
                      {otpCode[index] || "•"}
                    </OtpSlot>
                  ))}
                  <OtpHidden
                    ref={otpInputRef}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setOtpCode(val);
                      if (otpError) setOtpError("");
                    }}
                  />
                </OtpSlots>
              </OtpShell>
              {otpError && (
                <Text variant="small" color="error" style={{ marginTop: "4px" }}>
                  {otpError}
                </Text>
              )}
              {devOtpHint && (
                <Text variant="small" color="goldDark" style={{ marginTop: "6px" }}>
                  Dev OTP Code: <strong>{devOtpHint}</strong>
                </Text>
              )}
            </div>

            <Input
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimum 6 characters"
              error={resetErrors.newPassword?.message}
              endAdornment={
                <IconButton
                  plain
                  label={showNewPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowNewPassword((v) => !v)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              }
              {...registerReset("newPassword")}
            />

            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter new password"
              error={resetErrors.confirmPassword?.message}
              endAdornment={
                <IconButton
                  plain
                  label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              }
              {...registerReset("confirmPassword")}
            />

            <Button
              type="submit"
              disabled={verifyingAndResetting || otpCode.length !== 6}
              fullWidth
              size="lg"
            >
              {verifyingAndResetting ? "Resetting..." : "Reset Password"}
            </Button>

            <div style={{ textAlign: "center" }}>
              <GhostButton
                type="button"
                disabled={resendTimer > 0 || sendingOtp}
                onClick={handleResendOtp}
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </GhostButton>
            </div>
          </form>
        </>
      )}

      <AuthLinks style={{ marginTop: "1.5rem" }}>
        <a
          href="/login"
          onClick={(e) => {
            e.preventDefault();
            router.push("/login");
          }}
        >
          Remember your password? Sign in
        </a>
      </AuthLinks>
    </AuthCard>
  );
}
