"use client";

import { useCallback, useState } from "react";
import type { InventoryRow } from "@/types/admin";
import {
  getAdminInventory,
  updateAdminInventory,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Input } from "@/components/Input/Input";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { useUiStore } from "@/hooks/stores/uiStore";

function InventoryForm({
  item,
  onClose,
  onSaved,
}: {
  item: InventoryRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  if (!item) return null;

  return (
    <AdminForm
      submitting={submitting}
      submitLabel="Update stock"
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const stock = Number(data.get("stock") ?? 0);
        setSubmitting(true);
        try {
          await updateAdminInventory(item.id, stock);
          pushToast("Inventory updated");
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Update failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Input label="Product" defaultValue={item.name} readOnly />
      <Input label="SKU" defaultValue={item.sku} readOnly />
      <Input
        name="stock"
        label="Stock quantity"
        type="number"
        min={0}
        defaultValue={item.stock}
        required
      />
    </AdminForm>
  );
}

function toneFor(status: InventoryRow["status"]) {
  if (status === "In Stock") return "success" as const;
  if (status === "Low") return "warning" as const;
  return "danger" as const;
}

export default function AdminInventoryPage() {
  const load = useCallback(() => getAdminInventory(), []);

  return (
    <AdminPage<InventoryRow>
      title="Inventory"
      description="Adjust stock levels across SKUs."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.name} ${row.sku} ${row.status}`}
      formTitle={() => "Adjust stock"}
      renderForm={(props) => <InventoryForm {...props} />}
      columns={[
        { key: "name", header: "Product", render: (row) => row.name },
        { key: "sku", header: "SKU", render: (row) => row.sku },
        { key: "stock", header: "Stock", render: (row) => row.stock },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={toneFor(row.status)}>{row.status}</StatusPill>
          ),
        },
      ]}
    />
  );
}
