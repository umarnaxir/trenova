"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { Text } from "@/components/Text/Text";
import { useUiStore } from "@/hooks/stores/uiStore";

export function RegisterPageClient() {
  const openAuthModal = useUiStore((state) => state.openAuthModal);

  useEffect(() => {
    openAuthModal("register");
  }, [openAuthModal]);

  return (
    <Stack gap={4} alignItems="center" style={{ paddingBlock: "2rem" }}>
      <Text as="h1" variant="h2">
        Create account
      </Text>
      <Text color="gray600" style={{ textAlign: "center" }}>
        Verify your mobile number with OTP to finish signing up.
      </Text>
      <Button type="button" onClick={() => openAuthModal("register")}>
        Open create account
      </Button>
    </Stack>
  );
}
