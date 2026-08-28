"use client";

import { useCallback, useState } from "react";
import type { NewsletterSubscriber } from "@/types/admin";
import {
  deleteAdminNewsletter,
  getAdminNewsletter,
  updateAdminNewsletterStatus,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Select } from "@/components/Select/Select";
import { Input } from "@/components/Input/Input";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

function NewsletterForm({
  item,
  onClose,
  onSaved,
}: {
  item: NewsletterSubscriber | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  if (!item) return null;

  return (
    <AdminForm
      submitting={submitting}
      submitLabel="Update status"
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const status = String(
          data.get("status"),
        ) as NewsletterSubscriber["status"];
        setSubmitting(true);
        try {
          await updateAdminNewsletterStatus(item.id, status);
          pushToast("Subscriber updated");
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Update failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Input label="Email" defaultValue={item.email} readOnly />
      <Select
        name="status"
        label="Status"
        defaultValue={item.status}
        options={[
          { label: "Active", value: "active" },
          { label: "Unsubscribed", value: "unsubscribed" },
        ]}
      />
    </AdminForm>
  );
}

export default function AdminNewsletterPage() {
  const load = useCallback(() => getAdminNewsletter(), []);

  return (
    <AdminPage<NewsletterSubscriber>
      title="Newsletter"
      description="Manage email subscribers."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.email} ${row.status}`}
      formTitle={() => "Update subscriber"}
      renderForm={(props) => <NewsletterForm {...props} />}
      onDelete={(item) => deleteAdminNewsletter(item.id)}
      deleteMessage={(item) => `Remove ${item.email}?`}
      columns={[
        { key: "email", header: "Email", render: (row) => row.email },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={row.status === "active" ? "success" : "neutral"}>
              {row.status}
            </StatusPill>
          ),
        },
        {
          key: "date",
          header: "Subscribed",
          render: (row) => formatDate(row.subscribedAt),
        },
      ]}
    />
  );
}
