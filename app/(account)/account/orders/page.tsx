"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Order } from "@/types/user";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Loader } from "@/components/Loader/Loader";
import { getUserOrders } from "@/services/user.service";
import { useAuthStore } from "@/hooks/stores/authStore";
import { formatCurrency, formatDate } from "@/utils/format";
import styled from "styled-components";

const Page = styled.div`
  display: grid;
  gap: 1rem;
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const OrderCard = styled.article`
  display: grid;
  gap: 0.85rem;
  padding: 1.1rem 1.15rem;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 10px 24px rgba(198, 167, 94, 0.12);
  }
`;

const OrderTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
`;

const OrderNumber = styled.h2`
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const Meta = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.gray500};
`;

const Status = styled.span<{ $tone: string }>`
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 0.65rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: ${({ $tone, theme }) => {
    if ($tone === "delivered") return "rgba(2, 122, 72, 0.12)";
    if ($tone === "cancelled") return "rgba(180, 35, 24, 0.12)";
    if ($tone === "shipped") return "rgba(198, 167, 94, 0.18)";
    return theme.colors.gray100;
  }};
  color: ${({ $tone, theme }) => {
    if ($tone === "delivered") return theme.colors.success;
    if ($tone === "cancelled") return theme.colors.error;
    if ($tone === "shipped") return theme.colors.goldDark;
    return theme.colors.gray700;
  }};
`;

const Items = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  gap: 0.65rem;
  align-items: center;
`;

const Thumb = styled.div`
  position: relative;
  width: 48px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.offWhite};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  img {
    object-fit: contain;
  }
`;

const ItemMeta = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  span {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.35rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: 0.85rem;

  strong {
    font-size: 1rem;
  }
`;

const TrackLink = styled.a`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ShipBlock = styled.div`
  display: grid;
  gap: 0.2rem;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.offWhite};
  border: 1px solid ${({ theme }) => theme.colors.gray200};

  span {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray500};
  }

  p {
    margin: 0;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray700};
    line-height: 1.45;
  }
`;

export default function OrdersPage() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    getUserOrders(user?.id, user?.email).then(setOrders);
  }, [user?.id, user?.email]);

  if (!orders) return <Loader />;

  return (
    <Page>
      <Title>Orders</Title>
      {!orders.length ? (
        <EmptyState
          title="No orders yet"
          description="Orders you place will show up here."
          actionLabel="Shop now"
          href="/shop"
        />
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderTop>
              <div>
                <OrderNumber>{order.orderNumber}</OrderNumber>
                <Meta>Placed {formatDate(order.createdAt)}</Meta>
              </div>
              <Status $tone={order.status}>{order.status}</Status>
            </OrderTop>

            <Items>
              {order.items.map((item) => (
                <Item key={`${order.id}-${item.productId}-${item.size}`}>
                  <Thumb>
                    <Image src={item.image} alt={item.name} fill sizes="48px" />
                  </Thumb>
                  <ItemMeta>
                    <strong>{item.name}</strong>
                    <span>
                      {item.size} / {item.color} · Qty {item.quantity}
                    </span>
                  </ItemMeta>
                  <strong style={{ fontSize: "0.8rem" }}>
                    {formatCurrency(item.price * item.quantity)}
                  </strong>
                </Item>
              ))}
            </Items>

            {order.shippingAddress ? (
              <ShipBlock>
                <span>Delivery address</span>
                <p>{order.shippingAddress.fullName}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
                {order.shippingAddress.alternatePhone ? (
                  <p>
                    Alternate phone: {order.shippingAddress.alternatePhone}
                  </p>
                ) : null}
                <p>
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2
                    ? `, ${order.shippingAddress.line2}`
                    : ""}
                </p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </ShipBlock>
            ) : null}

            <Total>
              <TrackLink href="/track-order">Track this order</TrackLink>
              <strong>{formatCurrency(order.total)}</strong>
            </Total>
          </OrderCard>
        ))
      )}
    </Page>
  );
}
