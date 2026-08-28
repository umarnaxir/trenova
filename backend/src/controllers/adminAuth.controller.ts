import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const setupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const status = async (req: Request, res: Response) => {
  try {
    const adminCount = await prisma.admin.count();
    res.status(200).json({ success: true, data: { needsSetup: adminCount === 0 } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const setup = async (req: Request, res: Response) => {
  try {
    const adminCount = await prisma.admin.count();
    if (adminCount > 0) {
      return res.status(403).json({ success: false, message: 'Setup already complete' });
    }

    const data = setupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await prisma.admin.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'SUPERADMIN',
      },
    });

    const token = jwt.sign({ id: admin.id, role: admin.role, type: 'admin' }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any,
    });

    res.status(201).json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const normalizedEmail = data.email.trim().toLowerCase();

    // 1. Check primary Admin model
    const adminUser = await prisma.admin.findFirst({
      where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    });

    if (adminUser) {
      const isMatch = await bcrypt.compare(data.password, adminUser.password);
      if (isMatch) {
        const token = jwt.sign({ id: adminUser.id, role: adminUser.role, type: 'admin' }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN as any,
        });

        return res.status(200).json({
          success: true,
          data: {
            token,
            admin: {
              id: adminUser.id,
              name: adminUser.name,
              email: adminUser.email,
              role: adminUser.role,
            },
          },
        });
      }
    }

    // 2. Check TeamMember model
    const teamMember = await prisma.teamMember.findFirst({
      where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    });

    if (teamMember && teamMember.status !== 'disabled') {
      let isMatch = teamMember.password === data.password;
      if (!isMatch && teamMember.password.startsWith('$2')) {
        isMatch = await bcrypt.compare(data.password, teamMember.password);
      }
      if (isMatch) {
        const token = jwt.sign(
          { id: teamMember.id, role: teamMember.role.toUpperCase(), type: 'admin' },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN as any }
        );

        return res.status(200).json({
          success: true,
          data: {
            token,
            admin: {
              id: teamMember.id,
              name: teamMember.name,
              email: teamMember.email,
              role: teamMember.role,
            },
          },
        });
      }
    }

    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.id;
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
       return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect current password' });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
