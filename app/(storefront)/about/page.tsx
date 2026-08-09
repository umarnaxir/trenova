import { PolicyContent } from "@/components/PolicyContent/PolicyContent";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/constants/site";

export const metadata = buildMetadata({
  title: "About",
  description: `Learn about ${SITE.name} — a premium fashion brand focused on refined essentials.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PolicyContent title="About Trenova">
      <p>
        Trenova is a premium fashion brand built for modern living. We design
        elevated essentials with precise fits, considered fabrics, and a
        signature black–white–gold identity.
      </p>
      <h2>Company</h2>
      <p>
        {SITE.legalName} (CIN: {SITE.cin}) operates from Sangrama, Sopore,
        Jammu and Kashmir. Visit us online at {SITE.domain} or follow{" "}
        {SITE.instagramHandle} on Instagram.
      </p>
      <h2>Our philosophy</h2>
      <p>
        Quiet confidence over loud branding. Every piece is engineered to feel
        international in quality while remaining practical for everyday wear
        across India and beyond.
      </p>
      <h2>What we make</h2>
      <ul>
        <li>Men&apos;s and women&apos;s apparel</li>
        <li>Kids essentials and co-ords</li>
        <li>Activewear and lifestyle accessories</li>
      </ul>
    </PolicyContent>
  );
}
