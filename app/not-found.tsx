import { PageShell } from "@/components/PageShell/PageShell";
import { Text } from "@/components/Text/Text";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";

export default function NotFound() {
  return (
    <PageShell narrow>
      <Stack gap={5} style={{ minHeight: "60vh", justifyContent: "center" }}>
        <Text as="span" variant="eyebrow">
          404
        </Text>
        <Text as="h1" variant="display">
          Page not found
        </Text>
        <Text color="gray600">
          The page you are looking for has moved or no longer exists.
        </Text>
        <Button as="a" href="/">
          Back to home
        </Button>
      </Stack>
    </PageShell>
  );
}
