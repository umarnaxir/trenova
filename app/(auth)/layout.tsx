import { AnnouncementBar } from "@/components/layout/AnnouncementBar/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { PageShell } from "@/components/PageShell/PageShell";
import { StorefrontShell } from "@/components/layout/StorefrontShell/StorefrontShell";
import { getMegaMenuCategories } from "@/services/category.service";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getMegaMenuCategories();

  return (
    <StorefrontShell>
      <AnnouncementBar />
      <Navbar categories={categories} />
      <main id="main-content">
        <PageShell>{children}</PageShell>
      </main>
    </StorefrontShell>
  );
}
