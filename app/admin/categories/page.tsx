"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminCategories } from "@/services/admin.service";
import type { Category } from "@/types/category";

export default function AdminCategoriesPage() {
  const load = useCallback(() => getAdminCategories(), []);

  return (
    <AdminPage<Category>
      title="Categories"
      description="Primary and nested category taxonomy."
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        { key: "slug", header: "Slug", render: (row) => row.slug },
        {
          key: "children",
          header: "Children",
          render: (row) => row.children?.length ?? 0,
        },
      ]}
    />
  );
}
