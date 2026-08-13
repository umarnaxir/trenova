"use client";

import { useRouter } from "next/navigation";
import { RegisterPanel } from "@/features/auth/RegisterPanel";
import { useUiStore } from "@/hooks/stores/uiStore";

export function RegisterForm() {
  const router = useRouter();
  const openAuthModal = useUiStore((state) => state.openAuthModal);

  return (
    <RegisterPanel
      onSuccess={() => router.push("/account")}
      onLogin={() => openAuthModal("login")}
    />
  );
}
