import { RegisterPageClient } from "@/features/auth/RegisterPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("register");

export default function RegisterPage() {
  return <RegisterPageClient />;
}
