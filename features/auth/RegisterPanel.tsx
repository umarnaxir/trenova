"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff } from "lucide-react";
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
  DEV_PHONE_OTP,
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/registerSchema";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { getRegisteredUsers } from "@/services/mock/usersStore";

type RegisterPanelProps = {
  onSuccess: () => void;
  onLogin: () => void;
};

function phoneDigits(value: string) {
  return value.replace(/\D/g, "").slice(-10);
}

export function RegisterPanel({ onSuccess, onLogin }: RegisterPanelProps) {
  const router = useRouter();
  const registerUser = useAuthStore((state) => state.register);
  const pushToast = useUiStore((state) => state.pushToast);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const otpRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const phoneField = register("phone");
  const phoneValue = watch("phone") ?? "";
  const digits = phoneDigits(phoneValue);

  useEffect(() => {
    if (!otpMode) return;
    otpRef.current?.focus();
  }, [otpMode]);

  const verifyOtp = (code: string) => {
    if (code !== DEV_PHONE_OTP) {
      setOtpError("Enter the 6-digit OTP");
      return;
    }
    setPhoneVerified(true);
    setOtpMode(false);
    setOtp("");
    setOtpError("");
    pushToast("Phone number verified");
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(async (values) => {
          if (!phoneVerified) {
            setOtpError("Verify your mobile number to continue");
            return;
          }

          const taken = getRegisteredUsers().some(
            (user) =>
              user.email.trim().toLowerCase() === values.email.trim().toLowerCase(),
          );
          if (taken) {
            pushToast("An account with this email already exists.", "error");
            return;
          }

          const ok = registerUser({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phone: values.phone,
          });
          if (!ok) {
            pushToast("An account with this email already exists.", "error");
            return;
          }
          pushToast("Account created");
          onSuccess();
          router.push("/account");
        })}
      >
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
            {phoneVerified ? (
              <SelectedPhone>
                <span>{digits}</span>
                <Check size={18} strokeWidth={2.4} color="#C6A75E" />
              </SelectedPhone>
            ) : otpMode ? (
              <>
                <OtpShell $error={Boolean(otpError)}>
                  <OtpSlots>
                    {Array.from({ length: 6 }, (_, index) => (
                      <OtpSlot key={index} $filled={Boolean(otp[index])}>
                        {otp[index] || "-"}
                      </OtpSlot>
                    ))}
                    <OtpHidden
                      ref={otpRef}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={otp}
                      aria-label="Enter 6-digit OTP"
                      onChange={(event) => {
                        const next = event.target.value.replace(/\D/g, "").slice(0, 6);
                        setOtp(next);
                        setOtpError("");
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          verifyOtp(otp);
                        }
                        if (event.key === "Backspace" && otp.length === 0) {
                          setOtpMode(false);
                          setOtpError("");
                        }
                      }}
                    />
                  </OtpSlots>
                  <OtpVerify
                    type="button"
                    disabled={otp.length !== 6}
                    onClick={() => verifyOtp(otp)}
                  >
                    Verify
                  </OtpVerify>
                </OtpShell>
                {otpError ? (
                  <Text color="error" style={{ fontSize: "0.75rem" }}>
                    {otpError}
                  </Text>
                ) : (
                  <GhostButton
                    type="button"
                    onClick={() => {
                      setOtpMode(false);
                      setOtp("");
                      setOtpError("");
                    }}
                  >
                    Change number
                  </GhostButton>
                )}
              </>
            ) : (
              <Input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Enter your 10-digit mobile"
                aria-label="Phone number"
                error={errors.phone?.message ?? otpError}
                {...phoneField}
                onChange={(event) => {
                  phoneField.onChange(event);
                  if (phoneDigits(event.target.value).length === 10) {
                    setOtpMode(true);
                    setOtp("");
                    setOtpError("");
                  }
                }}
              />
            )}
          </PhoneBlock>
        </FieldRow>
        <FieldRow>
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password"
            aria-label="Password"
            error={errors.password?.message}
            endAdornment={
              <IconButton
                plain
                label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
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
                onClick={() => setShowConfirmPassword((value) => !value)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </IconButton>
            }
            {...register("confirmPassword")}
          />
        </FieldRow>
        <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </Form>

      <Links style={{ justifyContent: "center" }}>
        <GhostButton type="button" onClick={onLogin}>
          Already have an account? Sign in
        </GhostButton>
      </Links>
    </>
  );
}
