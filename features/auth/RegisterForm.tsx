"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AuthCard, AuthLinks } from "@/features/auth/AuthForm.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useUiStore } from "@/hooks/stores/uiStore";

const schema = z
  .object({
    firstName: z.string().min(2, "Enter first name"),
    lastName: z.string().min(2, "Enter last name"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(10, "Enter a valid phone number").optional().or(z.literal("")),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const registerUser = useAuthStore((state) => state.register);
  const pushToast = useUiStore((state) => state.pushToast);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <AuthCard
      as="form"
      onSubmit={handleSubmit(async (values) => {
        registerUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phone: values.phone || undefined,
        });
        pushToast("Account created");
        router.push("/account");
      })}
    >
      <Text as="h1" variant="h2">
        Create account
      </Text>
      <Input
        label="First name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />
      <Input
        label="Last name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Phone"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="Confirm password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? "Creating..." : "Register"}
      </Button>
      <AuthLinks>
        <a href="/login">Already have an account?</a>
      </AuthLinks>
    </AuthCard>
  );
}
