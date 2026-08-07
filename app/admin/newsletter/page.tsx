"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminNewsletter } from "@/services/admin.service";
import { formatDate } from "@/utils/format";
import type { NewsletterSubscriber } from "@/types/admin";

export default function AdminNewsletterPage() {
  const load = useCallback(() => getAdminNewsletter(), []);

  return (
    <AdminPage<NewsletterSubscriber>
      title="Newsletter"
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "email", header: "Email", render: (row) => row.email },
        { key: "status", header: "Status", render: (row) => row.status },
        {
          key: "date",
          header: "Subscribed",
          render: (row) => formatDate(row.subscribedAt),
        },
      ]}
    />
  );
}
