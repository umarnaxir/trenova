"use client";

import { useCallback, useState } from "react";
import type { AdminCustomer } from "@/types/admin";
import {
  createAdminCustomer,
  deleteAdminCustomer,
  getAdminCustomers,
  updateAdminCustomer,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import { Input } from "@/components/Input/Input";
import { formatCurrency, formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

function CustomerForm({
  item,
  onClose,
  onSaved,
}: {
  item: AdminCustomer | null;
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
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
        };
        setSubmitting(true);
        try {
          if (item) {
            await updateAdminCustomer(item.id, payload);
            pushToast("Customer updated");
          } else {
            await createAdminCustomer(payload);
            pushToast("Customer created");
          }
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Save failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Input name="name" label="Name" defaultValue={item?.name} required />
      <Input
        name="email"
        label="Email"
        type="email"
        defaultValue={item?.email}
        required
      />
    </AdminForm>
  );
}

export default function AdminCustomersPage() {
  const load = useCallback(() => getAdminCustomers(), []);

  return (
    <AdminPage<AdminCustomer>
      title="Customers"
      description="Customer directory for support and CRM workflows."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.name} ${row.email}`}
      createLabel="Add customer"
      formTitle={(item) => (item ? "Edit customer" : "Add customer")}
      renderForm={(props) => <CustomerForm {...props} />}
      onDelete={(item) => deleteAdminCustomer(item.id)}
      deleteMessage={(item) => `Remove customer “${item.name}”?`}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        { key: "email", header: "Email", render: (row) => row.email },
        { key: "orders", header: "Orders", render: (row) => row.orders },
        {
          key: "spent",
          header: "Spent",
          render: (row) => formatCurrency(row.spent),
        },
        {
          key: "joined",
          header: "Joined",
          render: (row) => formatDate(row.joinedAt),
        },
      ]}
    />
  );
}
