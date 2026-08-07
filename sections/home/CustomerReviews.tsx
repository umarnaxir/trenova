"use client";

import type { Review } from "@/types/review";
import { Section } from "@/components/Section/Section";
import { Grid } from "@/components/Grid/Grid";
import { ReviewCard } from "@/components/ReviewCard/ReviewCard";

export function CustomerReviews({ reviews }: { reviews: Review[] }) {
  return (
    <Section
      eyebrow="Customer Reviews"
      title="Worn and loved"
      description="Feedback from the TRENOvA community."
    >
      <Grid
        gridTemplateColumns={["1fr", null, "repeat(3, 1fr)"]}
        style={{ gap: "1rem" }}
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Grid>
    </Section>
  );
}
