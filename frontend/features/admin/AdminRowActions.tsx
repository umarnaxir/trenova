"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { RowActions } from "@/features/admin/AdminShared.styles";
import { IconButton } from "@/components/IconButton/IconButton";
import {
  AdminMoreMenu,
  type AdminMoreMenuItem,
} from "@/features/admin/AdminMoreMenu";

type AdminRowActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  moreItems?: AdminMoreMenuItem[];
};

export function AdminRowActions({
  onView,
  onEdit,
  onDelete,
  moreItems = [],
}: AdminRowActionsProps) {
  if (!onView && !onEdit && !onDelete && !moreItems.length) return null;

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
      {moreItems.length ? (
        <AdminMoreMenu label="More actions" items={moreItems} />
      ) : null}
    </RowActions>
  );
}
