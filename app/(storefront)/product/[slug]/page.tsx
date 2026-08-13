import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ProductDetails } from "@/features/product/ProductDetails";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/services/product.service";
import { getProductReviews } from "@/services/review.service";
import { getCategoryBySlug } from "@/services/category.service";
import {
  breadcrumbJsonLd,
  buildMetadata,
  productJsonLd,
  productMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/constants/site";

export const dynamic = "force-dynamic";

type Props = PageProps<"/product/[slug]">;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return buildMetadata({
      title: "Product",
      path: `/product/${slug}`,
      noIndex: true,
    });
  }

  return productMetadata(product);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) redirect("/");

  const [reviews, related, category] = await Promise.all([
    getProductReviews(product.id),
    getRelatedProducts(product.id),
    getCategoryBySlug(product.categorySlug),
  ]);
  const parent = category?.parentSlug
    ? await getCategoryBySlug(category.parentSlug)
    : null;

  const path = `/product/${product.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    ...(parent
      ? [{ name: parent.name, path: `/categories/${parent.slug}` }]
      : []),
    ...(category
      ? [{ name: category.name, path: `/categories/${category.slug}` }]
      : []),
    { name: product.name, path },
  ];

  return (
    <PageShell compact>
      <JsonLd
        data={[
          webPageJsonLd({
            name: `${product.name} | ${SITE.name}`,
            description: product.shortDescription || product.description,
            path,
          }),
          breadcrumbJsonLd(crumbs),
          productJsonLd(product),
        ]}
      />
      <Breadcrumb
        compact
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          ...(parent
            ? [{ label: parent.name, href: `/categories/${parent.slug}` }]
            : []),
          ...(category
            ? [
                {
                  label: category.name,
                  href: `/categories/${category.slug}`,
                },
              ]
            : []),
          { label: product.name },
        ]}
      />
      <ProductDetails product={product} reviews={reviews} related={related} />
    </PageShell>
  );
}
