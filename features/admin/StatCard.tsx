"use client";

import type { AdminStat } from "@/types/admin";
import { Stat, StatValue } from "@/features/admin/StatCard.styles";
import { Text } from "@/components/Text/Text";

export function StatCard({
  stat,
  tone = "white",
  delay = 0,
}: {
  stat: AdminStat;
  tone?: "white" | "black";
  delay?: number;
}) {
  const isBlack = tone === "black";
  return (
    <Stat $tone={tone} $delay={delay}>
      <Text variant="eyebrow" color="gold">
        {stat.label}
      </Text>
      <StatValue $onDark={isBlack}>{stat.value}</StatValue>
      <Text
        color={
          stat.trend === "up"
            ? "gold"
            : stat.trend === "down"
              ? "error"
              : isBlack
                ? "gray400"
                : "gray500"
        }
        fontSize="sm"
      >
        {stat.change}
      </Text>
    </Stat>
  );
}
