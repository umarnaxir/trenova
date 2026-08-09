"use client";

import { Plus } from "lucide-react";
import {
  AccordionItem,
  Chevron,
} from "@/features/content/ContentPage.styles";

type Item = {
  question: string;
  answer: string;
};

export function ContentAccordion({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map((item) => (
        <AccordionItem key={item.question}>
          <summary>
            <span>{item.question}</span>
            <Chevron aria-hidden>
              <Plus size={14} />
            </Chevron>
          </summary>
          <p>{item.answer}</p>
        </AccordionItem>
      ))}
    </div>
  );
}
