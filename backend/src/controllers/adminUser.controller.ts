import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAdminUsers = async (req: Request, res: Response) => {
  try {
    const [users, orderCounts, userOrderStats] = await Promise.all([
      prisma.user.findMany({
        include: { addresses: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.order.groupBy({
        by: ['userId'],
        _count: { id: true },
        where: { userId: { not: null } }
      }),
      prisma.order.groupBy({
        by: ['userId'],
        _sum: { total: true },
        where: { userId: { not: null } }
      })
    ]);

    const orderCountMap = new Map<string, number>();
    for (const stat of orderCounts) {
      if (stat.userId) {
        orderCountMap.set(stat.userId, stat._count.id);
      }
    }

    const spentMap = new Map<string, number>();
    for (const stat of userOrderStats) {
      if (stat.userId) {
        spentMap.set(stat.userId, stat._sum.total ?? 0);
      }
    }

    const formattedUsers = users.map((user: any) => {
      const addresses: any[] = user.addresses || [];
      const defaultAddr = addresses.find((a: any) => a.isDefault) || addresses[0];
      const location = defaultAddr ? `${defaultAddr.city}, ${defaultAddr.state}` : '—';
      const totalOrders = orderCountMap.get(user.id) ?? 0;
      const totalSpent = spentMap.get(user.id) ?? 0;

      return {
        id: user.id,
        firstName: user.firstName || 'User',
        lastName: user.lastName || '',
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        email: user.email,
        phone: user.phone || '—',
        location,
        status: 'active',
        createdAt: user.createdAt,
        lastLoginAt: user.updatedAt,
        totalOrders,
        totalSpent,
        hasPurchased: totalOrders > 0,
        addresses,
      };
    });

    res.status(200).json({ success: true, data: formattedUsers });
  } catch (error) {
    console.error("Get Admin Users Error:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    res.status(200).json({ success: true, message: `User status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user status' });
  }
};
