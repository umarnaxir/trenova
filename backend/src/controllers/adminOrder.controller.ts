import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAdminOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Transform data slightly to match what frontend expects
    const formattedOrders = orders.map(order => ({
      ...order,
      totalItems: order.items.reduce((sum, item) => sum + item.quantity, 0)
    }));

    res.status(200).json({ success: true, data: { items: formattedOrders } });
  } catch (error) {
    console.error("Get Admin Orders Error:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    
    const validStatuses = ['PENDING', 'CONFIRMED', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true }
    });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};
