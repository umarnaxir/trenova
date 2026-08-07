"use client";

import { Text } from "@/components/Text/Text";
import { Grid } from "@/components/Grid/Grid";
import { Badge } from "@/components/Badge/Badge";
import { useAuthStore } from "@/hooks/stores/authStore";
import styled from "styled-components";

const AddressCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.space[5]};
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;

export default function AddressesPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <Text as="h1" variant="h1" mb={6}>
        Addresses
      </Text>
      <Grid
        gridTemplateColumns={["1fr", null, "1fr 1fr"]}
        style={{ gap: "1rem" }}
      >
        {user?.addresses.map((address) => (
          <AddressCard key={address.id}>
            <Text as="h2" variant="h3">
              {address.label}
            </Text>
            {address.isDefault ? <Badge>Default</Badge> : null}
            <Text color="gray600">{address.fullName}</Text>
            <Text color="gray600">{address.phone}</Text>
            <Text color="gray600">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}
            </Text>
            <Text color="gray600">
              {address.city}, {address.state} {address.postalCode}
            </Text>
            <Text color="gray600">{address.country}</Text>
          </AddressCard>
        ))}
      </Grid>
    </div>
  );
}
