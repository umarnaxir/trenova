"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { AdminShell } from "@/features/admin/AdminShell";
import { DataTable, type Column } from "@/features/admin/DataTable";
import { ConfirmDialog } from "@/features/admin/ConfirmDialog";
import {
  AdminPagination,
  ADMIN_PAGE_SIZE,
  paginateItems,
} from "@/features/admin/AdminPagination";
import { ActionGroup, Toolbar } from "@/features/admin/AdminShared.styles";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Modal } from "@/components/Modal/Modal";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useAdminUiStore } from "@/hooks/stores/adminUiStore";

type AdminPageProps<T> = {
  title: string;
  description?: string;
  load: () => Promise<T[]>;
  columns: Column<T>[];
  getRowKey: (row: T) => string;
  getSearchText?: (row: T) => string;
  createLabel?: string;
  formTitle?: (item: T | null) => string;
  formSize?: "md" | "lg" | "xl";
  pageSize?: number;
  renderForm?: (args: {
    item: T | null;
    onClose: () => void;
    onSaved: () => void;
  }) => React.ReactNode;
  onDelete?: (item: T) => Promise<void>;
  deleteMessage?: (item: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
};

export function AdminPage<T>({
  title,
  description,
  load,
  columns,
  getRowKey,
  getSearchText,
  createLabel,
  formTitle,
  formSize = "xl",
  pageSize = ADMIN_PAGE_SIZE,
  renderForm,
  onDelete,
  deleteMessage,
  emptyTitle = "No records yet",
  emptyDescription = "Create a new record to get started.",
}: AdminPageProps<T>) {
  const pushToast = useUiStore((state) => state.pushToast);
  const query = useAdminUiStore((state) => state.globalSearchQuery);
  const [rows, setRows] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<T | null | undefined>(undefined);
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const refresh = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    load()
      .then((next) => {
        if (cancelled) return;
        setRows(next);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setRows([]);
        setError(err instanceof Error ? err.message : "Failed to load data");
      });
    return () => {
      cancelled = true;
    };
  }, [load, reloadToken]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = query.trim().toLowerCase();
    if (!q || !getSearchText) return rows;
    return rows.filter((row) => getSearchText(row).toLowerCase().includes(q));
  }, [rows, query, getSearchText]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    if (page > totalPages) setPage(totalPages);
  }, [filtered.length, page, pageSize]);

  const paged = useMemo(
    () => paginateItems(filtered, page, pageSize),
    [filtered, page, pageSize],
  );

  const openCreate = () => setEditing(null);
  const closeForm = () => setEditing(undefined);

  return (
    <AdminShell title={title}>
      {description ? (
        <Text color="gray600" mb={4}>
          {description}
        </Text>
      ) : null}

      {renderForm && createLabel ? (
        <Toolbar>
          <ActionGroup>
            <Button type="button" onClick={openCreate}>
              <Plus size={16} style={{ marginRight: 8 }} />
              {createLabel}
            </Button>
          </ActionGroup>
        </Toolbar>
      ) : null}

      {error ? (
        <EmptyState
          title="Something went wrong"
          description={error}
          actionLabel="Retry"
          onAction={refresh}
        />
      ) : rows === null ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={query.trim() ? "No matches" : emptyTitle}
          description={
            query.trim()
              ? "Try a different search in the header."
              : emptyDescription
          }
          actionLabel={
            renderForm && createLabel && !query.trim() ? createLabel : undefined
          }
          onAction={
            renderForm && createLabel && !query.trim() ? openCreate : undefined
          }
        />
      ) : (
        <>
          <DataTable
            rows={paged}
            columns={columns}
            getRowKey={getRowKey}
            onEdit={renderForm ? (row) => setEditing(row) : undefined}
            onDelete={onDelete ? (row) => setPendingDelete(row) : undefined}
          />
          <AdminPagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
          />
        </>
      )}

      {renderForm && editing !== undefined ? (
        <Modal
          open
          size={formSize}
          title={formTitle?.(editing) ?? (editing ? "Edit" : "Create")}
          onClose={closeForm}
        >
          {renderForm({
            item: editing,
            onClose: closeForm,
            onSaved: () => {
              closeForm();
              refresh();
            },
          })}
        </Modal>
      ) : null}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete record"
        message={
          pendingDelete && deleteMessage
            ? deleteMessage(pendingDelete)
            : "Are you sure you want to delete this record?"
        }
        confirmLabel="Delete"
        tone="danger"
        loading={deleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          if (!pendingDelete || !onDelete) return;
          setDeleting(true);
          try {
            await onDelete(pendingDelete);
            pushToast("Deleted successfully");
            setPendingDelete(null);
            refresh();
          } catch (err) {
            pushToast(
              err instanceof Error ? err.message : "Delete failed",
              "error",
            );
          } finally {
            setDeleting(false);
          }
        }}
      />
    </AdminShell>
  );
}
