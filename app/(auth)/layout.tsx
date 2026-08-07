import { AnnouncementBar } from "@/components/layout/AnnouncementBar/AnnouncementBar";
import { Logo } from "@/components/Logo/Logo";
import { PageShell } from "@/components/PageShell/PageShell";
import { Flex } from "@/components/Flex/Flex";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <PageShell>
        <Flex justifyContent="center" mb={6}>
          <Logo height={44} />
        </Flex>
        {children}
      </PageShell>
    </>
  );
}
