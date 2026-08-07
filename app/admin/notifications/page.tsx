"use client";

import { useCallback } from "react";
import { AdminPage } from "@/features/admin/AdminPage";
import { getAdminNotifications } from "@/services/admin.service";
import { formatDate } from "@/utils/format";
import type { AdminNotification } from "@/types/admin";

export default function AdminNotificationsPage() {
  const load = useCallback(() => getAdminNotifications(), []);

  return (
    <AdminPage<AdminNotification>
      title="Notifications"
      load={load}
      getRowKey={(row) => row.id}
      columns={[
        { key: "title", header: "Title", render: (row) => row.title },
        { key: "body", header: "Message", render: (row) => row.body },
        {
          key: "date",
          header: "Date",
          render: (row) => formatDate(row.createdAt),
        },
        {
          key: "read",
          header: "Read",
          render: (row) => (row.read ? "Yes" : "No"),
        },
      ]}
    />
  );
}
