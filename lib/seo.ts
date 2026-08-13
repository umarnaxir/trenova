import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import {
  SEO_PAGES,
  flattenKeywords,
  type CrumbSeo,
  type KeywordSet,
  type PageSeo,
  type SeoFaq,
  type SeoPageKey,
} from "@/constants/seoPages";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: readonly string[] | string[];
  noIndex?: boolean;
  /** Use the title as-is (no `| Trenova` suffix). */
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
};

export function clipTitle(title: string, max = 60): string {
  const trimmed = title.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max).replace(/\s+\S*$/, "").trim();
}

export function fitMetaDescription(
  text: string,
  cta = "Shop now at Trenova.",
  max = 160,
  min = 150,
): string {
  const base = text.replace(/\s+/g, " ").trim();
  if (base.length >= min && base.length <= max) return base;

  if (base.length > max) {
    const sliced = base.slice(0, max - 1).replace(/\s+\S*$/, "").trim();
    return sliced.endsWith(".") ? sliced : `${sliced}.`;
  }

  const withCta = `${base}${base.endsWith(".") ? "" : "."} ${cta}`.trim();
  if (withCta.length <= max) return withCta;
  return withCta.slice(0, max - 1).replace(/\s+\S*$/, "").trim() + ".";
}

export function buildMetadata({
  title,
  description = SITE.description,
  path = "",
  image = SITE.ogImage,
  keywords = SITE.keywords,
  noIndex = false,
  absoluteTitle = false,
  ogType = "website",
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
      ? { index: false, follow: false, nocache: true }
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
      type: ogType,
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
      images: [{ url: imageUrl, alt: fullTitle }],
      creator: SITE.instagramHandle,
      site: SITE.instagramHandle,
    },
    other: {
      "og:brand": SITE.name,
    },
  };
}

export function pageMetadata(key: SeoPageKey): Metadata {
  const page = SEO_PAGES[key] as PageSeo;
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: flattenKeywords(page.keywords as KeywordSet),
    noIndex: page.noIndex,
    absoluteTitle: true,
    ogType: page.ogType,
  });
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
    paymentAccepted: "UPI, Credit Card, Debit Card, Net Banking, COD",
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    sameAs: Object.values(SITE.social),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trenova fashion collections",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Men's Fashion", url: `${SITE.url}/categories/men` },
        { "@type": "OfferCatalog", name: "Women's Fashion", url: `${SITE.url}/categories/women` },
        { "@type": "OfferCatalog", name: "Kids' Fashion", url: `${SITE.url}/categories/kids` },
        { "@type": "OfferCatalog", name: "Accessories", url: `${SITE.url}/categories/accessories` },
      ],
    },
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: PageSeo["webPageType"];
}) {
  return {
    "@context": "https://schema.org",
    "@type": type ?? "WebPage",
    name,
    description,
    url: `${SITE.url}${path}`,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
    about: {
      "@type": "Organization",
      name: SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo/logo.png`,
      },
    },
  };
}

export function breadcrumbJsonLd(items: readonly CrumbSeo[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: readonly SeoFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  products: Product[],
  path: string,
  name: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: `${SITE.url}${path}`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE.url}/product/${product.slug}`,
      name: product.name,
    })),
  };
}

export function pageGraph(key: SeoPageKey, extra: unknown[] = []) {
  const page = SEO_PAGES[key] as PageSeo;
  const graph: unknown[] = [
    webPageJsonLd({
      name: page.title,
      description: page.description,
      path: page.path,
      type: page.webPageType,
    }),
    breadcrumbJsonLd(page.breadcrumbs),
  ];

  if (page.faqs?.length) {
    graph.push(faqJsonLd(page.faqs));
  }

  return [...graph, ...extra];
}

