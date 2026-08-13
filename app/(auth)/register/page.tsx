import { buildMetadata } from "@/lib/seo";
import { RegisterPageClient } from "@/features/auth/RegisterPageClient";

export const metadata = buildMetadata({
  title: "Register",
  description: "Create your Trenova account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return <RegisterPageClient />;
}
