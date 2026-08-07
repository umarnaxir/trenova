"use client";

import { useEffect, useState } from "react";
import type { AdminStat } from "@/types/admin";
import { AdminShell } from "@/features/admin/AdminShell";
import { StatCard } from "@/features/admin/StatCard";
import { Grid } from "@/components/Grid/Grid";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { getAdminStats, getAdminOrders } from "@/services/admin.service";
import { DataTable } from "@/features/admin/DataTable";
import { formatCurrency, formatDate } from "@/utils/format";
import type { Order } from "@/types/user";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStat[] | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    Promise.all([getAdminStats(), getAdminOrders()]).then(
      ([nextStats, nextOrders]) => {
        setStats(nextStats);
        setOrders(nextOrders);
      },
    );
  }, []);

  if (!stats) {
    return (
      <AdminShell title="Dashboard">
        <Loader />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Dashboard">
      <Grid
        gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
        style={{ gap: "1rem", marginBottom: "2rem" }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </Grid>
      <Text as="h2" variant="h3" mb={4}>
        Recent orders
      </Text>
      <DataTable
        rows={orders}
        getRowKey={(row) => row.id}
        columns={[
          {
            key: "order",
            header: "Order",
            render: (row) => row.orderNumber,
          },
          {
            key: "date",
            header: "Date",
            render: (row) => formatDate(row.createdAt),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => row.status,
          },
          {
            key: "total",
            header: "Total",
            render: (row) => formatCurrency(row.total),
          },
        ]}
      />
    </AdminShell>
  );
}
