"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import type { AdminDashboardData } from "@/services/mock/adminRepository";
import type { Order } from "@/types/user";
import { AdminShell } from "@/features/admin/AdminShell";
import { StatCard } from "@/features/admin/StatCard";
import { DataTable } from "@/features/admin/DataTable";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { Grid } from "@/components/Grid/Grid";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Button } from "@/components/Button/Button";
import { getAdminDashboard } from "@/services/admin.service";
import { formatCurrency, formatDate } from "@/utils/format";

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space[8]};
`;

const QuickLinks = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const InsightGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: ${({ theme }) => theme.space[8]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const InsightCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[4]};
`;

const InsightValue = styled.p`
  margin: 0 0 ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const InsightLabel = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`;

function statusTone(status: Order["status"]) {
  if (status === "delivered") return "success" as const;
  if (status === "cancelled") return "danger" as const;
  if (status === "shipped" || status === "confirmed") return "warning" as const;
  return "neutral" as const;
}

function stockTone(status: string) {
  if (status === "In Stock") return "success" as const;
  if (status === "Low") return "warning" as const;
  return "danger" as const;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminDashboard()
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      });
  }, []);

  if (error) {
    return (
      <AdminShell title="Dashboard">
        <EmptyState title="Unable to load dashboard" description={error} />
      </AdminShell>
    );
  }

  if (!data) {
    return (
      <AdminShell title="Dashboard">
        <Loader />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Dashboard">
      <Text color="gray600" mb={5}>
        Overview of storefront performance, catalog placement, and operations.
      </Text>

      <Grid
        gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
        style={{ gap: "1rem", marginBottom: "2rem" }}
      >
        {data.stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </Grid>

      <InsightGrid>
        <InsightCard>
          <InsightValue>{data.pendingOrders}</InsightValue>
          <InsightLabel>Pending orders</InsightLabel>
        </InsightCard>
        <InsightCard>
          <InsightValue>{data.featuredCount}</InsightValue>
          <InsightLabel>Featured products</InsightLabel>
        </InsightCard>
        <InsightCard>
          <InsightValue>{data.bestSellerCount}</InsightValue>
          <InsightLabel>Best sellers</InsightLabel>
        </InsightCard>
        <InsightCard>
          <InsightValue>{data.lowStock.length}</InsightValue>
          <InsightLabel>Low / out stock</InsightLabel>
        </InsightCard>
        <InsightCard>
          <InsightValue>{data.reviewCount}</InsightValue>
          <InsightLabel>Reviews</InsightLabel>
        </InsightCard>
        <InsightCard>
          <InsightValue>{data.couponCount}</InsightValue>
          <InsightLabel>Active coupons</InsightLabel>
        </InsightCard>
      </InsightGrid>

      <QuickLinks>
        <Button as={Link} href="/admin/products" variant="secondary">
          Manage products
        </Button>
        <Button as={Link} href="/admin/orders" variant="secondary">
          Fulfill orders
        </Button>
        <Button as={Link} href="/admin/instagram" variant="secondary">
          Edit Instagram
        </Button>
        <Button as={Link} href="/admin/inventory" variant="secondary">
          Check inventory
        </Button>
      </QuickLinks>

      <Section>
        <Text as="h2" variant="h3" mb={4}>
          Recent orders
        </Text>
        {data.recentOrders.length === 0 ? (
          <EmptyState title="No orders yet" description="New orders will appear here." />
        ) : (
          <DataTable
            rows={data.recentOrders}
            getRowKey={(row) => row.id}
            columns={[
              {
                key: "order",
                header: "Order",
                render: (row) => row.orderNumber,
              },
              {
                key: "customer",
                header: "Customer",
                render: (row) => row.shippingAddress.fullName,
              },
              {
                key: "date",
                header: "Date",
                render: (row) => formatDate(row.createdAt),
              },
              {
                key: "status",
                header: "Status",
                render: (row) => (
                  <StatusPill $tone={statusTone(row.status)}>{row.status}</StatusPill>
                ),
              },
              {
                key: "total",
                header: "Total",
                render: (row) => formatCurrency(row.total),
              },
            ]}
          />
        )}
      </Section>

      <Section>
        <Text as="h2" variant="h3" mb={4}>
          Low stock alerts
        </Text>
        {data.lowStock.length === 0 ? (
          <EmptyState
            title="Inventory looks healthy"
            description="No low or out-of-stock SKUs right now."
          />
        ) : (
          <DataTable
            rows={data.lowStock}
            getRowKey={(row) => row.id}
            columns={[
              { key: "name", header: "Product", render: (row) => row.name },
              { key: "sku", header: "SKU", render: (row) => row.sku },
              { key: "stock", header: "Qty", render: (row) => row.stock },
              {
                key: "status",
                header: "Status",
                render: (row) => (
                  <StatusPill $tone={stockTone(row.status)}>{row.status}</StatusPill>
                ),
              },
            ]}
          />
        )}
      </Section>
    </AdminShell>
  );
}
