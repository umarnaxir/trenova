"use client";

import { Stack } from "@/components/Stack/Stack";
import { Item } from "@/features/faq/FaqList.styles";

const faqs = [
  {
    q: "What sizes do you offer?",
    a: "Most apparel is available from XS to XXL. Exact size options are listed on each product page.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders typically arrive within 3–7 business days across India after dispatch.",
  },
  {
    q: "Can I return an item?",
    a: "Yes. Unused items can be returned within 7 days of delivery under our returns policy.",
  },
  {
    q: "Do you offer international shipping?",
    a: "International shipping will be enabled in a future release. Currently we ship within India.",
  },
];

export function FaqList() {
  return (
    <Stack gap={0}>
      {faqs.map((item) => (
        <Item key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </Item>
      ))}
    </Stack>
  );
}
