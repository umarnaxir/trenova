"use client";

import { useCallback, useState } from "react";
import type { AdminRole, TeamMember } from "@/types/admin";
import {
  createAdminTeamMember,
  deleteAdminTeamMember,
  getAdminTeam,
  updateAdminTeamMember,
} from "@/services/admin.service";
import { AdminPage } from "@/features/admin/AdminPage";
import { AdminForm } from "@/features/admin/AdminForm";
import {
  CardHint,
  CompactModalForm,
  FieldGrid,
  FullSpan,
} from "@/features/admin/AdminLayout.styles";
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

const roleOptions: { label: string; value: AdminRole }[] = [
  { label: "Admin", value: "Admin" },
  { label: "Manager", value: "Manager" },
  { label: "Editor", value: "Editor" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Invited", value: "invited" },
  { label: "Disabled", value: "disabled" },
];

function TeamForm({
  item,
  onClose,
  onSaved,
}: {
  item: TeamMember | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const pushToast = useUiStore((state) => state.pushToast);
  const [submitting, setSubmitting] = useState(false);

  return (
    <AdminForm
      submitting={submitting}
      onCancel={onClose}
      submitLabel={item ? "Save member" : "Add member"}
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const role = String(data.get("role") ?? "Editor") as AdminRole;
        const password = String(data.get("password") ?? "");
        const confirmPassword = String(data.get("confirmPassword") ?? "");
        const status = String(
          data.get("status") ?? "active",
        ) as TeamMember["status"];

        if (!item && password.length < 4) {
          pushToast("Set a password (min 4 characters)", "error");
          return;
        }
        if (password && password !== confirmPassword) {
          pushToast("Passwords do not match", "error");
          return;
        }

        setSubmitting(true);
        try {
          if (item) {
            await updateAdminTeamMember(item.id, {
              name,
              email,
              role,
              status,
              ...(password ? { password } : {}),
            });
            pushToast(
              password
                ? "Team member updated — password changed"
                : "Team member updated",
            );
          } else {
            await createAdminTeamMember({ name, email, role, password });
            pushToast("Team member added");
          }
          onSaved();
        } catch (err) {
          pushToast(err instanceof Error ? err.message : "Save failed", "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <CompactModalForm>
        <CardHint>
          {item
            ? "Update details. Leave password blank to keep the current one."
            : "Add name, email, role, and set a login password."}
        </CardHint>
        <FieldGrid $cols={2}>
          <Input name="name" label="Team name" defaultValue={item?.name} required />
          <Input
            name="email"
            label="Email"
            type="email"
            defaultValue={item?.email}
            required
          />
          <Select
            name="role"
            label="Role"
            defaultValue={item?.role ?? "Editor"}
            options={roleOptions}
          />
          {item ? (
            <Select
              name="status"
              label="Status"
              defaultValue={item.status}
              options={statusOptions}
            />
          ) : (
            <div />
          )}
          <Input
            name="password"
            label={item ? "New password" : "Set password"}
            type="password"
            autoComplete="new-password"
            required={!item}
            placeholder={item ? "Optional" : "Min 4 characters"}
          />
          <Input
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            required={!item}
            placeholder={item ? "If changing" : "Repeat password"}
          />
          {!item ? null : (
            <FullSpan>
              <CardHint>Password fields are optional when editing.</CardHint>
            </FullSpan>
          )}
        </FieldGrid>
      </CompactModalForm>
    </AdminForm>
  );
}

function statusTone(status: TeamMember["status"]) {
  if (status === "active") return "success" as const;
  if (status === "disabled") return "danger" as const;
  return "warning" as const;
}

export default function AdminTeamPage() {
  const load = useCallback(() => getAdminTeam(), []);

  return (
    <AdminPage<TeamMember>
      title="Team Management"
      description="Add teammates with name, email, role, and password. Roles: Admin, Manager, Editor."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.name} ${row.email} ${row.role} ${row.status}`}
      createLabel="Add member"
      formTitle={(item) => (item ? "Edit team member" : "Add team member")}
      formSize="md"
      renderForm={(props) => <TeamForm {...props} />}
      onDelete={async (item) => {
        await deleteAdminTeamMember(item.id);
      }}
      deleteMessage={(item) => `Remove ${item.name} from the team?`}
      columns={[
        { key: "name", header: "Name", render: (row) => row.name },
        { key: "email", header: "Email", render: (row) => row.email },
        { key: "role", header: "Role", render: (row) => row.role },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <StatusPill $tone={statusTone(row.status)}>{row.status}</StatusPill>
          ),
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
