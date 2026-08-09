"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
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
  const setLoginDrawerOpen = useUiStore((state) => state.setLoginDrawerOpen);
  const login = useAuthStore((state) => state.login);
  const pushToast = useUiStore((state) => state.pushToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const close = () => {
    setLoginDrawerOpen(false);
    reset();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLoginDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setLoginDrawerOpen]);

  if (!isClient || !open) return null;

  return createPortal(
    <Overlay onClick={close} role="presentation">
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-label="Login"
        onClick={(event) => event.stopPropagation()}
      >
        <Header>
          <Stack gap={2}>
            <Text as="h2" variant="h2">
              Login
            </Text>
            <Text color="gray600">
              Sign in to track orders, manage wishlist, and checkout faster.
            </Text>
          </Stack>
          <IconButton label="Close login" onClick={close}>
            <X size={18} />
          </IconButton>
        </Header>

        <Form
          onSubmit={handleSubmit(async (values) => {
            login(values.email, values.password);
            pushToast("Welcome back");
            close();
            router.push("/account");
          })}
        >
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </Form>

        <Links>
          <a href="/forgot-password" onClick={close}>
            Forgot password?
          </a>
        </Links>

        <Divider>or</Divider>

        <Button
          as="a"
          href="/register"
          variant="secondary"
          fullWidth
          size="lg"
          onClick={close}
          style={{ marginTop: 20 }}
        >
          Create account
        </Button>
      </Dialog>
    </Overlay>,
    document.body,
  );
}
