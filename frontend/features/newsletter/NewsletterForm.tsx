"use client";

import { useState } from "react";
import { Form } from "@/features/newsletter/NewsletterForm.styles";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { subscribeNewsletter } from "@/services/newsletter.service";
import { useUiStore } from "@/hooks/stores/uiStore";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const pushToast = useUiStore((state) => state.pushToast);

  return (
    <Form
      $compact={compact}
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        const result = await subscribeNewsletter(email);
        pushToast(result.message, result.success ? "success" : "error");
        if (result.success) setEmail("");
        setLoading(false);
      }}
    >
      <Input
        name="email"
        type="email"
        label={compact ? "Newsletter" : "Email address"}
        placeholder="you@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Button type="submit" variant={compact ? "gold" : "primary"} disabled={loading}>
        {loading ? "Joining..." : "Subscribe"}
      </Button>
    </Form>
  );
}
