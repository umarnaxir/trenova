"use client";

import { useCallback, useState } from "react";
import type { AdminCoupon } from "@/types/admin";
import {
  getAdminCoupons,
  createAdminCoupon,
  updateAdminCoupon,
  deleteAdminCoupon,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { useUiStore } from "@/hooks/stores/uiStore";

const typeOptions = [
  { label: "Percentage", value: "PERCENT" },
  { label: "Fixed Amount", value: "FIXED" },
];

function PromotionForm({
  item,
  onClose,
  onSaved,
}: {
  item: AdminCoupon | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  return (
    <AdminForm
      submitting={submitting}
      submitLabel={item ? "Save changes" : "Create promo"}
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        
        const payload: any = {
          code: String(data.get("code")).toUpperCase(),
          description: String(data.get("description")),
          type: String(data.get("type")),
          value: Number(data.get("value")),
          minOrder: Number(data.get("minOrder") || 0),
          maxDiscountAmount: data.get("maxDiscountAmount") ? Number(data.get("maxDiscountAmount")) : null,
          maxUses: data.get("maxUses") ? Number(data.get("maxUses")) : null,
          isActive: data.get("isActive") === "true",
        };

        setSubmitting(true);
        try {
          if (item) {
            await updateAdminCoupon(item.id, payload);
            pushToast("Promo updated");
          } else {
            await createAdminCoupon(payload);
            pushToast("Promo created");
          }
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Failed to save promo", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Input
        name="code"
        label="Promo Code"
        defaultValue={item?.code}
        required
      />
      <Input
        name="description"
        label="Description (optional)"
        defaultValue={item?.description ?? undefined}
      />
      <Select
        name="type"
        label="Type"
        options={typeOptions}
        defaultValue={item?.type ? String(item.type).toUpperCase() : "PERCENT"}
      />
      <Input
        name="value"
        label="Value (amount or percentage)"
        type="number"
        defaultValue={item?.value ?? undefined}
        required
      />
      <Input
        name="minOrder"
        label="Minimum Order Amount"
        type="number"
        defaultValue={item?.minOrder ?? undefined}
      />
      <Input
        name="maxDiscountAmount"
        label="Max Discount Cap (optional)"
        type="number"
        defaultValue={item?.maxDiscountAmount ?? undefined}
      />
      <Input
        name="maxUses"
        label="Max Uses (optional)"
        type="number"
        defaultValue={item?.maxUses ?? undefined}
      />
      <Select
        name="isActive"
        label="Status"
        options={[
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" }
        ]}
        defaultValue={item ? String(item.isActive) : "true"}
      />
    </AdminForm>
  );
}

export default function AdminPromotionsPage() {
  const load = useCallback(() => getAdminCoupons(), []);
  const pushToast = useUiStore((state) => state.pushToast);

  return (
    <AdminPage<AdminCoupon>
      title="Promotions"
      description="Manage coupon codes, discounts, and campaigns."
      load={load}
      getRowKey={(row) => row.id || row.code}
      getSearchText={(row) => row.code}
      formTitle={(row) => (row ? "Edit promotion" : "Add promotion")}
      renderForm={(props) => <PromotionForm {...props} />}
      onDelete={async (item) => {
        try {
          await deleteAdminCoupon(item.id);
          pushToast("Deleted promotion");
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Delete failed", "error");
        }
      }}
      onBulkDelete={async (items) => {
        try {
          for (const item of items) {
            await deleteAdminCoupon(item.id);
          }
          pushToast(`Deleted ${items.length} promotion(s)`);
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Delete failed", "error");
        }
      }}
      columns={[
        {
          key: "code",
          header: "Code",
          render: (row) => (
            <div>
              <strong>{row.code}</strong>
              {row.description && (
                <div style={{ fontSize: "0.75rem", color: "#6B6B6B" }}>
                  {row.description}
                </div>
              )}
            </div>
          ),
        },
        {
          key: "type",
          header: "Discount",
          render: (row) => 
            String(row.type).toUpperCase() === "PERCENT" ? `${row.value}% off` : `₹${row.value} off`,
        },
        {
          key: "minOrder",
          header: "Min Order",
          render: (row) => row.minOrder ? `₹${row.minOrder}` : "No min",
        },
        {
          key: "usage",
          header: "Usage",
          render: (row) => `${row.usedCount || 0} ${row.maxUses ? `/ ${row.maxUses}` : ""}`,
        },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={row.isActive ? "success" : "neutral"}>
              {row.isActive ? "Active" : "Inactive"}
            </StatusPill>
          ),
        },
      ]}
    />
  );
}
