import { ForgotPasswordForm } from "@/features/auth/ForgotPasswordForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("forgotPassword");

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
