"use client";

import { useCallback, useState } from "react";
import type { Coupon } from "@/types/cart";
import {
  createAdminCoupon,
  deleteAdminCoupon,
  getAdminCoupons,
  updateAdminCoupon,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import {
  CardHint,
  CompactModalForm,
  FieldGrid,
  FullSpan,
} from "@/features/admin/AdminLayout.styles";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { useUiStore } from "@/hooks/stores/uiStore";

function CouponForm({
  item,
  onClose,
  onSaved,
}: {
  item: Coupon | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<Coupon["type"]>(item?.type ?? "percent");
  const [code, setCode] = useState(item?.code ?? "");

  const valueLabel = type === "percent" ? "Value (%)" : "Value (₹)";
  const valueHint =
    type === "percent"
      ? "Discount percent off the order subtotal."
      : "Fixed amount off the order subtotal.";

  return (
    <AdminForm
      submitting={submitting}
      onCancel={onClose}
      submitLabel={item ? "Save coupon" : "Add coupon"}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const nextCode = String(data.get("code") ?? "")
          .trim()
          .toUpperCase();
        const description = String(data.get("description") ?? "").trim();
        const value = Number(data.get("value") ?? 0);
        const minRaw = String(data.get("minOrder") ?? "").trim();
        const minOrder = minRaw ? Number(minRaw) : undefined;

        if (!nextCode) {
          pushToast("Coupon code is required", "error");
          return;
        }
        if (!Number.isFinite(value) || value <= 0) {
          pushToast("Enter a valid discount value", "error");
          return;
        }
        if (type === "percent" && value > 100) {
          pushToast("Percent cannot be more than 100", "error");
          return;
        }
        if (minOrder !== undefined && (!Number.isFinite(minOrder) || minOrder < 0)) {
          pushToast("Minimum order must be a valid amount", "error");
          return;
        }

        const payload: Coupon = {
          code: nextCode,
          description,
          type,
          value,
          minOrder,
        };

        setSubmitting(true);
        try {
          if (item) {
            await updateAdminCoupon(item.code, payload);
            pushToast("Coupon updated");
          } else {
            await createAdminCoupon(payload);
            pushToast("Coupon created");
          }
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Save failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <CompactModalForm>
        <CardHint>
          {item
            ? "Update discount details. Description and minimum order are optional."
            : "Create a checkout code. Description and minimum order are optional."}
        </CardHint>

        <FieldGrid $cols={2}>
          <Input
            name="code"
            label="Code"
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase())}
            required
            readOnly={Boolean(item)}
            placeholder="WELCOME10"
            autoComplete="off"
          />
          <Select
            name="type"
            label="Type"
            value={type}
            onChange={(event) =>
              setType(event.target.value as Coupon["type"])
            }
            options={[
              { label: "Percent", value: "percent" },
              { label: "Fixed amount", value: "fixed" },
            ]}
          />

          <Input
            name="value"
            label={valueLabel}
            type="number"
            min={0}
            max={type === "percent" ? 100 : undefined}
            step={type === "percent" ? 1 : 1}
            defaultValue={item?.value ?? 10}
            required
            placeholder={type === "percent" ? "10" : "500"}
          />
          <Input
            name="minOrder"
            label="Minimum order (optional)"
            type="number"
            min={0}
            defaultValue={item?.minOrder}
            placeholder="e.g. 1999"
          />

          <FullSpan>
            <Input
              name="description"
              label="Description (optional)"
              defaultValue={item?.description}
              placeholder="Shown to shoppers at checkout"
            />
          </FullSpan>

          <FullSpan>
            <CardHint>{valueHint}</CardHint>
          </FullSpan>
        </FieldGrid>
      </CompactModalForm>
    </AdminForm>
  );
}

export default function AdminCouponsPage() {
  const load = useCallback(() => getAdminCoupons(), []);

  return (
    <AdminPage<Coupon>
      title="Coupons"
      description="Promotional codes for checkout discounts."
      load={load}
      getRowKey={(row) => row.code}
      getSearchText={(row) => `${row.code} ${row.description} ${row.type}`}
      createLabel="Add coupon"
      formTitle={(item) => (item ? "Edit coupon" : "Add coupon")}
      formSize="md"
      renderForm={(props) => <CouponForm {...props} />}
      onDelete={(item) => deleteAdminCoupon(item.code)}
      deleteMessage={(item) => `Delete coupon “${item.code}”?`}
      columns={[
        { key: "code", header: "Code", render: (row) => row.code },
        {
          key: "description",
          header: "Description",
          render: (row) => row.description || "—",
        },
        { key: "type", header: "Type", render: (row) => row.type },
        {
          key: "value",
          header: "Value",
          render: (row) =>
            row.type === "percent" ? `${row.value}%` : `₹${row.value}`,
        },
        {
          key: "min",
          header: "Min order",
          render: (row) => (row.minOrder != null ? `₹${row.minOrder}` : "—"),
        },
      ]}
    />
  );
}
