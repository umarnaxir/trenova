"use client";

import {
  ActionsCell,
  ActionsHeader,
  ActionsHeaderCell,
  RowCheckbox,
  SelectCell,
  SelectTd,
  Table,
  TableWrap,
} from "@/features/admin/DataTable.styles";
import { AdminRowActions } from "@/features/admin/AdminRowActions";
import {
  AdminMoreMenu,
  type AdminMoreMenuItem,
} from "@/features/admin/AdminMoreMenu";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  getRowMoreItems?: (row: T) => AdminMoreMenuItem[];
  headerMenuItems?: AdminMoreMenuItem[];
  /** When true, show the checkbox column. Hidden until selection starts. */
  showSelectionColumn?: boolean;
  selectedKeys?: Set<string>;
  onToggleRow?: (key: string) => void;
  onTogglePage?: (keys: string[], selected: boolean) => void;
};

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  onView,
  onEdit,
  onDelete,
  getRowMoreItems,
  headerMenuItems,
  showSelectionColumn = false,
  selectedKeys,
  onToggleRow,
  onTogglePage,
}: DataTableProps<T>) {
  const showActions = Boolean(
    onView ||
      onEdit ||
      onDelete ||
      getRowMoreItems ||
      (headerMenuItems && headerMenuItems.length),
  );
  const pageKeys = rows.map((row, index) => getRowKey(row) || `row-${index}`);
  const selectedOnPage = pageKeys.filter((key) => selectedKeys?.has(key));
  const allPageSelected =
    pageKeys.length > 0 && selectedOnPage.length === pageKeys.length;
  const somePageSelected =
    selectedOnPage.length > 0 && selectedOnPage.length < pageKeys.length;

  return (
    <TableWrap>
      <Table>
        <thead>
          <tr>
            {showSelectionColumn ? (
              <SelectCell>
                <RowCheckbox
                  aria-label="Select all on this page"
                  checked={allPageSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = somePageSelected;
                  }}
                  onChange={() =>
                    onTogglePage?.(pageKeys, !allPageSelected)
                  }
                />
              </SelectCell>
            ) : null}
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            {showActions ? (
              <ActionsHeaderCell>
                <ActionsHeader>
                  <span>Actions</span>
                  {headerMenuItems && headerMenuItems.length ? (
                    <AdminMoreMenu
                      label="More table actions"
                      items={headerMenuItems}
                      tone="light"
                    />
                  ) : null}
                </ActionsHeader>
              </ActionsHeaderCell>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const key = getRowKey(row) || `row-${index}`;
            const selected = Boolean(selectedKeys?.has(key));
            return (
              <tr key={key} data-selected={selected ? "true" : "false"}>
                {showSelectionColumn ? (
                  <SelectTd>
                    <RowCheckbox
                      aria-label={`Select row ${key}`}
                      checked={selected}
                      onChange={() => onToggleRow?.(key)}
                    />
                  </SelectTd>
                ) : null}
                {columns.map((column) => (
                  <td key={column.key}>{column.render(row)}</td>
                ))}
                {showActions ? (
                  <ActionsCell>
                    <AdminRowActions
                      onView={onView ? () => onView(row) : undefined}
                      onEdit={onEdit ? () => onEdit(row) : undefined}
                      onDelete={onDelete ? () => onDelete(row) : undefined}
                      moreItems={getRowMoreItems?.(row) ?? []}
                    />
                  </ActionsCell>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrap>
  );
}
