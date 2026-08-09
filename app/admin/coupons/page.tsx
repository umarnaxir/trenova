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

  return (
    <AdminForm
      submitting={submitting}
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const payload: Coupon = {
          code: String(data.get("code") ?? ""),
          description: String(data.get("description") ?? ""),
          type: String(data.get("type") ?? "percent") as Coupon["type"],
          value: Number(data.get("value") ?? 0),
          minOrder: data.get("minOrder")
            ? Number(data.get("minOrder"))
            : undefined,
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
      <Input
        name="code"
        label="Code"
        defaultValue={item?.code}
        required
        readOnly={Boolean(item)}
      />
      <Input
        name="description"
        label="Description"
        defaultValue={item?.description}
        required
      />
      <Select
        name="type"
        label="Type"
        defaultValue={item?.type ?? "percent"}
        options={[
          { label: "Percent", value: "percent" },
          { label: "Fixed", value: "fixed" },
        ]}
      />
      <Input
        name="value"
        label="Value"
        type="number"
        min={0}
        defaultValue={item?.value ?? 10}
        required
      />
      <Input
        name="minOrder"
        label="Minimum order"
        type="number"
        min={0}
        defaultValue={item?.minOrder}
      />
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
      renderForm={(props) => <CouponForm {...props} />}
      onDelete={(item) => deleteAdminCoupon(item.code)}
      deleteMessage={(item) => `Delete coupon “${item.code}”?`}
      columns={[
        { key: "code", header: "Code", render: (row) => row.code },
        {
          key: "description",
          header: "Description",
          render: (row) => row.description,
        },
        { key: "type", header: "Type", render: (row) => row.type },
        { key: "value", header: "Value", render: (row) => row.value },
        {
          key: "min",
          header: "Min order",
          render: (row) => row.minOrder ?? "—",
        },
      ]}
    />
  );
}
