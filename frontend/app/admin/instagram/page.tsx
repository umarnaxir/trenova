"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import type { InstagramShot } from "@/services/admin.service";
import {
  getAdminInstagram,
  createAdminInstagramShot,
  updateAdminInstagramShot,
  deleteAdminInstagramShot,
} from "@/services/admin.service";
import { AdminShell } from "@/features/admin/AdminShell";
import { ImageDropzone } from "@/features/admin/ImageDropzone";
import {
  ActionGroup,
  FormSection,
  FormSectionTitle,
  Toolbar,
} from "@/features/admin/AdminShared.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Loader } from "@/components/Loader/Loader";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { Modal } from "@/components/Modal/Modal";
import { ConfirmDialog } from "@/features/admin/ConfirmDialog";
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

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
  margin-top: ${({ theme }) => theme.space[3]};
`;

export default function AdminInstagramPage() {
  const pushToast = useUiStore((state) => state.pushToast);
  const [shots, setShots] = useState<InstagramShot[] | null>(null);
  const [drafts, setDrafts] = useState<Record<string, InstagramShot>>({});
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<InstagramShot | null>(null);

  // Add Photo Modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newImageSrc, setNewImageSrc] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [creating, setCreating] = useState(false);

  const load = useCallback(() => {
    getAdminInstagram()
      .then((next) => {
        setShots(next);
        setDrafts(
          Object.fromEntries(next.map((shot) => [shot.id, { ...shot }])),
        );
        setError(null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load");
        setShots([]);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageSrc) {
      pushToast("Please upload or provide an image", "error");
      return;
    }
    setCreating(true);
    try {
      const created = await createAdminInstagramShot({
        src: newImageSrc,
        alt: newImageAlt.trim() || undefined,
      });
      setShots((current) => [...(current ?? []), created]);
      setDrafts((current) => ({ ...current, [created.id]: { ...created } }));
      pushToast("Instagram photo added successfully", "success");
      setAddModalOpen(false);
      setNewImageSrc("");
      setNewImageAlt("");
    } catch (err) {
      pushToast(err instanceof Error ? err.message : "Failed to add photo", "error");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdatePhoto = async (shotId: string, index: number) => {
    const draft = drafts[shotId];
    if (!draft || !draft.src) {
      pushToast("Image is required", "error");
      return;
    }
    setSavingId(shotId);
    try {
      const updated = await updateAdminInstagramShot(shotId, {
        src: draft.src,
        alt: draft.alt,
      });
      setShots((current) =>
        (current ?? []).map((item) => (item.id === shotId ? updated : item)),
      );
      setDrafts((current) => ({
        ...current,
        [shotId]: { ...updated },
      }));
      pushToast(`Photo ${index + 1} updated`, "success");
    } catch (err) {
      pushToast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSavingId(null);
    }
  };

  const handleDeletePhoto = async () => {
    if (!pendingDelete) return;
    setDeletingId(pendingDelete.id);
    try {
      await deleteAdminInstagramShot(pendingDelete.id);
      setShots((current) =>
        (current ?? []).filter((item) => item.id !== pendingDelete.id),
      );
      setDrafts((current) => {
        const next = { ...current };
        delete next[pendingDelete.id];
        return next;
      });
      pushToast("Instagram photo deleted", "success");
      setPendingDelete(null);
    } catch (err) {
      pushToast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (error) {
    return (
      <AdminShell title="Instagram">
        <EmptyState
          title="Unable to load Instagram photos"
          description={error}
          actionLabel="Retry"
          onAction={load}
        />
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
        Manage the homepage Instagram gallery photos. Add new photos, update existing shots, or delete unneeded ones.
      </Text>

      <Toolbar>
        <ActionGroup>
          <Button type="button" onClick={() => setAddModalOpen(true)}>
            <Plus size={16} style={{ marginRight: 8 }} />
            Add Photo
          </Button>
        </ActionGroup>
      </Toolbar>

      {shots.length === 0 ? (
        <EmptyState
          title="No Instagram photos yet"
          description="Add your first photo to display in the storefront homepage gallery."
          actionLabel="Add Photo"
          onAction={() => setAddModalOpen(true)}
        />
      ) : (
        <Grid>
          {shots.map((shot, index) => {
            const draft = drafts[shot.id] ?? shot;
            const hasChanged =
              draft.src !== shot.src || draft.alt !== shot.alt;

            return (
              <FormSection key={shot.id}>
                <CardHeader>
                  <FormSectionTitle style={{ margin: 0 }}>
                    Photo {index + 1}
                  </FormSectionTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    style={{ color: "#E53E3E", padding: "4px 8px" }}
                    onClick={() => setPendingDelete(shot)}
                  >
                    <Trash2 size={15} style={{ marginRight: 4 }} />
                    Delete
                  </Button>
                </CardHeader>
                <ImageDropzone
                  label="Photo image"
                  value={draft.src}
                  onChange={(src) =>
                    setDrafts((current) => ({
                      ...current,
                      [shot.id]: { ...draft, src },
                    }))
                  }
                />
                <Input
                  label="Alt text / Caption"
                  placeholder="e.g. Trenova look autumn collection"
                  value={draft.alt}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [shot.id]: { ...draft, alt: event.target.value },
                    }))
                  }
                />
                <CardActions>
                  <Button
                    type="button"
                    disabled={savingId === shot.id || !draft.src}
                    onClick={() => handleUpdatePhoto(shot.id, index)}
                  >
                    {savingId === shot.id
                      ? "Saving..."
                      : hasChanged
                      ? "Save changes"
                      : "Saved"}
                  </Button>
                </CardActions>
              </FormSection>
            );
          })}
        </Grid>
      )}

      {/* Add Photo Modal */}
      <Modal
        open={addModalOpen}
        title="Add Instagram Photo"
        onClose={() => {
          setAddModalOpen(false);
          setNewImageSrc("");
          setNewImageAlt("");
        }}
      >
        <form onSubmit={handleCreatePhoto} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ImageDropzone
            label="Upload Image"
            value={newImageSrc}
            onChange={(src) => setNewImageSrc(src)}
          />
          <Input
            label="Alt Text / Caption (optional)"
            placeholder="e.g. Trenova street style"
            value={newImageAlt}
            onChange={(e) => setNewImageAlt(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setAddModalOpen(false);
                setNewImageSrc("");
                setNewImageAlt("");
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creating || !newImageSrc}>
              {creating ? "Adding..." : "Add photo"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Instagram Photo"
        message="Are you sure you want to delete this Instagram photo? It will be removed from the homepage gallery."
        confirmLabel="Delete"
        tone="danger"
        loading={Boolean(deletingId)}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleDeletePhoto}
      />
    </AdminShell>
  );
}
