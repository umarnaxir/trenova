"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import type { InstagramShot } from "@/services/admin.service";
import {
  getAdminInstagram,
  updateAdminInstagramShot,
} from "@/services/admin.service";
import { AdminShell } from "@/features/admin/AdminShell";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import {
  FieldHint,
  FormSection,
  FormSectionTitle,
} from "@/features/admin/AdminShared.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Loader } from "@/components/Loader/Loader";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Text } from "@/components/Text/Text";
import { useUiStore } from "@/hooks/stores/uiStore";

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export default function AdminInstagramPage() {
  const pushToast = useUiStore((state) => state.pushToast);
  const [shots, setShots] = useState<InstagramShot[] | null>(null);
  const [drafts, setDrafts] = useState<Record<string, InstagramShot>>({});
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(() => {
    getAdminInstagram()
      .then((next) => {
        setShots(next);
        setDrafts(
          Object.fromEntries(next.map((shot) => [shot.id, shot])),
        );
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load");
        setShots([]);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return (
      <AdminShell title="Instagram">
        <EmptyState title="Unable to load Instagram shots" description={error} />
      </AdminShell>
    );
  }

  if (!shots) {
    return (
      <AdminShell title="Instagram">
        <Loader />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Instagram">
      <Text color="gray600" mb={4}>
        Manage the 9 homepage Instagram gallery images with drag & drop uploads.
      </Text>
      <FieldHint style={{ marginBottom: "1.25rem" }}>
        Keep all 9 slots filled for the full homepage grid.
      </FieldHint>
      <Grid>
        {shots.map((shot, index) => {
          const draft = drafts[shot.id] ?? shot;
          return (
            <FormSection key={shot.id}>
              <FormSectionTitle>Shot {index + 1}</FormSectionTitle>
              <ImageDropzone
                label="Image"
                value={draft.src}
                onChange={(src) =>
                  setDrafts((current) => ({
                    ...current,
                    [shot.id]: { ...draft, src },
                  }))
                }
              />
              <Input
                label="Alt text"
                value={draft.alt}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [shot.id]: { ...draft, alt: event.target.value },
                  }))
                }
              />
              <Button
                type="button"
                disabled={savingId === shot.id || !draft.src}
                onClick={async () => {
                  if (!draft.src) {
                    pushToast("Upload an image first", "error");
                    return;
                  }
                  setSavingId(shot.id);
                  try {
                    const updated = await updateAdminInstagramShot(shot.id, {
                      src: draft.src,
                      alt: draft.alt,
                    });
                    setShots((current) =>
                      (current ?? []).map((item) =>
                        item.id === shot.id ? updated : item,
                      ),
                    );
                    setDrafts((current) => ({
                      ...current,
                      [shot.id]: updated,
                    }));
                    pushToast(`Shot ${index + 1} updated`);
                  } catch (err) {
                    pushToast(
                      err instanceof Error ? err.message : "Save failed",
                      "error",
                    );
                  } finally {
                    setSavingId(null);
                  }
                }}
              >
                {savingId === shot.id ? "Saving..." : "Save shot"}
              </Button>
            </FormSection>
          );
        })}
      </Grid>
    </AdminShell>
  );
}
