"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminBrands } from "@/services/admin.service";
import type { AdminBrand } from "@/types/admin";

export default function AdminBrandsPage() {
  const load = useCallback(() => getAdminBrands(), []);

  return (
    <AdminPage<AdminBrand>
      title="Brands"
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        { key: "slug", header: "Slug", render: (row) => row.slug },
        {
          key: "count",
          header: "Products",
          render: (row) => row.productCount,
        },
      ]}
    />
  );
}
