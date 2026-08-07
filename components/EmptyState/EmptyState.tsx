"use client";

import { EmptyRoot } from "@/components/EmptyState/EmptyState.styles";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  href?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  href,
}: EmptyStateProps) {
  return (
    <EmptyRoot>
      <Text as="h2" variant="h3">
        {title}
      </Text>
      {description ? <Text color="gray600">{description}</Text> : null}
      {actionLabel ? (
        <Button
          as={href ? "a" : "button"}
          href={href}
          onClick={onAction}
          variant="secondary"
        >
          {actionLabel}
        </Button>
      ) : null}
    </EmptyRoot>
  );
}
