"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/stores/authStore";
import { useIsClient } from "@/hooks/useIsClient";
import { Loader } from "@/components/Loader/Loader";
import { EmptyState } from "@/components/EmptyState/EmptyState";

export function AccountGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isClient = useIsClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isClient) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isClient, router]);

  if (!isClient) return <Loader />;

  if (!isAuthenticated) {
    return (
      <EmptyState
        title="Sign in required"
        description="Log in to view your account."
        actionLabel="Login"
        href="/login"
      />
    );
  }

  return <>{children}</>;
}
