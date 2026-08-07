"use client";

import type { AdminStat } from "@/types/admin";
import { Stat } from "@/features/admin/StatCard.styles";
import { Text } from "@/components/Text/Text";

export function StatCard({ stat }: { stat: AdminStat }) {
  return (
    <Stat>
      <Text variant="eyebrow">{stat.label}</Text>
      <Text as="p" variant="h2">
        {stat.value}
      </Text>
      <Text
        color={
          stat.trend === "up"
            ? "success"
            : stat.trend === "down"
              ? "error"
              : "gray500"
        }
        fontSize="sm"
      >
        {stat.change}
      </Text>
    </Stat>
  );
}
