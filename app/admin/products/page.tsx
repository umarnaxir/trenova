"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminProducts } from "@/services/admin.service";
import { formatCurrency } from "@/utils/format";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
  const load = useCallback(() => getAdminProducts(), []);

  return (
    <AdminPage<Product>
      title="Products"
      description="Manage catalog products. API wiring comes later."
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        { key: "sku", header: "SKU", render: (row) => row.sku },
        {
          key: "price",
          header: "Price",
          render: (row) => formatCurrency(row.price),
        },
        { key: "stock", header: "Stock", render: (row) => row.stock },
        {
          key: "category",
          header: "Category",
          render: (row) => row.categorySlug,
        },
      ]}
    />
  );
}
