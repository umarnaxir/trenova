import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ProductDetails } from "@/features/product/ProductDetails";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/services/product.service";
import { getProductReviews } from "@/services/review.service";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = PageProps<"/product/[slug]">;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return buildMetadata({ title: "Product", path: `/product/${slug}` });

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/product/${product.slug}`,
    image: product.images.front,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    getProductReviews(product.id),
    getRelatedProducts(product.id),
  ]);

  const jsonLd = productJsonLd(product);

  return (
    <PageShell compact>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        compact
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />
      <ProductDetails product={product} reviews={reviews} related={related} />
    </PageShell>
  );
}
