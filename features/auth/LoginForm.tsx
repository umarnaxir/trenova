"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AuthCard, AuthLinks } from "@/features/auth/AuthForm.styles";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/loginSchema";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const pushToast = useUiStore((state) => state.pushToast);
  const openAuthModal = useUiStore((state) => state.openAuthModal);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  return (
    <AuthCard
      as="form"
      onSubmit={handleSubmit(async (values) => {
        const ok = login(values.email, values.password);
        if (!ok) {
          pushToast(
            "Unable to sign in. Account may be deactivated for deletion or credentials are incorrect.",
            "error",
          );
          return;
        }
        pushToast("Welcome back");
        router.push("/account");
      })}
    >
      <Text as="h1" variant="h2">
        Login
      </Text>
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
      <AuthLinks>
        <a
          href="/register"
          onClick={(event) => {
            event.preventDefault();
            openAuthModal("register");
          }}
        >
          Create account
        </a>
        <a href="/forgot-password">Forgot password</a>
      </AuthLinks>
    </AuthCard>
  );
}
