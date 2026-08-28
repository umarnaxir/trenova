"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, RotateCcw } from "lucide-react";
import {
  FieldRow,
  Form,
  GhostButton,
  Links,
  OtpHidden,
  OtpShell,
  OtpSlots,
  OtpSlot,
  OtpVerify,
  PhoneBlock,
  SelectedPhone,
} from "@/features/auth/LoginModal.styles";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/registerSchema";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";

type RegisterPanelProps = {
  onSuccess: () => void;
  onLogin: () => void;
};

export function RegisterPanel({ onSuccess, onLogin }: RegisterPanelProps) {
  const router = useRouter();
  const sendOtp = useAuthStore((state) => state.sendOtp);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const registerUser = useAuthStore((state) => state.register);
  const pushToast = useUiStore((state) => state.pushToast);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [step, setStep] = useState<"details" | "otp">("details");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  const otpInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const phoneValue = watch("phone") ?? "";

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    if (step === "otp") {
      otpInputRef.current?.focus();
    }
  }, [step]);

  const handleRequestOtp = async () => {
    const values = getValues();
    if (!values.phone || values.phone.length !== 10) {
      pushToast("Please enter a valid 10-digit mobile number", "error");
      return;
    }

    setSendingOtp(true);
    setOtpError("");
    try {
      const res = await sendOtp(values.phone);
      if (!res.success) {
        pushToast(res.message, "error");
        return;
      }

      setStep("otp");
      setResendTimer(60);
      if (res.devOtp) {
        setDevOtpHint(res.devOtp);
      }
      pushToast("OTP sent to your mobile number");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyAndRegister = async () => {
    if (otpCode.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    const values = getValues();
    setVerifyingOtp(true);
    setOtpError("");

    try {
      // 1. Verify OTP with server to get short-lived token
      const verifyRes = await verifyOtp(values.phone, otpCode);
      if (!verifyRes.success || !verifyRes.otpToken) {
        setOtpError(verifyRes.message || "Invalid OTP code");
        pushToast(verifyRes.message || "Invalid OTP", "error");
        return;
      }

      // 2. Register user with verified token
      const regRes = await registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phone,
        otpToken: verifyRes.otpToken,
      });

      if (!regRes.success) {
        pushToast(regRes.message, "error");
        setStep("details"); // Allow updating details if registration failed
        return;
      }

      pushToast("Account created successfully!");
      onSuccess();
      router.push("/account");
    } catch (err: any) {
      setOtpError(err.message || "Registration failed");
      pushToast(err.message || "Registration failed", "error");
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(async () => {
        if (step === "details") {
          await handleRequestOtp();
        } else {
          await handleVerifyAndRegister();
        }
      })}>
        {step === "details" ? (
          <>
            <FieldRow>
              <Input
                autoComplete="given-name"
                placeholder="First name"
                aria-label="First name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                autoComplete="family-name"
                placeholder="Last name"
                aria-label="Last name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </FieldRow>
            <FieldRow>
              <Input
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                aria-label="Email"
                error={errors.email?.message}
                {...register("email")}
              />
              <PhoneBlock>
                <Input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  aria-label="Phone number"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </PhoneBlock>
            </FieldRow>
            <FieldRow>
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Password (min 6 chars)"
                aria-label="Password"
                error={errors.password?.message}
                endAdornment={
                  <IconButton
                    plain
                    label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                }
                {...register("password")}
              />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm password"
                aria-label="Confirm password"
                error={errors.confirmPassword?.message}
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
                {...register("confirmPassword")}
              />
            </FieldRow>
            <Button
              type="submit"
              disabled={sendingOtp}
              fullWidth
              size="lg"
            >
              {sendingOtp ? "Sending OTP..." : "Send OTP & Continue"}
            </Button>
          </>
        ) : (
          <>
            <SelectedPhone>
              <span>Phone: <strong>+91 {phoneValue}</strong></span>
              <GhostButton
                type="button"
                onClick={() => {
                  setStep("details");
                  setOtpCode("");
                  setOtpError("");
                }}
              >
                Change
              </GhostButton>
            </SelectedPhone>

            <div>
              <Text variant="small" color="gray600" style={{ marginBottom: "8px" }}>
                Enter the 6-digit verification code sent to your mobile:
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
                <OtpVerify
                  type="button"
                  disabled={verifyingOtp || otpCode.length !== 6}
                  onClick={handleVerifyAndRegister}
                >
                  Verify
                </OtpVerify>
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

            <Button
              type="submit"
              disabled={verifyingOtp || otpCode.length !== 6}
              fullWidth
              size="lg"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP & Create Account"}
            </Button>

            <Links style={{ justifyContent: "center" }}>
              <GhostButton
                type="button"
                disabled={resendTimer > 0 || sendingOtp}
                onClick={handleRequestOtp}
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </GhostButton>
            </Links>
          </>
        )}
      </Form>

      <Links style={{ justifyContent: "center", marginTop: "1rem" }}>
        <GhostButton type="button" onClick={onLogin}>
          Already have an account? Sign in
        </GhostButton>
      </Links>
    </>
  );
}

