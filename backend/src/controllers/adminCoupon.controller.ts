import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch coupons' });
  }
};

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const { code, description, type, value, minOrder, maxDiscountAmount, isActive, maxUses, expiresAt } = req.body;
    const normalizedCode = String(code).trim().toUpperCase();
    
    const exists = await prisma.coupon.findUnique({ where: { code: normalizedCode } });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: normalizedCode, description, type, value, minOrder, maxDiscountAmount, isActive, maxUses, expiresAt
      }
    });

    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create coupon' });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { code, description, type, value, minOrder, maxDiscountAmount, isActive, maxUses, expiresAt } = req.body;
    
    const updateData: any = {};
    if (code !== undefined) updateData.code = String(code).trim().toUpperCase();
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (value !== undefined) updateData.value = Number(value);
    if (minOrder !== undefined) updateData.minOrder = Number(minOrder || 0);
    if (maxDiscountAmount !== undefined) updateData.maxDiscountAmount = maxDiscountAmount ? Number(maxDiscountAmount) : null;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (maxUses !== undefined) updateData.maxUses = maxUses ? Number(maxUses) : null;
    if (expiresAt !== undefined) updateData.expiresAt = expiresAt;

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    console.error("Update Coupon Error:", error);
    res.status(500).json({ success: false, message: 'Failed to update coupon' });
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
