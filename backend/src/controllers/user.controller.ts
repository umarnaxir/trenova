import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { firstName, lastName, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, phone }
    });

    res.status(200).json({ success: true, data: { firstName: user.firstName, lastName: user.lastName, phone: user.phone } });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { currentPassword, nextPassword } = req.body;

    if (!currentPassword || !nextPassword) {
      return res.status(400).json({ success: false, message: 'Both current and new password are required' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nextPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ success: false, message: 'Failed to change password' });
  }
};

export const getAddresses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    console.error("Get Addresses Error:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch addresses' });
  }
};

export const addAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    
    // Check limit
    const count = await prisma.address.count({ where: { userId } });
    if (count >= 5) {
      return res.status(400).json({ success: false, message: 'Maximum of 5 addresses allowed' });
    }

    const { label, fullName, phone, alternatePhone, line1, line2, city, state, postalCode, country, isDefault } = req.body;

    const address = await prisma.$transaction(async (tx) => {
      // If setting default, unset others
      if (isDefault || count === 0) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false }
        });
      }

      return tx.address.create({
        data: {
          userId, label, fullName, phone, alternatePhone, line1, line2, city, state, postalCode, country,
          isDefault: isDefault || count === 0
        }
      });
    }, { maxWait: 10000, timeout: 25000 });

    res.status(201).json({ success: true, data: address });
  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({ success: false, message: 'Failed to add address' });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const addressId = req.params.id as string;
    const { label, fullName, phone, alternatePhone, line1, line2, city, state, postalCode, country, isDefault } = req.body;

    const address = await prisma.$transaction(async (tx) => {
      if (isDefault) {
        await tx.address.updateMany({
          where: { userId },
          data: { isDefault: false }
        });
      }

      return tx.address.update({
        where: { id: addressId },
        data: { label, fullName, phone, alternatePhone, line1, line2, city, state, postalCode, country, isDefault }
      });
    }, { maxWait: 10000, timeout: 25000 });

    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).json({ success: false, message: 'Failed to update address' });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const addressId = req.params.id as string;

    const existing = await prisma.address.findUnique({
      where: { id: addressId }
    });

    if (!existing || existing.userId !== userId) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    await prisma.address.delete({
      where: { id: addressId }
    });

    // Check if we deleted the default, if so, make the newest one default
    const defaultAddress = await prisma.address.findFirst({ where: { userId, isDefault: true } });
    if (!defaultAddress) {
      const remaining = await prisma.address.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
      if (remaining) {
        await prisma.address.update({ where: { id: remaining.id }, data: { isDefault: true } });
      }
    }

    res.status(200).json({ success: true, message: 'Address deleted' });
  } catch (error) {
    console.error("Delete Address Error:", error);
    res.status(500).json({ success: false, message: 'Failed to delete address' });
  }
};
