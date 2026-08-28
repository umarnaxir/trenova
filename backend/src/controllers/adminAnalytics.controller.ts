import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    // Run all aggregations in parallel for performance
    const [
      orderStats,
      userCount,
      productCount,
      recentOrders,
      lowStockProducts,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      couponCount,
      topProducts
    ] = await Promise.all([
      // Total revenue + order count
      prisma.order.aggregate({
        where: { status: { not: 'CANCELLED' } },
        _sum: { total: true },
        _count: { id: true },
        _avg: { total: true }
      }),
      // User count
      prisma.user.count(),
      // Product count
      prisma.product.count(),
      // Recent 8 orders
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        include: { items: { take: 1 } }
      }),
      // Low stock products (stock < 10)
      prisma.product.count({ where: { stock: { lt: 10 } } }),
      // Pending/Confirmed orders
      prisma.order.count({ where: { status: { in: ['PENDING', 'CONFIRMED'] } } }),
      // Delivered orders
      prisma.order.count({ where: { status: 'DELIVERED' } }),
      // Cancelled orders
      prisma.order.count({ where: { status: 'CANCELLED' } }),
      // Active coupons
      prisma.coupon.count({ where: { isActive: true } }),
      // Top 5 best-selling products by order item count
      prisma.orderItem.groupBy({
        by: ['productId', 'productName'],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5
      })
    ]);

    // Sales chart: last 14 days grouped by day
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    let salesByDay: Array<{ day: string; revenue: number; orders: number }> = [];
    try {
      salesByDay = await prisma.$queryRaw<Array<{ day: string; revenue: number; orders: number }>>`
        SELECT 
          DATE("createdAt")::text as day,
          SUM(total)::float as revenue,
          COUNT(id)::int as orders
        FROM "Order"
        WHERE "createdAt" >= ${fourteenDaysAgo}
          AND status != 'CANCELLED'
        GROUP BY DATE("createdAt")
        ORDER BY day ASC
      `;
    } catch (chartErr) {
      console.warn("Analytics chart query error fallback:", chartErr);
    }

    // Fill missing days with 0 for smooth chart continuity
    const dbSalesMap = new Map((salesByDay || []).map((item) => [item.day, item]));
    const salesChart: Array<{ day: string; revenue: number; orders: number }> = [];

    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const match = dbSalesMap.get(dateStr);
      salesChart.push({
        day: dateStr,
        revenue: match ? match.revenue : 0,
        orders: match ? match.orders : 0,
      });
    }

    // Count featured/best-seller/new/sale products
    const [featuredCount, bestSellerCount, newArrivalCount, onSaleCount] = await Promise.all([
      prisma.product.count({ where: { isFeatured: true } }),
      prisma.product.count({ where: { isBestSeller: true } }),
      prisma.product.count({ where: { isNewArrival: true } }),
      prisma.product.count({ where: { isOnSale: true } }),
    ]);

    const totalRevenue = orderStats._sum.total ?? 0;
    const totalOrders = orderStats._count.id ?? 0;
    const avgOrderValue = orderStats._avg.total ?? 0;

    const dashboardData = {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      userCount,
      productCount,
      lowStockCount: lowStockProducts,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      couponCount,
      teamCount: 0,
      unreadNotifications: 0,
      featuredCount,
      bestSellerCount,
      newArrivalCount,
      onSaleCount,
      inventoryUnits: 0,
      recentOrders: recentOrders.map(o => ({
        id: o.id,
        orderNumber: o.orderNumber,
        fullName: o.fullName,
        total: o.total,
        status: o.status.toLowerCase(),
        city: o.city,
        createdAt: o.createdAt,
        items: o.items
      })),
      salesChart,
      topProducts: topProducts.map(p => ({
        productId: p.productId,
        name: p.productName,
        totalSold: p._sum.quantity ?? 0
      })),
      // Stats array for KPI cards
      stats: [
        { label: 'Total Revenue', value: `₹${Math.round(totalRevenue).toLocaleString('en-IN')}`, change: '+0%', up: true },
        { label: 'Total Orders', value: String(totalOrders), change: '', up: true },
        { label: 'Customers', value: String(userCount), change: '', up: true },
        { label: 'Products', value: String(productCount), change: '', up: true },
      ]
    };

    res.status(200).json({ success: true, data: dashboardData });
  } catch (error: any) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
};
