"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminCoupons } from "@/services/admin.service";
import type { Coupon } from "@/types/cart";

export default function AdminCouponsPage() {
  const load = useCallback(() => getAdminCoupons(), []);

  return (
    <AdminPage<Coupon>
      title="Coupons"
      load={load}
      getRowKey={(row) => row.code}
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
