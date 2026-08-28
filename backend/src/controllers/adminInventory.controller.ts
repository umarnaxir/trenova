import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// GET /api/v1/admin/inventory — get all inventory items (products with sizeStock & total stock)
export const getInventory = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        stock: true,
        sizeStock: true,
        categorySlug: true,
        updatedAt: true
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    console.error('Get Inventory Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch inventory' });
  }
};

// PATCH /api/v1/admin/inventory/:id — update stock / sizeStock for a product
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { stock, sizeStock } = req.body;

    const dataToUpdate: any = {};
    if (typeof stock === 'number') {
      dataToUpdate.stock = stock;
    }
    if (sizeStock && typeof sizeStock === 'object') {
      dataToUpdate.sizeStock = sizeStock;
      // If total stock wasn't explicitly passed, compute sum from sizeStock
      if (typeof stock !== 'number') {
        const total = Object.values(sizeStock as Record<string, number>).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
        dataToUpdate.stock = total;
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: dataToUpdate
    });

    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Update Inventory Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update inventory' });
  }
};
