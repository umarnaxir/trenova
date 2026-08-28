"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import {
  BrandRow,
  ErrorText,
  LoginCard,
  LoginShell,
} from "@/features/admin/AdminLogin.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Text } from "@/components/Text/Text";
import { Logo } from "@/components/Logo/Logo";
import { IconButton } from "@/components/IconButton/IconButton";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { useUiStore } from "@/hooks/stores/uiStore";

export function AdminSetup() {
  const router = useRouter();
  const setupAdmin = useAdminAuthStore((state) => state.setupAdmin);
  const pushToast = useUiStore((state) => state.pushToast);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    
    if (!name || !email || !password) {
      setError("All fields are required");
      setIsSubmitting(false);
      return;
    }

    const result = await setupAdmin(name, email, password);
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    
    pushToast("Admin setup successful! Welcome.");
  }

  return (
    <LoginShell>
      <LoginCard onSubmit={handleSubmit}>
        <BrandRow>
          <Logo height={40} href="/" />
          <Text as="h1" variant="h2">
            Admin Setup
          </Text>
          <Text color="gray600">
            Welcome to your new store! Create the root admin account to get started.
          </Text>
        </BrandRow>

        <Input
          name="name"
          type="text"
          placeholder="Admin Name"
          aria-label="Name"
          required
        />
        
        <Input
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Admin Email"
          aria-label="Email"
          required
        />

        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Secure Password"
          aria-label="Password"
          required
          minLength={6}
          endAdornment={
            <IconButton
              plain
              label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </IconButton>
          }
        />

        {error ? <ErrorText role="alert">{error}</ErrorText> : null}

        <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
          {isSubmitting ? "Creating admin..." : "Complete Setup"}
        </Button>
      </LoginCard>
    </LoginShell>
  );
}
