"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { AdminShell } from "@/features/admin/AdminShell";
import { DataTable, type Column } from "@/features/admin/DataTable";
import { ConfirmDialog } from "@/features/admin/ConfirmDialog";
import {
  AdminPagination,
  ADMIN_PAGE_SIZE,
  paginateItems,
} from "@/features/admin/AdminPagination";
import type { AdminMoreMenuItem } from "@/features/admin/AdminMoreMenu";
import { ActionGroup, Toolbar } from "@/features/admin/AdminShared.styles";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Modal } from "@/components/Modal/Modal";
import { useUiStore } from "@/hooks/stores/uiStore";
import { useAdminUiStore } from "@/hooks/stores/adminUiStore";
import { importAdminProducts } from "@/services/admin.service";
import {
  exportProductsCsv,
  exportProductsJson,
  parseProductImportFile,
} from "@/features/admin/productTransfer";
import type { Product } from "@/types/product";

type BulkTarget<T> =
  | { mode: "selected"; items: T[] }
  | { mode: "all"; items: T[] };

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
  onView?: (item: T) => void;
  onBulkDelete?: (items: T[]) => Promise<void>;
  bulkDeleteMessage?: (count: number, mode: "selected" | "all") => string;
  /** Extra items for the Actions header ··· menu (e.g. custom actions). */
  getHeaderMenuExtra?: (ctx: {
    refresh: () => void;
    filtered: T[];
    selectedKeys: Set<string>;
  }) => AdminMoreMenuItem[];
  /** Adds Export JSON/CSV + Import into the Actions ··· menu. */
  enableProductTransfer?: boolean;
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
  onView,
  onBulkDelete,
  bulkDeleteMessage,
  getHeaderMenuExtra,
  enableProductTransfer = false,
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
  const [pendingBulk, setPendingBulk] = useState<BulkTarget<T> | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const importInputRef = useRef<HTMLInputElement>(null);
  const selectable = Boolean(onBulkDelete);

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

  useEffect(() => {
    const valid = new Set(filtered.map((row) => getRowKey(row)));
    setSelectedKeys((current) => {
      const next = new Set<string>();
      current.forEach((key) => {
        if (valid.has(key)) next.add(key);
      });
      return next.size === current.size ? current : next;
    });
  }, [filtered, getRowKey]);

  const paged = useMemo(
    () => paginateItems(filtered, page, pageSize),
    [filtered, page, pageSize],
  );

  const selectedItems = useMemo(
    () => filtered.filter((row) => selectedKeys.has(getRowKey(row))),
    [filtered, selectedKeys, getRowKey],
  );

  const openCreate = () => setEditing(null);
  const closeForm = () => setEditing(undefined);

  const clearSelection = useCallback(() => {
    setSelectedKeys(new Set());
    setSelectionMode(false);
  }, []);

  const toggleRow = (key: string) => {
    setSelectedKeys((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      setSelectionMode(next.size > 0);
      return next;
    });
  };

  const togglePage = (keys: string[], selected: boolean) => {
    setSelectedKeys((current) => {
      const next = new Set(current);
      keys.forEach((key) => {
        if (selected) next.add(key);
        else next.delete(key);
      });
      setSelectionMode(next.size > 0);
      return next;
    });
  };

  const selectAllFiltered = () => {
    const next = new Set(filtered.map((row) => getRowKey(row)));
    setSelectedKeys(next);
    setSelectionMode(next.size > 0);
  };

  const pageKeys = paged.map((row) => getRowKey(row));
  const allPageSelected =
    pageKeys.length > 0 && pageKeys.every((key) => selectedKeys.has(key));

  const headerMenuItems = useMemo(() => {
    const items: AdminMoreMenuItem[] = [];
    if (selectable) {
      items.push(
        {
          id: "select-page",
          label: allPageSelected ? "Deselect page" : "Select page",
          onClick: () => {
            togglePage(pageKeys, !allPageSelected);
          },
          disabled: pageKeys.length === 0,
        },
        {
          id: "select-all",
          label: "Select all",
          onClick: selectAllFiltered,
          disabled: filtered.length === 0,
        },
        {
          id: "clear-selection",
          label: "Clear selection",
          onClick: clearSelection,
          disabled: !selectionMode && selectedKeys.size === 0,
        },
        {
          id: "delete-selected",
          label: `Delete selected (${selectedItems.length})`,
          onClick: () =>
            setPendingBulk({ mode: "selected", items: selectedItems }),
          disabled: selectedItems.length === 0,
          danger: true,
          dividerBefore: true,
        },
        {
          id: "delete-all",
          label: `Delete all (${filtered.length})`,
          onClick: () => setPendingBulk({ mode: "all", items: filtered }),
          disabled: filtered.length === 0,
          danger: true,
        },
      );
    }

    const extra =
      getHeaderMenuExtra?.({
        refresh,
        filtered,
        selectedKeys,
      }) ?? [];

    const transferItems: AdminMoreMenuItem[] = [];
    if (enableProductTransfer) {
      const products = filtered as Product[];
      const exportSource =
        selectedKeys.size > 0
          ? products.filter((product) => selectedKeys.has(product.id))
          : products;
      transferItems.push(
        {
          id: "export-json",
          label:
            selectedKeys.size > 0
              ? `Export JSON (${exportSource.length})`
              : "Export JSON",
          onClick: () => exportProductsJson(exportSource),
          disabled: !exportSource.length,
          dividerBefore: true,
        },
        {
          id: "export-csv",
          label:
            selectedKeys.size > 0
              ? `Export CSV (${exportSource.length})`
              : "Export CSV",
          onClick: () => exportProductsCsv(exportSource),
          disabled: !exportSource.length,
        },
        {
          id: "import-products",
          label: importing ? "Importing…" : "Import products",
          onClick: () => importInputRef.current?.click(),
          disabled: importing,
        },
      );
    }

    return [
      ...items,
      ...transferItems,
      ...extra.map((item, index) => ({
        ...item,
        dividerBefore:
          item.dividerBefore ??
          (index === 0 && items.length + transferItems.length > 0),
      })),
    ];
  }, [
    selectable,
    allPageSelected,
    pageKeys,
    filtered,
    getRowKey,
    selectedKeys,
    selectedItems,
    selectionMode,
    getHeaderMenuExtra,
    enableProductTransfer,
    importing,
    refresh,
    selectAllFiltered,
    clearSelection,
  ]);

  const resolveView = (row: T) => {
    if (onView) {
      onView(row);
      return;
    }
    if (renderForm) setEditing(row);
  };

  const getRowMoreItems = (row: T): AdminMoreMenuItem[] => {
    const key = getRowKey(row);
    const selected = selectedKeys.has(key);
    const items: AdminMoreMenuItem[] = [
      {
        id: `view-${key}`,
        label: "View",
        onClick: () => resolveView(row),
      },
    ];

    if (!selectable) return items;

    items.push(
      {
        id: `select-${key}`,
        label: selected ? "Deselect" : "Select",
        onClick: () => toggleRow(key),
        dividerBefore: true,
      },
      {
        id: `select-page-${key}`,
        label: allPageSelected ? "Deselect page" : "Select page",
        onClick: () => {
          togglePage(pageKeys, !allPageSelected);
        },
        disabled: pageKeys.length === 0,
      },
      {
        id: `select-all-${key}`,
        label: "Select all",
        onClick: selectAllFiltered,
        disabled: filtered.length === 0,
      },
      {
        id: `clear-${key}`,
        label: "Clear selection",
        onClick: clearSelection,
        disabled: !selectionMode && selectedKeys.size === 0,
      },
      {
        id: `delete-selected-${key}`,
        label: `Delete selected (${selectedItems.length})`,
        onClick: () =>
          setPendingBulk({ mode: "selected", items: selectedItems }),
        disabled: selectedItems.length === 0,
        danger: true,
        dividerBefore: true,
      },
      {
        id: `delete-all-${key}`,
        label: `Delete all (${filtered.length})`,
        onClick: () => setPendingBulk({ mode: "all", items: filtered }),
        disabled: filtered.length === 0,
        danger: true,
      },
    );

    return items;
  };

  const showToolbar = Boolean(renderForm && createLabel);

  return (
    <AdminShell title={title}>
      {description ? (
        <Text color="gray600" mb={4}>
          {description}
        </Text>
      ) : null}

      {showToolbar ? (
        <Toolbar>
          <ActionGroup>
            <Button type="button" onClick={openCreate}>
              <Plus size={16} style={{ marginRight: 8 }} />
              {createLabel}
            </Button>
          </ActionGroup>
        </Toolbar>
      ) : null}

      {enableProductTransfer ? (
        <input
          ref={importInputRef}
          type="file"
          accept=".json,.csv,application/json,text/csv"
          hidden
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setImporting(true);
            try {
              const text = await file.text();
              const inputs = parseProductImportFile(text, file.name);
              const result = await importAdminProducts(inputs);
              pushToast(`Imported ${result.imported} product(s)`, "success");
              refresh();
            } catch (err) {
              pushToast(
                err instanceof Error ? err.message : "Import failed",
                "error",
              );
            } finally {
              setImporting(false);
              event.target.value = "";
            }
          }}
        />
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
            showSelectionColumn={selectionMode}
            selectedKeys={selectedKeys}
            onToggleRow={toggleRow}
            onTogglePage={togglePage}
            onView={
              onView || renderForm ? (row) => resolveView(row) : undefined
            }
            onEdit={renderForm ? (row) => setEditing(row) : undefined}
            onDelete={onDelete ? (row) => setPendingDelete(row) : undefined}
            getRowMoreItems={getRowMoreItems}
            headerMenuItems={headerMenuItems}
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
            setSelectedKeys((current) => {
              const next = new Set(current);
              next.delete(getRowKey(pendingDelete));
              return next;
            });
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

      <ConfirmDialog
        open={Boolean(pendingBulk)}
        title={
          pendingBulk?.mode === "all" ? "Delete all records" : "Delete selected"
        }
        message={
          pendingBulk
            ? bulkDeleteMessage?.(pendingBulk.items.length, pendingBulk.mode) ??
              `Delete ${pendingBulk.items.length} record(s)? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        tone="danger"
        loading={deleting}
        onCancel={() => setPendingBulk(null)}
        onConfirm={async () => {
          if (!pendingBulk || !onBulkDelete) return;
          setDeleting(true);
          try {
            await onBulkDelete(pendingBulk.items);
            pushToast(`Deleted ${pendingBulk.items.length} record(s)`);
            setPendingBulk(null);
            clearSelection();
            refresh();
          } catch (err) {
            pushToast(
              err instanceof Error ? err.message : "Bulk delete failed",
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
