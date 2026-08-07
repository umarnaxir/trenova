"use client";

import { Text } from "@/components/Text/Text";
import { Grid } from "@/components/Grid/Grid";
import { Button } from "@/components/Button/Button";
import { useAuthStore } from "@/hooks/stores/authStore";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};
`;

export default function AccountDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      <Text as="h1" variant="h1" mb={2}>
        Welcome, {user?.firstName}
      </Text>
      <Text color="gray600" mb={8}>
        Manage orders, addresses, and profile details.
      </Text>
      <Grid
        gridTemplateColumns={["1fr", null, "repeat(3, 1fr)"]}
        style={{ gap: "1rem" }}
      >
        <Card>
          <Text as="h2" variant="h3">
            Orders
          </Text>
          <Text color="gray600">Track and review purchases.</Text>
          <Button as="a" href="/account/orders" variant="secondary" size="sm">
            View orders
          </Button>
        </Card>
        <Card>
          <Text as="h2" variant="h3">
            Addresses
          </Text>
          <Text color="gray600">Update delivery locations.</Text>
          <Button as="a" href="/account/addresses" variant="secondary" size="sm">
            Manage addresses
          </Button>
        </Card>
        <Card>
          <Text as="h2" variant="h3">
            Profile
          </Text>
          <Text color="gray600">Edit your personal details.</Text>
          <Button as="a" href="/account/profile" variant="secondary" size="sm">
            Edit profile
          </Button>
        </Card>
      </Grid>
      <Button
        variant="ghost"
        style={{ marginTop: 24 }}
        onClick={() => logout()}
      >
        Sign out
      </Button>
    </div>
  );
}
