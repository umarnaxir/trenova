"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminReviews } from "@/services/admin.service";
import { formatDate } from "@/utils/format";
import type { Review } from "@/types/review";

export default function AdminReviewsPage() {
  const load = useCallback(() => getAdminReviews(), []);

  return (
    <AdminPage<Review>
      title="Reviews"
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "author", header: "Author", render: (row) => row.author },
        { key: "rating", header: "Rating", render: (row) => row.rating },
        { key: "title", header: "Title", render: (row) => row.title },
        {
          key: "date",
          header: "Date",
          render: (row) => formatDate(row.createdAt),
        },
      ]}
    />
  );
}
