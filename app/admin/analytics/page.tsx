"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import type { AdminStat, AnalyticsPoint } from "@/types/admin";
import { AdminShell } from "@/features/admin/AdminShell";
import { StatCard } from "@/features/admin/StatCard";
import { Grid } from "@/components/Grid/Grid";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { getAdminAnalytics, getAdminStats } from "@/services/admin.service";

const Chart = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[5]};
  min-height: 280px;
  display: grid;
  align-items: end;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.space[3]};
`;

const BarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  height: 100%;
  justify-content: flex-end;
`;

const Bar = styled.div<{ $height: number }>`
  width: 100%;
  max-width: 48px;
  height: ${({ $height }) => $height}%;
  min-height: 8px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.gold},
    ${({ theme }) => theme.colors.black}
  );
  transition: height ${({ theme }) => theme.transitions.slow};
`;

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AdminStat[] | null>(null);
  const [points, setPoints] = useState<AnalyticsPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getAdminStats(), getAdminAnalytics()])
      .then(([nextStats, nextPoints]) => {
        setStats(nextStats);
        setPoints(nextPoints);
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
        Performance overview derived from current admin catalog and order data.
      </Text>
      <Grid
        gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
        style={{ gap: "1rem", marginBottom: "2rem" }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </Grid>
      <Text as="h2" variant="h3" mb={4}>
        Revenue trend
      </Text>
      <Chart aria-label="Revenue chart">
        {points.map((point) => (
          <BarWrap key={point.label}>
            <Bar $height={(point.value / max) * 100} title={String(point.value)} />
            <Text color="gray500" variant="eyebrow">
              {point.label}
            </Text>
          </BarWrap>
        ))}
      </Chart>
    </AdminShell>
  );
}
