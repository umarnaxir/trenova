"use client";

import { useCallback, useState } from "react";
import { useUiStore } from "@/hooks/stores/uiStore";
import { AdminPage } from "@/features/admin/AdminPage";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { Stack } from "@/components/Stack/Stack";
import { Text } from "@/components/Text/Text";
import { Select } from "@/components/Select/Select";
import { AdminForm } from "@/features/admin/AdminForm";
import { formatDate } from "@/utils/format";

import {
  getAdminReviews,
  updateAdminReviewStatus,
  deleteAdminReview,
} from "@/services/admin.service";
import type { AdminReview } from "@/types/admin";

function ReviewForm({
  item,
  onClose,
  onSaved,
}: {
  item: AdminReview | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((s) => s.pushToast);
  const [submitting, setSubmitting] = useState(false);

  if (!item) return null;

  return (
    <AdminForm
      submitting={submitting}
      submitLabel="Update status"
      onCancel={onClose}
      onSubmit={async (e) => {
        const data = new FormData(e.currentTarget);
        const status = String(data.get("status"));
        setSubmitting(true);
        try {
          await updateAdminReviewStatus(item.id, status);
          pushToast("Review status updated");
          onSaved();
        } catch {
          pushToast("Update failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Stack gap={3}>
        <Text>
          <strong>{item.product?.name ?? "Product"}</strong> — {item.rating}★
        </Text>
        {item.comment && <Text color="gray600">"{item.comment}"</Text>}
        <Text color="gray600">
          By {item.user ? `${item.user.firstName ?? ""} ${item.user.lastName ?? ""}`.trim() || item.user.email : "Unknown"}
        </Text>
        <Select
          name="status"
          label="Moderation Status"
          defaultValue={item.status}
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Approved", value: "APPROVED" },
            { label: "Rejected", value: "REJECTED" },
          ]}
        />
      </Stack>
    </AdminForm>
  );
}

function statusTone(status: string) {
  if (status === "APPROVED") return "success" as const;
  if (status === "REJECTED") return "danger" as const;
  return "neutral" as const;
}

export default function AdminReviewsPage() {
  const pushToast = useUiStore((s) => s.pushToast);
  const load = useCallback(() => getAdminReviews(), []);

  return (
    <AdminPage<AdminReview>
      title="Reviews"
      description="Moderate customer product reviews before they appear publicly."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.product?.name ?? ""} ${row.comment ?? ""} ${row.status}`}
      formTitle={() => "Moderate review"}
      renderForm={(props) => <ReviewForm {...props} />}
      onDelete={async (item) => {
        try {
          await deleteAdminReview(item.id);
          pushToast("Deleted review");
        } catch {
          pushToast("Delete failed", "error");
        }
      }}
      onBulkDelete={async (items) => {
        try {
          for (const item of items) await deleteAdminReview(item.id);
          pushToast(`Deleted ${items.length} review(s)`);
        } catch {
          pushToast("Delete failed", "error");
        }
      }}
      columns={[
        {
          key: "product",
          header: "Product",
          render: (row) => row.product?.name ?? "Product",
        },
        {
          key: "rating",
          header: "Rating",
          render: (row) => `${"★".repeat(row.rating)}${"☆".repeat(5 - row.rating)}`,
        },
        {
          key: "comment",
          header: "Comment",
          render: (row) =>
            row.comment ? `${row.comment.slice(0, 60)}${row.comment.length > 60 ? "…" : ""}` : "—",
        },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={statusTone(row.status)}>
              {row.status.charAt(0) + row.status.slice(1).toLowerCase()}
            </StatusPill>
          ),
        },
        {
          key: "date",
          header: "Submitted",
          render: (row) => formatDate(row.createdAt),
        },
      ]}
    />
  );
}