export function productJsonLd(product: Product) {
  const url = `${SITE.url}/product/${product.slug}`;
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

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
    sku: product.sku,
    mpn: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.categorySlug.replace(/-/g, " "),
    color: product.colors.map((item) => item.name).join(", "),
    size: product.sizes.join(", "),
    material: product.specifications.Fabric ?? product.specifications.Material,
    url,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: SITE.currency,
      price: product.price,
      priceValidUntil: nextYear.toISOString().slice(0, 10),
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE.name,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: SITE.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function productMetadata(product: Product): Metadata {
  const buyTitle = clipTitle(`${product.name} | Buy Online | Trenova`);
  const shortTitle = clipTitle(`${product.name} | Trenova`);
  const title = buyTitle.length >= 45 ? buyTitle : shortTitle;
  const description = fitMetaDescription(
    product.shortDescription || product.description,
    `Buy ${product.name} online at Trenova.`,
  );

  return buildMetadata({
    title,
    description,
    path: `/product/${product.slug}`,
    image: product.images.front,
    keywords: [
      product.name,
      product.brand,
      product.categorySlug.replace(/-/g, " "),
      ...product.tags,
      "buy online India",
      "premium fashion",
    ],
    absoluteTitle: true,
  });
}

const PARENT_LABEL: Record<string, string> = {
  men: "Men's",
  women: "Women's",
  kids: "Kids'",
  accessories: "Accessories",
};

export function categorySeo(category: Category) {
  const parentLabel = category.parentSlug
    ? PARENT_LABEL[category.parentSlug] ?? category.parentSlug
    : "";
  const label = parentLabel
    ? `${parentLabel} ${category.name}`
    : category.name === "Men"
      ? "Men's Fashion"
      : category.name === "Women"
        ? "Women's Fashion"
        : category.name === "Kids"
          ? "Kids' Fashion"
          : category.name;

  const presets: Record<
    string,
    { title: string; description: string; keywords: string[] }
  > = {
    men: {
      title: "Shop Men's Premium Fashion & Activewear India | Trenova",
      description:
        "Shop men's fashion and activewear at Trenova. Premium tees, hoodies, joggers and jackets with trusted quality. Browse the men's collection and order today.",
      keywords: [
        "men's fashion India",
        "menswear online",
        "men's activewear",
        "men's hoodies",
      ],
    },
    women: {
      title: "Shop Women's Premium Fashion & Activewear | Trenova",
      description:
        "Discover women's fashion and activewear at Trenova. Elevated tees, hoodies, leggings and layers made to move. Explore the women's collection and shop now.",
      keywords: [
        "women's fashion India",
        "womenswear online",
        "women's activewear",
        "leggings",
      ],
    },
    kids: {
      title: "Shop Kids' Premium Fashion & Activewear India | Trenova",
      description:
        "Shop kids' fashion and activewear at Trenova. Comfort-first tees, hoodies and sets for growing explorers. Browse kids' clothing and order India-wide today.",
      keywords: [
        "kids fashion India",
        "kids clothing online",
        "kids activewear",
        "boys and girls wear",
      ],
    },
    accessories: {
      title: "Shop Premium Fashion Accessories in India | Trenova",
      description:
        "Complete the look with Trenova accessories — caps, bags, socks and more. Premium finishing pieces at fair prices. Browse accessories and add them to cart.",
      keywords: [
        "fashion accessories India",
        "caps bags socks",
        "Trenova accessories",
      ],
    },
    sale: {
      title: "Fashion Sale | Premium Offers Online India | Trenova",
      description:
        "Shop Trenova sale styles — selected premium fashion at better prices. Same trusted quality, limited-time value. Browse sale pieces and order while stocks last.",
      keywords: ["fashion sale India", "discount clothing", "Trenova sale"],
    },
    "best-sellers": {
      title: "Best Sellers | Most Loved Trenova Fashion in India",
      description:
        "Shop Trenova best sellers — the most loved premium fashion and activewear right now. Trusted fits, proven quality. Browse crowd favourites and order today.",
      keywords: ["best seller clothes", "popular fashion India", "Trenova best sellers"],
    },
    "new-arrivals": {
      title: "New Arrivals | Latest Trenova Fashion Drops in India",
      description:
        "Shop Trenova new arrivals — fresh premium fashion and activewear just dropped. Be first to wear what’s next. Browse the latest styles and shop the drop.",
      keywords: ["new fashion arrivals", "latest clothing drops", "Trenova new arrivals"],
    },
  };

  const preset = presets[category.slug];
  const title =
    preset?.title ??
    clipTitle(`Shop ${label} Online | Trenova Fashion`);
  const description =
    preset?.description ??
    fitMetaDescription(
      category.description ||
        `Shop ${label.toLowerCase()} at Trenova. Premium quality apparel and lifestyle essentials with India-wide shipping.`,
      "Browse the collection now.",
    );

  return {
    title,
    description,
    h1: label,
    keywords: preset?.keywords ?? [
      label.toLowerCase(),
      "Trenova",
      "premium fashion",
      "buy online India",
    ],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Trenova online fashion retail",
    serviceType: "Apparel e-commerce",
    provider: {
      "@type": "Organization",
      name: SITE.name,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    url: SITE.url,
  };
}
