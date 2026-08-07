import { AnnouncementBar } from "@/components/layout/AnnouncementBar/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton/WhatsAppButton";
import { getMegaMenuCategories } from "@/services/category.service";
import { StorefrontShell } from "@/components/layout/StorefrontShell/StorefrontShell";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getMegaMenuCategories();

  return (
    <StorefrontShell>
      <AnnouncementBar />
      <Navbar categories={categories} />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppButton />
    </StorefrontShell>
  );
}
