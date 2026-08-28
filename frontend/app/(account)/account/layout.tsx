import { AnnouncementBar } from "@/components/layout/AnnouncementBar/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton/WhatsAppButton";
import { StorefrontShell } from "@/components/layout/StorefrontShell/StorefrontShell";
import { PageShell } from "@/components/PageShell/PageShell";
import { AccountShell } from "@/features/account/AccountNav";
import { AccountGate } from "@/features/account/AccountGate";
import { getMegaMenuCategories } from "@/services/category.service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("account");

export default async function AccountLayout({
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
        <PageShell>
          <AccountGate>
            <AccountShell>{children}</AccountShell>
          </AccountGate>
        </PageShell>
      </main>
      <Footer />
      <WhatsAppButton />
    </StorefrontShell>
  );
}
