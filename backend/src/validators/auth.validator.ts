import { z } from 'zod';

export const phoneRegex = /^[6-9]\d{9}$/;

export const sendOtpSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian phone number'),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian phone number'),
  code: z.string().length(6, 'OTP must be 6 digits'),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian phone number'),
  otpToken: z.string().min(1, 'OTP verification token is required'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const resetPasswordSchema = z.object({
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian phone number'),
  otpToken: z.string().min(1, 'OTP verification token is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

