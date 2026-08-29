import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import prisma from '../lib/prisma';
import { registerSchema, loginSchema, sendOtpSchema, verifyOtpSchema, resetPasswordSchema } from '../validators/auth.validator';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const data = sendOtpSchema.parse(req.body);

    const existingUser = await prisma.user.findFirst({
      where: { phone: data.phone },
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Phone number already registered. Please login.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = crypto.createHash('sha256').update(code).digest('hex');

    // Invalidate previous unconsumed OTPs for this phone number
    await prisma.otpCode.updateMany({
      where: { phone: data.phone, usedAt: null },
      data: { usedAt: new Date() },
    });

    await prisma.otpCode.create({
      data: {
        phone: data.phone,
        codeHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
      },
    });

    console.log(`[OTP SENT] Phone: ${data.phone} Code: ${code}`);

    const responsePayload: any = {
      success: true,
      message: 'OTP sent successfully',
    };

    // HARD-GATED: Only expose devOtp if not in production environment
    if (process.env.NODE_ENV !== 'production') {
      responsePayload.devOtp = code;
    }

    res.status(200).json(responsePayload);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error('Send OTP Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const data = verifyOtpSchema.parse(req.body);

    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        phone: data.phone,
        usedAt: null,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP expired or invalid. Please request a new OTP.' });
    }

    if (otpRecord.attempts >= 5) {
      // Invalidate after 5 attempts
      await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { usedAt: new Date() },
      });
      return res.status(400).json({ success: false, message: 'Maximum attempts exceeded. Please request a new OTP.' });
    }

    const inputHash = crypto.createHash('sha256').update(data.code).digest('hex');

    if (inputHash !== otpRecord.codeHash) {
      await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } },
      });
      return res.status(400).json({ success: false, message: 'Invalid OTP code' });
    }

    // OTP matched! Generate short-lived verification token
    const otpToken = jwt.sign(
      { phone: data.phone, otpId: otpRecord.id, type: 'otp_verification' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      data: { otpToken },
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error('Verify OTP Error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    // Verify OTP token
    let payload: any;
    try {
      payload = jwt.verify(data.otpToken, JWT_SECRET);
      if (payload.type !== 'otp_verification' || payload.phone !== data.phone) {
        throw new Error('Invalid OTP token payload');
      }
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP verification token' });
    }

    // Check if email or phone already registered
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phone: data.phone },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }
      return res.status(400).json({ success: false, message: 'An account with this phone number already exists' });
    }

    // Check if OTP record was already used
    const otpRecord = await prisma.otpCode.findUnique({
      where: { id: payload.otpId },
    });

    if (!otpRecord || otpRecord.usedAt) {
      return res.status(400).json({ success: false, message: 'OTP already used or invalid. Please verify again.' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Atomically create user and mark OTP as used to prevent replay attacks
    const user = await prisma.$transaction(async (tx) => {
      await tx.otpCode.update({
        where: { id: otpRecord.id },
        data: { usedAt: new Date() },
      });

      return tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        },
      });
    }, { maxWait: 10000, timeout: 25000 });

    const token = jwt.sign({ id: user.id, type: 'user' }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        },
      },
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { addresses: true },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If account was deactivated, reactivate on successful login
    if (!user.isActive) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isActive: true },
      });
    }

    const token = jwt.sign({ id: user.id, type: 'user' }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as any,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          isActive: true,
          addresses: user.addresses || [],
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

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        isActive: true,
        createdAt: true,
        addresses: true,
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
       return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect current password' });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const sendForgotOtp = async (req: Request, res: Response) => {
  try {
    const data = sendOtpSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: { phone: data.phone },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this phone number.' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = crypto.createHash('sha256').update(code).digest('hex');

    // Invalidate previous unconsumed OTPs for this phone number
    await prisma.otpCode.updateMany({
      where: { phone: data.phone, usedAt: null },
      data: { usedAt: new Date() },
    });

    await prisma.otpCode.create({
      data: {
        phone: data.phone,
        codeHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiration
      },
    });

    console.log(`[FORGOT PASSWORD OTP SENT] Phone: ${data.phone} Code: ${code}`);

    const responsePayload: any = {
      success: true,
      message: 'OTP sent to your mobile number',
    };

    if (process.env.NODE_ENV !== 'production') {
      responsePayload.devOtp = code;
    }

    res.status(200).json(responsePayload);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error('Send Forgot OTP Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const verifyForgotOtp = async (req: Request, res: Response) => {
  try {
    const data = verifyOtpSchema.parse(req.body);

    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        phone: data.phone,
        usedAt: null,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'OTP expired or invalid. Please request a new OTP.' });
    }

    if (otpRecord.attempts >= 5) {
      await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { usedAt: new Date() },
      });
      return res.status(400).json({ success: false, message: 'Maximum attempts exceeded. Please request a new OTP.' });
    }

    const inputHash = crypto.createHash('sha256').update(data.code).digest('hex');

    if (inputHash !== otpRecord.codeHash) {
      await prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } },
      });
      return res.status(400).json({ success: false, message: 'Invalid OTP code' });
    }

    const otpToken = jwt.sign(
      { phone: data.phone, otpId: otpRecord.id, type: 'password_reset' },
      JWT_SECRET,
      { expiresIn: '10m' }
    );

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      data: { otpToken },
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error('Verify Forgot OTP Error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const data = resetPasswordSchema.parse(req.body);

    let payload: any;
    try {
      payload = jwt.verify(data.otpToken, JWT_SECRET);
      if (payload.type !== 'password_reset' || payload.phone !== data.phone) {
        throw new Error('Invalid OTP token');
      }
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    const user = await prisma.user.findFirst({
      where: { phone: data.phone }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const otpRecord = await prisma.otpCode.findUnique({
      where: { id: payload.otpId }
    });

    if (!otpRecord || otpRecord.usedAt) {
      return res.status(400).json({ success: false, message: 'OTP token already used or expired' });
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.$transaction([
      prisma.otpCode.update({
        where: { id: otpRecord.id },
        data: { usedAt: new Date() }
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
    ]);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.'
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
    }
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
};

export const forgotPassword = sendForgotOtp;

