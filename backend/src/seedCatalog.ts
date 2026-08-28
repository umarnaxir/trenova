import fs from 'fs';
import path from 'path';
import prisma from './lib/prisma.js';

async function main() {
  const dataPath = path.resolve(process.cwd(), 'mock_data.json');
  const { categories, products } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log('Seeding categories...');
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        image: cat.image,
        parentSlug: cat.parentSlug
      }
    });
  }

  console.log('Seeding products...');
  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        brand: prod.brand,
        description: prod.description,
        shortDescription: prod.shortDescription,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        colors: prod.colors,
        images: prod.images,
        sizeStock: prod.sizeStock,
        specifications: prod.specifications,
        sizes: prod.sizes,
        tags: prod.tags,
        isFeatured: prod.isFeatured,
        isBestSeller: prod.isBestSeller,
        isNewArrival: prod.isNewArrival,
        isTrending: prod.isTrending,
        isOnSale: prod.isOnSale,
        stock: prod.stock,
        sku: prod.sku,
        categoryId: prod.categoryId,
        categorySlug: prod.categorySlug,
      }
    });
  }

  console.log('Seeding coupons...');
  const couponsToSeed = [
    { code: 'WELCOME10', description: '10% off your first order', type: 'PERCENT' as const, value: 10, minOrder: 0 },
    { code: 'TRENOVA10', description: '10% off welcome discount', type: 'PERCENT' as const, value: 10, minOrder: 0 },
    { code: 'FLAT500', description: 'Flat ₹500 off on orders over ₹1000', type: 'FIXED' as const, value: 500, minOrder: 1000 }
  ];
  for (const c of couponsToSeed) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: { minOrder: c.minOrder, value: c.value },
      create: c
    });
  }

  console.log('Catalog seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
