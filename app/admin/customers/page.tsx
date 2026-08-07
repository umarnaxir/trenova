"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminCustomers } from "@/services/admin.service";
import { formatCurrency, formatDate } from "@/utils/format";
import type { AdminCustomer } from "@/types/admin";

export default function AdminCustomersPage() {
  const load = useCallback(() => getAdminCustomers(), []);

  return (
    <AdminPage<AdminCustomer>
      title="Customers"
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        { key: "email", header: "Email", render: (row) => row.email },
        { key: "orders", header: "Orders", render: (row) => row.orders },
        {
          key: "spent",
          header: "Spent",
          render: (row) => formatCurrency(row.spent),
        },
        {
          key: "joined",
          header: "Joined",
          render: (row) => formatDate(row.joinedAt),
        },
      ]}
    />
  );
}
