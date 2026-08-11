"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminUser } from "@/types/admin";
import {
  getAdminUsers,
  updateAdminUserStatus,
} from "@/services/admin.service";
import { AdminShell } from "@/features/admin/AdminShell";
import { DataTable } from "@/features/admin/DataTable";
import {
  AdminPagination,
  ADMIN_PAGE_SIZE,
  paginateItems,
} from "@/features/admin/AdminPagination";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Modal } from "@/components/Modal/Modal";
import { Stack } from "@/components/Stack/Stack";
import { formatCurrency, formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useAdminUiStore } from "@/hooks/stores/adminUiStore";

export default function AdminUsersPage() {
  const pushToast = useUiStore((state) => state.pushToast);
  const query = useAdminUiStore((state) => state.globalSearchQuery);
  const [rows, setRows] = useState<AdminUser[] | null>(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const next = await getAdminUsers();
    setRows(next);
  }, []);

  useEffect(() => {
    load().catch((err: unknown) => {
      setRows([]);
      pushToast(err instanceof Error ? err.message : "Failed to load users", "error");
    });
  }, [load, pushToast]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      `${row.name} ${row.email} ${row.phone} ${row.location}`
        .toLowerCase()
        .includes(q),
    );
  }, [rows, query]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / ADMIN_PAGE_SIZE));
    if (page > totalPages) setPage(totalPages);
  }, [filtered.length, page]);

  const paged = useMemo(
    () => paginateItems(filtered, page, ADMIN_PAGE_SIZE),
    [filtered, page],
  );

  if (!rows) {
    return (
      <AdminShell title="Users">
        <Loader />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Users">
      <Text color="gray600" mb={4}>
        Registered storefront accounts from login and register.
      </Text>

      {!filtered.length ? (
        <EmptyState
          title={query.trim() ? "No matches" : "No users yet"}
          description={
            query.trim()
              ? "Try a different search in the header."
              : "Users appear here when they register or log in on the storefront."
          }
        />
      ) : (
        <>
          <DataTable
            rows={paged}
            getRowKey={(row) => row.id}
            onView={(row) => setSelected(row)}
            columns={[
              { key: "name", header: "Name", render: (row) => row.name },
              { key: "email", header: "Email", render: (row) => row.email },
              { key: "phone", header: "Phone", render: (row) => row.phone },
              {
                key: "location",
                header: "Location",
                render: (row) => row.location,
              },
              {
                key: "status",
                header: "Status",
                render: (row) => (
                  <StatusPill
                    $tone={row.status === "active" ? "success" : "neutral"}
                  >
                    {row.status}
                  </StatusPill>
                ),
              },
              {
                key: "orders",
                header: "Orders",
                render: (row) => row.totalOrders,
              },
            ]}
          />
          <AdminPagination
            page={page}
            pageSize={ADMIN_PAGE_SIZE}
            total={filtered.length}
            onPageChange={setPage}
          />
        </>
      )}

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : "User"}
      >
        {selected ? (
          <Stack gap={4}>
            <Stack gap={1}>
              <Text variant="small" color="gray500">
                Account
              </Text>
              <Text>
                {selected.email} · {selected.phone}
              </Text>
              <Text color="gray600">{selected.location}</Text>
              <Text variant="small" color="gray500">
                Joined {formatDate(selected.createdAt)} · Last login{" "}
                {formatDate(selected.lastLoginAt)}
              </Text>
              <StatusPill
                $tone={selected.status === "active" ? "success" : "neutral"}
              >
                {selected.status}
              </StatusPill>
            </Stack>

            <Stack gap={2}>
              <Text as="h3" variant="h3">
                Orders
              </Text>
              {!selected.orders.length ? (
                <Text color="gray500">No orders for this user.</Text>
              ) : (
                selected.orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      border: "1px solid #E8E8E8",
                      padding: "0.75rem 1rem",
                    }}
                  >
                    <Text variant="h3">{order.orderNumber}</Text>
                    <Text variant="small" color="gray500">
                      {formatDate(order.createdAt)} · {order.status} ·{" "}
                      {order.itemCount} items · {formatCurrency(order.total)}
                    </Text>
                  </div>
                ))
              )}
            </Stack>

            {selected.addresses.length ? (
              <Stack gap={2}>
                <Text as="h3" variant="h3">
                  Addresses
                </Text>
                {selected.addresses.map((address) => (
                  <Text key={address.id} color="gray600">
                    {address.label}: {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city},{" "}
                    {address.state} {address.postalCode}
                  </Text>
                ))}
              </Stack>
            ) : null}

            <Button
              type="button"
              variant="secondary"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  const nextStatus =
                    selected.status === "active" ? "inactive" : "active";
                  await updateAdminUserStatus(selected.id, nextStatus);
                  pushToast(`User marked ${nextStatus}`);
                  setSelected(null);
                  await load();
                } catch (err) {
                  pushToast(
                    err instanceof Error ? err.message : "Update failed",
                    "error",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              Mark {selected.status === "active" ? "inactive" : "active"}
            </Button>
          </Stack>
        ) : null}
      </Modal>
    </AdminShell>
  );
}
