"use client";

import { useEffect } from "react";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { AdminLogin } from "@/features/admin/AdminLogin";
import { AdminSetup } from "@/features/admin/AdminSetup";
import { Loader } from "@/components/Loader/Loader";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const hydrated = useAdminAuthStore((state) => state.hydrated);
  const setHydrated = useAdminAuthStore((state) => state.setHydrated);
  const needsSetup = useAdminAuthStore((state) => state.needsSetup);
  const checkSetupStatus = useAdminAuthStore((state) => state.checkSetupStatus);

  useEffect(() => {
    // Persist may already be done before mount in some environments.
    if (useAdminAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
  }, [setHydrated]);
  
  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      checkSetupStatus();
    }
  }, [hydrated, isAuthenticated, checkSetupStatus]);

  if (!hydrated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (needsSetup) {
    return <AdminSetup />;
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
}
