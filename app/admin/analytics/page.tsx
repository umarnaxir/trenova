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
import { getAdminAnalytics, getAdminStats } from "@/services/admin.service";

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

const Chart = styled.div`
  border: 1px solid rgba(198, 167, 94, 0.35);
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[5]};
  min-height: 280px;
  display: grid;
  align-items: end;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.space[3]};
  box-shadow: 0 8px 24px rgba(10, 10, 10, 0.04);
  transform: translateY(0);
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease,
    border-color 0.28s ease;
  animation: ${riseIn} 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 220ms;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 16px 34px rgba(10, 10, 10, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const BarWrap = styled.div<{ $delay?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  height: 100%;
  justify-content: flex-end;
  animation: ${riseIn} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${({ $delay = 0 }) => `${$delay}ms`};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Bar = styled.div<{ $height: number; $delay?: number }>`
  width: 100%;
  max-width: 48px;
  height: ${({ $height }) => $height}%;
  min-height: 8px;
  transform-origin: bottom;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.gold},
    ${({ theme }) => theme.colors.black}
  );
  transition:
    height ${({ theme }) => theme.transitions.slow},
    filter 0.25s ease,
    transform 0.25s ease;
  animation: ${growBar} 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: ${({ $delay = 0 }) => `${$delay}ms`};

  ${BarWrap}:hover & {
    filter: brightness(1.12);
    transform: scaleX(1.08);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            tone="black"
            delay={index * 70}
          />
        ))}
      </Grid>
      <Text as="h2" variant="h3" mb={4}>
        Revenue trend
      </Text>
      <Chart aria-label="Revenue chart">
        {points.map((point, index) => (
          <BarWrap key={point.label} $delay={260 + index * 70}>
            <Bar
              $height={(point.value / max) * 100}
              $delay={280 + index * 80}
              title={String(point.value)}
            />
            <Text color="gray500" variant="eyebrow">
              {point.label}
            </Text>
          </BarWrap>
        ))}
      </Chart>
    </AdminShell>
  );
}
