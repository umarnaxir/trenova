"use client";

import { useCallback, useState } from "react";
import type { AdminNotification } from "@/types/admin";
import {
  deleteAdminNotification,
  getAdminNotifications,
  markAdminNotificationRead,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Text } from "@/components/Text/Text";
import { Stack } from "@/components/Stack/Stack";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

function NotificationForm({
  item,
  onClose,
  onSaved,
}: {
  item: AdminNotification | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  if (!item) return null;

  return (
    <AdminForm
      submitting={submitting}
      submitLabel={item.read ? "Close" : "Mark as read"}
      onCancel={onClose}
      onSubmit={async () => {
        if (item.read) {
          onClose();
          return;
        }
        setSubmitting(true);
        try {
          await markAdminNotificationRead(item.id);
          pushToast("Marked as read");
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Update failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Stack gap={3}>
        <Text>{item.body}</Text>
        <Text color="gray500">{formatDate(item.createdAt)}</Text>
      </Stack>
    </AdminForm>
  );
}

export default function AdminNotificationsPage() {
  const load = useCallback(() => getAdminNotifications(), []);

  return (
    <AdminPage<AdminNotification>
      title="Notifications"
      description="Operational alerts for the admin team."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.title} ${row.body}`}
      formTitle={(item) => item?.title ?? "Notification"}
      renderForm={(props) => <NotificationForm {...props} />}
      onDelete={(item) => deleteAdminNotification(item.id)}
      deleteMessage={(item) => `Delete “${item.title}”?`}
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
          render: (row) => (
            <StatusPill $tone={row.read ? "neutral" : "warning"}>
              {row.read ? "Read" : "Unread"}
            </StatusPill>
          ),
        },
      ]}
    />
  );
}
