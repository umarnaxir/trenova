import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/constants/site";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: SITE.seoTitle,
    description: SITE.description,
    path: "/",
    absoluteTitle: true,
  }),
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.seoTitle,
    template: `%s | ${SITE.name}`,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logo/logo.png", type: "image/png" }],
    apple: "/logo/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = organizationJsonLd();

  return (
    <html lang="en-IN" className={`${sans.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
