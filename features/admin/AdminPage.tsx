"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/features/admin/AdminShell";
import { DataTable } from "@/features/admin/DataTable";
import { Loader } from "@/components/Loader/Loader";
import { Text } from "@/components/Text/Text";

type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
};

type AdminPageProps<T> = {
  title: string;
  description?: string;
  load: () => Promise<T[]>;
  columns: Column<T>[];
  getRowKey: (row: T) => string;
};

export function AdminPage<T>({
  title,
  description,
  load,
  columns,
  getRowKey,
}: AdminPageProps<T>) {
  const [rows, setRows] = useState<T[] | null>(null);

  useEffect(() => {
    load().then(setRows);
  }, [load]);

  return (
    <AdminShell title={title}>
      {description ? (
        <Text color="gray600" mb={5}>
          {description}
        </Text>
      ) : null}
      {rows ? (
        <DataTable rows={rows} columns={columns} getRowKey={getRowKey} />
      ) : (
        <Loader />
      )}
    </AdminShell>
  );
}
