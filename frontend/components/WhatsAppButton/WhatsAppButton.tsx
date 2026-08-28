"use client";

import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/stores/siteSettingsStore";
import { WhatsAppLink } from "@/components/WhatsAppButton/WhatsAppButton.styles";

export function WhatsAppButton() {
  const site = useSiteSettings();
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hello Trenova, I need help with an order.",
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
