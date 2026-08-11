"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import type { MediaItem } from "@/types/admin";
import { AdminShell } from "@/features/admin/AdminShell";
import { Grid } from "@/components/Grid/Grid";
import { Text } from "@/components/Text/Text";
import { Loader } from "@/components/Loader/Loader";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { getAdminMedia } from "@/services/admin.service";
import { useAdminUiStore } from "@/hooks/stores/adminUiStore";

const Card = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: ${({ theme }) => theme.colors.white};
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[3]};
`;

const Media = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.gray100};
`;

export default function AdminMediaPage() {
  const query = useAdminUiStore((state) => state.globalSearchQuery);
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminMedia()
      .then(setItems)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load media");
        setItems([]);
      });
  }, []);

  const filtered =
    items?.filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase()),
    ) ?? [];

  return (
    <AdminShell title="Media Library">
      <Text color="gray600" mb={4}>
        Product imagery available to the catalog. Upload API is not available yet.
      </Text>
      {error ? (
        <EmptyState title="Unable to load media" description={error} />
      ) : !items ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={query.trim() ? "No matches" : "No media yet"}
          description={
            query.trim()
              ? "Try a different search in the header."
              : "Media appears when products have images."
          }
        />
      ) : (
        <Grid
          gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
          style={{ gap: "1rem" }}
        >
          {filtered.map((item) => (
            <Card key={item.id}>
              <Media>
                <Image src={item.url} alt={item.name} fill sizes="200px" />
              </Media>
              <Text fontSize="sm">{item.name}</Text>
              <Text color="gray500" fontSize="xs">
                {item.sizeKb} KB
              </Text>
            </Card>
          ))}
        </Grid>
      )}
    </AdminShell>
  );
}
