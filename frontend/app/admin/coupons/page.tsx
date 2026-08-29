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
      submitLabel={item ? "Save changes" : "Add coupon"}
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const code = String(data.get("code") ?? "").trim().toUpperCase();
        const value = Number(data.get("value"));

        if (!code) {
          pushToast("Enter a coupon code", "error");
          return;
        }

        if (isNaN(value) || value <= 0) {
          pushToast("Enter a valid discount value greater than 0", "error");
          return;
        }

        const expiresAtRaw = data.get("expiresAt");
        let expiresAtIso: string | null = null;
        if (expiresAtRaw && String(expiresAtRaw).trim()) {
          const d = new Date(String(expiresAtRaw));
          if (!isNaN(d.getTime())) {
            d.setHours(23, 59, 59, 999);
            expiresAtIso = d.toISOString();
          }
        }
        const payload: any = {
          code,
          description: String(data.get("description") || "").trim() || null,
          type: String(data.get("type")),
          value,
          minOrder: Number(data.get("minOrder") || 0),
          maxDiscountAmount: data.get("maxDiscountAmount") ? Number(data.get("maxDiscountAmount")) : null,
          maxUses: data.get("maxUses") ? Number(data.get("maxUses")) : null,
          isActive: data.get("isActive") === "true",
          expiresAt: expiresAtIso,
        };

        setSubmitting(true);
        try {
          if (item) {
            await updateAdminCoupon(item.id, payload);
            pushToast("Coupon updated successfully", "success");
          } else {
            await createAdminCoupon(payload);
            pushToast("Coupon created successfully", "success");
          }
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Failed to save coupon", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Input
        name="code"
        label="Coupon Code"
        placeholder="e.g. SUMMER20, WELCOME10"
        defaultValue={item?.code}
        required
      />
      <Input
        name="description"
        label="Description (optional)"
        placeholder="e.g. 20% discount on orders above ₹999"
        defaultValue={item?.description ?? undefined}
      />
      <Select
        name="type"
        label="Discount Type"
        options={typeOptions}
        defaultValue={item?.type ? String(item.type).toUpperCase() : "PERCENT"}
      />
      <Input
        name="value"
        label="Discount Value (% or ₹ amount)"
        type="number"
        min={1}
        step="any"
        placeholder="e.g. 15 for 15% or 500 for ₹500"
        defaultValue={item?.value ?? undefined}
        required
      />
      <Input
        name="minOrder"
        label="Minimum Order Amount (₹)"
        type="number"
        min={0}
        placeholder="0 for no minimum"
        defaultValue={item?.minOrder ?? undefined}
      />
      <Input
        name="maxDiscountAmount"
        label="Max Discount Cap (₹, optional for %)"
        type="number"
        min={0}
        placeholder="e.g. 1000"
        defaultValue={item?.maxDiscountAmount ?? undefined}
      />
      <Input
        name="maxUses"
        label="Max Total Uses (optional)"
        type="number"
        min={1}
        placeholder="e.g. 100"
        defaultValue={item?.maxUses ?? undefined}
      />
      <Input
        name="expiresAt"
        label="Expiry Date (optional)"
        type="date"
        defaultValue={item?.expiresAt ? new Date(item.expiresAt).toISOString().split("T")[0] : undefined}
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

export default function AdminCouponsPage() {
  const load = useCallback(() => getAdminCoupons(), []);
  const pushToast = useUiStore((state) => state.pushToast);

  return (
    <AdminPage<AdminCoupon>
      title="Coupons"
      description="Create and manage coupon codes, discounts, and promotional campaigns."
      load={load}
      getRowKey={(row) => row.id || row.code}
      getSearchText={(row) => `${row.code} ${row.description || ""}`}
      createLabel="Add coupon"
      formTitle={(row) => (row ? "Edit coupon" : "Add coupon")}
      renderForm={(props) => <PromotionForm {...props} />}
      emptyTitle="No coupons yet"
      emptyDescription="Create your first coupon code to offer discounts to customers."
      onDelete={async (item) => {
        try {
          await deleteAdminCoupon(item.id);
          pushToast("Deleted coupon");
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Delete failed", "error");
        }
      }}
      onBulkDelete={async (items) => {
        try {
          for (const item of items) {
            await deleteAdminCoupon(item.id);
          }
          pushToast(`Deleted ${items.length} coupon(s)`);
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
          render: (row) => `${row.usedCount || 0}${row.maxUses ? ` / ${row.maxUses}` : ""}`,
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
