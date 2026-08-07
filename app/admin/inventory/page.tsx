"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminInventory } from "@/services/admin.service";

type InventoryRow = Awaited<ReturnType<typeof getAdminInventory>>[number];

export default function AdminInventoryPage() {
  const load = useCallback(() => getAdminInventory(), []);

  return (
    <AdminPage<InventoryRow>
      title="Inventory"
      description="Stock levels across SKUs."
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "name", header: "Product", render: (row) => row.name },
        { key: "sku", header: "SKU", render: (row) => row.sku },
        { key: "stock", header: "Stock", render: (row) => row.stock },
        { key: "status", header: "Status", render: (row) => row.status },
      ]}
    />
  );
}
