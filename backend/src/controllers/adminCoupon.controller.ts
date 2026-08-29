import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });

    const formatted = coupons.map((c) => ({
      id: c.id,
      code: c.code,
      description: c.description,
      type: c.type,
      value: Number(c.value),
      minOrder: Number(c.minOrder || 0),
      maxDiscountAmount: c.maxDiscountAmount ? Number(c.maxDiscountAmount) : null,
      isActive: c.isActive,
      usedCount: c.usedCount,
      maxUses: c.maxUses,
      expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error('getCoupons error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch coupons from database' });
  }
};

function parseExpiryDate(expiresAt: any): Date | null {
  if (!expiresAt) return null;
  const str = String(expiresAt).trim();
  if (!str) return null;
  const d = new Date(str);
  if (isNaN(d.getTime())) return null;
  if (str.length === 10) {
    d.setUTCHours(23, 59, 59, 999);
  }
  return d;
}

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const { code, description, type, value, minOrder, maxDiscountAmount, isActive, maxUses, expiresAt } = req.body;
    if (!code || value === undefined || value === null) {
      return res.status(400).json({ success: false, message: 'Coupon code and value are required' });
    }
    const normalizedCode = String(code).trim().toUpperCase();
    
    const exists = await prisma.coupon.findUnique({ where: { code: normalizedCode } });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: normalizedCode,
        description: description ? String(description) : null,
        type: String(type).toUpperCase() === 'FIXED' ? 'FIXED' : 'PERCENT',
        value: Number(value),
        minOrder: minOrder !== undefined && minOrder !== null ? Number(minOrder) : 0,
        maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        maxUses: maxUses ? Number(maxUses) : null,
        expiresAt: parseExpiryDate(expiresAt),
      }
    });

    res.status(201).json({ success: true, data: coupon });
  } catch (error: any) {
    console.error("Create Coupon Error:", error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create coupon' });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { code, description, type, value, minOrder, maxDiscountAmount, isActive, maxUses, expiresAt } = req.body;
    
    const updateData: any = {};
    if (code !== undefined) updateData.code = String(code).trim().toUpperCase();
    if (description !== undefined) updateData.description = description ? String(description) : null;
    if (type !== undefined) updateData.type = String(type).toUpperCase() === 'FIXED' ? 'FIXED' : 'PERCENT';
    if (value !== undefined) updateData.value = Number(value);
    if (minOrder !== undefined) updateData.minOrder = minOrder !== null ? Number(minOrder) : 0;
    if (maxDiscountAmount !== undefined) updateData.maxDiscountAmount = maxDiscountAmount ? Number(maxDiscountAmount) : null;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (maxUses !== undefined) updateData.maxUses = maxUses ? Number(maxUses) : null;
    if (expiresAt !== undefined) updateData.expiresAt = parseExpiryDate(expiresAt);

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({ success: true, data: coupon });
  } catch (error: any) {
    console.error("Update Coupon Error:", error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update coupon' });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.coupon.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete coupon' });
  }
};
