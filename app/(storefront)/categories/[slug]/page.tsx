import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell/PageShell";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { Text } from "@/components/Text/Text";
import { ShopCatalog } from "@/features/shop/ShopCatalog";
import { getCategoryBySlug } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import { buildMetadata } from "@/lib/seo";

type Props = PageProps<"/categories/[slug]">;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return buildMetadata({
    title: category?.name ?? "Category",
    description:
      category?.description ||
      `Shop ${category?.name ?? "category"} at TRENOvA.`,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const { items } = await getProducts({ category: slug, pageSize: 50 });

  return (
    <PageShell>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />
      <Text as="h1" variant="h1" mb={2}>
        {category.name}
      </Text>
      <Text color="gray600" mb={8}>
        {category.description || `Explore ${category.name} from TRENOvA.`}
      </Text>
      <ShopCatalog
        products={items}
        initialFilters={{ category: slug }}
      />
    </PageShell>
  );
}
