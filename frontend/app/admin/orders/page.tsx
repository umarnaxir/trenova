"use client";

import { useCallback, useState } from "react";
import type { Order, OrderStatus } from "@/types/user";
import {
  getAdminOrders,
  updateAdminOrderStatus,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Select } from "@/components/Select/Select";
import { Text } from "@/components/Text/Text";
import { Stack } from "@/components/Stack/Stack";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { formatCurrency, formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

const statusOptions: { label: string; value: OrderStatus }[] = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

function statusTone(status: OrderStatus) {
  if (status === "delivered") return "success" as const;
  if (status === "cancelled") return "danger" as const;
  if (status === "shipped" || status === "confirmed") return "warning" as const;
  return "neutral" as const;
}

function OrderForm({
  item,
  onClose,
  onSaved,
}: {
  item: Order | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  if (!item) return null;

  const itemsSubtotal = item.subtotal ?? item.items.reduce((sum, line) => sum + (line.price * line.quantity), 0);
  const discountAmount = item.discount ?? 0;
  const shippingAmount = item.shipping ?? (item.total - (itemsSubtotal - discountAmount) > 0 ? item.total - (itemsSubtotal - discountAmount) : 0);

  return (
    <AdminForm
      submitting={submitting}
      submitLabel="Update status"
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const status = String(data.get("status")) as OrderStatus;
        setSubmitting(true);
        try {
          await updateAdminOrderStatus(item.id, status);
          pushToast("Order updated");
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Update failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Stack gap={3}>
        <div>
          <Text>
            <strong>Order #{item.orderNumber}</strong>
          </Text>
          <Text color="gray600" style={{ fontSize: "0.82rem", marginTop: "0.2rem" }}>
            Placed on {formatDate(item.createdAt)} · Payment: <strong>{item.paymentMethod || "COD"}</strong>
          </Text>
        </div>

        <div style={{ background: "#F9F9F8", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #EEEEEC" }}>
          <Text style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem" }}>
            Customer & Delivery:
          </Text>
          <Text color="gray700" style={{ fontSize: "0.82rem", lineHeight: 1.4 }}>
            {item.fullName} ({item.userEmail || "No email"})<br />
            Phone: {item.phone || "N/A"}<br />
            Address: {item.line1}{item.city ? `, ${item.city}` : ""}{item.state ? `, ${item.state}` : ""}{item.postalCode ? ` - ${item.postalCode}` : ""}
          </Text>
        </div>

        <div style={{ borderTop: "1px solid #EEEEEC", paddingTop: "0.5rem" }}>
          <Text style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.4rem" }}>
            Ordered Items:
          </Text>
          {item.items.map((line) => (
            <div key={`${line.productId}-${line.size}`} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.25rem" }}>
              <span>{line.name || (line as any).productName} ({line.size}) × {line.quantity}</span>
              <span>{formatCurrency(line.price * line.quantity)}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #EEEEEC", paddingTop: "0.5rem", display: "grid", gap: "0.25rem", fontSize: "0.82rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#666" }}>Items Subtotal:</span>
            <span>{formatCurrency(itemsSubtotal)}</span>
          </div>
          {discountAmount > 0 ? (
            <div style={{ display: "flex", justifyContent: "space-between", color: "#16a34a" }}>
              <span>Coupon Discount{item.couponCode ? ` (${item.couponCode})` : ""}:</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          ) : null}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#666" }}>Delivery / Shipping:</span>
            <span>{shippingAmount > 0 ? formatCurrency(shippingAmount) : "FREE"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.95rem", borderTop: "1px dashed #DDD", paddingTop: "0.35rem", marginTop: "0.2rem" }}>
            <span>Final Payable Total:</span>
            <span>{formatCurrency(item.total)}</span>
          </div>
        </div>

        <Select
          name="status"
          label="Status"
          options={statusOptions}
          defaultValue={item.status}
        />
      </Stack>
    </AdminForm>
  );
}

export default function AdminOrdersPage() {
  const load = useCallback(() => getAdminOrders(), []);

  return (
    <AdminPage<Order>
      title="Orders"
      description="Fulfillment pipeline — update order status as work progresses."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) =>
        `${row.orderNumber} ${row.status} ${row.fullName}`
      }
      formTitle={() => "Order details"}
      renderForm={(props) => <OrderForm {...props} />}
      columns={[
        {
          key: "number",
          header: "Order",
          render: (row) => row.orderNumber,
        },
        {
          key: "date",
          header: "Date",
          render: (row) => formatDate(row.createdAt),
        },
        {
          key: "customer",
          header: "Customer",
          render: (row) => row.fullName,
        },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={statusTone(row.status)}>{row.status}</StatusPill>
          ),
        },
        {
          key: "items",
          header: "Items",
          render: (row) => row.items.length,
        },
        {
          key: "total",
          header: "Total",
          render: (row) => formatCurrency(row.total),
        },
      ]}
    />
  );
}
