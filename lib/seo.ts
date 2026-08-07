import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import type { Product } from "@/types/product";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description = SITE.description,
  path = "",
  image = "/logo/logo.png",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title === SITE.name ? title : `${title} | ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo/logo.png`,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: Object.values(SITE.social),
    legalName: SITE.legalName,
    address: {
      "@type": "PostalAddress",
      streetAddress: [SITE.address.line1, SITE.address.line2]
        .filter(Boolean)
        .join(", "),
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [
      `${SITE.url}${product.images.front}`,
      `${SITE.url}${product.images.left}`,
      `${SITE.url}${product.images.right}`,
    ],
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: SITE.currency,
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${SITE.url}/product/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}
