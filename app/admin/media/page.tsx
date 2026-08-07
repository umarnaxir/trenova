"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminShell } from "@/features/admin/AdminShell";
import { Grid } from "@/components/Grid/Grid";
import { Text } from "@/components/Text/Text";
import { Loader } from "@/components/Loader/Loader";
import { getAdminMedia } from "@/services/admin.service";
import type { MediaItem } from "@/types/admin";
import styled from "styled-components";

const Card = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
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
  const [items, setItems] = useState<MediaItem[] | null>(null);

  useEffect(() => {
    getAdminMedia().then(setItems);
  }, []);

  return (
    <AdminShell title="Media Library">
      {!items ? (
        <Loader />
      ) : (
        <Grid
          gridTemplateColumns={["1fr 1fr", null, "repeat(4, 1fr)"]}
          style={{ gap: "1rem" }}
        >
          {items.map((item) => (
            <Card key={item.id}>
              <Media>
                <Image src={item.url} alt={item.name} fill sizes="200px" />
              </Media>
              <Text fontSize="sm">{item.name}</Text>
              <Text variant="small" color="gray500">
                {item.sizeKb} KB
              </Text>
            </Card>
          ))}
        </Grid>
      )}
    </AdminShell>
  );
}
