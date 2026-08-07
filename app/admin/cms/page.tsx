"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminCmsPages } from "@/services/admin.service";
import { formatDate } from "@/utils/format";
import type { CmsPage } from "@/types/admin";

export default function AdminCmsPage() {
  const load = useCallback(() => getAdminCmsPages(), []);

  return (
    <AdminPage<CmsPage>
      title="CMS"
      description="Content pages and promotional blocks."
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "title", header: "Title", render: (row) => row.title },
        { key: "slug", header: "Slug", render: (row) => row.slug },
        { key: "status", header: "Status", render: (row) => row.status },
        {
          key: "updated",
          header: "Updated",
          render: (row) => formatDate(row.updatedAt),
        },
      ]}
    />
  );
}
