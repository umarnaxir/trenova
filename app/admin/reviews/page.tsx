"use client";

import { useCallback, useState } from "react";
import type { Review } from "@/types/review";
import {
  deleteAdminReview,
  getAdminReviews,
  updateAdminReview,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Input } from "@/components/Input/Input";
import { TextArea } from "@/components/TextArea/TextArea";
import { Select } from "@/components/Select/Select";
import { formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

function ReviewForm({
  item,
  onClose,
  onSaved,
}: {
  item: Review | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  if (!item) return null;

  return (
    <AdminForm
      submitting={submitting}
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        setSubmitting(true);
        try {
          await updateAdminReview(item.id, {
            title: String(data.get("title") ?? ""),
            body: String(data.get("body") ?? ""),
            rating: Number(data.get("rating") ?? item.rating),
            verified: data.get("verified") === "true",
          });
          pushToast("Review updated");
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Save failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Input label="Author" defaultValue={item.author} readOnly />
      <Input name="title" label="Title" defaultValue={item.title} required />
      <Select
        name="rating"
        label="Rating"
        defaultValue={String(item.rating)}
        options={[1, 2, 3, 4, 5].map((value) => ({
          label: `${value} star${value > 1 ? "s" : ""}`,
          value: String(value),
        }))}
      />
      <Select
        name="verified"
        label="Verified"
        defaultValue={item.verified ? "true" : "false"}
        options={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
      />
      <TextArea name="body" label="Body" defaultValue={item.body} rows={4} required />
    </AdminForm>
  );
}

export default function AdminReviewsPage() {
  const load = useCallback(() => getAdminReviews(), []);

  return (
    <AdminPage<Review>
      title="Reviews"
      description="Moderate product reviews shown on the storefront."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.author} ${row.title} ${row.body}`}
      formTitle={() => "Edit review"}
      renderForm={(props) => <ReviewForm {...props} />}
      onDelete={(item) => deleteAdminReview(item.id)}
      deleteMessage={(item) => `Delete review by ${item.author}?`}
      columns={[
        { key: "author", header: "Author", render: (row) => row.author },
        { key: "rating", header: "Rating", render: (row) => row.rating },
        { key: "title", header: "Title", render: (row) => row.title },
        {
          key: "verified",
          header: "Verified",
          render: (row) => (row.verified ? "Yes" : "No"),
        },
        {
          key: "date",
          header: "Date",
          render: (row) => formatDate(row.createdAt),
        },
      ]}
    />
  );
}
