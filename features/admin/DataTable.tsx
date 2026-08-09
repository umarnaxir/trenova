"use client";

import { Table, TableWrap } from "@/features/admin/DataTable.styles";
import { AdminRowActions } from "@/features/admin/AdminRowActions";

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
};

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  onView,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const showActions = Boolean(onView || onEdit || onDelete);

  return (
    <TableWrap>
      <Table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            {showActions ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key}>{column.render(row)}</td>
              ))}
              {showActions ? (
                <td>
                  <AdminRowActions
                    onView={onView ? () => onView(row) : undefined}
                    onEdit={onEdit ? () => onEdit(row) : undefined}
                    onDelete={onDelete ? () => onDelete(row) : undefined}
                  />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  );
}
