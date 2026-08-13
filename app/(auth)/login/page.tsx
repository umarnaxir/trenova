import { LoginForm } from "@/features/auth/LoginForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("login");

export default function LoginPage() {
  return <LoginForm />;
}
