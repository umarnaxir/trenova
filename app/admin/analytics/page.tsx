"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/features/admin/AdminShell";
import { StatCard } from "@/features/admin/StatCard";
import { Grid } from "@/components/Grid/Grid";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { getAdminStats } from "@/services/admin.service";
import type { AdminStat } from "@/types/admin";
import styled from "styled-components";

const Chart = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  min-height: 240px;
  display: grid;
  align-items: end;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.space[3]};
`;

const Bar = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.gold},
    ${({ theme }) => theme.colors.black}
  );
`;

const bars = [42, 58, 47, 72, 64, 81];

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AdminStat[] | null>(null);

  useEffect(() => {
    getAdminStats().then(setStats);
  }, []);

  return (
    <AdminShell title="Analytics">
      {!stats ? (
        <Loader />
      ) : (
        <>
          <Grid
            gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
            style={{ gap: "1rem", marginBottom: "2rem" }}
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </Grid>
          <Text as="h2" variant="h3" mb={4}>
            Weekly revenue trend
          </Text>
          <Chart aria-label="Revenue chart placeholder">
            {bars.map((height, index) => (
              <Bar key={index} $height={height} />
            ))}
          </Chart>
        </>
      )}
    </AdminShell>
  );
}
