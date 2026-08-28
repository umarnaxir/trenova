"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import type { AdminStat, AnalyticsPoint } from "@/types/admin";
import { AdminShell } from "@/features/admin/AdminShell";
import { StatCard } from "@/features/admin/StatCard";
import { Grid } from "@/components/Grid/Grid";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import {
  getAdminAnalytics,
  getAdminStats,
  getAdminDashboard,
} from "@/services/admin.service";
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

const growBar = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const ChartContainer = styled.div`
  border: 1px solid rgba(198, 167, 94, 0.35);
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.04);
  position: relative;
  margin-top: 1rem;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ChartBody = styled.div`
  position: relative;
  height: 280px;
  display: flex;
  align-items: flex-end;
  padding-left: 3rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
`;

const YAxis = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 1.75rem;
  width: 2.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 0.5rem;

  span {
    font-size: 0.7rem;
    color: #888;
    font-weight: 500;
  }
`;

const BarsGrid = styled.div<{ $cols: number }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => Math.max($cols, 1)}, 1fr);
  gap: 0.5rem;
  align-items: flex-end;
`;

const BarColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-4px);
  }
`;

const BarFill = styled.div<{ $height: number }>`
  width: 100%;
  max-width: 42px;
  height: ${({ $height }) => Math.max($height, 3)}%;
  background: linear-gradient(180deg, #c6a75e 0%, #0a0a0a 100%);
  border-radius: 4px 4px 0 0;
  transition: all 0.25s ease;

  ${BarColumn}:hover & {
    background: linear-gradient(180deg, #dfc178 0%, #1a1a1a 100%);
    box-shadow: 0 4px 12px rgba(198, 167, 94, 0.4);
    transform: scaleX(1.1);
  }
`;

const XLabel = styled.span`
  position: absolute;
  bottom: -1.5rem;
  font-size: 0.68rem;
  color: #777;
  white-space: nowrap;
`;

const Tooltip = styled.div`
  position: absolute;
  top: -3.5rem;
  background: #0a0a0a;
  color: #ffffff;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 10;
  text-align: center;
  border: 1px solid #c6a75e;

  strong {
    color: #c6a75e;
    display: block;
  }
`;

function RevenueTrendChart({ points }: { points: AnalyticsPoint[] }) {
  const max = Math.max(...points.map((p) => p.value), 1000);
  const mid = Math.round(max / 2);

  return (
    <ChartContainer aria-label="Revenue trend graph">
      <ChartHeader>
        <div>
          <Text as="h2" variant="h3" style={{ marginBottom: "0.25rem" }}>
            Revenue Trend
          </Text>
          <Text color="gray600" variant="small">
            Daily revenue performance overview
          </Text>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "#888" }}>
            Peak: <strong style={{ color: "#0a0a0a" }}>{formatCurrency(max)}</strong>
          </span>
        </div>
      </ChartHeader>

      <ChartBody>
        <YAxis>
          <span>{formatCurrency(max)}</span>
          <span>{formatCurrency(mid)}</span>
          <span>₹0</span>
        </YAxis>

        <BarsGrid $cols={points.length}>
          {points.map((point, index) => {
            const pct = (point.value / max) * 100;
            return (
              <BarColumn key={`${point.label}-${index}`}>
                <Tooltip className="tooltip">
                  <strong>{formatCurrency(point.value)}</strong>
                  <span>{point.label}</span>
                </Tooltip>
                <BarFill $height={pct} />
                <XLabel>{point.label}</XLabel>
              </BarColumn>
            );
          })}
        </BarsGrid>
      </ChartBody>
    </ChartContainer>
  );
}

const MetricCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  padding: 1.25rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span.label {
    font-size: 0.8rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  span.val {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0a0a0a;
  }
`;

const TableCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }

  th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #888;
    font-weight: 600;
  }

  td {
    font-size: 0.9rem;
    color: #111;
  }
`;

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AdminStat[] | null>(null);
  const [points, setPoints] = useState<AnalyticsPoint[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getAdminStats(), getAdminAnalytics(), getAdminDashboard()])
      .then(([nextStats, nextPoints, nextDash]) => {
        setStats(nextStats);
        setPoints(nextPoints);
        setDashboardData(nextDash);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load analytics");
        setStats([]);
      });
  }, []);

  if (error) {
    return (
      <AdminShell title="Analytics">
        <EmptyState title="Unable to load analytics" description={error} />
      </AdminShell>
    );
  }

  if (!stats) {
    return (
      <AdminShell title="Analytics">
        <Loader />
      </AdminShell>
    );
  }

  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <AdminShell title="Analytics">
      <Text color="gray600" mb={5}>
        Real-time end-to-end platform metrics, revenue performance, order distribution, and catalog analytics.
      </Text>

      {/* Primary KPI Grid */}
      <Grid
        gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
        style={{ gap: "1rem", marginBottom: "2rem" }}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            tone="black"
            delay={index * 70}
          />
        ))}
      </Grid>

      {/* Secondary Metrics Grid */}
      {dashboardData && (
        <Grid
          gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
          style={{ gap: "1rem", marginBottom: "2rem" }}
        >
          <MetricCard>
            <span className="label">Avg. Order Value</span>
            <span className="val">{formatCurrency(dashboardData.avgOrderValue || 0)}</span>
          </MetricCard>
          <MetricCard>
            <span className="label">Pending Orders</span>
            <span className="val" style={{ color: "#d97706" }}>
              {dashboardData.pendingOrders || 0}
            </span>
          </MetricCard>
          <MetricCard>
            <span className="label">Delivered Orders</span>
            <span className="val" style={{ color: "#16a34a" }}>
              {dashboardData.deliveredOrders || 0}
            </span>
          </MetricCard>
          <MetricCard>
            <span className="label">Low Stock Alerts</span>
            <span className="val" style={{ color: dashboardData.lowStockCount ? "#dc2626" : "#16a34a" }}>
              {dashboardData.lowStockCount || 0}
            </span>
          </MetricCard>
        </Grid>
      )}

      {/* Revenue Trend Chart */}
      <RevenueTrendChart points={points} />

      {/* Top Best-Selling Products Table */}
      {dashboardData?.topProducts && dashboardData.topProducts.length > 0 && (
        <TableCard>
          <Text as="h2" variant="h3" mb={2}>
            Best-Selling Products
          </Text>
          <Text color="gray600" variant="small">
            Top products ordered by overall customer volume.
          </Text>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product ID</th>
                <th>Total Sold</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.topProducts.map((item: any) => (
                <tr key={item.productId || item.name}>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    <code style={{ fontSize: "0.8rem", color: "#666" }}>{item.productId}</code>
                  </td>
                  <td>
                    <strong>{item.totalSold} units</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>
      )}

      {/* Recent Orders Overview */}
      {dashboardData?.recentOrders && dashboardData.recentOrders.length > 0 && (
        <TableCard>
          <Text as="h2" variant="h3" mb={2}>
            Recent Order Activity
          </Text>
          <Text color="gray600" variant="small">
            Latest customer orders processed through the platform.
          </Text>
          <Table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer</th>
                <th>City</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order: any) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.orderNumber}</strong>
                  </td>
                  <td>{order.fullName}</td>
                  <td>{order.city}</td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        backgroundColor:
                          order.status === "delivered"
                            ? "#dcfce7"
                            : order.status === "cancelled"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          order.status === "delivered"
                            ? "#15803d"
                            : order.status === "cancelled"
                            ? "#b91c1c"
                            : "#b45309",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>
      )}
    </AdminShell>
  );
}
