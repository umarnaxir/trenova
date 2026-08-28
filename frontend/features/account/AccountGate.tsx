"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/stores/authStore";
import { Loader } from "@/components/Loader/Loader";
import { EmptyState } from "@/components/EmptyState/EmptyState";

export function AccountGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    setHydrated(useAuthStore.persist.hasHydrated());
    return unsub;
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) return <Loader />;

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
