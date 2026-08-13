"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import type { AdminDashboardData } from "@/services/admin.service";
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

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space[7]};
`;

const SectionHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const Split = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[7]};

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: start;
  }
`;

const InsightGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: ${({ theme }) => theme.space[7]};

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const InsightCard = styled.div<{ $delay?: number }>`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.black} 0%,
    #171717 100%
  );
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[4]};
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.12);
  transform: translateY(0);
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease,
    border-color 0.28s ease;
  animation: ${riseIn} 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${({ $delay = 0 }) => `${$delay}ms`};

  &::after {
    content: "";
    position: absolute;
    inset: auto -18% -45% auto;
    width: 80px;
    height: 80px;
    border-radius: 999px;
    background: rgba(198, 167, 94, 0.16);
    transition: transform 0.35s ease, background 0.35s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 16px 32px rgba(10, 10, 10, 0.22);

    &::after {
      transform: scale(1.4);
      background: rgba(198, 167, 94, 0.28);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const InsightValue = styled.p`
  margin: 0 0 ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.gold};
  position: relative;
  z-index: 1;
`;

const InsightLabel = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray300};
  position: relative;
  z-index: 1;
`;

const Panel = styled.div<{ $tone?: "white" | "black"; $delay?: number }>`
  border: 1px solid
    ${({ theme, $tone }) =>
      $tone === "black" ? theme.colors.black : "rgba(198, 167, 94, 0.35)"};
  background: ${({ theme, $tone }) =>
    $tone === "black"
      ? `linear-gradient(145deg, ${theme.colors.black} 0%, #171717 100%)`
      : theme.colors.white};
  color: ${({ theme, $tone }) =>
    $tone === "black" ? theme.colors.white : theme.colors.black};
  padding: ${({ theme }) => theme.space[5]};
  min-height: 100%;
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.08);
  transform: translateY(0);
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease,
    border-color 0.28s ease;
  animation: ${riseIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${({ $delay = 0 }) => `${$delay}ms`};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 16px 34px rgba(10, 10, 10, 0.14);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const PanelTitle = styled.h3<{ $tone?: "white" | "black" }>`
  margin: 0 0 ${({ theme }) => theme.space[4]};
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
  font-weight: 700;
`;

const MetricList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[3]};
  align-items: baseline;
  padding-bottom: ${({ theme }) => theme.space[3]};
  border-bottom: 1px solid rgba(198, 167, 94, 0.22);

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  strong {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 700;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.colors.black};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.gray600};
  }
`;

const QuickLinks = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  a,
  button {
    border-color: ${({ theme }) => theme.colors.gold} !important;
    background: transparent !important;
    color: ${({ theme }) => theme.colors.gold} !important;
  }

  a:hover,
  button:hover {
    background: ${({ theme }) => theme.colors.gold} !important;
    color: ${({ theme }) => theme.colors.black} !important;
  }
`;

function statusTone(status: Order["status"]) {
  if (status === "delivered") return "success" as const;
  if (status === "cancelled") return "danger" as const;
  if (status === "shipped" || status === "confirmed") return "warning" as const;
  return "neutral" as const;
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

  const insights: { label: string; value: string | number }[] = [
    { label: "Pending orders", value: data.pendingOrders },
    { label: "Delivered", value: data.deliveredOrders },
    { label: "Cancelled", value: data.cancelledOrders },
    { label: "Stock alerts", value: data.lowStockCount },
    { label: "Featured", value: data.featuredCount },
    { label: "Best sellers", value: data.bestSellerCount },
    { label: "New arrivals", value: data.newArrivalCount },
    { label: "On sale", value: data.onSaleCount },
  ];

  return (
    <AdminShell title="Dashboard">
      <Text color="gray700" mb={5}>
        Command center for catalog, orders, customers, and store operations.
      </Text>

      <Grid
        gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
        style={{ gap: "1rem", marginBottom: "1.75rem" }}
      >
        {data.stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            tone="black"
            delay={index * 70}
          />
        ))}
      </Grid>

      <InsightGrid>
        {insights.map((item, index) => (
          <InsightCard key={item.label} $delay={180 + index * 60}>
            <InsightValue>{item.value}</InsightValue>
            <InsightLabel>{item.label}</InsightLabel>
          </InsightCard>
        ))}
      </InsightGrid>

      <Split>
        <Panel $delay={320}>
          <PanelTitle>Business snapshot</PanelTitle>
          <MetricList>
            <MetricRow>
              <span>Total revenue</span>
              <strong>{formatCurrency(data.totalRevenue)}</strong>
            </MetricRow>
            <MetricRow>
              <span>Avg order value</span>
              <strong>{formatCurrency(data.avgOrderValue)}</strong>
            </MetricRow>
            <MetricRow>
              <span>Products live</span>
              <strong>{data.productCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>Inventory units</span>
              <strong>{data.inventoryUnits}</strong>
            </MetricRow>
            <MetricRow>
              <span>Registered users</span>
              <strong>{data.userCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>Active coupons</span>
              <strong>{data.couponCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>Team members</span>
              <strong>{data.teamCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>Unread alerts</span>
              <strong>{data.unreadNotifications}</strong>
            </MetricRow>
          </MetricList>
        </Panel>

        <Panel $tone="black" $delay={380}>
          <PanelTitle $tone="black">Quick actions</PanelTitle>
          <QuickLinks>
            <Button as={Link} href="/admin/products" variant="secondary">
              Products
            </Button>
            <Button as={Link} href="/admin/orders" variant="secondary">
              Orders
            </Button>
            <Button as={Link} href="/admin/users" variant="secondary">
              Users
            </Button>
            <Button as={Link} href="/admin/inventory" variant="secondary">
              Inventory
            </Button>
            <Button as={Link} href="/admin/coupons" variant="secondary">
              Coupons
            </Button>
            <Button as={Link} href="/admin/settings" variant="secondary">
              Settings
            </Button>
          </QuickLinks>
          <Text color="gray400" mt={5} fontSize="sm">
            Jump into the modules your storefront depends on — catalog,
            fulfillment, and growth tools.
          </Text>
        </Panel>
      </Split>

      <Section>
        <SectionHead>
          <Text as="h2" variant="h3">
            Recent orders
          </Text>
          <Button as={Link} href="/admin/orders" size="sm" variant="secondary">
            View all orders
          </Button>
        </SectionHead>
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
    </AdminShell>
  );
}
