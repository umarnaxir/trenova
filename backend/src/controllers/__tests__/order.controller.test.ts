import { checkout } from '../order.controller';
import prisma from '../../lib/prisma';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

// Helper mock response
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Order Controller Concurrency', () => {
  let productId: string;

  beforeAll(async () => {
    // create a product for testing
    const p = await prisma.product.create({
      data: {
        slug: 'test-product-' + Date.now(),
        name: 'Test',
        brand: 'Test',
        shortDescription: 'test',
        description: 'test',
        price: 500,
        stock: 100,
        sku: 'TEST-' + Date.now(),
        colors: [],
        images: {},
        specifications: {},
        categoryId: 'test',
        categorySlug: 'test',
        sizeStock: { 'ONE SIZE': 100 }
      }
    });
    productId = p.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should prevent multiple uses of maxUses=1 coupon in concurrent requests', async () => {
    const coupon = await prisma.coupon.create({
      data: {
        code: 'RACE' + Date.now(),
        type: 'FIXED',
        value: new Prisma.Decimal(100),
        maxUses: 1,
        isActive: true
      }
    });

    const mockReq = {
      body: {
        userId: 'test-user',
        userEmail: 'test@example.com',
        fullName: 'Test User',
        phone: '1234567890',
        line1: '123',
        city: 'City',
        state: 'State',
        postalCode: '12345',
        items: [{ productId, name: 'Test', size: 'ONE SIZE', quantity: 1, image: '' }],
        paymentMethod: 'COD',
        couponCode: coupon.code
      }
    } as unknown as Request;

    const res1 = mockResponse();
    const res2 = mockResponse();
    const res3 = mockResponse();

    await Promise.all([
      checkout(mockReq, res1),
      checkout(mockReq, res2),
      checkout(mockReq, res3)
    ]);

    // One should succeed, others fail
    const statusCodes = [
      (res1.status as jest.Mock).mock.calls[0][0],
      (res2.status as jest.Mock).mock.calls[0][0],
      (res3.status as jest.Mock).mock.calls[0][0]
    ];

    const successes = statusCodes.filter(c => c === 201).length;
    const failures = statusCodes.filter(c => c === 400).length;

    expect(successes).toBe(1);
    expect(failures).toBe(2);

    const dbCoupon = await prisma.coupon.findUnique({ where: { id: coupon.id } });
    expect(dbCoupon?.usedCount).toBe(1);
  });
});
