import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const mapProductInput = async (data: any) => {
  const slug = slugify(data.name);
  const category = await prisma.category.findUnique({ where: { slug: data.categorySlug } });
  
  // Calculate total stock if sizeStock is provided but stock isn't
  let stock = Number(data.stock || 0);
  if (data.sizeStock && typeof data.sizeStock === 'object') {
    stock = Object.values(data.sizeStock).reduce((acc: number, val: any) => acc + Number(val || 0), 0) as number;
  }

  const tags: string[] = [];
  if (data.isFeatured) tags.push("featured");
  if (data.isBestSeller) tags.push("best-seller");
  if (data.isNewArrival) tags.push("new-arrival");
  if (data.isTrending) tags.push("trending");
  if (data.isOnSale || (data.compareAtPrice && Number(data.compareAtPrice) > Number(data.price))) {
    tags.push("sale");
  }

  return {
    slug,
    name: data.name,
    brand: data.brand || "Trenova",
    description: data.description || data.shortDescription,
    shortDescription: data.shortDescription,
    price: Number(data.price),
    compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : null,
    rating: Number(data.rating || 0),
    reviewCount: Number(data.reviewCount || 0),
    colors: data.colors?.length ? data.colors : [{ name: "Black", hex: "#0A0A0A" }],
    images: data.images || { front: "" },
    sizeStock: data.sizeStock || {},
    specifications: data.specifications || {},
    sizes: data.sizes || ["S", "M", "L", "XL"],
    tags,
    isFeatured: Boolean(data.isFeatured),
    isBestSeller: Boolean(data.isBestSeller),
    isNewArrival: Boolean(data.isNewArrival),
    isTrending: Boolean(data.isTrending),
    isOnSale: Boolean(data.isOnSale) || Boolean(data.compareAtPrice && Number(data.compareAtPrice) > Number(data.price)),
    stock,
    sku: data.sku || `SKU-${Date.now()}`,
    categoryId: category ? category.id : `cat-${slug}`,
    categorySlug: data.categorySlug || "men",
  };
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = await mapProductInput(req.body);
    // ensure unique slug
    const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    const product = await prisma.product.create({ data });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    
    // We only update what is provided.
    // If name is provided, we might want to update slug, but usually slug doesn't change on update.
    // For simplicity, we just remap the whole payload as an update.
    // But since it's an update, let's just use what they sent but formatted.
    const mapped = await mapProductInput(req.body);
    
    // Remove slug to prevent uniqueness errors if name hasn't changed.
    delete (mapped as any).slug;

    const product = await prisma.product.update({
      where: { id },
      data: mapped,
    });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    await prisma.product.deleteMany({ where: { id: { in: ids } } });
    res.status(200).json({ success: true, message: 'Products deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete products' });
  }
};
