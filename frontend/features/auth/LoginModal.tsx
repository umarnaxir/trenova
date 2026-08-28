"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, X } from "lucide-react";
import {
  CloseWrap,
  Dialog,
  Divider,
  Form,
  Header,
  Links,
  Overlay,
} from "@/features/auth/LoginModal.styles";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/loginSchema";
import { RegisterPanel } from "@/features/auth/RegisterPanel";
import { Text } from "@/components/Text/Text";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { IconButton } from "@/components/IconButton/IconButton";
import { Stack } from "@/components/Stack/Stack";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useIsClient } from "@/hooks/useIsClient";

export function LoginModal() {
  const isClient = useIsClient();
  const router = useRouter();
  const open = useUiStore((state) => state.loginDrawerOpen);
  const view = useUiStore((state) => state.authModalView);
  const setLoginDrawerOpen = useUiStore((state) => state.setLoginDrawerOpen);
  const setAuthModalView = useUiStore((state) => state.setAuthModalView);
  const login = useAuthStore((state) => state.login);
  const pushToast = useUiStore((state) => state.pushToast);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const dismiss = () => {
    setLoginDrawerOpen(false);
    reset();
    setShowPassword(false);
  };

  const closeToHome = () => {
    dismiss();
    router.push("/");
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setLoginDrawerOpen(false);
      reset();
      setShowPassword(false);
      router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, reset, router, setLoginDrawerOpen]);

  if (!isClient || !open) return null;

  const isRegister = view === "register";
  const title = isRegister ? "Create account" : "Login";
  const subtitle = isRegister
    ? "Fill in your details and verify your mobile number to continue."
    : "Sign in to track orders, manage wishlist, and checkout faster.";

  return createPortal(
    <Overlay onClick={closeToHome} role="presentation">
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label={title}
        $wide={isRegister}
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Stack gap={2}>
            <Text as="h2" variant="h2">
              {title}
            </Text>
            <Text color="gray600">{subtitle}</Text>
          </Stack>
          <CloseWrap>
            <IconButton label="Close" onClick={closeToHome}>
              <X size={18} />
            </IconButton>
          </CloseWrap>
        </Header>

        {isRegister ? (
          <RegisterPanel
            onSuccess={dismiss}
            onLogin={() => setAuthModalView("login")}
          />
        ) : (
          <>
            <Form
              onSubmit={handleSubmit(async (values) => {
                const ok = await login(values.email, values.password);
                if (!ok) {
                  pushToast(
                    "Unable to sign in. Account may be deactivated for deletion or credentials are incorrect.",
                    "error",
                  );
                  return;
                }
                pushToast("Welcome back");
                dismiss();
                router.push("/account");
              })}
            >
              <Input
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                aria-label="Email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
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
              <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </Form>

            <Links>
              <a href="/forgot-password" onClick={dismiss}>
                Forgot password?
              </a>
            </Links>

            <Divider>or</Divider>

            <Button
              type="button"
              variant="secondary"
              fullWidth
              size="lg"
              onClick={() => setAuthModalView("register")}
              style={{ marginTop: 20 }}
            >
              Create account
            </Button>
          </>
        )}
      </Dialog>
    </Overlay>,
    document.body,
  );
}
