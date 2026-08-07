"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { WhatsAppLink } from "@/components/WhatsAppButton/WhatsAppButton.styles";

export function WhatsAppButton() {
  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello TRENOvA, I need help with an order.",
  )}`;

  return (
    <WhatsAppLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
    </WhatsAppLink>
  );
}
