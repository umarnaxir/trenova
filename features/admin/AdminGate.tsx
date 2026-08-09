"use client";

import { useEffect } from "react";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { AdminLogin } from "@/features/admin/AdminLogin";
import { Loader } from "@/components/Loader/Loader";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const hydrated = useAdminAuthStore((state) => state.hydrated);
  const setHydrated = useAdminAuthStore((state) => state.setHydrated);

  useEffect(() => {
    // Persist may already be done before mount in some environments.
    if (useAdminAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }
  }, [setHydrated]);

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

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
}
