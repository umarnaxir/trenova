import { AnnouncementBar } from "@/components/layout/AnnouncementBar/AnnouncementBar";
import { Footer } from "@/components/layout/Footer/Footer";
import { PageShell } from "@/components/PageShell/PageShell";
import { AccountNav } from "@/features/account/AccountNav";
import { AccountGate } from "@/features/account/AccountGate";
import { Logo } from "@/components/Logo/Logo";
import { Flex } from "@/components/Flex/Flex";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <PageShell>
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Logo height={36} />
          <a href="/shop">Continue shopping</a>
        </Flex>
        <AccountGate>
          <AccountNav />
          {children}
        </AccountGate>
      </PageShell>
      <Footer />
    </>
  );
}
