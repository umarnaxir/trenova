"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input/Input";
import { TextArea } from "@/components/TextArea/TextArea";
import { Button } from "@/components/Button/Button";
import { Stack } from "@/components/Stack/Stack";
import { useUiStore } from "@/hooks/stores/uiStore";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Enter a subject"),
  message: z.string().min(10, "Message is too short"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const pushToast = useUiStore((state) => state.pushToast);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(async () => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        pushToast("Message sent. We will reply shortly.");
        reset();
      })}
    >
      <Stack gap={4}>
        <Input label="Name" error={errors.name?.message} {...register("name")} />
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Subject"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <TextArea
          label="Message"
          error={errors.message?.message}
          {...register("message")}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </Stack>
    </form>
  );
}
