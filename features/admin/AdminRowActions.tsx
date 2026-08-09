"use client";

import { Pencil, Trash2, Eye } from "lucide-react";
import { RowActions } from "@/features/admin/AdminShared.styles";
import { IconButton } from "@/components/IconButton/IconButton";

type AdminRowActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function AdminRowActions({
  onView,
  onEdit,
  onDelete,
}: AdminRowActionsProps) {
  return (
    <RowActions>
      {onView ? (
        <IconButton label="View" onClick={onView}>
          <Eye size={16} />
        </IconButton>
      ) : null}
      {onEdit ? (
        <IconButton label="Edit" onClick={onEdit}>
          <Pencil size={16} />
        </IconButton>
      ) : null}
      {onDelete ? (
        <IconButton label="Delete" onClick={onDelete}>
          <Trash2 size={16} />
        </IconButton>
      ) : null}
    </RowActions>
  );
}
