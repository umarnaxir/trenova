import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "Enter first name"),
    lastName: z.string().min(2, "Enter last name"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .trim()
      .min(10, "Enter a valid phone number")
      .transform((value) => value.replace(/\D/g, "").slice(-10))
      .refine((value) => /^\d{10}$/.test(value), "Enter a 10-digit phone number"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

/** Temporary frontend OTP until SMS service is wired. */
export const DEV_PHONE_OTP = "123456";
