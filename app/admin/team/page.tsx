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
import { Input } from "@/components/Input/Input";
import { Select } from "@/components/Select/Select";
import { StatusPill } from "@/features/admin/AdminShared.styles";
import { formatDate } from "@/utils/format";
import { useUiStore } from "@/hooks/stores/uiStore";

const roleOptions: { label: string; value: AdminRole }[] = [
  { label: "Admin", value: "Admin" },
  { label: "Manager", value: "Manager" },
  { label: "Editor", value: "Editor" },
  { label: "Viewer", value: "Viewer" },
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
      onSubmit={async (event) => {
        const data = new FormData(event.currentTarget);
        const payload = {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          role: String(data.get("role") ?? "Editor") as AdminRole,
          status: String(data.get("status") ?? "invited") as TeamMember["status"],
        };
        setSubmitting(true);
        try {
          if (item) {
            await updateAdminTeamMember(item.id, payload);
            pushToast("Team member updated");
          } else {
            await createAdminTeamMember(payload);
            pushToast("Team member invited");
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
      ) : null}
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
      description="Invite teammates and assign roles. Permission enforcement can be wired later."
      load={load}
      getRowKey={(row) => row.id}
      getSearchText={(row) => `${row.name} ${row.email} ${row.role} ${row.status}`}
      createLabel="Add member"
      formTitle={(item) => (item ? "Edit team member" : "Invite team member")}
      renderForm={(props) => <TeamForm {...props} />}
      onDelete={(item) => deleteAdminTeamMember(item.id)}
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
