"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/Container/Container";
import { subscribeNewsletter } from "@/services/newsletter.service";
import { useUiStore } from "@/hooks/stores/uiStore";
import {
  FormWrap,
  IconCircle,
  LeftContent,
  NewsletterBox,
  NewsletterRoot,
  Subtitle,
  Title,
} from "@/sections/home/NewsletterSection.styles";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const pushToast = useUiStore((state) => state.pushToast);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setLoading(true);
    const result = await subscribeNewsletter(email);
    pushToast(result.message, result.success ? "success" : "error");
    if (result.success) setEmail("");
    setLoading(false);
  };

  return (
    <NewsletterRoot>
      <Container>
        <NewsletterBox>
          <LeftContent>
            <IconCircle>
              <Mail size={22} />
            </IconCircle>
            <div>
              <Title>JOIN THE TRENOVA COMMUNITY</Title>
              <Subtitle>Get exclusive updates, new arrivals &amp; special offers.</Subtitle>
            </div>
          </LeftContent>

          <FormWrap onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Subscribing..." : "SUBSCRIBE"}
            </button>
          </FormWrap>
        </NewsletterBox>
      </Container>
    </NewsletterRoot>
  );
}

