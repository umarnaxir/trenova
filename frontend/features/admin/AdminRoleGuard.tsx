"use client";

import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/hooks/stores/adminAuthStore";
import { AdminShell } from "@/features/admin/AdminShell";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import type { AdminRole } from "@/types/admin";

type AdminRoleGuardProps = {
  children: React.ReactNode;
  requiredRole?: AdminRole;
  fallbackTitle?: string;
};

export function AdminRoleGuard({
  children,
  requiredRole = "Admin",
  fallbackTitle = "Access Restricted",
}: AdminRoleGuardProps) {
  const router = useRouter();
  const admin = useAdminAuthStore((state) => state.admin);

  const role = admin?.role ? String(admin.role).trim().toLowerCase() : "";
  const reqRole = requiredRole.trim().toLowerCase();

  const isAllowed =
    reqRole === "editor"
      ? role === "admin" || role === "editor" || role === "superadmin"
      : role === "admin" || role === "superadmin";

  if (!isAllowed) {
    return (
      <AdminShell title={fallbackTitle}>
        <EmptyState
          title="Access Restricted"
          description="You do not have permission to view or manage this section. This page is accessible by Administrators only."
          actionLabel="Back to Dashboard"
          onAction={() => router.replace("/admin")}
        />
      </AdminShell>
    );
  }

  return <>{children}</>;
}
