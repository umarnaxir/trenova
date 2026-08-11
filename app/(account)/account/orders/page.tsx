"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/types/user";
import { Text } from "@/components/Text/Text";
import { Stack } from "@/components/Stack/Stack";
import { Badge } from "@/components/Badge/Badge";
import { Loader } from "@/components/Loader/Loader";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { getUserOrders } from "@/services/user.service";
import { useAuthStore } from "@/hooks/stores/authStore";
import { formatCurrency, formatDate } from "@/utils/format";
import styled from "styled-components";

const OrderCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export default function OrdersPage() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    getUserOrders(user?.id, user?.email).then(setOrders);
  }, [user?.id, user?.email]);

  if (!orders) return <Loader />;

  return (
    <div>
      <Text as="h1" variant="h1" mb={6}>
        Orders
      </Text>
      {!orders.length ? (
        <EmptyState
          title="No orders yet"
          description="Orders you place will show up here."
          actionLabel="Shop now"
          href="/shop"
        />
      ) : (
        <Stack gap={4}>
          {orders.map((order) => (
            <OrderCard key={order.id}>
              <Stack gap={2}>
                <Text as="h2" variant="h3">
                  {order.orderNumber}
                </Text>
                <Text variant="small" color="gray500">
                  Placed {formatDate(order.createdAt)}
                </Text>
                <Badge tone="light">{order.status}</Badge>
              </Stack>
              {order.items.map((item) => (
                <Text key={`${order.id}-${item.productId}-${item.size}`} color="gray600">
                  {item.name} · {item.size}/{item.color} × {item.quantity}
                </Text>
              ))}
              <Text fontWeight={600}>{formatCurrency(order.total)}</Text>
            </OrderCard>
          ))}
        </Stack>
      )}
    </div>
  );
}
