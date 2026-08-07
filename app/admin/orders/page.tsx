"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminOrders } from "@/services/admin.service";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Order } from "@/types/user";

export default function AdminOrdersPage() {
  const load = useCallback(() => getAdminOrders(), []);

  return (
    <AdminPage<Order>
      title="Orders"
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        {
          key: "number",
          header: "Order",
          render: (row) => row.orderNumber,
        },
        {
          key: "date",
          header: "Date",
          render: (row) => formatDate(row.createdAt),
        },
        { key: "status", header: "Status", render: (row) => row.status },
        {
          key: "items",
          header: "Items",
          render: (row) => row.items.length,
        },
        {
          key: "total",
          header: "Total",
          render: (row) => formatCurrency(row.total),
        },
      ]}
    />
  );
}
