"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { IconButton } from "@/components/IconButton/IconButton";

const Dropzone = styled.button<{
  $active?: boolean;
  $hasImage?: boolean;
  $compact?: boolean;
}>`
  position: relative;
  width: 100%;
  min-height: ${({ $compact }) => ($compact ? "120px" : "160px")};
  border: 1px dashed
    ${({ theme, $active }) =>
      $active ? theme.colors.gold : theme.colors.gray300};
  background: ${({ theme, $active }) =>
    $active ? "rgba(198, 167, 94, 0.08)" : theme.colors.white};
  cursor: pointer;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 0;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const Preview = styled.img<{ $compact?: boolean }>`
  width: 100%;
  height: ${({ $compact }) => ($compact ? "120px" : "160px")};
  object-fit: cover;
  display: block;
`;

const Placeholder = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme, $compact }) => ($compact ? "0.25rem" : theme.space[2])};
  padding: ${({ theme, $compact }) =>
    $compact ? "0.5rem" : theme.space[4]};
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme, $compact }) =>
    $compact ? "0.65rem" : theme.fontSizes.sm};
  text-align: center;
  line-height: 1.3;
`;

const Label = styled.span`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.65rem;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray600};
`;

const Actions = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space[2]};
  right: ${({ theme }) => theme.space[2]};
  display: inline-flex;
  gap: ${({ theme }) => theme.space[1]};
  background: rgba(255, 255, 255, 0.92);
`;

const ErrorText = styled.p`
  margin: ${({ theme }) => theme.space[2]} 0 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const HiddenInput = styled.input`
  display: none;
`;

type ImageDropzoneProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
};

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Failed to read image"));
    reader.readAsDataURL(file);
  });
}

export function ImageDropzone({
  label,
  value,
  onChange,
  compact,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Image must be under 4MB");
      return;
    }
    setError(null);
    const dataUrl = await readFileAsDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div>
      <Label>{label}</Label>
      <Dropzone
        type="button"
        $active={dragging}
        $hasImage={Boolean(value)}
        $compact={compact}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void handleFiles(event.dataTransfer.files);
        }}
      >
        {value ? (
          <>
            <Preview src={value} alt={label} $compact={compact} />
            <Actions>
              <IconButton
                label="Replace image"
                onClick={(event) => {
                  event.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                <Upload size={14} />
              </IconButton>
              <IconButton
                label="Remove image"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("");
                }}
              >
                <Trash2 size={14} />
              </IconButton>
            </Actions>
          </>
        ) : (
          <Placeholder $compact={compact}>
            <ImagePlus size={compact ? 20 : 22} />
            <span>
              {compact
                ? "Drop or click to upload"
                : "Drag & drop an image here, or click to upload"}
            </span>
          </Placeholder>
        )}
      </Dropzone>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(event) => {
          void handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </div>
  );
}
