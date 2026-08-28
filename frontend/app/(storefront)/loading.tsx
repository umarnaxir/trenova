import { Loader } from "@/components/Loader/Loader";
import { PageShell } from "@/components/PageShell/PageShell";

export default function StorefrontLoading() {
  return (
    <PageShell>
      <Loader />
    </PageShell>
  );
}
