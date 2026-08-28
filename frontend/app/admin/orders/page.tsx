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
        <Text>
          <strong>{item.orderNumber}</strong> · {formatCurrency(item.total)}
        </Text>
        <Text color="gray600">
          {item.items.map((line) => `${line.name || (line as any).productName} × ${line.quantity}`).join(", ")}
        </Text>
        <Text color="gray600">
          Ship to {item.fullName}, {item.city}
        </Text>
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
