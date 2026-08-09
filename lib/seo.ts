import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import type { Product } from "@/types/product";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: readonly string[] | string[];
  noIndex?: boolean;
  /** Use the title as-is (no `| Trenova` suffix). */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description = SITE.description,
  path = "",
  image = SITE.ogImage,
  keywords = SITE.keywords,
  noIndex = false,
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE.url}${path}`;
  const isBrandHome =
    absoluteTitle ||
    title === SITE.seoTitle ||
    title === SITE.name ||
    title === SITE.brand;
  const fullTitle = isBrandHome
    ? title === SITE.name || title === SITE.brand
      ? SITE.seoTitle
      : title
    : `${title} | ${SITE.name}`;

  const imageUrl = image.startsWith("http") ? image : `${SITE.url}${image}`;

  return {
    // Absolute avoids double-suffix when root layout defines a title template.
    title: { absolute: fullTitle },
    description,
    keywords: [...keywords],
    authors: [{ name: SITE.legalName, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.legalName,
    category: "fashion",
    applicationName: SITE.name,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: fullTitle,
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: SITE.instagramHandle,
      site: SITE.instagramHandle,
    },
    other: {
      "og:brand": SITE.name,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: [SITE.brand, "Shop Trenova"],
    url: SITE.url,
    logo: `${SITE.url}/logo/logo.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: Object.values(SITE.social),
    legalName: SITE.legalName,
    foundingLocation: {
      "@type": "Place",
      name: `${SITE.address.city}, ${SITE.address.state}`,
    },
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: SITE.brand,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo/logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function storeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: SITE.name,
    image: `${SITE.url}${SITE.ogImage}`,
    url: SITE.url,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹",
    currenciesAccepted: SITE.currency,
    paymentAccepted: "UPI, Credit Card, Debit Card, Net Banking",
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
    sameAs: Object.values(SITE.social),
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
