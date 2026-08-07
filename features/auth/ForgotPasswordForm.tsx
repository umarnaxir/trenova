"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard, AuthLinks } from "@/features/auth/AuthForm.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { useUiStore } from "@/hooks/stores/uiStore";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const pushToast = useUiStore((state) => state.pushToast);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <AuthCard
      as="form"
      onSubmit={handleSubmit(async () => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        pushToast("Reset link sent if the account exists");
        reset();
      })}
    >
      <Text as="h1" variant="h2">
        Forgot password
      </Text>
      <Text color="gray600">
        Enter your email and we will send reset instructions.
      </Text>
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? "Sending..." : "Send reset link"}
      </Button>
      <AuthLinks>
        <a href="/login">Back to login</a>
      </AuthLinks>
    </AuthCard>
  );
}
