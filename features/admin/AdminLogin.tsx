"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, X } from "lucide-react";
import {
  BrandRow,
  CloseWrap,
  ErrorText,
  LoginCard,
  LoginShell,
} from "@/features/admin/AdminLogin.styles";
import {
  adminLoginSchema,
  type AdminLoginFormValues,
} from "@/features/admin/adminLoginSchema";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { Logo } from "@/components/Logo/Logo";
import { IconButton } from "@/components/IconButton/IconButton";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { useUiStore } from "@/hooks/stores/uiStore";

export function AdminLogin() {
  const router = useRouter();
  const login = useAdminAuthStore((state) => state.login);
  const pushToast = useUiStore((state) => state.pushToast);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  return (
    <LoginShell>
      <LoginCard
        onSubmit={handleSubmit(async (values) => {
          setError(null);
          const result = login(values.email, values.password);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          pushToast("Welcome to Admin");
        })}
      >
        <CloseWrap>
          <IconButton
            label="Close and go to home"
            onClick={() => router.push("/")}
          >
            <X size={18} />
          </IconButton>
        </CloseWrap>

        <BrandRow>
          <Logo height={40} href="/" />
          <Text as="h1" variant="h2">
            Admin Login
          </Text>
          <Text color="gray600">
            Sign in to manage catalog, orders, and store operations.
          </Text>
        </BrandRow>

        <Input
          type="email"
          autoComplete="username"
          placeholder="Enter your email"
          aria-label="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter your password"
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
        {error ? <ErrorText role="alert">{error}</ErrorText> : null}
        <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </LoginCard>
    </LoginShell>
  );
}
