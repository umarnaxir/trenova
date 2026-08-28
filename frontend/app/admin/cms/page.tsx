"use client";

import { useCallback, useState } from "react";
import type { CmsPage } from "@/types/admin";
import {
  createAdminCmsPage,
  deleteAdminCmsPage,
  getAdminCmsPages,
  updateAdminCmsPage,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

function CmsForm({
  item,
  onClose,
  onSaved,
}: {
  item: CmsPage | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  return (
    <AdminForm
      submitting={submitting}
      onCancel={onClose}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const payload = {
          title: String(data.get("title") ?? ""),
          status: String(data.get("status") ?? "draft") as CmsPage["status"],
        };
        setSubmitting(true);
        try {
          if (item) {
            await updateAdminCmsPage(item.id, payload);
            pushToast("Page updated");
          } else {
            await createAdminCmsPage(payload);
            pushToast("Page created");
          }
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Save failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Input name="title" label="Title" defaultValue={item?.title} required />
      <Select
        name="status"
        label="Status"
        defaultValue={item?.status ?? "draft"}
        options={[
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" },
        ]}
      />
    </AdminForm>
  );
}

export default function AdminCmsPageRoute() {
  const load = useCallback(() => getAdminCmsPages(), []);

  return (
    <AdminPage<CmsPage>
      title="CMS"
      description="Content pages and promotional blocks."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.title} ${row.slug} ${row.status}`}
      createLabel="Add page"
      formTitle={(item) => (item ? "Edit page" : "Add page")}
      renderForm={(props) => <CmsForm {...props} />}
      onDelete={async (item) => {
        await deleteAdminCmsPage(item.id);
      }}
      deleteMessage={(item) => `Delete page “${item.title}”?`}
      columns={[
        { key: "title", header: "Title", render: (row) => row.title },
        { key: "slug", header: "Slug", render: (row) => row.slug },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={row.status === "published" ? "success" : "warning"}>
              {row.status}
            </StatusPill>
          ),
        },
        {
          key: "updated",
          header: "Updated",
          render: (row) => formatDate(row.updatedAt),
        },
      ]}
    />
  );
}
